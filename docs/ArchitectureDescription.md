# Architecture Description

## FirstSaaS E-commerce Platform Architecture

### Overview
FirstSaaS is a full-stack e-commerce application built with:
- **Backend**: Node.js + Express.js
- **Frontend**: React 18 + Vite
- **Database**: MongoDB
- **Testing**: Jest, Vitest, Cucumber.js

### Layered Architecture

#### 1. Presentation Layer (Frontend)
- React components for UI
- Vite for build optimization
- State management with React Context
- API client for backend communication

#### 2. API Layer (Backend)
- Express.js routing
- RESTful API endpoints
- JWT authentication
- CORS configuration

#### 3. Business Logic Layer (Services)
- UserService - User management
- ProductService - Product catalog
- CartService - Shopping cart logic
- RecommendationService - Product recommendations

#### 4. Data Access Layer (Repositories)
- UserRepository
- ProductRepository
- CartRepository
- Query optimization

#### 5. Database Layer
- MongoDB with Mongoose ODM
- Schema validation
- Indexes for performance

### Data Flow

```
User Request (Frontend)
    ↓
API Controller (Express)
    ↓
Service Layer (Business Logic)
    ↓
Repository Layer (Data Access)
    ↓
MongoDB Database
    ↓
Response back to Frontend
```

### Key Components

**Controllers**: Handle HTTP requests and responses
**Services**: Implement business logic
**Repositories**: Abstract database operations
**Models**: Define data schema
**Middleware**: Authentication, CORS, error handling

### Authentication Flow
1. User registers/logs in
2. Server generates JWT token
3. Token stored in browser localStorage
4. Token sent in Authorization header for protected routes
5. Middleware verifies token on each request

### API Endpoints

**Auth**:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

**Products**:
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` (admin)

**Cart**:
- `GET /api/cart`
- `POST /api/cart`
- `DELETE /api/cart/:itemId`

**Admin**:
- `GET /api/admin/stats`

### Security Features
- Password hashing with bcrypt
- JWT token authentication
- CORS protection
- Input validation
- Error handling

### Scalability Considerations
- MongoDB indexing for queries
- Redis caching (future)
- Load balancing (future)
- Microservices architecture (future)

---
Last Updated: May 2026
