const lazyService = require('../services/lazy.service');

exports.addLazyScore = async (req, res) => {
  const { score, source } = req.body;

  const result = await lazyService.addScore(
    req.userId,
    score,
    source
  );

  res.json(result);
};
