# LANC Standards Repository

**Comprehensive development standards and templates for Legal Aid of North Carolina repositories**

> ⚠️ **Note**: This is a documentation repository. GitHub deployment failures are expected and can be ignored as this repository contains templates rather than deployable applications.

## 🎯 Quick Links

- **[📋 Repository Standards](./REPOSITORY_STANDARDS.md)** - Complete development standards and best practices
- **[📁 Templates](./templates/)** - Ready-to-use template files
- **[💡 Examples](./examples/)** - Example implementations
- **[🚀 Quick Start Guide](#-quick-start-guide)** - Get started with new repositories

---

## 📚 Documentation

### Core Standards

- **[Repository Standards](./REPOSITORY_STANDARDS.md)** - Comprehensive standards for all LANC repositories
- **[Endpoint Guidelines](./REPOSITORY_STANDARDS.md#-endpoint-standards)** - Health endpoints, error handling, and API patterns
- **[Deployment Standards](./REPOSITORY_STANDARDS.md#-azure-deployment-standards)** - Azure deployment and GitHub Actions workflows
- **[Security Guidelines](./REPOSITORY_STANDARDS.md#-security-standards)** - Authentication, validation, and security best practices

### Quick Reference

- **[Environment Strategy](./REPOSITORY_STANDARDS.md#-environment--branch-strategy)** - Three-tier development/staging/production setup
- **[Error Handling](./REPOSITORY_STANDARDS.md#%EF%B8%8F-error-handling-standards)** - Structured 404 and global error handlers
- **[Testing Standards](./REPOSITORY_STANDARDS.md#-testing-standards)** - Jest configuration and test requirements

---

## 🚀 Quick Start Guide

### GitHub Copilot Prompt Template for New Repositories

**Copy and paste this exact prompt when creating new LANC repositories:**

```
Please create a new LANC-compliant repository following these exact specifications:

REPOSITORY SETUP:
- Repository name: [YOUR-REPO-NAME]
- Organization: Legal-Aid-of-North-Carolina
- Create using GitHub CLI: gh repo create Legal-Aid-of-North-Carolina/[YOUR-REPO-NAME] --public
- Initialize with main branch and set up three-tier environment (development/staging/main branches)

REQUIRED FILE STRUCTURE:
- package.json (Node.js 20+ LTS, express, dotenv, helmet, cors, winston dependencies - USE LATEST STABLE VERSIONS)
- server.js (main application file with health endpoints)
- Dockerfile (multi-stage build, Node 20 alpine, non-root user, health check)
- .env.example (environment template)
- .gitignore (Node.js standard with Azure and IDE exclusions)
- README.md (with LANC standards compliance section)
- web.config (Azure App Service configuration)
- startup.sh (Azure startup script)
- eslint.config.js (ES2022, strict linting rules - LATEST VERSION)
- jest.config.mjs (testing configuration - LATEST VERSION)

REQUIRED ENDPOINTS:
- GET /health (comprehensive health check with status, timestamp, version, environment)
- GET /health/readiness (readiness probe for Kubernetes/containers)
- GET /health/liveness (liveness probe for Kubernetes/containers)
- GET /api/status (service-specific status endpoint)

GITHUB ACTIONS WORKFLOWS (.github/workflows/):
- deploy-development.template.yml (rename to .yml and auto-deploy development branch to Azure)
- deploy-staging.template.yml (rename to .yml and auto-deploy staging branch to Azure)
- deploy-production.template.yml (rename to .yml and auto-deploy main branch to Azure)
- Each workflow must include: checkout, Node.js setup, dependency install, build, Azure deploy

AZURE CONFIGURATION:
- Copy setup-azure-resources.sh from templates/ directory
- Run: ./setup-azure-resources.sh [YOUR-REPO-NAME] to create all Azure resources
- Three App Service instances: [repo-name]-development, [repo-name]-staging, [repo-name]
- Resource group: rg-lanc-[repo-name] in East US region
- App Service Plan with Linux Node.js 20-lts runtime (LATEST LTS VERSION)
- Environment variables: NODE_ENV, PORT, WEBSITE_NODE_DEFAULT_VERSION
- Health check endpoints configured for all environments
- GitHub deployment service principal created automatically

GITHUB SECRETS SETUP:
- Add AZURE_CREDENTIALS (service principal JSON from setup script output)
- Add AZURE_RESOURCE_GROUP: rg-lanc-[repo-name]
- Add AZURE_WEBAPP_NAME_DEV: [repo-name]-development
- Add AZURE_WEBAPP_NAME_STAGING: [repo-name]-staging
- Add AZURE_WEBAPP_NAME_PROD: [repo-name]

ERROR HANDLING:
- Global error handler middleware
- Structured 404 handler for undefined routes
- Proper HTTP status codes and JSON error responses
- Request logging with Winston

SECURITY:
- Helmet.js for security headers
- CORS configuration
- Input validation and sanitization
- No secrets in code (use environment variables)

DOCUMENTATION:
- README must include "Standards Compliance" section referencing https://github.com/Legal-Aid-of-North-Carolina/lanc-standards
- Live deployment URLs for all three environments
- Local development setup instructions
- API endpoint documentation

GIT CONFIGURATION:
- Set up proper .gitignore
- Create initial commit with message under 10 words
- Push to all three branches (development, staging, main)

COMPLIANCE CHECKLIST:
Verify the repository includes ALL of these items:
□ Health endpoints (/health, /health/readiness, /health/liveness)
□ Three-tier deployment (dev/staging/prod)
□ GitHub Actions workflows for each environment
□ Proper error handling and logging
□ Security middleware (helmet, cors)
□ Docker configuration with health checks
□ README with LANC standards reference
□ Environment configuration files
□ Testing setup with Jest
□ Linting setup with ESLint
□ Azure resources created (run setup-azure-resources.sh)
□ GitHub secrets configured for Azure deployment
□ All three environments accessible via URLs

COMPLETE SETUP PROCESS:
1. Create GitHub repository: gh repo create Legal-Aid-of-North-Carolina/[YOUR-REPO-NAME] --public
2. Clone and create all files as specified above
3. Copy and run setup-azure-resources.sh [YOUR-REPO-NAME] to create Azure infrastructure
4. Add GitHub secrets from the script output to your repository
5. Push code to all three branches (development, staging, main)
6. Verify deployments at the three Azure URLs
7. Test all health endpoints are responding correctly

Please create this repository step-by-step, implementing each requirement exactly as specified. Use the templates and examples from https://github.com/Legal-Aid-of-North-Carolina/lanc-standards as your reference for implementation details.
```

Replace `[YOUR-REPO-NAME]` with your actual repository name before using this prompt.

### For Existing Repositories

1. **Review current implementation** against the standards
2. **Use the checklist** at the bottom of REPOSITORY_STANDARDS.md
3. **Gradually implement** missing standards

---

## 📁 Repository Structure

```
lanc-standards/
├── README.md                           # This file
├── REPOSITORY_STANDARDS.md             # Complete development standards
├── templates/
│   ├── package.json                   # Standard package.json template
│   ├── Dockerfile                     # Production-ready Docker template
│   ├── .env.example                   # Environment variables template
│   ├── eslint.config.js               # ESLint configuration
│   ├── jest.config.js                 # Jest test configuration
│   ├── .gitignore                     # Standard .gitignore
│   └── .github/workflows/
│       ├── deploy-development.yml     # Development deployment
│       ├── deploy-staging.yml         # Staging deployment
│       └── deploy-production.yml      # Production deployment
└── examples/
    ├── health-endpoints.js             # Health endpoint implementations
    ├── error-handlers.js               # Error handling examples
    └── server-setup.js                 # Server configuration examples
```

---

## 🌟 Key Standards Highlights

### Health Endpoints (Required)

- `GET /health` - Comprehensive health check with service info
- `GET /health/readiness` - Kubernetes readiness probe
- `GET /health/liveness` - Kubernetes liveness probe

### Environment Strategy

- **Development** → `development` branch → Auto-deploy to `-development` environment
- **Staging** → `staging` branch → Auto-deploy to `-staging` environment
- **Production** → `main` branch → Auto-deploy to production environment

### Error Handling

- Structured 404 handlers with endpoint documentation
- Global error handlers with detailed logging
- Consistent JSON response formats

---

## 🔄 Contributing

### Making Changes to Standards

1. **Create a branch** for your changes
2. **Update documentation** and templates as needed
3. **Submit a pull request** for team review
4. **Update dependent repositories** after approval

### Adding New Templates

1. **Follow existing template format**
2. **Include comprehensive comments**
3. **Test with a real repository**
4. **Document in this README**

---

## 📋 Implementation Checklist

Use this checklist when creating or updating repositories:

### ✅ Core Requirements

- [ ] Three-tier environment structure (development/staging/production)
- [ ] All required health endpoints implemented
- [ ] Structured error handlers (404 + global)
- [ ] Standard package.json with required scripts
- [ ] Environment configuration with .env.example
- [ ] Comprehensive README.md

### ✅ Development Standards

- [ ] ESLint configuration
- [ ] Jest test configuration
- [ ] Standard directory structure
- [ ] Dockerfile for containerization
- [ ] GitHub Actions workflows

### ✅ Production Readiness

- [ ] Azure deployment configuration
- [ ] Structured logging
- [ ] Security measures (auth, validation, CORS)
- [ ] Graceful shutdown handling
- [ ] Performance optimization

---

## 🔗 Related Repositories

### Current LANC Microservices

- **[billThePAIPlatypus](https://github.com/Legal-Aid-of-North-Carolina/billThePAIPlatypus)** - PAI guidance chatbot
- **[textIntake](https://github.com/Legal-Aid-of-North-Carolina/textIntake)** - SMS intake system
- **[conflictCheckEngine](https://github.com/Legal-Aid-of-North-Carolina/conflictCheckEngine)** - Legal conflict checking
- **[simpleTwilioResponder](https://github.com/Legal-Aid-of-North-Carolina/simpleTwilioResponder)** - Twilio webhook handler

---

## 📞 Support

For questions about these standards:

1. **Review the documentation** in REPOSITORY_STANDARDS.md
2. **Check existing repositories** for implementation examples
3. **Create an issue** in this repository for clarifications
4. **Submit a PR** for improvements or additions

---

**Last Updated:** November 2025  
**Version:** 1.0.0
