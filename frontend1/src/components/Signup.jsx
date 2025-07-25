import React from "react";
import AuthForm from "./AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { sendRequest } from "@/store";
import { useLocation, useNavigate } from "react-router-dom";
const Signup = () => {
  const input = useSelector((state) => state.auth?.input);
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginMode = location.pathname === "/login";
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendRequest({ type: "signup", input })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/blogs");
      }
    });
  };

  return (
    <>
      {status === "pending" && <p>Loading...</p>}
      <p className="text-red-700">
        {typeof error === "object" ? error?.message : error}
      </p>{" "}
      <AuthForm onHandleSubmit={handleSubmit} isLoginMode={isLoginMode} />
    </>
  );
};

export default Signup;
