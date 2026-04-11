/**
 * Input sanitization utilities
 * Prevents XSS, NoSQL injection, and other input-based attacks
 */

import sanitizeHtml from 'sanitize-html';

/**
 * Sanitize HTML content to prevent XSS attacks
 * Removes script tags and potentially malicious content
 */
export const sanitizeHTMLContent = (content) => {
  return sanitizeHtml(content, {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre'],
    allowedAttributes: {
      a: ['href', 'title', 'target'],
      code: []
    },
    disallowedTagsMode: 'discard',
  });
};

/**
 * Remove potentially dangerous object keys (like __proto__)
 */
export const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;

  const sanitized = {};
  const dangerousKeys = ['__proto__', 'constructor', 'prototype'];

  Object.keys(obj).forEach(key => {
    if (!dangerousKeys.includes(key)) {
      sanitized[key] = obj[key];
    }
  });

  return sanitized;
};

/**
 * Escape special regex characters to prevent regex injection
 */
export const escapeRegex = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
