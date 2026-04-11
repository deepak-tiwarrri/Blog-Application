import React from "react";
import AuthForm from "./features/AuthForm";
import { useLocation } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop.js";
import { useAuthSubmit, useAuthRedirect } from "@/hooks/useAuthSubmit";

const Signup = () => {
  useScrollToTop();
  useAuthRedirect();

  const location = useLocation();
  const isLoginMode = location.pathname === "/login";
  const { handleSubmit } = useAuthSubmit('signup');

  return (
    <>
      <AuthForm onHandleSubmit={handleSubmit} isLoginMode={isLoginMode} />
    </>
  );
};

export default Signup;
