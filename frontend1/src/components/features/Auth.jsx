import { sendRequest } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTokenWithTimestamp } from "@/hooks/useTokenExpiration";
import AuthForm from "./AuthForm";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoginMode = useSelector((state) => state.auth?.isLoggedIn === false);
  const input = useSelector((state) => state.auth?.input);
  const status = useSelector((state) => state.auth?.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      sendRequest({
        type: isLoginMode ? "login" : "signup",
        input,
      })
    ).then((action) => {
      // sendRequest thunk returns { user, token } on success
      if (action.payload?.user) {
        if (action.payload?.token) {
          setTokenWithTimestamp(action.payload.token);
        }
        navigate("/blogs");
      }
    });
  };

  return (
    <AuthForm
      onHandleSubmit={handleSubmit}
      isLoginMode={isLoginMode}
    />
  );
};

export default Auth;
