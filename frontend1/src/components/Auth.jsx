import { authActions } from "@/store";
import axios from "axios";
import React from "react";
import { useDispatch, useLocation } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import { USER_URL } from "./utils";
const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isSignup, setIsSignUp] = useState(true);

  const sendRequest = async (type = "login") => {
    try {
      const response = await axios.post(
        `${USER_URL}/${type}`,
        {
          name: input.name,
          email: input.email,
          password: input.password,
        }
      );
      console.log("response from the server", response.data);
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
      console.log(error.message?.data || error.message);
    }
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"));
    } else {
      sendRequest("login")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"));
    }
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
