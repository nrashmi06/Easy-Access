const express = require('express');
const router = express.Router();
const AuthController = require('../controller/AuthController');
const upload = require('../middleware/upload'); // ✅ Use this

router.post('/signup', upload.single('profile'), AuthController.signup); 

// Other routes
router.post('/login', AuthController.login);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);
router.get('/verify-email/:token', AuthController.verifyEmail);
router.post('/refresh-token', AuthController.refreshToken);
router.post('/resend-verification', AuthController.resendVerification);

module.exports = router;
