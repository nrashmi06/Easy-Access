// src/service/AuthServiceImpl.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const UserRepository = require('../repository/UserRepository');
const transporter = require('../config/mailer');
const UserDTO = require('../dto/UserDTO');
const AuthService = require('./AuthService');
const { generateAccessToken, generateRefreshToken } = require('../utils/token');

class AuthServiceImpl extends AuthService {
  static async signup({ name, email, password, file }) {
    try {
      const existing = await UserRepository.findByEmail(email);
      if (existing) throw new Error('Email already registered');

      const hashedPassword = await bcrypt.hash(password, 10);
      const emailToken = crypto.randomBytes(32).toString('hex');
      const tokenExpiry = Date.now() + 3600000; // 1 hour

      const user = await UserRepository.create({
        name,
        email,
        password: hashedPassword,
        profileImage: file?.path || '',
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
  `
});


      return { message: 'Verification email sent. Please verify to activate your account.' };
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
      const decoded = jwt.verify(oldToken, process.env.REFRESH_TOKEN_SECRET);
      const user = await UserRepository.findById(decoded.id);
      if (!user || user.refreshToken !== oldToken) {
        throw new Error('Invalid refresh token');
      }

      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);
      user.refreshToken = newRefreshToken;
      await user.save();

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (err) {
      throw new Error('Refresh token expired or invalid');
    }
  }

  static async forgotPassword(email) {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error('Email not registered');

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const link = `http://localhost:3000/reset-password/${token}`;

    await UserRepository.setResetToken(email, token, Date.now() + 3600000);

    await transporter.sendMail({
      to: email,
      subject: 'Password Reset',
      html: `<p>Click to reset password: <a href="${link}">${link}</a></p>`
    });
  }

  static async resetPassword(token, newPassword) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserRepository.findByResetToken(token);
    if (!user) throw new Error('Token expired or invalid');

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();
  }
}

module.exports = AuthServiceImpl;
