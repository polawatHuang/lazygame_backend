require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/items', require('./routes/item.routes'));
app.use('/api/shop', require('./routes/shop.routes'));
app.use('/api/lazy', require('./routes/lazy.routes'));

// Health check endpoint
app.use('/api/status', require('./routes/status.routes'));

module.exports = app;
