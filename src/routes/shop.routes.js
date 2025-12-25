const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const controller = require('../controllers/shop.controller');

router.get('/', auth, controller.getShopItems);
router.post('/buy', auth, controller.buyItem);

module.exports = router;
