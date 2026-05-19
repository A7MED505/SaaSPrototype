module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/firstsaas',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
};
