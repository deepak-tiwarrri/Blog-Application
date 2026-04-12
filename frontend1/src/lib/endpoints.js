const FRONTEND_PORT = 5001;
// Use explicit environment variable for production, otherwise fallback to local dev backend.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
export const BLOG_URL = `${API_BASE_URL}/blog`;
export const USER_URL = `${API_BASE_URL}/user`;

