const router = require('express').Router();
const { getRecommendations } = require('../services/recommendationService');
const { getCurrentUser } = require('../services/authService');

router.get('/', async (req, res) => {
  try {
    const user = await getCurrentUser(req);
    const limit = Math.min(parseInt(req.query.limit) || 6, 20);
    res.json(await getRecommendations(user._id, limit));
  } catch (e) {
    res.status(e.status || 500).json({ detail: e.message });
  }
});

module.exports = router;
