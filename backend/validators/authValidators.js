const { body, validationResult } = require("express-validator");

const signupValidators = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ max: 120 }).withMessage("Name is too long"),
  body("email")
    .trim()
    .isEmail().withMessage("A valid email is required")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
];

const loginValidators = [
  body("email").trim().isEmail().withMessage("A valid email is required").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required")
];

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg }))
    });
  }
  next();
}

module.exports = { signupValidators, loginValidators, handleValidationErrors };
