const db = require('../config/db');

exports.getShopItems = async () => {
  const { rows } = await db.query(`
    SELECT
      id,
      name,
      description,
      price,
      lazy_score,
      category,
      rarity
    FROM shop_items
    WHERE is_active = true
    ORDER BY rarity DESC, price ASC
  `);

  return rows;
};

exports.buyItem = async (userId, itemId) => {
  const client = await db.connect();

  try {
    await client.query('BEGIN');

    // 1️⃣ Get item
    const itemResult = await client.query(
      `SELECT * FROM shop_items WHERE id = $1 AND is_active = true`,
      [itemId]
    );

    if (itemResult.rowCount === 0)
      throw new Error('ITEM_NOT_FOUND');

    const item = itemResult.rows[0];

    // 2️⃣ Check user points
    const userResult = await client.query(
      `SELECT chill_points FROM users WHERE id = $1`,
      [userId]
    );

    const user = userResult.rows[0];

    if (user.chill_points < item.price)
      throw new Error('INSUFFICIENT_POINTS');

    // 3️⃣ Deduct points
    await client.query(
      `UPDATE users
       SET chill_points = chill_points - $1
       WHERE id = $2`,
      [item.price, userId]
    );

    // 4️⃣ Add item to inventory
    await client.query(
      `INSERT INTO user_items (user_id, item_id)
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [userId, itemId]
    );

    // 5️⃣ Add lazy score
    await client.query(
      `UPDATE users
       SET lazy_score = lazy_score + $1
       WHERE id = $2`,
      [item.lazy_score, userId]
    );

    await client.query('COMMIT');

    return {
      itemId: item.id,
      itemName: item.name,
      lazyScoreGained: item.lazy_score
    };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};
