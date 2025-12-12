import React, { useState, useEffect } from "react";
import AuthForm from "./features/AuthForm";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendRequest } from "@/store";
import { toast } from "sonner";



const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const input = useSelector((state) => state.auth?.input);
  const isLoginMode = location.pathname === "/login";
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendRequest({ type: "login", input })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Login successful!", {
          position: "top-right",
          duration: 1500,
        });
        setTimeout(() => {
          navigate("/blogs");
        }, 1500);
      }
    });
  };
  useEffect(() => {
    if (status === "pending") {
      toast.loading("Logging in...", { position: "top-right", duration: 1000 });
    }
    if (status === "failed" && error) {
      toast.error(typeof error === "object" ? error?.message : error, {
        position: "top-right",
        duration: 1300,
      });
    }
  }, [status, error]);

  return (
    <>
      <AuthForm onHandleSubmit={handleSubmit} isLoginMode={isLoginMode} />
    </>
  );
};

export default Login;
