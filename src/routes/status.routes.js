const db = require('../../src/config/db');
const apiRegistry = require('../../utils/apiRegistry');

exports.getSystemStatus = async () => {
  let dbStatus = 'disconnected';
  let dbLatencyMs = null;

  const start = Date.now();

  try {
    await db.query('SELECT 1');
    dbStatus = 'connected';
    dbLatencyMs = Date.now() - start;

    console.log(`[STATUS] Database connected (${dbLatencyMs} ms)`);
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
    environment: process.env.NODE_ENV || 'development',
    endpoints: apiRegistry.map(group => ({
      name: group.name,
      status: 'enabled',
      endpoints: group.endpoints.map(e => ({
        method: e.method,
        path: e.path,
        auth_required: e.auth,
        status: 'enabled'
      }))
    }))
  };
};
