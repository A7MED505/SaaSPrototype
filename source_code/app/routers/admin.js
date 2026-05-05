const router = require('express').Router();
const { getCurrentUser } = require('../services/authService');
const { User, Product, Order, Cart } = require('../models/schemas');

// Middleware: require admin
async function requireAdmin(req, res, next) {
  try {
    const user = await getCurrentUser(req);
    if (!user.isAdmin) return res.status(403).json({ detail: 'Admin access required' });
    req.adminUser = user;
    next();
  } catch (e) {
    res.status(e.status || 401).json({ detail: e.message });
  }
}

// GET /api/admin/stats
router.get('/stats', requireAdmin, async (req, res) => {
  try {
    const [totalUsers, totalProducts, totalOrders, revenueResult] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([{ $group: { _id: null, total: { $sum: '$total' } } }]),
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;
    res.json({ totalUsers, totalProducts, totalOrders, totalRevenue });
  } catch (e) {
    res.status(500).json({ detail: e.message });
  }
});

// GET /api/admin/users
router.get('/users', requireAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (e) {
    res.status(500).json({ detail: e.message });
  }
});

// PATCH /api/admin/users/:id/toggle-admin
router.patch('/users/:id/toggle-admin', requireAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ detail: 'User not found' });
    user.isAdmin = !user.isAdmin;
    await user.save();
    res.json({ id: user._id, name: user.name, isAdmin: user.isAdmin });
  } catch (e) {
    res.status(500).json({ detail: e.message });
  }
});

// GET /api/admin/products
router.get('/products', requireAdmin, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (e) {
    res.status(500).json({ detail: e.message });
  }
});

// POST /api/admin/products
router.post('/products', requireAdmin, async (req, res) => {
  try {
    const { name, description, price, category, image_url, stock, tags } = req.body;
    if (!name || !description || price == null || !category) {
      return res.status(400).json({ detail: 'name, description, price, category are required' });
    }
    const product = await Product.create({ name, description, price, category, image_url, stock: stock || 0, tags: tags || [] });
    res.status(201).json(product);
  } catch (e) {
    res.status(500).json({ detail: e.message });
  }
});

// PUT /api/admin/products/:id
router.put('/products/:id', requireAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ detail: 'Product not found' });
    res.json(product);
  } catch (e) {
    res.status(500).json({ detail: e.message });
  }
});

// DELETE /api/admin/products/:id
router.delete('/products/:id', requireAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ detail: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (e) {
    res.status(500).json({ detail: e.message });
  }
});

module.exports = router;
