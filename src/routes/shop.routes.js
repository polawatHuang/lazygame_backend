router.get('/packages', async (req, res) => {
  const data = await db.query(`SELECT * FROM shop_packages`);
  res.json(data.rows);
});
