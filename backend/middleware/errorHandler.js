/**
 * Global error handling middleware
 * Centralized error handling for all errors thrown in the application
 */

import { AppError } from '../utils/AppError.js';
import { HTTP_STATUS } from '../config/constants.js';

export const errorHandler = (err, req, res, next) => {
  // Log error for monitoring
  console.error(`[${new Date().toISOString()}] Error:`, {
    message: err.message,
    code: err.code,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
  });

  // Default error response
  let statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let code = 'INTERNAL_ERROR';
  let message = 'An unexpected error occurred';
  let details = null;

  // Handle AppError instances
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    code = err.code;
    message = err.message;
    details = err.details;
  }
  // Handle Mongoose validation errors
  else if (err.name === 'ValidationError') {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    code = 'VALIDATION_ERROR';
    message = 'Validation failed';
    details = Object.keys(err.errors).map(field => ({
      field,
      message: err.errors[field].message,
    }));
  }
  // Handle Mongoose duplicate key errors
  else if (err.code === 11000) {
    statusCode = HTTP_STATUS.CONFLICT;
    code = 'DUPLICATE_ENTRY';
    const field = Object.keys(err.keyPattern)[0];
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  }
  // Handle JWT errors
  else if (err.name === 'JsonWebTokenError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    code = 'INVALID_TOKEN';
    message = 'Invalid or expired token';
  }
  else if (err.name === 'TokenExpiredError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    code = 'TOKEN_EXPIRED';
    message = 'Token has expired';
  }

  // Don't expose error details in production
  const isProduction = process.env.NODE_ENV === 'production';

  return res.status(statusCode).json({
    success: false,
    code,
    message,
    ...(details && { details }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    timestamp: new Date().toISOString(),
  });
};

/**
 * Wrapper to catch async errors and pass to error handler
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
