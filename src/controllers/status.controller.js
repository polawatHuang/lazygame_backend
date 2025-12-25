const statusService = require('../services/status.service');

exports.getStatus = async (req, res) => {
  try {
    const status = await statusService.getSystemStatus();

    res.json({
      success: true,
      ...status
    });
  } catch (err) {
    console.error('[STATUS] Unexpected error:', err.message);

    res.status(500).json({
      success: false,
      message: 'Service unavailable'
    });
  }
};