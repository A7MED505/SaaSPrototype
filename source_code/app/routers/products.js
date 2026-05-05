const router = require('express').Router();
const { getAllProducts, getProductById, createProduct, getCategories } = require('../services/productService');
const { getCurrentUser } = require('../services/authService');

router.get('/', async (req, res) => {
  try {
    const { category, search, skip, limit } = req.query;
    const products = await getAllProducts({ category, search, skip, limit });
    res.json(products);
  } catch (e) {
    res.status(e.status || 500).json({ detail: e.message });
  }
});

router.get('/categories', async (req, res) => {
  try {
    res.json(await getCategories());
  } catch (e) {
    res.status(500).json({ detail: e.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    res.json(await getProductById(req.params.id));
  } catch (e) {
    res.status(e.status || 500).json({ detail: e.message });
  }
});

router.post('/', async (req, res) => {
  try {
    await getCurrentUser(req);
    res.status(201).json(await createProduct(req.body));
  } catch (e) {
    res.status(e.status || 500).json({ detail: e.message });
  }
});

module.exports = router;
