const express = require('express');
const router = express.Router();
const db = require('../../src/config/db');
const auth = require('../middlewares/auth.middleware');

router.post('/add', auth, async (req, res) => {
  const { score, source } = req.body;

  await db.query(
    `UPDATE user_currency
     SET lazy_score = lazy_score + $1
     WHERE user_id=$2`,
    [score, req.userId]
  );

  await db.query(
    `INSERT INTO lazy_score_logs (user_id, source, score)
     VALUES ($1,$2,$3)`,
    [req.userId, source, score]
  );

  res.json({ success: true });
});

module.exports = router;