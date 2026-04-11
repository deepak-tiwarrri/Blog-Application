/**
 * Form Validation Utilities
 * Centralized validation logic for common form fields
 * Eliminates validation logic duplication across components
 */

import { showErrorToast } from './toast';

/**
 * Validate blog form fields
 * @param {object} formData - Form data object
 * @param {string} formData.title - Blog title
 * @param {string} formData.description - Blog description  
 * @param {string} formData.image - Image URL
 * @returns {boolean} - True if valid
 */
export const validateBlogForm = (formData) => {
  if (!formData.title?.trim()) {
    showErrorToast('Title is required');
    return false;
  }

  if (formData.title.length < 3) {
    showErrorToast('Title must be at least 3 characters');
    return false;
  }

  if (!formData.description?.trim()) {
    showErrorToast('Description is required');
    return false;
  }

  if (formData.description.length < 10) {
    showErrorToast('Description must be at least 10 characters');
    return false;
  }

  if (!formData.image?.trim()) {
    showErrorToast('Image URL is required');
    return false;
  }

  return true;
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showErrorToast('Please enter a valid email address');
    return false;
  }
  return true;
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @param {number} minLength - Minimum length (default: 6)
 * @returns {boolean} - True if valid
 */
export const validatePassword = (password, minLength = 6) => {
  if (!password) {
    showErrorToast('Password is required');
    return false;
  }

  if (password.length < minLength) {
    showErrorToast(`Password must be at least ${minLength} characters`);
    return false;
  }

  return true;
};

/**
 * Validate user name
 * @param {string} name - Name to validate
 * @param {number} minLength - Minimum length (default: 2)
 * @returns {boolean} - True if valid
 */
export const validateName = (name, minLength = 2) => {
  if (!name?.trim()) {
    showErrorToast('Name is required');
    return false;
  }

  if (name.trim().length < minLength) {
    showErrorToast(`Name must be at least ${minLength} characters`);
    return false;
  }

  return true;
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid
 */
export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    showErrorToast('Please enter a valid URL');
    return false;
  }
};

/**
 * Validate profile picture URL
 * @param {string} url - Image URL to validate
 * @returns {boolean} - True if valid
 */
export const validateImageURL = (url) => {
  if (!url?.trim()) {
    showErrorToast('Image URL is required');
    return false;
  }

  if (!url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
    showErrorToast('Please enter a valid image URL (jpg, png, gif, webp)');
    return false;
  }

  return true;
};

/**
 * Validate multiple fields at once
 * @param {object} fields - Object with field names and values
 * @param {object} rules - Validation rules object
 * @example
 * validateFields(
 *   { title: 'My Blog', email: 'user@example.com' },
 *   { 
 *     title: (val) => val.length >= 3 || 'Title too short',
 *     email: (val) => validateEmail(val) || 'Invalid email'
 *   }
 * )
 * @returns {boolean} - True if all fields valid
 */
export const validateFields = (fields, rules) => {
  for (const [fieldName, validator] of Object.entries(rules)) {
    const fieldValue = fields[fieldName];
    const result = validator(fieldValue);

    if (result !== true) {
      showErrorToast(result || `${fieldName} is invalid`);
      return false;
    }
  }

  return true;
};

/**
 * Get password strength level
 * @param {string} password - Password to check
 * @returns {object} - { level: 'weak'|'medium'|'strong', score: 0-3 }
 */
export const getPasswordStrength = (password) => {
  let score = 0;

  if (!password) return { level: 'weak', score: 0 };

  // Length
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  // Mix
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*()]/.test(password)) score++;

  const levels = ['weak', 'weak', 'medium', 'strong', 'strong'];
  return { level: levels[Math.min(score, 4)], score: Math.min(score, 3) };
};
