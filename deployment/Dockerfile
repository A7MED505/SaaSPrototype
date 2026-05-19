FROM node:18-alpine

WORKDIR /app/backend

# Copy package files
COPY source_code/backend/package*.json ./

# Install dependencies
RUN npm install --production

# Copy application code
COPY source_code/backend/app ./app
COPY source_code/routers ./routers
COPY source_code/models ./models
COPY source_code/services ./services

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start application
CMD ["npm", "start"]
