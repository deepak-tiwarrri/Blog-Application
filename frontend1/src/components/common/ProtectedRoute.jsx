import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * ProtectedRoute Component
 * Checks if user is logged in before rendering the route
 * If not logged in, redirects to /login immediately
 */
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
