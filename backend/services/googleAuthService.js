const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verifyGoogleIdToken(idToken) {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID
  });

  const payload = ticket.getPayload();
  if (!payload || !payload.email_verified) {
    const err = new Error("Google account email is not verified");
    err.statusCode = 401;
    throw err;
  }

  return {
    googleId: payload.sub,
    email: payload.email,
    name: payload.name || payload.email.split("@")[0],
    avatarUrl: payload.picture || null
  };
}

module.exports = { verifyGoogleIdToken };
