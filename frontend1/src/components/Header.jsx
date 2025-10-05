
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authActions } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  // Conditional rendering logic
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";
  const [theme, setTheme] = React.useState(
    () => localStorage.getItem("theme") || "light"
  );

  React.useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Logout Handler
  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/login");
  };

  return (
    <Box className="bg-gradient-to-r from-gray-950 to-gray-800 sticky top-0 flex justify-between items-center px-6 py-4 shadow-lg">
      {/* Left Section - Logo */}
      <h2
        className="font-semibold text-3xl cursor-pointer hover:text-purple-300"
        style={{ color: "var(--text)" }}
      >
        <Link to="/">Bite&Roam</Link>
      </h2>
      {isLoggedIn && (
        <Box className="ml-8 mr-auto">
          <Tabs defaultValue="allBlogs" className="">
            <TabsList>
              <Link to="/blogs">
                <TabsTrigger value="allBlogs">All Blogs</TabsTrigger>
              </Link>
              <Link to={"/myblogs"}>
                <TabsTrigger value="myBlogs">My Blogs</TabsTrigger>
              </Link>
            </TabsList>
          </Tabs>
        </Box>
      )}

      {/* Right Section - Navigation Buttons */}
      <Box className="flex space-x-4 items-center">
        {/* Theme toggle */}
        {/* <button
          onClick={() =>
            setTheme((prev) => (prev === "dark" ? "light" : "dark"))
          }
          className="p-2 rounded-full hover:bg-gray-700 text-white"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </button> */}
        {/* Conditionally show Login button */}
        {!isLoggedIn && !isLoginPage && (
          <Button
            className="rounded-full text-white bg-blue-500 hover:bg-blue-400 px-6 py-2 transition-all "
            asChild
          >
            <Link to="/login">Login</Link>
          </Button>
        )}

        {/* Conditionally show Signup button */}
        {!isLoggedIn && !isSignupPage && (
          <Button
            className="rounded-full text-white bg-blue-500 hover:bg-blue-400 px-6 py-2 transition-all"
            asChild
          >
            <Link to="/signup">Signup</Link>
          </Button>
        )}

        {/* {isLoggedIn && (
          <Button className="rounded-full text-white bg-blue-500 hover:bg-blue-400 px-4 py-2">
            <Link to="/profile">Profile</Link>
          </Button>
        )} */}

        {/* Logout Button */}
        {isLoggedIn && (
          <Button
            className="rounded-full text-white bg-red-600 hover:bg-red-500 px-6 py-2 transition-all"
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Header;
