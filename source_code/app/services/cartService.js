const mongoose = require('mongoose');
const { Cart, Product, Order } = require('../models/schemas');

async function getCart(userId) {
  const cart = await Cart.findOne({ user_id: userId }).lean();
  if (!cart || !cart.items.length) return { user_id: userId, items: [], total: 0 };
  return buildCartOut(userId, cart.items);
}

async function addToCart(userId, productId, quantity) {
  const product = await Product.findById(productId).catch(() => null);
  if (!product) throw { status: 404, message: 'Product not found' };

  let cart = await Cart.findOne({ user_id: userId });
  if (cart) {
    const existing = cart.items.find(i => i.product_id.toString() === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ product_id: productId, quantity });
    }
    await cart.save();
  } else {
    cart = await Cart.create({ user_id: userId, items: [{ product_id: productId, quantity }] });
  }

  const updated = await Cart.findOne({ user_id: userId }).lean();
  return buildCartOut(userId, updated.items);
}

async function removeFromCart(userId, productId) {
  const cart = await Cart.findOne({ user_id: userId });
  if (!cart) throw { status: 404, message: 'Cart not found' };
  cart.items = cart.items.filter(i => i.product_id.toString() !== productId);
  await cart.save();
  return buildCartOut(userId, cart.items);
}

async function checkout(userId) {
  const cart = await Cart.findOne({ user_id: userId }).lean();
  if (!cart || !cart.items.length) throw { status: 400, message: 'Cart is empty' };

  const cartOut = await buildCartOut(userId, cart.items);
  const order = await Order.create({
    user_id: userId,
    items: cartOut.items,
    total: cartOut.total,
    status: 'pending',
  });
  await Cart.deleteOne({ user_id: userId });
  return { order_id: order._id.toString(), total: cartOut.total, status: 'pending' };
}

async function buildCartOut(userId, items) {
  let total = 0;
  const cartItems = [];
  for (const item of items) {
    const product = await Product.findById(item.product_id).lean().catch(() => null);
    if (!product) continue;
    const subtotal = product.price * item.quantity;
    total += subtotal;
    cartItems.push({
      product_id: item.product_id.toString(),
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      subtotal: Math.round(subtotal * 100) / 100,
    });
  }
  return { user_id: userId.toString(), items: cartItems, total: Math.round(total * 100) / 100 };
}

module.exports = { getCart, addToCart, removeFromCart, checkout };
