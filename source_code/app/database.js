const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DATABASE_NAME = process.env.DATABASE_NAME || 'firstsaas';

async function connectDB() {
  const url = `${MONGO_URL}${DATABASE_NAME}?ssl=true&authSource=admin`;
  await mongoose.connect(url);
  console.log(`Connected to MongoDB: ${DATABASE_NAME}`);
}

module.exports = { connectDB };
