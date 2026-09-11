const { query } = require("../config/db");

const PUBLIC_COLUMNS = "id, name, email, avatar_url, role, created_at";

async function createUserWithPassword({ name, email, passwordHash }) {
  const result = await query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING ${PUBLIC_COLUMNS}`,
    [name, email, passwordHash]
  );
  return result.rows[0];
}

async function createUserWithGoogle({ name, email, googleId, avatarUrl }) {
  const result = await query(
    `INSERT INTO users (name, email, google_id, avatar_url)
     VALUES ($1, $2, $3, $4)
     RETURNING ${PUBLIC_COLUMNS}`,
    [name, email, googleId, avatarUrl]
  );
  return result.rows[0];
}

async function findByEmail(email) {
  const result = await query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0] || null;
}

async function findByGoogleId(googleId) {
  const result = await query("SELECT * FROM users WHERE google_id = $1", [googleId]);
  return result.rows[0] || null;
}

async function findById(id) {
  const result = await query(`SELECT ${PUBLIC_COLUMNS} FROM users WHERE id = $1`, [id]);
  return result.rows[0] || null;
}

async function linkGoogleAccount({ userId, googleId, avatarUrl }) {
  const result = await query(
    `UPDATE users SET google_id = $2, avatar_url = COALESCE(avatar_url, $3), updated_at = now()
     WHERE id = $1
     RETURNING ${PUBLIC_COLUMNS}`,
    [userId, googleId, avatarUrl]
  );
  return result.rows[0];
}

function toPublicUser(user) {
  if (!user) return null;
  const { password_hash, google_id, ...publicUser } = user;
  return publicUser;
}

module.exports = {
  createUserWithPassword,
  createUserWithGoogle,
  findByEmail,
  findByGoogleId,
  findById,
  linkGoogleAccount,
  toPublicUser
};
