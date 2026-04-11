/**
 * API Response Handler Utilities
 * Consolidates common API response handling patterns
 * Reduces error handling duplication across hooks and components
 */

import { showErrorToast, showSuccessToast } from './toast';

/**
 * Generic API error handler
 * @param {Error} error - Error object from API call
 * @param {string} defaultMessage - Default error message
 * @returns {string} - Error message to display
 */
export const handleAPIError = (error, defaultMessage = 'An error occurred') => {
  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    defaultMessage;

  showErrorToast(errorMessage);
  return errorMessage;
};

/**
 * Handle blog API specific errors
 * @param {Error} error - Error from blog API
 */
export const handleBlogAPIError = (error) => {
  if (error?.response?.status === 401) {
    showErrorToast('Please login to continue');
  } else if (error?.response?.status === 403) {
    showErrorToast('You do not have permission to perform this action');
  } else if (error?.response?.status === 404) {
    showErrorToast('Blog not found');
  } else {
    handleAPIError(error, 'Failed to fetch blog');
  }
};

/**
 * Handle authentication API errors
 * @param {Error} error - Auth error
 */
export const handleAuthAPIError = (error) => {
  if (error?.response?.status === 400) {
    showErrorToast(error?.response?.data?.message || 'Invalid credentials');
  } else if (error?.response?.status === 409) {
    showErrorToast('Email already registered');
  } else if (error?.response?.status === 401) {
    showErrorToast('Invalid email or password');
  } else {
    handleAPIError(error, 'Authentication failed');
  }
};

/**
 * Handle user profile API errors
 * @param {Error} error - Profile error
 */
export const handleProfileAPIError = (error) => {
  if (error?.response?.status === 404) {
    showErrorToast('User profile not found');
  } else if (error?.response?.status === 403) {
    showErrorToast('No permission to view this profile');
  } else {
    handleAPIError(error, 'Failed to fetch profile');
  }
};

/**
 * Generic success handler for CRUD operations
 * @param {string} action - Action performed (create, update, delete, fetch)
 * @param {string} resource - Resource name (blog, user, comment)
 */
export const handleSuccessResponse = (action, resource) => {
  const messages = {
    create: `${resource} created successfully`,
    update: `${resource} updated successfully`,
    delete: `${resource} deleted successfully`,
    fetch: `${resource} fetched successfully`,
  };

  const message = messages[action] || `${action} successful`;
  showSuccessToast(message);
};

/**
 * Handle paginated API response
 * @param {object} response - API response
 * @returns {object} - Normalized pagination data
 */
export const handlePaginatedResponse = (response) => {
  return {
    data: response?.data || [],
    total: response?.total || 0,
    page: response?.page || 1,
    pages: response?.pages || 1,
    limit: response?.limit || 10,
  };
};

/**
 * Transform API response errors to user-friendly messages
 * @param {any} error - Error to transform
 * @returns {string} - User-friendly error message
 */
export const getErrorMessage = (error) => {
  // Network error
  if (!error?.response) {
    return 'Network error. Please check your connection.';
  }

  // Server errors
  const { status, data } = error.response;

  if (status >= 500) {
    return 'Server error. Please try again later.';
  }

  // Return backend message if available
  if (data?.message) {
    return data.message;
  }

  // Client errors
  if (status === 400) {
    return 'Invalid request. Please check your input.';
  }

  if (status === 401) {
    return 'Please login to continue.';
  }

  if (status === 403) {
    return 'You do not have permission for this action.';
  }

  if (status === 404) {
    return 'Resource not found.';
  }

  if (status === 409) {
    return 'This resource already exists.';
  }

  return 'Something went wrong. Please try again.';
};

/**
 * Format API response data
 * @param {object} data - Raw API response data
 * @param {function} transformer - Optional transform function
 * @returns {object|array} - Formatted data
 */
export const formatAPIResponse = (data, transformer = null) => {
  if (transformer) {
    return Array.isArray(data) ? data.map(transformer) : transformer(data);
  }
  return data;
};

/**
 * Retry failed API call with exponential backoff
 * @param {function} apiCall - Async API call function
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delay - Initial delay in ms
 * @returns {Promise} - API response
 */
export const retryAPICall = async (apiCall, maxRetries = 3, delay = 1000) => {
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error;

      // Don't retry if it's not a network error
      if (error?.response?.status && error.response.status < 500) {
        throw error;
      }

      // Wait before retrying
      if (i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }

  throw lastError;
};
