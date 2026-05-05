require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./database');

const authRouter = require('./routers/auth');
const productsRouter = require('./routers/products');
const cartRouter = require('./routers/cart');
const recommendationsRouter = require('./routers/recommendations');
const adminRouter = require('./routers/admin');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/recommendations', recommendationsRouter);
app.use('/api/admin', adminRouter);

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'static')));

// Fallback to index.html for all non-API routes
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

async function start() {
  await connectDB();
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
