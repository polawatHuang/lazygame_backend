const express = require('express');
const router = express.Router();
const db = require('../../src/config/db');
const auth = require('../middlewares/auth.middleware');

router.get('/me', auth, async (req, res) => {
  const user = await db.query(`
    SELECT u.id, p.nickname, c.lazy_score, p.lazy_rank
    FROM users u
    JOIN user_profiles p ON u.id=p.user_id
    JOIN user_currency c ON u.id=c.user_id
    WHERE u.id=$1
  `, [req.userId]);

  res.json(user.rows[0]);
});

module.exports = router;