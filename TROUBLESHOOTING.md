# Troubleshooting Guide

## Common Issues & Solutions

### Installation Issues

#### 1. Node.js Version Mismatch
**Error**: `npm ERR! Engine: unsupported version`

**Solution**:
```bash
node --version  # Check current version
# Should be v18+ or v20+
# If not, download from nodejs.org
```

#### 2. MongoDB Connection Failed
**Error**: `MongoError: connect ECONNREFUSED 127.0.0.1:27017`

**Solution**:
```bash
# Start MongoDB
mongod

# Or use Docker
docker run -d -p 27017:27017 mongo

# Or verify connection string in .env
MONGODB_URI=mongodb://localhost:27017/firstsaas
```

#### 3. Port Already in Use
**Error**: `Error: listen EADDRINUSE: address already in use :::8000`

**Solution (Linux/Mac)**:
```bash
lsof -i :8000
kill -9 <PID>
```

**Solution (Windows)**:
```bash
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

---

### Build Issues

#### 1. Dependencies Installation Failed
**Error**: `npm ERR! code ERESOLVE`

**Solution**:
```bash
npm install --legacy-peer-deps
# or
npm cache clean --force
npm install
```

#### 2. Build Errors
**Error**: `error: SyntaxError in app.js`

**Solution**:
```bash
# Check for syntax errors
npm run lint

# Fix issues
npm run format
```

---

### Testing Issues

#### 1. Tests Failing
**Error**: `FAIL test_auth_api.js`

**Solution**:
```bash
# Ensure MongoDB is running
mongod

# Clear test database
npm run test:unit -- --clearCache

# Run single test file
npm test test_auth_api.js
```

#### 2. Permission Denied
**Error**: `Error: EACCES: permission denied`

**Solution (Linux/Mac)**:
```bash
chmod +x setup.sh
./setup.sh
```

#### 3. Timeout Errors
**Error**: `Timeout - Async callback was not invoked`

**Solution**:
```bash
# Increase timeout in test file
jest.setTimeout(10000)

# Or run with longer timeout
npm test -- --testTimeout=10000
```

---

### Runtime Issues

#### 1. Authentication Failures
**Error**: `401 Unauthorized`

**Solution**:
```bash
# Verify JWT_SECRET in .env
JWT_SECRET=your_secret_key

# Check token generation
# Verify Authorization header format
Authorization: Bearer <token>
```

#### 2. CORS Errors
**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
```bash
# Verify CORS settings in backend
CORS_ORIGIN=http://localhost:5173

# Or update backend code
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
```

#### 3. API Not Responding
**Error**: `Cannot GET /api/products`

**Solution**:
```bash
# Check if backend is running
curl http://localhost:8000

# Verify API routes are defined
# Check server logs for errors

# Restart server
npm run dev
```

---

### Docker Issues

#### 1. Container Won't Start
**Error**: `docker: error response from daemon`

**Solution**:
```bash
# Check logs
docker logs container_name

# Verify image exists
docker images

# Rebuild image
docker-compose build --no-cache

# Restart services
docker-compose down
docker-compose up -d
```

#### 2. Port Mapping Issues
**Error**: `bind: address already in use`

**Solution**:
```bash
# Stop conflicting container
docker ps
docker stop container_id

# Or use different port
docker run -p 9000:8000 saas-backend
```

---

### Database Issues

#### 1. Connection Timeout
**Error**: `MongooseError: operation timed out`

**Solution**:
```bash
# Check MongoDB is running
mongosh

# Verify connection string
mongodb://localhost:27017/firstsaas

# Increase timeout
mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
```

#### 2. Data Not Persisting
**Error**: `Data inserted but not found on query`

**Solution**:
```bash
# Verify database transactions
# Check if data actually saved
mongosh
use firstsaas
db.users.find()
```

---

### Performance Issues

#### 1. Slow API Response
**Issue**: API responses > 200ms

**Solution**:
```bash
# Check database indexes
# Profile slow queries
# Add caching layer
# Optimize API code

# Monitor performance
npm run dev -- --inspect
```

#### 2. High Memory Usage
**Issue**: Memory usage increasing over time

**Solution**:
```bash
# Check for memory leaks
node --inspect app/main.js

# Use Chrome DevTools
# Profile memory usage
# Fix circular references
```

---

### Git Issues

#### 1. Push Failed
**Error**: `error: failed to push some refs`

**Solution**:
```bash
# Pull latest changes
git pull origin main

# Resolve conflicts if any
git add .
git commit -m "Merge conflicts resolved"

# Push again
git push origin main
```

#### 2. Detached HEAD
**Error**: `HEAD detached at commit`

**Solution**:
```bash
git checkout main
git pull origin main
```

---

### Environment Issues

#### 1. Environment Variables Not Loaded
**Error**: `Cannot read property of undefined`

**Solution**:
```bash
# Verify .env file exists
ls -la .env

# Check format: KEY=VALUE
# Ensure dotenv is loaded first

# Restart server
npm run dev
```

#### 2. Wrong Environment Variables Used
**Issue**: Production server using dev settings

**Solution**:
```bash
# Set NODE_ENV
NODE_ENV=production npm start

# Verify correct .env file loaded
# Check environment-specific config
```

---

## Debug Tips

### 1. Enable Verbose Logging
```javascript
// In your code
console.log('Debug:', variableName);

// Or use debug module
const debug = require('debug')('app');
debug('message');
```

### 2. Use Node Inspector
```bash
node --inspect app/main.js
# Open chrome://inspect in Chrome
```

### 3. Check Logs
```bash
# Server logs
npm run dev 2>&1 | tee server.log

# Database logs
mongosh --eval "db.adminCommand({getLog: 'global'})"
```

### 4. Test in Isolation
```bash
# Test specific component
npm test -- --testNamePattern="Auth"

# Test with specific config
npm test -- --config=jest.config.test.js
```

---

## Getting Help

1. Check this guide
2. Review documentation in `docs/`
3. Check existing issues on GitHub
4. Create detailed issue report
5. Include:
   - Error message
   - Steps to reproduce
   - Environment info
   - Screenshots if applicable

---

**Last Updated**: 2026-05-17
