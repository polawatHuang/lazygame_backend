const db = require('../config/db');

exports.getAllItems = async () => {
  const result = await db.query(`
    SELECT i.*, c.name AS category
    FROM items i
    JOIN item_categories c ON i.category_id = c.id
  `);

  return result.rows;
};