const { Order, Product } = require('../models/schemas');

async function getRecommendations(userId, limit = 6) {
  // Gather categories from past orders
  const orders = await Order.find({ user_id: userId }).lean();
  const boughtIds = new Set();
  const categoryCount = {};

  for (const order of orders) {
    for (const item of order.items) {
      boughtIds.add(item.product_id.toString());
    }
  }

  for (const pid of boughtIds) {
    const product = await Product.findById(pid).lean().catch(() => null);
    if (product) {
      categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
    }
  }

  const query = {};
  if (Object.keys(categoryCount).length) {
    const topCategories = Object.entries(categoryCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([cat]) => cat);
    query.category = { $in: topCategories };
  }

  if (boughtIds.size) {
    query._id = { $nin: [...boughtIds] };
  }

  let products = await Product.find(query).sort({ rating: -1 }).limit(limit).lean();

  // Fallback: fill with globally top-rated
  if (products.length < limit) {
    const seenIds = products.map(p => p._id.toString());
    const fallback = await Product.find({ _id: { $nin: seenIds } })
      .sort({ rating: -1 })
      .limit(limit - products.length)
      .lean();
    products = [...products, ...fallback];
  }

  return products.map(p => ({
    id: p._id.toString(),
    name: p.name,
    price: p.price,
    category: p.category,
    image_url: p.image_url,
    rating: p.rating || 0,
  }));
}

module.exports = { getRecommendations };
