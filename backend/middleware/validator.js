import { body, validationResult } from 'express-validator';
import { sendError } from '../utils/responseFormatter.js';
import { AppError } from '../utils/AppError.js';

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendError(res, new AppError(errors.array()[0].msg, 400));
  }
  next();
};

export const blogValidationRules = () => {
  return [
    body('title')
      .trim()
      .notEmpty()
      .withMessage('Title is required')
      .isLength({ min: 5, max: 150 })
      .withMessage('Title must be between 5 and 150 characters'),
    body('description')
      .trim()
      .notEmpty()
      .withMessage('Description is required')
      .isLength({ min: 20 })
      .withMessage('Description must be at least 20 characters long'),
    // image might be optional or file-based later with multer, but keeping basic string check for urls if provided
  ];
};

export const signupValidationRules = () => {
  return [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters'),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
  ];
};

export const loginValidationRules = () => {
  return [
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password is required'),
  ];
};
