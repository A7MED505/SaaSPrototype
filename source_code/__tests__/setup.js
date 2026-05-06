// Jest setup file
process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = 'mongodb://localhost:27017/firstsaas-test';

// Dummy test to prevent Jest error
describe('Setup', () => {
  it('should initialize', () => {
    expect(true).toBe(true);
  });
});
