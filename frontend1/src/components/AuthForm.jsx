// AuthForm.jsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Box } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/store";
import PropTypes from "prop-types";

const AuthForm = ({ onHandleSubmit, isLoginMode }) => {
  const input = useSelector((state) => state.auth?.input);
  // console.log(input);

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(authActions.updateInput({ [name]: value }));
  };

  const status = useSelector((state) => state.auth.status);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4">
      <div
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col justify-center"
        style={{ minHeight: 480 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-left">
          {isLoginMode ? "Welcome Back" : "Create your account"}
        </h2>
        <form onSubmit={onHandleSubmit} className="flex flex-col gap-6">
          {/* Name field for Signup */}
          {!isLoginMode && (
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="name"
                className="text-base font-medium text-gray-700"
              >
                Name
              </Label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-400 flex items-center h-full">
                  <PersonIcon fontSize="small" />
                </span>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={input?.name}
                  onChange={handleChange}
                  required
                  className="pl-10"
                />
              </div>
            </div>
          )}
          {/* Email field */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="email"
              className="text-base font-medium text-gray-700"
            >
              Email
            </Label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-400 flex items-center h-full">
                <MailOutlineIcon fontSize="small" />
              </span>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={input?.email}
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>
          </div>
          {/* Password field */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="password"
              className="text-base font-medium text-gray-700"
            >
              Password
            </Label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-400 flex items-center h-full">
                <LockOutlinedIcon fontSize="small" />
              </span>
              <Input
                type="password"
                id="password"
                name="password"
                value={input?.password}
                placeholder="Password"
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={status === "loading"}
            className="w-full text-base bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white mt-2"
          >
            {status === "loading"
              ? isLoginMode
                ? "Logging in..."
                : "Signing up..."
              : isLoginMode
              ? "Login"
              : "Sign Up"}
          </Button>
        </form>
        <div className="mt-8 text-left">
          <p className="text-sm text-gray-700">
            {isLoginMode ? (
              <>
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-500 font-medium hover:underline"
                >
                  Sign up now
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-500 font-medium hover:underline"
                >
                  Login now
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
AuthForm.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
  isLoginMode: PropTypes.bool.isRequired,
};

export default AuthForm;
