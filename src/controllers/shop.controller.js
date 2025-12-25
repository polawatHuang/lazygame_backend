const shopService = require('../services/shop.service');
const response = require('../../utils/response');

exports.getShopItems = async (req, res) => {
  try {
    const items = await shopService.getShopItems();
    return response.success(res, items);
  } catch (err) {
    console.error('[SHOP] Get items error:', err.message);
    return response.error(res, 'Failed to load shop items', 500);
  }
};

exports.buyItem = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.body;

    if (!itemId)
      return response.error(res, 'itemId is required', 400);

    const result = await shopService.buyItem(userId, itemId);

    return response.success(res, {
      message: 'Item purchased successfully',
      ...result
    });
  } catch (err) {
    console.error('[SHOP] Buy item error:', err.message);

    if (err.message === 'ITEM_NOT_FOUND')
      return response.error(res, 'Item not found', 404);

    if (err.message === 'INSUFFICIENT_POINTS')
      return response.error(res, 'Not enough chill points', 400);

    return response.error(res, 'Purchase failed', 500);
  }
};