const express = require("express");
const authController = require("../controllers/authController");
const { requireAuth } = require("../middleware/authMiddleware");
const { authRateLimiter } = require("../middleware/rateLimiters");
const {
  signupValidators,
  loginValidators,
  handleValidationErrors
} = require("../validators/authValidators");

const router = express.Router();

router.post("/signup", authRateLimiter, signupValidators, handleValidationErrors, authController.signup);
router.post("/login", authRateLimiter, loginValidators, handleValidationErrors, authController.login);
router.post("/google", authRateLimiter, authController.googleAuth);
router.get("/me", requireAuth, authController.me);

module.exports = router;
