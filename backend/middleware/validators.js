/**
 * Input validation schemas using express-validator
 * Validates all incoming requests before processing
 */

import { body, param, query, validationResult } from 'express-validator';
import { SECURITY, USER, BLOG, PAGINATION } from '../config/constants.js';
import { ValidationError } from '../utils/AppError.js';

/**
 * Validation middleware to handle validation errors
 */
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(err => ({
      field: err.param,
      message: err.msg,
      value: err.value
    }));
    throw new ValidationError('Validation failed', formattedErrors);
  }
  next();
};

// ===== USER VALIDATORS =====

export const validateSignUp = [
  body('name')
    .trim()
    .isLength({ min: USER.NAME_MIN_LENGTH, max: USER.NAME_MAX_LENGTH })
    .withMessage(`Name must be between ${USER.NAME_MIN_LENGTH} and ${USER.NAME_MAX_LENGTH} characters`)
    .escape()
    .withMessage('Name contains invalid characters'),
  
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail()
    .toLowerCase(),
  
  body('password')
    .isLength({ min: SECURITY.PASSWORD_MIN_LENGTH })
    .withMessage(`Password must be at least ${SECURITY.PASSWORD_MIN_LENGTH} characters`)
    .matches(SECURITY.PASSWORD_REGEX)
    .withMessage('Password must contain uppercase, number, and special character (!@#$%^&*)')
    .custom((value) => {
      const commonPatterns = ['123456', 'password', 'qwerty', 'abc123', 'password123'];
      if (commonPatterns.some(p => value.toLowerCase().includes(p))) {
        throw new Error('Password is too common');
      }
      return true;
    }),
];

export const validateLogin = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

export const validateUpdateProfile = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: USER.NAME_MIN_LENGTH, max: USER.NAME_MAX_LENGTH })
    .withMessage(`Name must be between ${USER.NAME_MIN_LENGTH} and ${USER.NAME_MAX_LENGTH} characters`)
    .escape(),
  
  body('bio')
    .optional()
    .trim()
    .isLength({ max: USER.BIO_MAX_LENGTH })
    .withMessage(`Bio must not exceed ${USER.BIO_MAX_LENGTH} characters`)
    .escape(),
  
  body('location')
    .optional()
    .trim()
    .escape(),
  
  body('phone')
    .optional()
    .trim()
    .isMobilePhone()
    .withMessage('Invalid phone number format'),
  
  body('website')
    .optional()
    .trim()
    .isURL()
    .withMessage('Invalid website URL'),
  
  body('profilePicture')
    .optional()
    .trim()
    .isURL()
    .withMessage('Invalid profile picture URL'),
  
  body('socialMedia.twitter')
    .optional()
    .trim()
    .escape(),
  
  body('socialMedia.linkedin')
    .optional()
    .trim()
    .escape(),
  
  body('socialMedia.instagram')
    .optional()
    .trim()
    .escape(),
  
  body('socialMedia.github')
    .optional()
    .trim()
    .escape(),
];

export const validateChangePassword = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  
  body('newPassword')
    .isLength({ min: SECURITY.PASSWORD_MIN_LENGTH })
    .withMessage(`New password must be at least ${SECURITY.PASSWORD_MIN_LENGTH} characters`)
    .matches(SECURITY.PASSWORD_REGEX)
    .withMessage('Password must contain uppercase, number, and special character (!@#$%^&*)')
    .custom((value, { req }) => {
      if (value === req.body.currentPassword) {
        throw new Error('New password must be different from current password');
      }
      return true;
    }),
  
  body('confirmPassword')
    .notEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
];

// ===== BLOG VALIDATORS =====

export const validateBlogCreate = [
  body('title')
    .trim()
    .isLength({ min: 5, max: BLOG.TITLE_MAX_LENGTH })
    .withMessage(`Title must be between 5 and ${BLOG.TITLE_MAX_LENGTH} characters`)
    .escape(),
  
  body('description')
    .trim()
    .isLength({ min: BLOG.DESCRIPTION_MIN_LENGTH, max: BLOG.DESCRIPTION_MAX_LENGTH })
    .withMessage(`Description must be between ${BLOG.DESCRIPTION_MIN_LENGTH} and ${BLOG.DESCRIPTION_MAX_LENGTH} characters`),
  
  body('image')
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage('Invalid image URL'),
];

export const validateBlogUpdate = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 5, max: BLOG.TITLE_MAX_LENGTH })
    .withMessage(`Title must be between 5 and ${BLOG.TITLE_MAX_LENGTH} characters`)
    .escape(),
  
  body('description')
    .optional()
    .trim()
    .isLength({ min: BLOG.DESCRIPTION_MIN_LENGTH, max: BLOG.DESCRIPTION_MAX_LENGTH })
    .withMessage(`Description must be between ${BLOG.DESCRIPTION_MIN_LENGTH} and ${BLOG.DESCRIPTION_MAX_LENGTH} characters`),
];

// ===== PAGINATION VALIDATORS =====

export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer')
    .toInt(),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: PAGINATION.MAX_LIMIT })
    .withMessage(`Limit must be between 1 and ${PAGINATION.MAX_LIMIT}`)
    .toInt(),
];

// ===== PARAM VALIDATORS =====

export const validateObjectId = [
  param('id')
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage('Invalid ID format'),
];

export const validateBlogId = [
  param('blogId')
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage('Invalid blog ID format'),
];

export const validateIdParam = [
  param('id')
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage('Invalid blog ID format'),
];
