import jwt from "jsonwebtoken";
import { SECURITY } from './constants.js';

/**
 * Generate JWT access token
 * Short-lived token for API authentication
 */
export const generateAccessToken = (userId) => {
  if (!userId) throw new Error('User ID is required');
  
  const token = jwt.sign(
    { id: userId, type: 'access' },
    process.env.JWT_SECRET,
    { expiresIn: SECURITY.JWT_EXPIRY_ACCESS }
  );
  return token;
};

/**
 * Generate JWT refresh token
 * Long-lived token for obtaining new access tokens
 */
export const generateRefreshToken = (userId) => {
  if (!userId) throw new Error('User ID is required');
  
  const token = jwt.sign(
    { id: userId, type: 'refresh' },
    process.env.REFRESH_SECRET || process.env.JWT_SECRET,
    { expiresIn: SECURITY.JWT_EXPIRY_REFRESH }
  );
  return token;
};

/**
 * Generate both access and refresh tokens
 */
export const generateTokenPair = (userId) => {
  return {
    accessToken: generateAccessToken(userId),
    refreshToken: generateRefreshToken(userId),
  };
};

/**
 * DEPRECATED: Use generateAccessToken instead
 */
export const generateToken = (userId, expiresTime = SECURITY.JWT_EXPIRY_ACCESS) => {
  return generateAccessToken(userId);
};