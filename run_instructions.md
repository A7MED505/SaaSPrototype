# Run Instructions - FirstSaaS Prototype

## 📋 Prerequisites

Before running the project, ensure you have:
- Node.js v18+ installed
- MongoDB running locally or connection string available
- npm v9+

## 🚀 Quick Start

### Step 1: Environment Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/firstsaas
   PORT=8000
   JWT_SECRET=your_secure_secret_key
   ```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd source_code

# Install dependencies
npm install

# Seed database (optional)
npm run seed

# Start development server
npm run dev
```

Backend will be available at: **http://localhost:8000**

### Step 3: Frontend Setup (in a new terminal)

```bash
# Navigate to frontend directory
cd source_code/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at: **http://localhost:5173**

## 🧪 Running Tests

### Backend Tests

```bash
cd source_code
npm test
```

Output:
- ✓ Server health check
- ✓ Express setup verification
- ✓ JSON parsing
- ✓ Route 404 handling

### Frontend Tests

```bash
cd source_code/frontend
npm test -- --run
```

Output:
- ✓ Navbar component rendering
- ✓ ProductCard component rendering
- ✓ Component integration tests

## 🔄 Development Workflow

### Auto-reload Development Mode

Both backend and frontend support hot-reload:

**Backend** (with nodemon):
```bash
cd source_code
npm run dev
```

**Frontend** (with Vite):
```bash
cd source_code/frontend
npm run dev
```

### Building for Production

**Backend**: No build needed (Node.js runs directly)

**Frontend**:
```bash
cd source_code/frontend
npm run build
```

Output will be in `dist/` folder.

## 📁 Project Layout

```
source_code/
├── app/
│   ├── server.js              # Main entry point
│   ├── database.js            # DB connection
│   ├── models/schemas.js      # DB schemas
│   ├── routers/               # API endpoints
│   └── services/              # Business logic
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Pages
│   │   ├── context/           # Auth context
│   │   └── __tests__/         # Tests
│   ├── package.json
│   └── vite.config.js
├── __tests__/                 # Backend tests
├── package.json
└── jest.config.js
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add to cart
- `DELETE /api/cart/:itemId` - Remove from cart

### Admin
- `GET /api/admin/stats` - Get admin statistics
- `POST /api/admin/products` - Manage products

## 🛠️ Troubleshooting

### Port Already in Use
```bash
# Backend port 8000
lsof -i :8000
kill -9 <PID>

# Frontend port 5173
lsof -i :5173
kill -9 <PID>
```

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify database exists

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📊 Monitoring

### Backend Logs
Check the terminal running `npm run dev` in `source_code/`

### Frontend Console
Open browser DevTools (F12) -> Console tab

### Test Results
Results are saved in `test_results/` directory

## 🚀 Deployment

See `deployment/` directory for:
- Docker configuration
- CI/CD setup
- Cloud deployment guides

## 📞 Support

For issues:
1. Check logs in the terminal
2. Review error messages in browser console
3. Check database connectivity
4. Verify all environment variables are set

## 🔐 Security Notes

⚠️ **For Development Only**:
- Never commit `.env` with real secrets
- Change `JWT_SECRET` in production
- Use strong database passwords
- Enable HTTPS in production

## 📈 Performance

- Backend caches product recommendations
- Frontend uses React Context for state management
- Database indexes on frequently queried fields
- Consider Redis for caching in production

## 🎯 Next Steps

1. Explore API endpoints using Postman/Thunder Client
2. Run test suite to verify setup
3. Review code structure and architecture
4. Customize for your needs
5. Deploy to cloud platform

---

Last Updated: May 2026
