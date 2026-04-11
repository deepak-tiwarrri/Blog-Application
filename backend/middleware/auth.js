import jwt from "jsonwebtoken";
import { UnauthorizedError } from '../utils/AppError.js';

/**
 * Authentication middleware
 * Verifies JWT token from Authorization header
 * Sets req.userId for authenticated requests
 */
const authMiddleware = (req, res, next) => {
  try {
    // Extract token from Authorization header (Bearer scheme)
    const authHeader = req.headers["authorization"];
    
    if (!authHeader) {
      throw new UnauthorizedError('No authorization header provided');
    }

    // Verify Bearer scheme: "Bearer <token>"
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      throw new UnauthorizedError('Invalid authorization header format. Use: Bearer <token>');
    }

    const token = parts[1];

    // Verify JWT token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
      req.userRole = decoded.role || 'user';
      next();
    } catch (tokenError) {
      if (tokenError.name === 'TokenExpiredError') {
        throw new UnauthorizedError('Token has expired. Please login again.');
      } else if (tokenError.name === 'JsonWebTokenError') {
        throw new UnauthorizedError('Invalid token provided');
      }
      throw new UnauthorizedError('Token verification failed');
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Optional authentication middleware
 * Does not throw error if token absent, but validates if present
 */
export const optionalAuthMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    
    if (!authHeader) {
      return next();  // Token not required
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return next();  // Invalid format, skip
    }

    const token = parts[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role || 'user';
  } catch (error) {
    // Token validation failed but it's optional, so continue
  }
  next();
};

export default authMiddleware;
