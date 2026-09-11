const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const { signToken } = require("../utils/jwt");
const { verifyGoogleIdToken } = require("../services/googleAuthService");

const SALT_ROUNDS = 10;

async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const existing = await userModel.findByEmail(email);
    if (existing) {
      return res.status(409).json({ success: false, message: "An account with this email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await userModel.createUserWithPassword({ name, email, passwordHash });

    const token = signToken({ sub: user.id, role: user.role });
    res.status(201).json({ success: true, token, user });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findByEmail(email);
    if (!user || !user.password_hash) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = signToken({ sub: user.id, role: user.role });
    res.status(200).json({ success: true, token, user: userModel.toPublicUser(user) });
  } catch (err) {
    next(err);
  }
}

async function googleAuth(req, res, next) {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ success: false, message: "idToken is required" });
    }

    const { googleId, email, name, avatarUrl } = await verifyGoogleIdToken(idToken);

    let user = await userModel.findByGoogleId(googleId);

    if (!user) {
      const existingByEmail = await userModel.findByEmail(email);

      if (existingByEmail) {
        // Existing password-based account with the same email: link Google to it.
        user = await userModel.linkGoogleAccount({ userId: existingByEmail.id, googleId, avatarUrl });
      } else {
        user = await userModel.createUserWithGoogle({ name, email, googleId, avatarUrl });
      }
    }

    const token = signToken({ sub: user.id, role: user.role });
    res.status(200).json({ success: true, token, user: userModel.toPublicUser(user) });
  } catch (err) {
    next(err);
  }
}

async function me(req, res) {
  // req.user is already loaded via findById, which only selects public columns
  res.status(200).json({ success: true, user: req.user });
}

module.exports = { signup, login, googleAuth, me };
