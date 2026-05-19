# Functional Tests

## What Are Functional Tests?

Functional tests verify that each function works as expected:
- Test user workflows end-to-end
- Validate business logic
- Check integration between components

## Test Categories

### 1. API Functional Tests
Location: `test_code/api_tests/`

```javascript
// test_auth_api.js
describe('User Authentication Flow', () => {
  test('Complete login flow', async () => {
    // 1. Register
    const register = await request(app)
      .post('/api/auth/register')
      .send(userData);
    
    // 2. Login
    const login = await request(app)
      .post('/api/auth/login')
      .send(credentials);
    
    // 3. Access protected route
    const profile = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${login.body.token}`);
    
    expect(profile.status).toBe(200);
  });
});
```

### 2. Component Functional Tests
Location: `source_code/frontend/src/__tests__/`

```javascript
// Navbar.test.jsx
test('Complete user navigation flow', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
  
  // Verify all nav items appear
  expect(getByText(/Products/i)).toBeInTheDocument();
  expect(getByText(/Cart/i)).toBeInTheDocument();
});
```

### 3. Database Functional Tests

```javascript
test('Product data persistence', async () => {
  // Create
  const product = await ProductService.createProduct(data);
  
  // Read
  const retrieved = await ProductService.getProductById(product.id);
  
  // Update
  await ProductService.updateProduct(product.id, newData);
  
  // Verify
  const updated = await ProductService.getProductById(product.id);
  expect(updated.name).toBe(newData.name);
});
```

## Running Functional Tests

```bash
# All functional tests
npm run test:functional

# Specific test file
npm test test_auth_api.js

# With detailed output
npm test -- --verbose

# Generate report
npm test -- --coverage --json > functional_tests.json
```

## Test Coverage Areas

### User Management
- [x] Registration flow
- [x] Login flow
- [x] Profile management
- [x] Password reset

### Product Management
- [x] List products
- [x] Search/filter
- [x] View details
- [x] Admin CRUD

### Shopping Cart
- [x] Add/remove items
- [x] Update quantities
- [x] Calculate totals
- [x] Persist data

### Order Management
- [x] Create orders
- [x] Track orders
- [x] Update status
- [x] Generate receipts

---

Last Updated: 2026-05-17
