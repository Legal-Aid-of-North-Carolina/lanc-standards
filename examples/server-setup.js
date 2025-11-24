// Server setup and configuration examples
// Use this as a template for your src/server.js file

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const SERVICE_NAME = process.env.SERVICE_NAME || 'LANC Service';
const startTime = Date.now();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${req.method} ${req.path}`);
  next();
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: `${SERVICE_NAME} is running`,
    version: process.env.npm_package_version || '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Health endpoints (copy from health-endpoints.js example)
// ... health endpoints implementation ...

// API routes
// app.use('/api', apiRoutes);

// Webhook routes  
// app.use('/webhook', webhookRoutes);

// Error handling (copy from error-handlers.js example)
// ... error handlers implementation ...

// Graceful shutdown
const server = app.listen(PORT, () => {
  console.log(`🚀 ${SERVICE_NAME} listening on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  Service info:`);
  console.log(`    - GET  http://localhost:${PORT}/`);
  console.log(`  Health endpoints:`);
  console.log(`    - GET  http://localhost:${PORT}/health`);
  console.log(`    - GET  http://localhost:${PORT}/health/readiness`);
  console.log(`    - GET  http://localhost:${PORT}/health/liveness`);
  console.log(`  API endpoints:`);
  console.log(`    - Add your endpoints here`);
  console.log(`  Webhook endpoints:`);
  console.log(`    - Add your webhook endpoints here`);
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});