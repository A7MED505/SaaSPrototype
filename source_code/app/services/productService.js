const { Product } = require('../models/schemas');

async function getAllProducts({ category, search, skip = 0, limit = 20 }) {
  const query = {};
  if (category) query.category = category;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }
  const products = await Product.find(query).skip(Number(skip)).limit(Number(limit)).lean();
  return products.map(serialize);
}

async function getProductById(id) {
  const product = await Product.findById(id).lean().catch(() => null);
  if (!product) throw { status: 404, message: 'Product not found' };
  return serialize(product);
}

async function createProduct(data) {
  const product = await Product.create(data);
  return serialize(product.toObject());
}

async function getCategories() {
  return Product.distinct('category');
}

function serialize(p) {
  const { _id, __v, ...rest } = p;
  return { id: _id.toString(), ...rest };
}

module.exports = { getAllProducts, getProductById, createProduct, getCategories };
