const router = require('express').Router();
const { getCart, addToCart, removeFromCart, checkout } = require('../services/cartService');
const { getCurrentUser } = require('../services/authService');

router.get('/', async (req, res) => {
  try {
    const user = await getCurrentUser(req);
    res.json(await getCart(user._id));
  } catch (e) {
    res.status(e.status || 500).json({ detail: e.message });
  }
});

router.post('/add', async (req, res) => {
  try {
    const user = await getCurrentUser(req);
    const { product_id, quantity } = req.body;
    if (!product_id || !quantity) return res.status(400).json({ detail: 'product_id and quantity required' });
    res.json(await addToCart(user._id, product_id, quantity));
  } catch (e) {
    res.status(e.status || 500).json({ detail: e.message });
  }
});

router.delete('/:product_id', async (req, res) => {
  try {
    const user = await getCurrentUser(req);
    res.json(await removeFromCart(user._id, req.params.product_id));
  } catch (e) {
    res.status(e.status || 500).json({ detail: e.message });
  }
});

router.post('/checkout', async (req, res) => {
  try {
    const user = await getCurrentUser(req);
    res.json(await checkout(user._id));
  } catch (e) {
    res.status(e.status || 500).json({ detail: e.message });
  }
});

module.exports = router;
