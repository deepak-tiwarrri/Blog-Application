import { authActions } from "@/store";
import React, { useState } from "react";
import { useDispatch, useLocation } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import { USER_URL } from "./utils";
import { userApi, setAuthToken } from "@/api";
const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isSignup, setIsSignUp] = useState(true);
  const [input, setInput] = useState({ name: '', email: '', password: '' });

  const sendRequest = async (type = "login") => {
    try {
      const res = await (type === 'signup' ? userApi.signup({ name: input.name, email: input.email, password: input.password }) : userApi.login({ email: input.email, password: input.password }));
      const data = res.data;
      if (data?.token) {
        localStorage.setItem('token', data.token);
        setAuthToken(data.token);
      }
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest(isSignup ? 'signup' : 'login')
      .then((data) => {
        if (data?.user) {
          localStorage.setItem('userId', data.user._id);
          dispatch(authActions.login());
          navigate('/blogs');
        }
      });
  };
  console.log(location.pathname);
  return (
    <>
      <AuthForm
        isSignup={isSignup}
        handleSubmit={handleSubmit}
        setIsSignUp={setIsSignUp}
        setInput={setInput}
      />
    </>
  );
};

export default Auth;
