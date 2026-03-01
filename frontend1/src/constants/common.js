/**
 * Common Constants
 * Shared constants across the application
 * Prevents magic strings/numbers and ensures consistency
 */

// ===== HTTP Status Codes =====
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  INTERNAL_SERVER: 500,
  SERVICE_UNAVAILABLE: 503,
};

// ===== Route Paths =====
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  BLOGS: '/blogs',
  BLOG_DETAIL: '/blogs/:id',
  ADD_BLOG: '/addblog',
  MY_BLOGS: '/myblogs',
  PROFILE: '/profile',
  EDIT_BLOG: '/editblog/:id',
  CHANGE_PASSWORD: '/changepassword',
};

// ===== Toast Duration (ms) =====
export const TOAST_DURATION = {
  SHORT: 1500,
  NORMAL: 2000,
  LONG: 3000,
};

// ===== Request Status =====
export const REQUEST_STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  FAILED: 'failed',
};

// ===== Common Error Messages =====
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  INVALID_REQUEST: 'Invalid request. Please check your input.',
  LOGIN_REQUIRED: 'Please login to continue.',
  PERMISSION_DENIED: 'You do not have permission for this action.',
  NOT_FOUND: 'Resource not found.',
  ALREADY_EXISTS: 'This resource already exists.',
  SOMETHING_WRONG: 'Something went wrong. Please try again.',
  
  // Auth specific
  INVALID_CREDENTIALS: 'Invalid email or password.',
  EMAIL_REGISTERED: 'Email already registered.',
  WEAK_PASSWORD: 'Password is too weak.',
  
  // Blog specific
  BLOG_NOT_FOUND: 'Blog not found.',
  BLOG_DELETE_FAILED: 'Failed to delete blog.',
  BLOG_UPDATE_FAILED: 'Failed to update blog.',
  
  // Form validation
  FIELD_REQUIRED: 'This field is required.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_URL: 'Please enter a valid URL.',
  INVALID_IMAGE: 'Please enter a valid image URL.',
};

// ===== Common Success Messages =====
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  SIGNUP_SUCCESS: 'Signup successful!',
  LOGOUT_SUCCESS: 'Logged out successfully',
  BLOG_CREATED: 'Blog created successfully',
  BLOG_UPDATED: 'Blog updated successfully',
  BLOG_DELETED: 'Blog deleted successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  PASSWORD_CHANGED: 'Password changed successfully',
  OPERATION_SUCCESS: 'Operation completed successfully',
};

// ===== Local Storage Keys =====
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_ID: 'userId',
  USER_NAME: 'userName',
  USER_EMAIL: 'userEmail',
  THEME: 'theme',
  LANGUAGE: 'language',
};

// ===== API Endpoints (if not using separate config) =====
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
    LOGOUT: '/logout',
    REFRESH: '/refresh-token',
  },
  BLOGS: {
    GET_ALL: '/blogs',
    GET_ONE: '/blogs/:id',
    CREATE: '/blogs',
    UPDATE: '/blogs/:id',
    DELETE: '/blogs/:id',
    GET_MY_BLOGS: '/my-blogs',
  },
  USERS: {
    GET_PROFILE: '/users/:id',
    UPDATE_PROFILE: '/users/:id',
    CHANGE_PASSWORD: '/users/:id/change-password',
    DELETE_ACCOUNT: '/users/:id',
  },
};

// ===== Pagination Defaults =====
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  ITEMS_PER_PAGE: 10,
  ITEMS_PER_PAGE_OPTIONS: [5, 10, 15, 20],
};

// ===== Form Validation Rules =====
export const VALIDATION_RULES = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
  EMAIL: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 254,
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 128,
  },
  TITLE: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 200,
  },
  DESCRIPTION: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 5000,
  },
  BIO: {
    MIN_LENGTH: 0,
    MAX_LENGTH: 500,
  },
  PHONE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 15,
  },
};

// ===== Animation Timings (ms) =====
export const ANIMATION_TIMING = {
  FAST: 300,
  NORMAL: 600,
  SLOW: 1000,
  VERY_SLOW: 1500,
};

// ===== Breakpoints (Tailwind) =====
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
};

// ===== User Roles (if applicable) =====
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MODERATOR: 'moderator',
};

// ===== Blog Status =====
export const BLOG_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
};

// ===== Date Formats =====
export const DATE_FORMATS = {
  FULL: 'MMM dd, yyyy HH:mm',
  DATE_ONLY: 'MMM dd, yyyy',
  TIME_ONLY: 'HH:mm',
  ISO: 'yyyy-MM-dd\'T\'HH:mm:ss.SSSz',
};

// ===== Image Formats =====
export const SUPPORTED_IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

// ===== Max File Size =====
export const MAX_FILE_SIZE = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  DOCUMENT: 10 * 1024 * 1024, // 10MB
};
