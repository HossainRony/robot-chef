const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { register, login, token, logout } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/token', token);
router.post('/logout', logout);

module.exports = router;
