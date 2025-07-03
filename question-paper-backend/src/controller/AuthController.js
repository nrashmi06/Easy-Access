// src/controller/AuthController.js
const AuthService = require('../service/AuthServiceImpl');

module.exports = {
  signup: async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const user = await AuthService.signup({
      ...req.body,
      file: req.file,
    });

    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({
      error: e.message,
      stack: e.stack,
      debug: {
        body: req.body,
        file: req.file,
      },
    });
  }
},


  login: async (req, res) => {
    try {
      const result = await AuthService.login(req.body);
      res.json(result);
    } catch (e) {
      res.status(401).json({ error: e.message });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      await AuthService.forgotPassword(req.body.email);
      res.json({ message: 'Reset link sent to email' });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  resetPassword: async (req, res) => {
    try {
      await AuthService.resetPassword(req.body.token, req.body.newPassword);
      res.json({ message: 'Password updated successfully' });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
};
