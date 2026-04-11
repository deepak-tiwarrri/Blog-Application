/**
 * Custom error class for API responses
 * Standardizes error handling across the application
 */

import { ERROR_CODES, HTTP_STATUS } from '../config/constants.js';

export class AppError extends Error {
  constructor(message, statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, code = ERROR_CODES.INTERNAL_ERROR, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.timestamp = new Date().toISOString();
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message, details = null) {
    super(message, HTTP_STATUS.BAD_REQUEST, ERROR_CODES.VALIDATION_ERROR, details);
    this.isValidationError = true;
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized access') {
    super(message, HTTP_STATUS.UNAUTHORIZED, ERROR_CODES.UNAUTHORIZED);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Access forbidden') {
    super(message, HTTP_STATUS.FORBIDDEN, ERROR_CODES.FORBIDDEN);
  }
}

export class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND);
  }
}

export class ConflictError extends AppError {
  constructor(message) {
    super(message, HTTP_STATUS.CONFLICT, ERROR_CODES.CONFLICT);
  }
}

export class BadRequestError extends AppError{
  constructor(message){
    super(message,HTTP_STATUS.BAD_REQUEST,ERROR_CODES.INTERNAL_ERROR);
  }
}

export class InvalidCredentialsError extends AppError {
  constructor(message = 'Invalid credentials provided') {
    super(message, HTTP_STATUS.BAD_REQUEST, ERROR_CODES.INVALID_CREDENTIALS);
  }
}
