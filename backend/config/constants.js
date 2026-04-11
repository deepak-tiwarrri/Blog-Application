/**
 * Application constants and configuration values
 * Centralized to avoid magic numbers scattered throughout codebase
 */

export const SECURITY = {
  // Password requirements
  PASSWORD_MIN_LENGTH: 12,
  PASSWORD_REGEX: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
  
  // JWT configuration
  JWT_EXPIRY_ACCESS: '24h',
  JWT_EXPIRY_REFRESH: '7d',
  
  // Bcrypt rounds (computational cost)
  BCRYPT_ROUNDS: 12,
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
};

export const BLOG = {
  READING_TIME_WPM: 200,  // Words per minute
  TITLE_MAX_LENGTH: 200,
  DESCRIPTION_MAX_LENGTH: 50000,
  DESCRIPTION_MIN_LENGTH: 10,
};

export const USER = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  BIO_MAX_LENGTH: 500,
};

export const RATE_LIMITS = {
  AUTH_LOGIN: { windowMs: 15 * 60 * 1000, max: 5 },  // 5 attempts per 15 min
  AUTH_SIGNUP: { windowMs: 60 * 60 * 1000, max: 5 },  // 5 attempts per hour
  AUTH_PASSWORDCHANGE: { windowMs: 60 * 60 * 1000, max: 3 },  // 3 attempts per hour
  GENERAL: { windowMs: 15 * 60 * 1000, max: 100 },  // 100 requests per 15 min
};

export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};
