# FirstSaaS Prototype - E-commerce Platform

A full-stack SaaS e-commerce prototype built with Node.js/Express and React.

## 🎯 Project Overview

FirstSaaS is a demonstration of a modern e-commerce platform featuring:
- User authentication and authorization
- Product catalog management
- Shopping cart functionality
- Product recommendations
- Admin panel
- Comprehensive test suite

## 📁 Project Structure

```
SaaSPrototype/
├── source_code/
│   ├── app/
│   │   ├── server.js              # Express server entry point
│   │   ├── database.js            # MongoDB connection
│   │   ├── models/
│   │   │   └── schemas.js         # Mongoose schemas
│   │   ├── routers/               # API route handlers
│   │   └── services/              # Business logic
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── components/        # React components
│   │   │   ├── pages/             # Page components
│   │   │   ├── context/           # React Context
│   │   │   ├── api/               # API client
│   │   │   └── __tests__/         # Component tests
│   │   ├── package.json
│   │   └── vite.config.js
│   ├── __tests__/                 # Backend tests
│   ├── package.json
│   └── jest.config.js
├── deployment/                    # Deployment configurations
├── test_code/                     # Test utilities and helpers
├── test_results/                  # Test execution reports
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB >= 5.0
- npm >= 9

### Installation

1. **Backend Setup**
   ```bash
   cd source_code
   npm install
   ```

2. **Frontend Setup**
   ```bash
   cd source_code/frontend
   npm install
   ```

### Configuration

See `.env.example` for required environment variables.

### Running the Application

See `run_instructions.md` for detailed setup and running instructions.

## 🧪 Testing

### Backend Tests
```bash
cd source_code
npm test
```

### Frontend Tests
```bash
cd source_code/frontend
npm test -- --run
```

Test results are saved in `test_results/`.

## 📦 Features

### Authentication
- User registration and login
- JWT token-based authentication
- Password hashing with bcrypt

### Products
- Browse product catalog
- Search and filter products
- View product details
- Product recommendations

### Shopping Cart
- Add/remove items
- Update quantities
- Persistent cart storage

### Admin Panel
- Product management
- User management
- Order tracking

## 🛠️ Tech Stack

### Backend
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcrypt
- **Testing**: Jest + Supertest

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Testing**: Vitest + React Testing Library

## 📝 Environment Variables

See `.env.example` for the complete list of required environment variables.

## 🚀 Deployment

Deployment guides and configurations are available in the `deployment/` directory.

## 📊 Testing & Quality

- Comprehensive unit tests for backend services
- Component tests for React components
- Test coverage reports in `test_results/`

## 📝 License

This project is provided as-is for demonstration purposes.

## 👤 Author

Ahmed

## 📞 Support

For questions or issues, please refer to the documentation or create an issue in the repository.
