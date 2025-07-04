// src/service/AuthService.js

class AuthService {
  static async signup(userData) {
    throw new Error('signup method not implemented');
  }

  static async login(loginData) {
    throw new Error('login method not implemented');
  }

  static async forgotPassword(email) {
    throw new Error('forgotPassword method not implemented');
  }

  static async resetPassword(token, newPassword) {
    throw new Error('resetPassword method not implemented');
  }

  static async verifyEmail(token) {
    throw new Error('verifyEmail method not implemented');
  }

  static async refreshToken(refreshToken) {
    throw new Error('refreshToken method not implemented');
  }

  static async resendVerification(email) {
    throw new Error('resendVerification method not implemented');
  }
}

module.exports = AuthService;
