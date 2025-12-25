const db = require('../config/db');
const rankUtil = require('../utils/lazyRank');

exports.addScore = async (userId, score, source) => {
  await db.query(
    `UPDATE user_currency
     SET lazy_score = lazy_score + $1
     WHERE user_id=$2`,
    [score, userId]
  );

  await db.query(
    `INSERT INTO lazy_score_logs (user_id, source, score)
     VALUES ($1,$2,$3)`,
    [userId, source, score]
  );

  const total = await db.query(
    `SELECT lazy_score FROM user_currency WHERE user_id=$1`,
    [userId]
  );

  const rank = rankUtil.calculateRank(total.rows[0].lazy_score);

  await db.query(
    `UPDATE user_profiles SET lazy_rank=$1 WHERE user_id=$2`,
    [rank, userId]
  );

  return {
    lazyScore: total.rows[0].lazy_score,
    lazyRank: rank
  };
};