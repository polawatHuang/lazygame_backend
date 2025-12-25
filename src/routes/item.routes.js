const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  const items = await db.query(`SELECT * FROM items`);
  res.json(items.rows);
});

module.exports = router;