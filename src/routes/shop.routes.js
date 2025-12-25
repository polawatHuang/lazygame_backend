const express = require('express');
const router = express.Router();

router.get('/packages', async (req, res) => {
  const data = await db.query(`SELECT * FROM shop_packages`);
  res.json(data.rows);
});

module.exports = router;