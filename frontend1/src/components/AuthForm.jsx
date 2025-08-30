// AuthForm.jsx
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Box } from "@mui/material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonIcon from '@mui/icons-material/Person';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/store";
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
    <form onSubmit={onHandleSubmit}>
      <Box
        className="max-w-md w-full mx-auto bg-white dark:bg-gray-800 rounded-xl"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out ",
          boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.08)",
          },
        }}
        padding={2}
        margin="auto"
        marginTop={6}
        marginBottom={6}
        borderRadius={5}
        height={isLoginMode ? 420 : 500}
        gap={2}
      >
        <h2 className="pb-2 font-semibold text-3xl md:text-4xl p-6" style={{color:'var(--text)'}}>
          {isLoginMode ? "Welcome Back" : "Create your account"}
        </h2>
        <Box className="flex-column p-6 md:p-8 self-stretch">
          {/* Name field for Signup */}
          {!isLoginMode && (
            <Box className="flex flex-auto flex-col gap-2">
              <Label
                htmlFor="name"
                className="font-semibold text-base"
                style={{color:'var(--text)'}}
              >
                Name
              </Label>
              <div className="flex items-center gap-3">
                <PersonIcon className="text-gray-400" />
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={input?.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </Box>
          )}

          {/* Common Email field */}
          <Box className="flex flex-auto flex-col gap-2 mt-4">
            <Label
              htmlFor="email"
              className="font-semibold text-base"
              style={{color:'var(--text)'}}
            >
              Email
            </Label>
            <div className="flex items-center gap-3">
              <MailOutlineIcon className="text-gray-400" />
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={input?.email}
                onChange={handleChange}
                required
              />
            </div>
          </Box>

          {/* Common Password field */}
          <Box className="flex flex-auto flex-col gap-2 mt-4">
            <Label
              htmlFor="password"
              className="font-semibold text-base"
              style={{color:'var(--text)'}}
            >
              Password
            </Label>
            <div className="flex items-center gap-3">
              <LockOutlinedIcon className="text-gray-400" />
              <Input
                type="password"
                id="password"
                name="password"
                value={input?.password}
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
          </Box>
        </Box>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={status === "loading"}
          className={`py-2 w-full text-base bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white ${status === "loading" ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          {status === "loading" ? (isLoginMode ? "Logging in..." : "Signing up...") : isLoginMode ? "Login" : "Sign Up"}
        </Button>

        {/* Toggle Link */}
        <p className="">
          {isLoginMode ? (
            <>
              Don't have an account?{" "}
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
      </Box>
    </form>
  );
};

export default AuthForm;
