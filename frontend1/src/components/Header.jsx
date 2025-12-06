
// @eslint-ignore
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate, useRoutes } from "react-router-dom";
import { authActions } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import "@fontsource/poppins";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Conditional rendering logic
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";
  console.log(location.pathname);

  // Logout Handler
  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/login");
    setMobileMenuOpen(false);
  };

  // Close mobile menu when navigation occurs
  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-gradient-to-r from-gray-950 to-gray-800 sticky top-0 shadow-lg z-50">
      <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          
          {/* Left Section - Logo */}
          <Link 
            to="/" 
            onClick={handleNavClick}
            className="flex-shrink-0"
          >
            <h2 className="font-semibold text-xl sm:text-2xl lg:text-3xl cursor-pointer text-white hover:text-purple-300 transition-colors duration-200" style={{ fontFamily: "Playfair Display, serif" }}>
              Bite&Roam
            </h2>
          </Link>

          {/* Center Section - Navigation (Hidden on mobile) */}
          {isLoggedIn && (
            <div className="hidden md:block">
              <nav className="inline-flex space-x-2 items-center bg-gray-900/20 p-1 rounded-full" aria-label="Blogs tabs">
                <NavLink
                  to="/blogs"
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium transition"
                      : "nav-link text-gray-300 hover:bg-white/5 px-4 py-2 rounded-full text-sm font-medium transition"
                  }
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  All Blogs
                </NavLink>
                <NavLink
                  to="/myblogs"
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium transition"
                      : "nav-link text-gray-300 hover:bg-white/5 px-4 py-2 rounded-full text-sm font-medium transition"
                  }
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  My Blogs
                </NavLink>
              </nav>
            </div>
          )}

          {/* Right Section - Action Buttons (Hidden on mobile, shown on desktop) */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            {/* Conditionally show Login button */}
            {!isLoggedIn && !isLoginPage && (
              <NavLink 
                to="/login"
                onClick={handleNavClick}
                style={{ fontFamily: "Poppins, sans-serif" }}
                className="rounded-full text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm lg:text-base hover:shadow-xl duration-300 px-5 lg:px-6 py-2 transition-all hover:cursor-pointer"
              >
                Login
              </NavLink>
            )}

            {/* Conditionally show Signup button */}
            {(!isLoggedIn && !isSignupPage) && (
              <NavLink 
                to="/signup"
                onClick={handleNavClick}
                style={{ fontFamily: "Poppins, sans-serif" }}
                className="rounded-full text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm lg:text-base hover:shadow-xl duration-300 px-5 lg:px-6 py-2 transition-all hover:cursor-pointer"
              >
                Signup
              </NavLink>
            )}

            {/* Logout Button */}
            {isLoggedIn && (
              <Button
                className="rounded-full text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm lg:text-base hover:shadow-xl duration-300 px-5 lg:px-6 py-2 transition-all hover:cursor-pointer"
                onClick={handleLogout}
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Logout
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4 space-y-3">
            
            {/* Mobile Navigation Links */}
            {isLoggedIn && (
              <nav className="space-y-2">
                <NavLink
                  to="/blogs"
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-2 rounded-lg bg-blue-600 text-white font-medium transition"
                      : "block px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 font-medium transition"
                  }
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  All Blogs
                </NavLink>
                <NavLink
                  to="/myblogs"
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-2 rounded-lg bg-blue-600 text-white font-medium transition"
                      : "block px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 font-medium transition"
                  }
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  My Blogs
                </NavLink>
              </nav>
            )}

            {/* Mobile Action Buttons */}
            <div className="space-y-2 pt-2">
              {!isLoggedIn && !isLoginPage && (
                <NavLink 
                  to="/login"
                  onClick={handleNavClick}
                  style={{ fontFamily: "Poppins, sans-serif" }}
                  className="block w-full text-center rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-2 font-medium transition-all duration-300"
                >
                  Login
                </NavLink>
              )}

              {(!isLoggedIn && !isSignupPage) && (
                <NavLink 
                  to="/signup"
                  onClick={handleNavClick}
                  style={{ fontFamily: "Poppins, sans-serif" }}
                  className="block w-full text-center rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-2 font-medium transition-all duration-300"
                >
                  Signup
                </NavLink>
              )}

              {isLoggedIn && (
                <Button
                  className="w-full rounded-lg text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 py-2 font-medium transition-all duration-300"
                  onClick={handleLogout}
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
