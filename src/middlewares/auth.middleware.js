const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader)
      return res.status(401).json({
        success: false,
        message: 'Authorization header missing'
      });

    // Expected: Bearer <token>
    const token = authHeader.split(' ')[1];

    if (!token)
      return res.status(401).json({
        success: false,
        message: 'Token missing'
      });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach userId for controller & service usage
    req.userId = decoded.userId;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};