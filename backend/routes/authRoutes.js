const express = require("express");
const authController = require("../controllers/authController");
const { requireAuth } = require("../middleware/authMiddleware");
const {
  signupValidators,
  loginValidators,
  handleValidationErrors
} = require("../validators/authValidators");

const router = express.Router();

router.post("/signup", signupValidators, handleValidationErrors, authController.signup);
router.post("/login", loginValidators, handleValidationErrors, authController.login);
router.get("/me", requireAuth, authController.me);

module.exports = router;
