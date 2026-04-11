/**
 * Rate limiting middleware
 * Prevents brute force attacks and DoS
 */

import rateLimit from 'express-rate-limit';
import { RATE_LIMITS } from '../config/constants.js';

/**
 * Rate limiter for login endpoint
 * Prevents brute force attacks on user accounts
 */
export const loginLimiter = rateLimit({
  windowMs: RATE_LIMITS.AUTH_LOGIN.windowMs,
  max: RATE_LIMITS.AUTH_LOGIN.max,
  message: 'Too many login attempts. Please try again after 15 minutes.',
  standardHeaders: true,  // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,   // Disable the `X-RateLimit-*` headers
  skip: (req) => process.env.NODE_ENV === 'development',  // Skip in dev
});

/**
 * Rate limiter for signup endpoint
 * Prevents account creation spam
 */
export const signupLimiter = rateLimit({
  windowMs: RATE_LIMITS.AUTH_SIGNUP.windowMs,
  max: RATE_LIMITS.AUTH_SIGNUP.max,
  message: 'Too many signup attempts. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => process.env.NODE_ENV === 'development',
});

/**
 * Rate limiter for password change endpoint
 */
export const passwordChangeLimiter = rateLimit({
  windowMs: RATE_LIMITS.AUTH_PASSWORDCHANGE.windowMs,
  max: RATE_LIMITS.AUTH_PASSWORDCHANGE.max,
  message: 'Too many password change attempts. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => process.env.NODE_ENV === 'development',
});

/**
 * General rate limiter for all API routes
 */
export const generalLimiter = rateLimit({
  windowMs: RATE_LIMITS.GENERAL.windowMs,
  max: RATE_LIMITS.GENERAL.max,
  message: 'Too many requests. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => process.env.NODE_ENV === 'development',
});
