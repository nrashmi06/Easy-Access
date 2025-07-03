// src/service/AuthServiceImpl.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserRepository = require('../repository/UserRepository');
const transporter = require('../config/mailer');
const UserDTO = require('../dto/UserDTO');
const AuthService = require('./AuthService');

class AuthServiceImpl extends AuthService {
  static async signup({ name, email, password, file }) {
    try {
      console.log('Inside AuthServiceImpl.signup');
      console.log({ name, email, password });
      console.log('File path:', file?.path);

      const existing = await UserRepository.findByEmail(email);
      if (existing) throw new Error('Email already registered');

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await UserRepository.create({
        name,
        email,
        password: hashedPassword,
        profileImage: file?.path || '',
      });

      return new UserDTO(user);
    } catch (err) {
      console.error('Signup error:', err.message);
      throw new Error(err.message || 'Signup failed');
    }
  }

  static async login({ email, password }) {
    const user = await UserRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return { token, user: new UserDTO(user) };
  }

  static async forgotPassword(email) {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error('Email not registered');

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    const link = `http://localhost:3000/reset-password/${token}`;

    await UserRepository.setResetToken(email, token, Date.now() + 3600000);

    await transporter.sendMail({
      to: email,
      subject: 'Password Reset',
      html: `<p>Click to reset password: <a href="${link}">${link}</a></p>`,
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
