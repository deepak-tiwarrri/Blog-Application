// AuthForm.jsx
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Box } from "@mui/material";
import {  Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/store";
const AuthForm = ({ onHandleSubmit, isLoginMode}) => {
  
  const input = useSelector((state) => state.auth?.input);
  // console.log(input);

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(authActions.updateInput({ [name]: value }));
  };

  return (
    <form onSubmit={onHandleSubmit}>
      <Box
        maxWidth={400}
        maxHeight={500}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out ",
          boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.2)",
          },
        }}
        padding={2}
        margin="auto"
        marginTop={5}
        marginBottom={5}
        borderRadius={5}
        height={isLoginMode ? 450 : 510}
        gap={2}
      >
        <h2 className="pb-2 font-semibold text-4xl text-stone-950">
          {isLoginMode ? "Login" : "Sign Up"}
        </h2>
        <Box className="flex-column p-7 self-stretch">
          {/* Name field for Signup */}
          {!isLoginMode && (
            <Box className="flex flex-auto flex-col gap-2">
              <Label
                htmlFor="name"
                className="font-semibold text-base text-stone-950"
              >
                Name
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={input?.name}
                onChange={handleChange}
                required
              />
            </Box>
          )}

          {/* Common Email field */}
          <Box className="flex flex-auto flex-col gap-2 mt-4">
            <Label
              htmlFor="email"
              className="font-semibold text-base text-stone-950"
            >
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={input?.email}
              onChange={handleChange}
              required
            />
          </Box>

          {/* Common Password field */}
          <Box className="flex flex-auto flex-col gap-2 mt-4">
            <Label
              htmlFor="password"
              className="font-semibold text-base text-stone-950"
            >
              Password
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={input?.password}
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </Box>
        </Box>

        {/* Submit Button */}
        <Button
          type="submit"
          className="py-2 w-full text-base bg-stone-950 hover:bg-stone-800 focus:ring-2 focus:ring-red-300"
        >
          {isLoginMode ? "Login" : "Sign Up"}
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
