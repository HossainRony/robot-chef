const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  register,
  login,
  token,
  logout,
  setup2FA,
  verify2FASetup,
  verifyOTP,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/token", token);
router.post("/logout", logout);

//Routes for 2FA
router.post("/setup-2fa", setup2FA);
router.post("/verify-2fa-setup", verify2FASetup);
router.post("/verify-otp", verifyOTP);

module.exports = router;
