# Deployment Information

## Deployment Environments

### Development
- Backend: http://localhost:8000
- Frontend: http://localhost:5173
- Database: Local MongoDB

### Staging
- Backend: https://api-staging.saasprototype.com
- Frontend: https://staging.saasprototype.com
- Database: MongoDB Atlas Staging

### Production
- Backend: https://api.saasprototype.com
- Frontend: https://saasprototype.com
- Database: MongoDB Atlas Production

---

## Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Code review completed
- [ ] Dependencies updated
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Backups created

### Deployment Steps

1. **Backend Deployment**
   ```bash
   # Pull latest code
   git pull origin main
   
   # Install dependencies
   npm install
   
   # Run migrations
   npm run migrate
   
   # Run tests
   npm test
   
   # Deploy
   npm run deploy
   ```

2. **Frontend Deployment**
   ```bash
   # Pull latest code
   git pull origin main
   
   # Install dependencies
   npm install
   
   # Build
   npm run build
   
   # Deploy to CDN
   npm run deploy
   ```

### Post-Deployment
- [ ] Verify application health
- [ ] Check error logs
- [ ] Monitor performance
- [ ] Run smoke tests
- [ ] Notify stakeholders

---

## Docker Deployment

### Build Images
```bash
docker-compose build
```

### Run Containers
```bash
docker-compose up -d
```

### Verify Deployment
```bash
docker-compose logs backend
docker-compose logs frontend
```

---

## CI/CD Pipeline

### GitHub Actions Workflow
- **Trigger**: Push to main branch
- **Steps**:
  1. Install dependencies
  2. Run tests
  3. Build application
  4. Push to registry
  5. Deploy to production

### Environment Variables Required
```
MONGODB_URI
JWT_SECRET
API_KEY
DEPLOYMENT_TOKEN
```

---

## Monitoring & Alerting

### Metrics to Monitor
- API response time
- Error rate
- Database query time
- Memory usage
- CPU usage

### Alert Thresholds
- Response time > 500ms
- Error rate > 5%
- CPU > 80%
- Memory > 85%

### Tools
- PM2 for process management
- DataDog for monitoring
- Sentry for error tracking
- CloudWatch for logs

---

## Rollback Procedure

### If Deployment Fails
1. Stop current deployment
2. Revert to previous version
3. Restore database from backup
4. Notify team
5. Post-mortem analysis

### Commands
```bash
# Rollback code
git revert <commit_hash>
git push origin main

# Rollback database
npm run migrate:rollback

# Restart services
docker-compose restart
```

---

## Scaling Strategy

### Horizontal Scaling
- Load balancer (nginx)
- Multiple backend instances
- Database replication
- CDN for frontend

### Vertical Scaling
- Upgrade server resources
- Optimize database indexes
- Cache frequently accessed data
- Implement Redis

---

## Backup & Recovery

### Backup Schedule
- Database: Daily at 2 AM
- Code: Continuous (Git)
- Configuration: After changes

### Recovery Procedure
1. Identify latest backup
2. Stop current services
3. Restore database
4. Verify integrity
5. Restart services

---

Last Updated: 2026-05-17
