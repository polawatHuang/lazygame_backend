module.exports = [
  {
    name: 'Auth',
    endpoints: [
      { method: 'POST', path: '/api/auth/register', auth: false },
      { method: 'POST', path: '/api/auth/login', auth: false }
    ]
  },
  {
    name: 'User',
    endpoints: [
      { method: 'GET', path: '/api/user/me', auth: true }
    ]
  },
  {
    name: 'Shop',
    endpoints: [
      { method: 'GET', path: '/api/shop', auth: true },
      { method: 'POST', path: '/api/shop/buy', auth: true }
    ]
  },
  {
    name: 'Lazy',
    endpoints: [
      { method: 'POST', path: '/api/lazy/add', auth: true }
    ]
  },
  {
    name: 'System',
    endpoints: [
      { method: 'GET', path: '/api/status', auth: false }
    ]
  }
];