# API Documentation

## BaseURL
```
http://localhost:8000/api
```

## Authentication
All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### POST /auth/register
Register a new user

**Request**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Response** (201):
```json
{
  "user": {
    "id": "user_001",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### POST /auth/login
Login existing user

**Request**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response** (200):
```json
{
  "user": { "id": "user_001", "email": "user@example.com", "name": "John Doe" },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### GET /auth/me
Get current user (requires auth)

**Response** (200):
```json
{
  "id": "user_001",
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

---

## Products Endpoints

### GET /products
Get all products (optional filters)

**Query Parameters**:
- `category`: Filter by category
- `search`: Search products
- `sort`: Sort by (price, name, rating)
- `order`: asc or desc

**Response** (200):
```json
[
  {
    "_id": "prod_001",
    "name": "Laptop Pro",
    "price": 1299.99,
    "image": "laptop.jpg",
    "description": "High-performance laptop"
  }
]
```

---

### GET /products/:id
Get product details

**Response** (200):
```json
{
  "_id": "prod_001",
  "name": "Laptop Pro",
  "price": 1299.99,
  "description": "High-performance laptop",
  "image": "laptop.jpg",
  "stock": 50,
  "category": "Electronics"
}
```

---

### POST /products
Create new product (admin only)

**Request**:
```json
{
  "name": "New Product",
  "price": 99.99,
  "description": "Product description",
  "image": "product.jpg",
  "category": "Electronics",
  "stock": 100
}
```

**Response** (201): Created product object

---

## Cart Endpoints

### GET /cart
Get user's cart (requires auth)

**Response** (200):
```json
{
  "items": [
    {
      "productId": "prod_001",
      "quantity": 2,
      "name": "Laptop Pro",
      "price": 1299.99
    }
  ],
  "total": 2599.98
}
```

---

### POST /cart
Add item to cart (requires auth)

**Request**:
```json
{
  "productId": "prod_001",
  "quantity": 1
}
```

**Response** (201): Updated cart

---

### DELETE /cart/:itemId
Remove item from cart (requires auth)

**Response** (200):
```json
{
  "message": "Item removed from cart",
  "total": 1299.99
}
```

---

## Admin Endpoints

### GET /admin/stats
Get dashboard statistics (admin only)

**Response** (200):
```json
{
  "totalUsers": 150,
  "totalProducts": 50,
  "totalOrders": 1200,
  "revenue": 45000.00,
  "recentOrders": []
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid input",
  "details": "Email is required"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid credentials"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "Admin access required"
}
```

### 404 Not Found
```json
{
  "error": "Not found",
  "message": "Product not found"
}
```

### 500 Server Error
```json
{
  "error": "Server error",
  "message": "Internal server error"
}
```

---

Last Updated: May 2026
