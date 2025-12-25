const router = require('express').Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  const items = await db.query(`SELECT * FROM items`);
  res.json(items.rows);
});

module.exports = router;