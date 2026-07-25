const FRONTEND_PORT = 5001;

const normalizeApiBase = (value) => {
  const trimmed = (value || "http://localhost:8000/api").trim().replace(/\/+$/, "");
  return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
};

const API_BASE_URL = normalizeApiBase(import.meta.env.VITE_API_URL || "http://localhost:8000/api");

export const BLOG_URL = `${API_BASE_URL}/blog`;
export const USER_URL = `${API_BASE_URL}/user`;

