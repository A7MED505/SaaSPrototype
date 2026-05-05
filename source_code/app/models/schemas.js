const mongoose = require('mongoose');

// ── User ──────────────────────────────────────────────────────
const userSchema = new mongoose.Schema({
  name:       { type: String, required: true, minlength: 2, maxlength: 100 },
  email:      { type: String, required: true, unique: true, lowercase: true },
  password:   { type: String, required: true },
  isAdmin:    { type: Boolean, default: false },
}, { timestamps: true });

// ── Product ───────────────────────────────────────────────────
const productSchema = new mongoose.Schema({
  name:        { type: String, required: true, maxlength: 200 },
  description: { type: String, required: true },
  price:       { type: Number, required: true, min: 0 },
  category:    { type: String, required: true },
  image_url:   { type: String, default: null },
  stock:       { type: Number, default: 0, min: 0 },
  tags:        { type: [String], default: [] },
  rating:      { type: Number, default: 0 },
}, { timestamps: true });

// ── Cart ──────────────────────────────────────────────────────
const cartItemSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity:   { type: Number, required: true, min: 1 },
}, { _id: false });

const cartSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items:   { type: [cartItemSchema], default: [] },
}, { timestamps: true });

// ── Order ─────────────────────────────────────────────────────
const orderItemSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  name:       { type: String, required: true },
  price:      { type: Number, required: true },
  quantity:   { type: Number, required: true },
  subtotal:   { type: Number, required: true },
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items:   { type: [orderItemSchema], default: [] },
  total:   { type: Number, required: true },
  status:  { type: String, default: 'pending' },
}, { timestamps: true });

// ── Review ────────────────────────────────────────────────────
const reviewSchema = new mongoose.Schema({
  user_id:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  rating:     { type: Number, required: true, min: 1, max: 5 },
  comment:    { type: String, default: null },
}, { timestamps: true });

module.exports = {
  User:    mongoose.model('User',    userSchema),
  Product: mongoose.model('Product', productSchema),
  Cart:    mongoose.model('Cart',    cartSchema),
  Order:   mongoose.model('Order',   orderSchema),
  Review:  mongoose.model('Review',  reviewSchema),
};
