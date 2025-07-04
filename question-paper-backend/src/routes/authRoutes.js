const express = require('express');
const router = express.Router();
const AuthController = require('../controller/AuthController');
const upload = require('../middleware/upload');

// Signup (with file upload for profile picture)
router.post('/signup', upload.single('profile'), AuthController.signup);

// Login (returns access + refresh tokens)
router.post('/login', AuthController.login);

// Forgot password
router.post('/forgot-password', AuthController.forgotPassword);

// Reset password
router.post('/reset-password', AuthController.resetPassword);

// Email verification link handler
router.get('/verify-email/:token', AuthController.verifyEmail);

// Refresh access token using refresh token
router.post('/refresh-token', AuthController.refreshToken);

// ✅ Add this: Resend verification email
router.post('/resend-verification', AuthController.resendVerification);

module.exports = router;
