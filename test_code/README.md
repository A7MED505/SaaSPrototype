# Test Code Utilities - FirstSaaS Prototype

## Test Organization

```
test_code/
├── README.md
├── fixtures/          # Test data
├── helpers/           # Test utilities
└── mocks/            # Mock data
```

## Running Tests

### All Tests
```bash
npm run test:all
```

### Backend Tests Only
```bash
cd source_code
npm test
```

### Frontend Tests Only
```bash
cd source_code/frontend
npm test -- --run
```

### With Coverage
```bash
npm test -- --coverage
```

## Test Coverage Goals

- Backend: > 80% coverage
- Frontend Components: > 75% coverage
- Critical paths: 100% coverage

## Test Structure

### Backend Tests (`source_code/__tests__/`)
- `server.test.js` - Express server tests
- `setup.js` - Jest configuration

### Frontend Tests (`source_code/frontend/src/__tests__/`)
- `Navbar.test.jsx` - Navigation component tests
- `ProductCard.test.jsx` - Product card component tests
- `setup.js` - Vitest configuration

## Mocking Strategy

### Backend Mocks
- Mock MongoDB with jest
- Mock external API calls
- Mock authentication

### Frontend Mocks
- Mock useAuth hook
- Mock API calls
- Mock React Router

## Continuous Integration

Tests run automatically on:
- Pull requests
- Commits to main branch
- Scheduled runs (daily)

See `.github/workflows/` for CI configuration.
