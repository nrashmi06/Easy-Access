// src/service/AuthServiceImpl.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const UserRepository = require('../repository/UserRepository');
const transporter = require('../config/mailer');
const UserDTO = require('../dto/UserDTO');
const AuthService = require('./AuthService');
const cloudinary = require('../config/cloudinary');
const { generateAccessToken, generateRefreshToken } = require('../utils/token');

class AuthServiceImpl extends AuthService {
 static async signup({ name, email, password, file }) {
  try {
    const existing = await UserRepository.findByEmail(email);
    if (existing) throw new Error('Email already registered');

    const hashedPassword = await bcrypt.hash(password, 10);
    const emailToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = Date.now() + 3600000; // 1 hour

    // Upload profile image to Cloudinary from buffer
    let profileImageUrl = '';
    let cloudinaryId = '';

    if (file) {
      const streamifier = require('streamifier');

const streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'profiles' },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

const uploaded = await streamUpload(file.buffer);

      profileImageUrl = uploaded.secure_url;
      cloudinaryId = uploaded.public_id;
    }

    const user = await UserRepository.create({
      name,
      email,
      password: hashedPassword,
      profileImage: profileImageUrl,
      profileCloudinaryId: cloudinaryId,
      emailVerificationToken: emailToken,
      emailVerificationTokenExpiry: tokenExpiry,
      isActive: false,
    });

    const verifyLink = `http://localhost:5000/api/auth/verify-email/${emailToken}`;

    await transporter.sendMail({
      to: email,
      subject: 'Verify Your Email Address',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px; background-color: #f9f9f9;">
          <h2 style="color: #333;">Welcome to Easy Access!</h2>
          <p>Thank you for signing up. Please confirm your email address by clicking the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verifyLink}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Verify Email
            </a>
          </div>
          <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p style="word-break: break-all;"><a href="${verifyLink}">${verifyLink}</a></p>
          <hr style="margin-top: 30px;">
          <p style="font-size: 12px; color: #888;">If you did not create an account, please ignore this email.</p>
        </div>
      `,
    });

    return {
      message: 'Verification email sent. Please verify to activate your account.',
    };
  } catch (err) {
    console.error('Signup error:', err.message);
    throw new Error(err.message || 'Signup failed');
  }
}

  static async verifyEmail(token) {
    const user = await UserRepository.findByVerificationToken(token);
    if (!user || user.emailVerificationTokenExpiry < Date.now()) {
      throw new Error('Invalid or expired verification token');
    }

    user.isActive = true;
    user.emailVerificationToken = null;
    user.emailVerificationTokenExpiry = null;
    await user.save();

    return { message: 'Email successfully verified. You can now log in.' };
  }

  static async login({ email, password }) {
    const user = await UserRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    if (!user.isActive) {
      throw new Error('Please verify your email before logging in.');
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    return {
      accessToken,
      refreshToken,
      user: new UserDTO(user),
    };
  }

  static async refreshToken(oldToken) {
  try {
    if (!oldToken) {
      console.error('[refreshToken] Error: No refresh token provided');
      throw new Error('No refresh token provided');
    }

    let decoded;
    try {
      decoded = jwt.verify(oldToken, process.env.REFRESH_TOKEN_SECRET);
      console.log('[refreshToken] Decoded token:', decoded);
    } catch (verifyErr) {
      console.error('[refreshToken] Token verification failed:', verifyErr.message);
      throw new Error('Invalid or expired refresh token');
    }

    const user = await UserRepository.findById(decoded.id);
    if (!user) {
      console.error('[refreshToken] Error: User not found for ID:', decoded.id);
      throw new Error('User not found');
    }

    if (user.refreshToken !== oldToken) {
      console.error('[refreshToken] Error: Token mismatch. Stored:', user.refreshToken, '| Provided:', oldToken);
      throw new Error('Refresh token does not match stored token');
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    user.refreshToken = newRefreshToken;
    await user.save();

    console.log('[refreshToken] Access and refresh tokens regenerated');
    console.log('[refreshToken] Stored new refresh token:', newRefreshToken);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  } catch (err) {
    console.error('[refreshToken] Failed:', err.message);
    throw new Error('Refresh token failed: ' + err.message);
  }
}


static async forgotPassword(email) {
  console.log('forgotPassword called with email:', email);

  const user = await UserRepository.findByEmail(email);
  if (!user) throw new Error('Email not registered');

  // Generate a random uppercase token (6 characters)
  const token = crypto.randomBytes(3).toString('hex').toUpperCase();

  await UserRepository.setResetToken(email, token, Date.now() + 3600000);

  await transporter.sendMail({
    to: email,
    subject: 'Password Reset',
    html: `<p>Token to reset password: ${token}</p>`
  });
}

  static async resetPassword(token, newPassword) {
    const user = await UserRepository.findByResetToken(token);
    if (!user) throw new Error('Token expired or invalid');

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();
  }

static async resendVerification(email) {
  const user = await UserRepository.findByEmail(email);
  if (!user) throw new Error('Email not registered');
  if (user.isActive) throw new Error('Email is already verified');

  const emailToken = crypto.randomBytes(32).toString('hex');
  const tokenExpiry = Date.now() + 3600000; // 1 hour

  user.emailVerificationToken = emailToken;
  user.emailVerificationTokenExpiry = tokenExpiry;
  await user.save();

  const verifyLink = `http://localhost:5000/api/auth/verify-email/${emailToken}`;

  await transporter.sendMail({
    to: email,
    subject: 'Resend: Verify Your Email Address',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
        <h2>Verify Your Email</h2>
        <p>You requested a new verification link. Click below to verify your email address:</p>
        <a href="${verifyLink}" style="padding: 10px 20px; background: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
        <p>If you didn't request this, you can ignore the email.</p>
      </div>
    `
  });

  return { message: 'Verification email resent successfully.' };
}

static async logout(authToken) {
  try {
    const decoded = jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET);
    console.log("[Logout] Token received:", authToken);

    

    const user = await UserRepository.findById(decoded.id);
    if (!user) throw new Error('User not found during logout');

    user.refreshToken = null;
    await user.save();

    return { message: 'Logout successful' };
  } catch (err) {
    console.error("Logout error:", err);  // Add this!
    throw new Error(err.message || 'Logout error');
  }
}


}

module.exports = AuthServiceImpl;
