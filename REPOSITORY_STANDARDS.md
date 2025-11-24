# LANC Repository Standards & Best Practices

## 🎯 Overview

This document defines the comprehensive standards and best practices for all Legal Aid of North Carolina (LANC) repositories. These standards ensure consistency, maintainability, observability, and production readiness across all microservices.

**Use this document to guide GitHub Copilot when creating new repositories or standardizing existing ones.**

---

## 🌐 Environment & Branch Strategy

### Standard Three-Tier Architecture

**Default Environment Setup:**

- **Development** → `development` branch → Auto-deploy to development environment
- **Staging** → `staging` branch → Auto-deploy to staging environment
- **Production** → `main` branch → Auto-deploy to production environment

**Flexible Implementation:**
You may request fewer environments for simpler projects. Always specify the desired number of environments when creating a new repository.

### Branch Workflow

```bash
# Daily development cycle
git checkout development
# ... make changes ...
git commit -m "Add feature"
git push origin development

# Promote to staging for QA
./scripts/promote-development-to-staging.sh "Feature ready for QA"

# Release to production after QA approval
./scripts/release-staging-to-production.sh v1.0.0 "QA approved release"
```

---

## 🚀 Endpoint Standards

### Required Health Endpoints

**All repositories MUST implement these health endpoints:**

#### `GET /health` - Comprehensive Health Check

```json
{
  "status": "healthy|degraded|error",
  "service": "Service Name",
  "version": "1.0.0",
  "timestamp": "2025-11-24T...",
  "environment": "development|staging|production",
  "uptime": 123.45,
  "checks": {
    "database": "ready|error|not_configured",
    "external_api": "ready|error|not_configured",
    "dependencies": "ready|error|not_configured"
  },
  "notes": "Optional status notes"
}
```

#### `GET /health/readiness` - Kubernetes Readiness Probe

```json
{
  "status": "ready|not ready",
  "service": "Service Name",
  "timestamp": "2025-11-24T...",
  "checks": {
    "database": "ready|not ready",
    "dependencies": "ready|not ready"
  }
}
```

#### `GET /health/liveness` - Kubernetes Liveness Probe

```json
{
  "status": "alive",
  "service": "Service Name",
  "uptime": 123.45,
  "timestamp": "2025-11-24T..."
}
```

### Root Endpoint Pattern

**For services with UI:** `GET /` → Serve demo/application UI
**For API-only services:** `GET /` → Basic service information

### Webhook Endpoints

**Standard pattern:** `POST /webhook/{type}`

- `POST /webhook/sms` (Twilio SMS)
- `POST /webhook/voice` (Twilio Voice)
- `POST /webhook/github` (GitHub webhooks)

### API Endpoints

**Functional endpoints should be grouped logically:**

- Core functionality: `POST /check`, `POST /chat`
- Configuration: `GET /config`
- Administration: `/admin/*` (with authentication)

---

## 🛠️ Error Handling Standards

### 404 Handler - Structured Response

```javascript
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: `The endpoint ${req.method} ${req.originalUrl} does not exist`,
    availableEndpoints: {
      ui: {
        'GET /': 'Description of root endpoint',
      },
      health: {
        'GET /health': 'Comprehensive health check',
        'GET /health/readiness': 'Service readiness probe',
        'GET /health/liveness': 'Service liveness probe',
      },
      api: {
        'POST /endpoint': 'Description of API endpoint',
      },
      webhooks: {
        'POST /webhook/type': 'Description of webhook',
      },
    },
    timestamp: new Date().toISOString(),
  });
});
```

### Global Error Handler - Structured Logging

```javascript
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', {
    error: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    timestamp: new Date().toISOString(),
  });

  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred',
    timestamp: new Date().toISOString(),
  });
});
```

---

## 📦 Package.json Standards

### Required Scripts

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "node src/server.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  },
  "engines": {
    "node": ">=18.x"
  }
}
```

### Standard Dependencies

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "eslint": "^8.57.0",
    "jest": "^29.7.0",
    "supertest": "^6.3.3"
  }
}
```

---

## 🔧 Configuration Management

### Environment Variables (.env.example)

```bash
# Server Configuration
PORT=3000
NODE_ENV=development

# External Services
OPENAI_API_KEY=sk-your-key-here
DATABASE_URL=your-database-url

# Azure Configuration (if applicable)
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret

# Service-Specific Variables
SERVICE_SPECIFIC_VAR=value
```

### Config Module Pattern

```javascript
// src/config.js
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  environment: process.env.NODE_ENV || 'development',
  apiKey: process.env.API_KEY || null,
  // Service-specific configuration
};
```

---

## 🧪 Testing Standards

### Jest Configuration (jest.config.js)

```javascript
module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  collectCoverageFrom: ['src/**/*.js', '!src/index.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
};
```

### Required Test Categories

- **Unit Tests:** Core functionality
- **Integration Tests:** API endpoints
- **Health Tests:** All health endpoints
- **Error Handling Tests:** 404 and 500 responses

---

## 📁 Directory Structure

### Standard Node.js Structure

```
repository/
├── .env.example
├── .gitignore
├── .github/
│   └── workflows/
│       ├── deploy-development.yml
│       ├── deploy-staging.yml
│       └── deploy-production.yml
├── Dockerfile
├── README.md
├── package.json
├── jest.config.js
├── eslint.config.js
├── bin/                    # CLI tools
├── data/                   # Data files
├── docs/                   # Documentation
├── public/                 # Static assets
├── scripts/                # Deployment/utility scripts
├── src/
│   ├── server.js          # Main server file
│   ├── config.js          # Configuration
│   ├── routes/            # Route handlers
│   ├── utils/             # Utility functions
│   └── services/          # Business logic
└── tests/                 # Test files
    ├── setup.js
    └── integration/
```

---

## 🐳 Docker Standards

### Dockerfile Template

```dockerfile
# Use official Node.js runtime
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY src/ ./src/
COPY scripts/ ./scripts/

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S appuser -u 1001

# Change to non-root user
USER appuser

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Start application
CMD ["npm", "start"]
```

---

## 🚀 Azure Deployment Standards

### GitHub Actions Workflow Template

```yaml
name: Deploy to Azure

on:
  push:
    branches: [main, staging, development]
  workflow_dispatch:

env:
  AZURE_WEBAPP_NAME: service-name-${{ github.ref_name }}
  NODE_VERSION: '20.x'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment: ${{ github.ref_name }}

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Deploy to Azure
        uses: azure/webapps-deploy@v2
        with:
          app-name: ${{ env.AZURE_WEBAPP_NAME }}
          publish-profile: ${{ secrets.AZURE_PUBLISH_PROFILE }}
```

### Environment URLs Pattern

- **Development:** `https://service-name-development.azurewebsites.net`
- **Staging:** `https://service-name-staging.azurewebsites.net`
- **Production:** `https://service-name.azurewebsites.net`

---

## 🔍 Logging Standards

### Startup Logging Pattern

```javascript
const server = app.listen(config.port, () => {
  console.log(`🚀 ${SERVICE_NAME} listening on port ${config.port}`);
  console.log(`Environment: ${config.environment}`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  Health endpoints:`);
  console.log(`    - GET  http://localhost:${config.port}/health`);
  console.log(`    - GET  http://localhost:${config.port}/health/readiness`);
  console.log(`    - GET  http://localhost:${config.port}/health/liveness`);
  console.log(`  API endpoints:`);
  console.log(`    - POST http://localhost:${config.port}/api/endpoint`);
  console.log(`  Webhook endpoints:`);
  console.log(`    - POST http://localhost:${config.port}/webhook/type`);
});
```

### Structured Logging (Production)

```javascript
// src/utils/logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'service-name' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

module.exports = { logger };
```

---

## 🔒 Security Standards

### Environment Variables

- Never commit secrets to Git
- Use `.env.example` for documentation
- Use Azure Key Vault for production secrets

### Authentication

- Basic Auth for admin endpoints
- API key validation for external services
- CORS configuration appropriate for environment

### Input Validation

- Validate all request bodies
- Sanitize user inputs
- Rate limiting for public endpoints

---

## 📋 Documentation Requirements

### README.md Template

````markdown
# Service Name

Brief description of the service purpose and functionality.

## Live Deployments

- **Development**: https://service-development.azurewebsites.net/
- **Staging**: https://service-staging.azurewebsites.net/
- **Production**: https://service.azurewebsites.net/

## Quick Start

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone <repository-url>
cd repository-name
npm install
cp .env.example .env
```
````

### Development

```bash
npm run dev
```

## API Documentation

### Health Endpoints

- `GET /health` - Comprehensive health check
- `GET /health/readiness` - Readiness probe
- `GET /health/liveness` - Liveness probe

### Functional Endpoints

- Document all API endpoints with examples

## Configuration

Document all environment variables and configuration options.

## Deployment

Document deployment process and environment setup.

```

---

## ✅ Quality Assurance

### Code Quality
- ESLint configuration for consistent code style
- Pre-commit hooks for linting
- Unit test coverage > 80%
- Integration tests for all endpoints

### Performance
- Response time monitoring
- Resource usage optimization
- Graceful shutdown handling

### Reliability
- Comprehensive error handling
- Health check implementation
- Automatic failover capabilities

---

## 🛡️ Compliance & Governance

### Code Review Requirements
- All changes require pull request review
- Automated testing must pass
- Security scanning for dependencies

### Documentation Standards
- Code comments for complex logic
- API documentation with examples
- Deployment guides and troubleshooting

### Monitoring & Observability
- Health endpoint monitoring
- Error tracking and alerting
- Performance metrics collection

---

## 📝 Commit Message Standards

### Git Commit Guidelines
All commit messages must follow these rules:
- **Maximum 10 words or less**
- Use present tense ("Add feature" not "Added feature")
- Be descriptive but concise
- Start with a verb (Add, Fix, Update, Remove, etc.)
- **Always use `git add .` before committing** to stage all changes

#### Examples of Good Commit Messages
- Add health endpoints to server
- Fix error handler response format  
- Update package.json dependencies
- Remove deprecated middleware
- Add Jest test configuration

#### Examples of Poor Commit Messages
- Fixed the bug that was causing the server to crash when invalid input was provided
- Added new functionality
- Updates
- WIP

### Why This Matters
Consistent, concise commit messages improve:
- Code review efficiency
- Git history readability  
- Automated changelog generation
- Team communication
- GitHub Copilot consistency

---

## 🚦 Implementation Checklist

When creating or standardizing a repository, ensure ALL of these items are implemented:

### Core Requirements
- [ ] Three-tier environment structure (or specified alternative)
- [ ] All required health endpoints with standard response format
- [ ] Structured 404 and global error handlers
- [ ] Standard package.json with required scripts
- [ ] Environment configuration with .env.example
- [ ] Comprehensive README.md documentation

### Development Standards
- [ ] ESLint configuration
- [ ] Jest test configuration
- [ ] Directory structure following standards
- [ ] Dockerfile for containerization
- [ ] GitHub Actions workflows for all environments

### Production Readiness
- [ ] Azure deployment configuration
- [ ] Proper logging implementation
- [ ] Security measures (auth, validation, CORS)
- [ ] Graceful shutdown handling
- [ ] Performance optimization

### Documentation & Governance
- [ ] API endpoint documentation
- [ ] Environment variable documentation
- [ ] Deployment guides
- [ ] Troubleshooting information

---

**Use this document as your comprehensive guide when instructing GitHub Copilot to create or standardize any LANC repository. Every item should be implemented unless explicitly specified otherwise.**
```
