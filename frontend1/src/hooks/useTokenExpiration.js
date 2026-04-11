import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authActions } from "@/store/index";
import api from "@/api";

/**
 * Custom hook to handle token expiration (24-hour expiration)
 * Checks on app load and every minute if token has expired
 * Automatically logs out user if expired
 */
export const useTokenExpiration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const TOKEN_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  const handleLogoutDueToExpiration = (reason = "session expired") => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenTimestamp");
    localStorage.removeItem("refreshToken");
    dispatch(authActions.logout());
    toast.error(`Your session has expired. Please log in again.`);
    navigate("/login");
  };

  const checkTokenExpiration = () => {
    const token = localStorage.getItem("token");
    const tokenTimestamp = localStorage.getItem("tokenTimestamp");

    if (token && tokenTimestamp) {
      const now = new Date().getTime();
      const tokenTime = parseInt(tokenTimestamp, 10);
      const elapsedTime = now - tokenTime;

      if (elapsedTime > TOKEN_EXPIRATION_TIME) {
        // Token has expired
        handleLogoutDueToExpiration("24-hour expiration");
      }
    }
  };

  // Setup axios interceptor for 401 responses (token invalid/expired on backend)
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token invalid/expired on backend
          handleLogoutDueToExpiration("unauthorized (401)");
        }
        return Promise.reject(error);
      }
    );

    // Check token expiration on mount
    checkTokenExpiration();

    // Check token expiration every 60 seconds
    const interval = setInterval(checkTokenExpiration, 60 * 1000);

    // Cleanup
    return () => {
      clearInterval(interval);
      api.interceptors.response.eject(interceptor);
    };
  }, [dispatch, navigate]);
};

/**
 * Helper function to set token with timestamp
 * Call this when storing token after login
 */
export const setTokenWithTimestamp = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    localStorage.setItem("tokenTimestamp", new Date().getTime().toString());
  }
};

/**
 * Helper function to get remaining token time
 */
export const getRemainingTokenTime = () => {
  const tokenTimestamp = localStorage.getItem("tokenTimestamp");
  if (!tokenTimestamp) return null;

  const TOKEN_EXPIRATION_TIME = 24 * 60 * 60 * 1000;
  const now = new Date().getTime();
  const tokenTime = parseInt(tokenTimestamp, 10);
  const remaining = TOKEN_EXPIRATION_TIME - (now - tokenTime);

  if (remaining <= 0) return 0;
  return Math.floor(remaining / (60 * 1000)); // Return in minutes
};
