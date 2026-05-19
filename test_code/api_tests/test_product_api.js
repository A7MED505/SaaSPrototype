// API Tests - Products
const request = require('supertest');
const app = require('../../../source_code/backend/app/main');

describe('Products API', () => {
  describe('GET /api/products', () => {
    test('should return all products', async () => {
      const response = await request(app)
        .get('/api/products');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    test('should filter products by category', async () => {
      const response = await request(app)
        .get('/api/products?category=electronics');
      
      expect(response.status).toBe(200);
    });
  });

  describe('GET /api/products/:id', () => {
    test('should return product details', async () => {
      const response = await request(app)
        .get('/api/products/productId123');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('price');
    });

    test('should return 404 for non-existent product', async () => {
      const response = await request(app)
        .get('/api/products/invalidId');
      
      expect(response.status).toBe(404);
    });
  });

  describe('POST /api/products', () => {
    test('should create new product (admin only)', async () => {
      const response = await request(app)
        .post('/api/products')
        .set('Authorization', 'Bearer admin_token')
        .send({
          name: 'New Product',
          price: 99.99,
          description: 'Product description'
        });
      
      expect(response.status).toBe(201);
    });
  });
});
