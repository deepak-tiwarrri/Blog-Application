import React from "react";
import AuthForm from "./features/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { sendRequest } from "@/store";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
const Signup = () => {
  const input = useSelector((state) => state.auth?.input);
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginMode = location.pathname === "/login";
  const dispatch = useDispatch();

  // Redirect if already logged in
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/blogs", { replace: true });
    }
  }, [isLoggedIn, navigate]);


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendRequest({ type: "signup", input })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Signup successful!", { position: "top-right", duration: 1500 });
        setTimeout(() => {
          navigate("/blogs");
        }, 1500);
      }
    });
  };

  React.useEffect(() => {
    if (status === "pending") {
      toast.loading("Signing up...", { position: "top-right", duration: 1200 });
    }
    if (status === "failed" && error) {
      toast.error(typeof error === "object" ? error?.message : error, { position: "top-right", duration: 2500 });
    }
  }, [status, error]);

  return (
    <>
      <AuthForm onHandleSubmit={handleSubmit} isLoginMode={isLoginMode} />
    </>
  );
};

export default Signup;
