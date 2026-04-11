import axios from "axios";
import { BLOG_URL, USER_URL } from "./lib/endpoints";

const api = axios.create({
  baseURL: "",
  timeout: 10000,
});

// Intercept responses to catch 401s globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      if (typeof window !== "undefined" && window.axios) {
        delete window.axios.defaults.headers.common["Authorization"];
      }

      const isAuthPage = window.location.pathname === '/login' || window.location.pathname === '/signup';
      if (!isAuthPage) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Sets or removes the Authorization header for all API requests.
 * Call this after login/signup and on app load if a token exists.
 * @param {string|null} token - The JWT token to set, or null/undefined to remove it.
 */
export const setAuthToken = (token) => {
  if (token) {
    // Set the Authorization header for all future requests
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Optionally, set for global axios if used elsewhere
    if (typeof window !== "undefined" && window.axios) {
      window.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  } else {
    delete api.defaults.headers.common["Authorization"];
    if (typeof window !== "undefined" && window.axios) {
      delete window.axios.defaults.headers.common["Authorization"];
    }
  }
};

// helper methods that target backend endpoints
export const blogApi = {
  getAll: (params) => api.get(`${BLOG_URL}`, { params }),
  getById: (id) => api.get(`${BLOG_URL}/${id}`),
  add: (payload) => api.post(`${BLOG_URL}/add`, payload),
  update: (id, payload) => api.put(`${BLOG_URL}/${id}`, payload),
  delete: (id) => api.delete(`${BLOG_URL}/${id}`),
  getBlogByUserId: (id) => api.get(`${BLOG_URL}/user/${id}`),
  // Like and bookmark endpoints
  likeBlog: (blogId) => api.post(`${BLOG_URL}/${blogId}/like`),
  unlikeBlog: (blogId) => api.delete(`${BLOG_URL}/${blogId}/like`),
  bookmarkBlog: (blogId) => api.post(`${BLOG_URL}/${blogId}/bookmark`),
  removeBookmark: (blogId) => api.delete(`${BLOG_URL}/${blogId}/bookmark`),
  checkInteractions: (blogId) => api.get(`${BLOG_URL}/${blogId}/interactions`),
  // Comments
  getComments: (blogId) => api.get(`${BLOG_URL}/${blogId}/comments`),
  addComment: (blogId, payload) => api.post(`${BLOG_URL}/${blogId}/comments`, payload),
  deleteComment: (commentId) => api.delete(`${BLOG_URL}/comments/${commentId}`),
};

export const userApi = {
  signup: (payload) => api.post(`${USER_URL}/signup`, payload),
  login: (payload) => api.post(`${USER_URL}/login`, payload),
  googleSignIn: (payload) => api.post(`${USER_URL}/google-signin`, payload),
  getById: (id) => api.get(`${USER_URL}/${id}`),
  getProfile: (id) => api.get(`${USER_URL}/${id}`),
  updateProfile: (id, payload) => api.put(`${USER_URL}/${id}`, payload),
  changePassword: (id, payload) => api.put(`${USER_URL}/${id}/change-password`, payload),
};

export default api;
