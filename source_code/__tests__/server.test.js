const request = require('supertest');
const express = require('express');

// Test basic server setup
describe('Server Setup', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    
    // Basic health check route
    app.get('/health', (req, res) => {
      res.json({ status: 'ok' });
    });
  });

  test('should respond with health status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);
    
    expect(response.body.status).toBe('ok');
  });

  test('should return 404 for unknown routes', async () => {
    const response = await request(app)
      .get('/unknown')
      .expect(404);
  });

  test('should parse JSON', async () => {
    app.post('/test', (req, res) => {
      res.json(req.body);
    });

    const response = await request(app)
      .post('/test')
      .send({ test: 'data' })
      .expect(200);

    expect(response.body.test).toBe('data');
  });
});
