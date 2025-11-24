// Error handling implementation examples
// Copy these handlers into your server.js file

// Required: 404 handler with structured response
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: `The endpoint ${req.method} ${req.originalUrl} does not exist`,
    availableEndpoints: {
      ui: {
        'GET /': 'Service information or demo UI'
      },
      health: {
        'GET /health': 'Comprehensive health check',
        'GET /health/readiness': 'Service readiness probe',
        'GET /health/liveness': 'Service liveness probe'
      },
      api: {
        // Add your API endpoints here
        'POST /api/endpoint': 'Description of your API endpoint',
        'GET /api/resource': 'Description of your resource endpoint'
      },
      webhooks: {
        // Add your webhook endpoints here
        'POST /webhook/type': 'Description of your webhook endpoint'
      }
    },
    timestamp: new Date().toISOString()
  });
});

// Required: Global error handler with structured logging
app.use((err, req, res, next) => {
  // Log the error with context
  console.error('Unhandled server error:', {
    error: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    timestamp: new Date().toISOString(),
    userAgent: req.get('user-agent'),
    ip: req.ip
  });
  
  // Send structured error response
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred',
    timestamp: new Date().toISOString(),
    // Only include request ID in production for tracking
    requestId: process.env.NODE_ENV === 'production' ? 
      req.headers['x-request-id'] : undefined
  });
});

// Optional: Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log({
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get('user-agent'),
      ip: req.ip,
      timestamp: new Date().toISOString()
    });
  });
  
  next();
});

// Optional: Async error wrapper for route handlers
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Example usage with async route handler
app.post('/api/example', asyncHandler(async (req, res) => {
  // Your async route logic here
  const result = await someAsyncOperation();
  res.json(result);
}));