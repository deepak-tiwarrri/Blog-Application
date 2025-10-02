import axios from 'axios';
import { BLOG_URL, USER_URL } from './components/utils';

// create an axios instance with default baseURL (we'll keep BLOG_URL as base for blog calls)
const api = axios.create({
  baseURL: '', // we'll use absolute URLs in utils, but keep instance for headers
  timeout: 10000,
  headers:{
    'Authorization':"Bearer "
  }
});

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // also set global axios default so any import of axios still has header
    // eslint-disable-next-line no-undef
    try { window.axios && (window.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`); } catch(e) {}
  } else {
    delete api.defaults.headers.common['Authorization'];
    try { window.axios && delete window.axios.defaults.headers.common['Authorization']; } catch(e) {}
  }
}

// helper methods that target backend endpoints
export const blogApi = {
  getAll: () => api.get(`${BLOG_URL}`),
  getById: (id) => api.get(`${BLOG_URL}/${id}`),
  add: (payload) => api.post(`${BLOG_URL}/add`, payload),
  update: (id, payload) => api.put(`${BLOG_URL}/update/${id}`, payload),
  delete: (id) => api.delete(`${BLOG_URL}/${id}`),
};

export const userApi = {
  signup: (payload) => api.post(`${USER_URL}/signup`, payload),
  login: (payload) => api.post(`${USER_URL}/login`, payload),
  getById: (id) => api.get(`${USER_URL}/${id}`),
};

export default api;
