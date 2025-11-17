
// @eslint-ignore
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link, NavLink, useLocation, useNavigate, useRoutes } from "react-router-dom";
import { authActions } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
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
  console.log(location.pathname);

  // Logout Handler
  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-r from-gray-950 to-gray-800 sticky top-0 flex justify-between items-center px-6 py-4 shadow-lg z-50" >
      {/* Left Section - Logo */}
      <h2 className="font-semibold text-3xl cursor-pointer text-white hover:text-purple-300">
        <Link to="/">Bite&Roam</Link>
      </h2>

      {isLoggedIn && (
        <div className="ml-8 ">
          <nav className="inline-flex space-x-2 items-center bg-gray-900/20 p-1 rounded-full" aria-label="Blogs tabs">
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                isActive
                  ? "nav-link bg-white/10 text-white "
                  : "nav-link text-gray-300 hover:bg-white/5 "
              }
            >
              All Blogs
            </NavLink>
            <NavLink
              to="/myblogs"
              className={({ isActive }) =>
                isActive
                  ? "ml-2 px-4 py-2 rounded-full text-sm font-medium transition bg-white/10 text-white"
                  : "ml-2 px-4 py-2 rounded-full text-sm font-medium transition text-gray-300 hover:bg-white/5"
              }
            >
              My Blogs
            </NavLink>
          </nav>
        </div>
      )}

      {/* Right Section - Navigation Buttons */}
      <div className="flex space-x-4 items-center gap-2">
        {/* Conditionally show Login button */}

        {!isLoggedIn && !isLoginPage && (
          <NavLink to="/login"
            style={{ fontFamily: "Poppins, sans-serif" }}
            className="rounded-full hover:curspor-pointer text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-base hover:shadow-xl duration-300 px-6 py-2 transition-all ">
            Login
          </NavLink>
        )}

        {/* Conditionally show Signup button */}
        {(!isLoggedIn && !isSignupPage) && (
          <NavLink to="/signup"
            style={{ fontFamily: "Poppins, sans-serif" }}
            className="rounded-full text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-base hover:shadow-xl duration-300 px-6 py-2 transition-all  hover:cursor-pointer">
            Signup
          </NavLink>
        )}

        {/* Logout Button */}
        {isLoggedIn && (
          <Button
            className="rounded-full text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-base hover:shadow-xl duration-300 px-6 py-2 transition-all  hover:cursor-pointer"
            onClick={handleLogout}
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Logout
          </Button>
        )}
      </div>
    </div >
  );
};

export default Header;
