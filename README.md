# LANC Standards Repository

**Comprehensive development standards and templates for Legal Aid of North Carolina repositories**

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

### For New Repositories
1. **Copy templates** from the `templates/` directory
2. **Reference the standards** when instructing GitHub Copilot:
   ```
   Please implement all standards from the LANC Standards repository 
   (https://github.com/Legal-Aid-of-North-Carolina/lanc-standards) 
   for this new repository. Create a full three-environment setup.
   ```

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