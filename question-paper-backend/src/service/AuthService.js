// src/service/AuthService.js

class AuthService {
  static async signup(userData) {
    throw new Error('Not implemented');
  }

  static async login(loginData) {
    throw new Error('Not implemented');
  }

  static async forgotPassword(email) {
    throw new Error('Not implemented');
  }

  static async resetPassword(token, newPassword) {
    throw new Error('Not implemented');
  }
}

module.exports = AuthService;
