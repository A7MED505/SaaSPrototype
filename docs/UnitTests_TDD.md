# Unit Tests & TDD
## Purpose and Structure

### Test-Driven Development (TDD) Approach

Our project uses TDD to ensure code quality and reliability:

1. **Write Test First**: Define test cases before implementing features
2. **Implement Feature**: Write minimal code to pass tests
3. **Refactor**: Optimize code while tests remain passing

### Unit Test Files

#### Backend Unit Tests
- `test_user_service.js` - User service logic
- `test_product_service.js` - Product service logic
- `test_cart_service.js` - Cart management

#### Test Examples
```javascript
// Service Layer Test
describe('UserService', () => {
  test('should create user with valid data', async () => {
    const user = await UserService.createUser({
      email: 'test@example.com',
      password: 'pass123',
      name: 'Test User'
    });
    
    expect(user).toHaveProperty('id');
    expect(user.email).toBe('test@example.com');
  });
});
```

#### Running Tests
```bash
# All tests
npm test

# Specific test file
npm test test_user_service.js

# With coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

### Test Coverage Goals

- **Critical Paths**: 100% coverage
- **Services**: 85%+ coverage
- **Controllers**: 80%+ coverage
- **Overall**: 75%+ coverage

### Test Fixtures and Mocks

Example of test data setup:
```javascript
const mockUser = {
  id: 'user_001',
  email: 'test@example.com',
  name: 'Test User',
  password: 'hashed_password'
};
```

---

Last Updated: 2026-05-17
