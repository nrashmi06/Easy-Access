const AuthService = require('../service/AuthServiceImpl');
const { successResponse, errorResponse } = require('../utils/apiResponse');

module.exports = {
signup: async (req, res) => {
  try {
    // Check for required profile image file
    if (!req.file) {
      return res.status(400).json(errorResponse({
        message: 'No profile image uploaded',
        path: req.originalUrl,
        status: 400
      }));
    }

    // Call AuthService with form data and uploaded file
    const result = await AuthService.signup({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      file: req.file,
    });

    return res.status(201).json(successResponse({
      message: 'Signup successful. Please verify your email to activate your account.',
      data: result,
      path: req.originalUrl,
      status: 201
    }));
  } catch (e) {
    console.error('Signup error:', e); // Use full error for better debugging
    return res.status(500).json(errorResponse({
      message: 'Signup failed',
      error: e.message,
      path: req.originalUrl,
      status: 500
    }));
  }
},

  login: async (req, res) => {
    try {
      const { accessToken, refreshToken, user } = await AuthService.login(req.body);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      console.log('Setting refreshToken cookie:', refreshToken);


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
    console.log("the value of req.cookies:", req.cookies);
    const refreshToken = req.cookies.refreshToken;

    console.log('[RefreshToken] Received refresh token:', refreshToken ? 'Present' : 'Missing');

    const tokens = await AuthService.refreshToken(refreshToken);

    console.log('[RefreshToken] New access token generated:', tokens.accessToken);
    console.log('[RefreshToken] New refresh token set in cookie');

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json(successResponse({
      message: 'Token refreshed successfully',
      data: { accessToken: tokens.accessToken },
      path: req.originalUrl,
    }));

  } catch (e) {
    console.error('[RefreshToken] Error:', e.message);

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
},

logout: async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json(errorResponse({
        message: 'Unauthorized: No token provided',
        path: req.originalUrl,
        status: 401
      }));
    }

    const accessToken = authHeader.split(' ')[1];
    await AuthService.logout(accessToken);

    res.clearCookie('refreshToken');

    return res.json(successResponse({
      message: 'Logout successful',
      path: req.originalUrl
    }));
  } catch (e) {
    const isAuthError = e.message?.toLowerCase().includes("jwt") || e.message?.toLowerCase().includes("token");
    return res.status(isAuthError ? 401 : 400).json(errorResponse({
      message: 'Logout failed',
      error: e.message,
      path: req.originalUrl,
      status: isAuthError ? 401 : 400
    }));
  }
}


};
