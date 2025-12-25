const itemService = require('../services/item.service');

exports.getItems = async (req, res) => {
  const items = await itemService.getAllItems();
  res.json(items);
};