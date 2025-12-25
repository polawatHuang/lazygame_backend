const db = require('./../src/config/db');

exports.getProfile = async (userId) => {
  const result = await db.query(`
    SELECT 
      p.nickname,
      p.level,
      p.lazy_rank,
      c.lazy_score,
      c.chill_points
    FROM user_profiles p
    JOIN user_currency c ON p.user_id = c.user_id
    WHERE p.user_id=$1
  `, [userId]);

  return result.rows[0];
};