// API Tests - Authentication
const request = require('supertest');
const app = require('../../../source_code/backend/app/main');

describe('Authentication API', () => {
  describe('POST /api/auth/register', () => {
    test('should register user with valid data', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User'
        });
      
      expect(response.status).toBe(201);
    });

    test('should fail with duplicate email', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'existing@example.com',
          password: 'password123',
          name: 'Test User'
        });
      
      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/auth/login', () => {
    test('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    test('should fail with invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });
      
      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/auth/me', () => {
    test('should return current user', async () => {
      // Requires authentication token
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer token_here');
      
      expect(response.status).toBe(200);
    });
  });
});
