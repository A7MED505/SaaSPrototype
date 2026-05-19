# Acceptance Tests & BDD
## Behavior-Driven Development (BDD) Approach

### Feature-Driven Testing

BDD focuses on business scenarios written in plain language:

1. **Feature Files**: Describe user stories in Gherkin syntax
2. **Step Definitions**: Implement test steps
3. **Execution**: Run tests and verify behavior

### Feature Files Location
```
test_code/bdd_features/
├── user_login.feature
├── manage_product.feature
└── manage_cart.feature
```

### Example Feature
```gherkin
Feature: User Authentication
  As a user
  I want to login
  So that I can access the application

  Scenario: Login with valid credentials
    Given I am on the login page
    When I enter valid email and password
    Then I should see the dashboard
```

### Step Definitions
```javascript
// test_code/bdd_step_definitions/test_user_login_bdd.js
Given('I am on the login page', async () => {
  // Navigate to login
});

When('I enter valid email and password', async () => {
  // Fill login form
});

Then('I should see the dashboard', async () => {
  // Verify dashboard appears
});
```

### Running BDD Tests
```bash
# Run all BDD features
npm run test:bdd

# Run specific feature
npm run test:bdd -- user_login.feature

# Generate HTML report
npm run test:bdd -- --format html:reports/bdd.html
```

### Test Scenarios Covered

**User Login**:
- ✅ Registration with valid data
- ✅ Login with valid credentials
- ✅ Login with invalid credentials

**Product Management**:
- ✅ View product catalog
- ✅ Search products
- ✅ View product details

**Shopping Cart**:
- ✅ Add items to cart
- ✅ Remove items from cart
- ✅ Update quantities

### Benefits of BDD

1. **Communication**: Business and technical teams speak same language
2. **Documentation**: Features serve as living documentation
3. **Traceability**: Requirements linked to tests
4. **Quality**: Validates business requirements

---

Last Updated: 2026-05-17
