/**
 * Password validation utilities
 * Enforces strong password policies
 */

import { SECURITY } from '../config/constants.js';
import { ValidationError } from './AppError.js';

/**
 * Validate password strength
 * Requirements: Min 12 chars, uppercase, number, special character
 */
export const validatePasswordStrength = (password) => {
  if (!password) {
    throw new ValidationError('Password is required');
  }

  if (password.length < SECURITY.PASSWORD_MIN_LENGTH) {
    throw new ValidationError(
      `Password must be at least ${SECURITY.PASSWORD_MIN_LENGTH} characters long`
    );
  }

  if (!SECURITY.PASSWORD_REGEX.test(password)) {
    throw new ValidationError(
      'Password must contain uppercase letter, number, and special character (!@#$%^&*)'
    );
  }

  return true;
};

/**
 * Check if password has common patterns (prevent weak passwords)
 */
export const hasCommonPatterns = (password) => {
  const commonPatterns = [
    '123456',
    'password',
    'qwerty',
    '12345678',
    'abc123',
    'password123'
  ];

  return commonPatterns.some(pattern =>
    password.toLowerCase().includes(pattern.toLowerCase())
  );
};
