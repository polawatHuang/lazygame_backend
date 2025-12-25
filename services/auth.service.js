const db = require('./../src/config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async ({ email, password, nickname }) => {
  const hash = await bcrypt.hash(password, 10);

  const user = await db.query(
    `INSERT INTO users (email, password_hash)
     VALUES ($1,$2) RETURNING id`,
    [email, hash]
  );

  await db.query(
    `INSERT INTO user_profiles (user_id, nickname)
     VALUES ($1,$2)`,
    [user.rows[0].id, nickname]
  );

  await db.query(
    `INSERT INTO user_currency (user_id)
     VALUES ($1)`,
    [user.rows[0].id]
  );

  return { success: true };
};

exports.login = async ({ email, password }) => {
  const result = await db.query(
    `SELECT * FROM users WHERE email=$1`,
    [email]
  );

  if (!result.rows.length)
    throw new Error('Invalid email or password');

  const user = result.rows[0];
  const valid = await bcrypt.compare(password, user.password_hash);

  if (!valid)
    throw new Error('Invalid email or password');

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { token };
};