const AuthService = require('../service/AuthServiceImpl');
const { successResponse, errorResponse } = require('../utils/apiResponse');

module.exports = {
  signup: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json(errorResponse({
          message: 'No file uploaded',
          path: req.originalUrl,
          status: 400
        }));
      }

      const user = await AuthService.signup({
        ...req.body,
        file: req.file,
      });

      res.status(201).json(successResponse({
        message: 'Signup successful. Please verify your email to activate your account.',
        data: user,
        path: req.originalUrl,
        status: 201,
      }));
    } catch (e) {
      res.status(500).json(errorResponse({
        message: 'Signup failed',
        error: e.message,
        path: req.originalUrl
      }));
    }
  },

  login: async (req, res) => {
    try {
      const { accessToken, refreshToken, user } = await AuthService.login(req.body);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json(successResponse({
        message: 'Login successful',
        data: { accessToken, user },
        path: req.originalUrl
      }));
    } catch (e) {
      res.status(401).json(errorResponse({
        message: 'Login failed',
        error: e.message,
        path: req.originalUrl,
        status: 401
      }));
    }
  },

  forgotPassword: async (req, res) => {
    try {
      await AuthService.forgotPassword(req.body.email);
      res.json(successResponse({
        message: 'Reset link sent to email',
        path: req.originalUrl
      }));
    } catch (e) {
      res.status(400).json(errorResponse({
        message: 'Forgot password failed',
        error: e.message,
        path: req.originalUrl,
        status: 400
      }));
    }
  },

  resetPassword: async (req, res) => {
    try {
      await AuthService.resetPassword(req.body.token, req.body.newPassword);
      res.json(successResponse({
        message: 'Password updated successfully',
        path: req.originalUrl
      }));
    } catch (e) {
      res.status(400).json(errorResponse({
        message: 'Reset password failed',
        error: e.message,
        path: req.originalUrl,
        status: 400
      }));
    }
  },

  verifyEmail: async (req, res) => {
    try {
      const { token } = req.params;
      const result = await AuthService.verifyEmail(token);
      res.send(`<h2>${result.message}</h2><p>You can now close this tab and log in.</p>`);
    } catch (e) {
      res.status(400).send(`<h3>Email verification failed: ${e.message}</h3>`);
    }
  },

  refreshToken: async (req, res) => {
    try {
      const { refreshToken } = req.cookies;
      const tokens = await AuthService.refreshToken(refreshToken);
      res.json(successResponse({
        message: 'Token refreshed successfully',
        data: tokens,
        path: req.originalUrl
      }));
    } catch (e) {
      res.status(401).json(errorResponse({
        message: 'Refresh token failed',
        error: e.message,
        path: req.originalUrl,
        status: 401
      }));
    }
  },

resendVerification: async (req, res) => {
  try {
    const { email } = req.body;
    const result = await AuthService.resendVerification(email);

    return res.status(200).json(
      successResponse({
        message: result.message,
        path: req.originalUrl,
        status: 200,
      })
    );
  } catch (e) {
    return res.status(400).json(
      errorResponse({
        message: 'Could not resend verification email',
        error: e.message,
        path: req.originalUrl,
        status: 400,
      })
    );
  }
}

};
