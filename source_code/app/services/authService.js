const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/schemas');

const SECRET_KEY = process.env.SECRET_KEY || 'change-this-secret';
const TOKEN_EXPIRY = '24h';

function createToken(userId, email, isAdmin = false) {
  return jwt.sign({ sub: userId, email, isAdmin }, SECRET_KEY, { expiresIn: TOKEN_EXPIRY });
}

async function register(name, email, password) {
  const existing = await User.findOne({ email });
  if (existing) throw { status: 400, message: 'Email already registered' };

  const hashed = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, password: hashed });
  return { access_token: createToken(user._id, user.email, user.isAdmin), token_type: 'bearer' };
}

async function login(email, password) {
  const user = await User.findOne({ email });
  if (!user) throw { status: 401, message: 'Invalid email or password' };

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw { status: 401, message: 'Invalid email or password' };

  return { access_token: createToken(user._id, user.email, user.isAdmin), token_type: 'bearer' };
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    throw { status: 401, message: 'Could not validate credentials' };
  }
}

async function getCurrentUser(req) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw { status: 401, message: 'Not authenticated' };
  }
  const token = authHeader.slice(7);
  const payload = verifyToken(token);
  const user = await User.findById(payload.sub).select('-password');
  if (!user) throw { status: 401, message: 'User not found' };
  return user;
}

module.exports = { register, login, getCurrentUser };
