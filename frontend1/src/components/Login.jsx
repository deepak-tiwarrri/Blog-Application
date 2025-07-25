import React, { useState, useEffect } from "react";
import AuthForm from "./AuthForm";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions, sendRequest } from "@/store";
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
        navigate("/blogs");
      }
    });
  };
  return (
    <>
      {status === "pending" && <p className="text-gray-700">Loading...</p>}
      {error && (
        <p className="text-red-700">
          {typeof error === "object" ? error?.message : error}
        </p>
      )}
      <AuthForm onHandleSubmit={handleSubmit} isLoginMode={isLoginMode} />;
    </>
  );
};

export default Login;
