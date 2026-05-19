# Acceptance Criteria

## Feature: User Authentication

### AC1: User Registration
**Given** user is on registration page
**When** user enters valid email, password, and name
**Then** system creates account and shows success message

**Verification**:
- Email format validated
- Password meets requirements (min 8 chars, mix of alphanumeric)
- User exists check passed
- Account created in database
- JWT token generated

---

### AC2: User Login
**Given** user has registered account
**When** user enters correct email and password
**Then** user is logged in and token is stored

**Verification**:
- Email exists in database
- Password matches hash
- JWT token generated
- Token stored in localStorage
- User redirected to dashboard

---

## Feature: Product Management

### AC3: Browse Products
**Given** user is on products page
**When** page loads
**Then** all products are displayed with details

**Verification**:
- Products loaded from database
- Each product shows: name, price, image, description
- Products displayed in grid/list format
- Loading state handled
- Error state handled

---

### AC4: Search Products
**Given** user is viewing products
**When** user enters search term
**Then** only matching products are displayed

**Verification**:
- Search is case-insensitive
- Searches product name and description
- Results update in real-time
- No results message shown when appropriate

---

## Feature: Shopping Cart

### AC5: Add to Cart
**Given** user is viewing a product
**When** user clicks "Add to Cart"
**Then** item is added and cart count updates

**Verification**:
- Item added to cart array
- Quantity incremented if already in cart
- Cart count updated in navbar
- Success message shown
- Cart persisted to localStorage

---

### AC6: Remove from Cart
**Given** user has items in cart
**When** user removes an item
**Then** item is removed and totals update

**Verification**:
- Item removed from cart
- Cart count decreased
- Total price recalculated
- Confirmation message shown

---

## Feature: Admin Dashboard

### AC7: Add Product (Admin)
**Given** admin is on product management page
**When** admin fills in product details and saves
**Then** new product is added to catalog

**Verification**:
- Admin role verified
- All required fields validated
- Product created in database
- Product appears in list immediately
- Confirmation message shown

---

## Performance Criteria

### AC8: Page Load Time
- Home page loads in < 2 seconds
- Product list loads in < 1 second
- Search results appear in < 500ms

### AC9: API Response Time
- GET endpoints respond in < 200ms
- POST endpoints respond in < 500ms
- Complex queries cached appropriately

---

## Security Criteria

### AC10: Password Security
- Passwords hashed with bcrypt (salt rounds: 10)
- Never stored in plain text
- Min 8 characters required

### AC11: JWT Token Security
- Token expires after 24 hours
- Token signed with secret key
- Token validated on each request

### AC12: SQL/NoSQL Injection Prevention
- All inputs validated and sanitized
- Parameterized queries used
- Mongoose schema validation enforced

---

Last Updated: May 2026
