const rateLimit = require("express-rate-limit");

// Auth endpoints are the most likely brute-force / credential-stuffing target.
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many attempts. Please try again later." }
});

module.exports = { authRateLimiter };
