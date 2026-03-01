/**
 * Toast Notification Utilities
 * Centralized toast notification handling to reduce code duplication
 */

import { toast } from 'sonner';

export const toastConfig = {
  position: 'top-right',
  duration: 1500,
};

export const showLoadingToast = (message = 'Loading...') => {
  toast.loading(message, { ...toastConfig, duration: 1000 });
};

export const showSuccessToast = (message = 'Operation successful!') => {
  toast.success(message, toastConfig);
};

export const showErrorToast = (error) => {
  const message = typeof error === 'object' ? error?.message : error;
  toast.error(message || 'An error occurred', { ...toastConfig, duration: 2500 });
};

/**
 * Handle async request toasts with loading, success, and error states
 * @param {string} type - 'login' or 'signup'
 * @param {object} status - Current status ('pending', 'fulfilled', 'failed')
 * @param {any} error - Error object if request failed
 */
export const handleAuthToasts = (type, status, error) => {
  if (status === 'pending') {
    const message = type === 'signup' ? 'Signing up...' : 'Logging in...';
    showLoadingToast(message);
  }
  
  if (status === 'failed' && error) {
    showErrorToast(error);
  }
};

/**
 * Generic response handler for API calls
 * @param {object} result - Redux async thunk result
 * @param {string} successMessage - Message to show on success
 * @param {string} errorMessage - Message to show on error
 * @param {function} onSuccess - Callback on success
 */
export const handleAsyncResponse = (result, successMessage, errorMessage, onSuccess) => {
  if (result.meta.requestStatus === 'fulfilled') {
    showSuccessToast(successMessage);
    if (onSuccess) onSuccess();
  } else {
    showErrorToast(result.payload || errorMessage);
  }
};

/**
 * Handle common blog API errors
 */
export const handleBlogError = (error) => {
  if (error.response?.status === 401) {
    showErrorToast('Please login to continue');
  } else if (error.response?.status === 403) {
    showErrorToast('You do not have permission to perform this action');
  } else {
    showErrorToast(error.response?.data?.message || 'Failed to operation');
  }
};
