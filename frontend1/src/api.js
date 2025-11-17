import axios from 'axios';
import { BLOG_URL, USER_URL } from './components/utils';

// create an axios instance with default baseURL (we'll keep BLOG_URL as base for blog calls)
const api = axios.create({
  baseURL: '', // we'll use absolute URLs in utils, but keep instance for headers
  timeout: 10000,
});

/**
 * Sets or removes the Authorization header for all API requests.
 * Call this after login/signup and on app load if a token exists.
 * @param {string|null} token - The JWT token to set, or null/undefined to remove it.
 */
export function setAuthToken(token) {
  if (token) {
    // Set the Authorization header for all future requests
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // console.log(`api header: ${api.defaults.headers.common['Authorization']}`);


    // Optionally, set for global axios if used elsewhere
    if (typeof window !== 'undefined' && window.axios) {
      window.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  } else {
    // Remove the Authorization header
    delete api.defaults.headers.common['Authorization'];
    if (typeof window !== 'undefined' && window.axios) {
      delete window.axios.defaults.headers.common['Authorization'];
    }
  }
}

// helper methods that target backend endpoints
export const blogApi = {
  getAll: () => api.get(`${BLOG_URL}`),
  getById: (id) => api.get(`${BLOG_URL}/${id}`),
  add: (payload) => api.post(`${BLOG_URL}/add`, payload),
  update: (id, payload) => api.put(`${BLOG_URL}/update/${id}`, payload),
  delete: (id) => api.delete(`${BLOG_URL}/${id}`),
  getBlogByUserId: (id) => api.get(`${BLOG_URL}/user/${id}`),
};

export const userApi = {
  signup: (payload) => api.post(`${USER_URL}/signup`, payload),
  login: (payload) => api.post(`${USER_URL}/login`, payload),
  getById: (id) => api.get(`${USER_URL}/${id}`),
};

export default api;
