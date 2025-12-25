const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../src/config/db');

router.post('/register', async (req, res) => {
  const { email, password, nickname } = req.body;
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

  res.json({ message: 'registered' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const result = await db.query(
    `SELECT * FROM users WHERE email=$1`,
    [email]
  );

  if (!result.rows.length)
    return res.status(401).json({ message: 'invalid' });

  const valid = await bcrypt.compare(
    password,
    result.rows[0].password_hash
  );

  if (!valid)
    return res.status(401).json({ message: 'invalid' });

  const token = jwt.sign(
    { userId: result.rows[0].id },
    process.env.JWT_SECRET
  );

  res.json({ token });
});

module.exports = router;