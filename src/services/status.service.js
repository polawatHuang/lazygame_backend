const db = require('../config/db');

exports.getSystemStatus = async () => {
  let dbStatus = 'disconnected';
  let dbLatencyMs = null;

  const start = Date.now();

  try {
    await db.query('SELECT 1');
    dbStatus = 'connected';
    dbLatencyMs = Date.now() - start;

    console.log(
      `[STATUS] Database connected (${dbLatencyMs} ms)`
    );
  } catch (err) {
    dbLatencyMs = Date.now() - start;

    console.error(
      `[STATUS] Database connection FAILED (${dbLatencyMs} ms):`,
      err.message
    );
  }

  return {
    service: 'พักบ้างนะ API',
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: {
      status: dbStatus,
      latency_ms: dbLatencyMs
    },
    environment: process.env.NODE_ENV || 'development'
  };
};