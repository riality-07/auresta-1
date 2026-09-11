const { verifyToken } = require("../utils/jwt");
const userModel = require("../models/userModel");

async function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ success: false, message: "Authentication required" });
  }

  try {
    const payload = verifyToken(token);
    const user = await userModel.findById(payload.sub);
    if (!user) {
      return res.status(401).json({ success: false, message: "User no longer exists" });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}

module.exports = { requireAuth };
