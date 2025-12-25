const userService = require('../services/user.service');

exports.getMe = async (req, res) => {
  const profile = await userService.getProfile(req.userId);
  res.json(profile);
};