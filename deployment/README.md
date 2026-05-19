# Deployment Configuration - FirstSaaS Prototype

## Local Deployment

For running the application locally in production-like mode:

```bash
# Backend
cd source_code
NODE_ENV=production npm start

# Frontend (build first)
cd source_code/frontend
npm run build
npm run preview
```

## Docker Deployment

### Build Docker Images

```bash
# Backend
docker build -f deployment/Dockerfile.backend -t saas-backend:latest .

# Frontend
docker build -f deployment/Dockerfile.frontend -t saas-frontend:latest .
```

### Run with Docker Compose

```bash
docker-compose -f deployment/docker-compose.yml up -d
```

## Cloud Deployment Options

### AWS (EC2 + RDS)
1. Create EC2 instance
2. Set up MongoDB on RDS
3. Deploy backend to EC2
4. Deploy frontend to S3/CloudFront

### Heroku
1. Push code to Heroku
2. Set environment variables
3. Heroku automatically deploys

### DigitalOcean/Linode
1. Create droplet
2. Configure MongoDB
3. Use PM2 for process management

## CI/CD Pipeline

See `deployment/.github/workflows/` for GitHub Actions configuration.

## Environment Variables for Production

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/firstsaas
JWT_SECRET=very_secure_secret_key_here
PORT=8000
CORS_ORIGIN=https://yourdomain.com
```

## Monitoring & Logging

- Application logs: `/var/log/saas/app.log`
- Error tracking: Consider Sentry or DataDog
- Uptime monitoring: Pingdom or UptimeRobot

## Scaling

- Use PM2 for process management
- Enable clustering for multiple CPU cores
- Use Redis for caching
- Consider Kubernetes for large-scale deployment
