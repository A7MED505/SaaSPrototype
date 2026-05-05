const router = require('express').Router();
const { register, login, getCurrentUser } = require('../services/authService');

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ detail: 'All fields required' });
    const token = await register(name, email, password);
    res.json(token);
  } catch (e) {
    res.status(e.status || 500).json({ detail: e.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    // Support both JSON body and form-encoded (OAuth2 style: username field)
    const email = req.body.email || req.body.username;
    const { password } = req.body;
    if (!email || !password) return res.status(400).json({ detail: 'All fields required' });
    const token = await login(email, password);
    res.json(token);
  } catch (e) {
    res.status(e.status || 500).json({ detail: e.message });
  }
});

router.get('/me', async (req, res) => {
  try {
    const user = await getCurrentUser(req);
    res.json({ id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, created_at: user.createdAt });
  } catch (e) {
    res.status(e.status || 500).json({ detail: e.message });
  }
});

module.exports = router;
