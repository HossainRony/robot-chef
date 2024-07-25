const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { register, login, token, logout } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/token', token);
router.post('/logout', logout);

//Routes for 2FA
router.post('/setup-2fa', userController.setup2FA);
router.post('/verify-2fa-setup', userController.verify2FASetup);
router.post('/verify-otp', userController.verifyOTP);

module.exports = router;
