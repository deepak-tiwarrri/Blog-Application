// AuthForm.jsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/store";
import PropTypes from "prop-types";
import { BookOpen, ArrowRight } from "lucide-react";
import "@fontsource/poppins";
import "@fontsource/playfair-display";
import { useStyles } from "@/lib/utils";

const AuthForm = ({ onHandleSubmit, isLoginMode }) => {
  const input = useSelector((state) => state.auth?.input);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(authActions.updateInput({ [name]: value }));
  };

  const status = useSelector((state) => state.auth.status);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10"></div>
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10"></div>

      <div className="w-full max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Branding & Features */}
          <div className="hidden lg:flex flex-col justify-between space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                  <BookOpen size={32} className="text-white" />
                </div>
                <h1
                  className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Bite&Roam
                </h1>
              </div>

              <div>
                <h2
                  className="text-4xl font-bold text-gray-900 mb-4"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    letterSpacing: "-0.5px",
                  }}
                >
                  {isLoginMode ? "Welcome Back" : "Join Our Community"}
                </h2>
                <p
                  className="text-lg text-gray-600 leading-relaxed"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {isLoginMode
                    ? "Share your stories, connect with readers, and build your voice in the world of travel and food."
                    : "Start sharing your unique stories with a community of passionate readers worldwide."}
                </p>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {[
                {
                  title: "Write & Publish",
                  desc: "Create beautiful blog posts in minutes",
                },
                {
                  title: "Connect",
                  desc: "Build your audience and engage with readers",
                },
                {
                  title: "Share",
                  desc: "Inspire others with your unique perspective",
                },
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mt-1">
                    <ArrowRight size={20} className="text-white" />
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-gray-900"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="text-sm text-gray-600"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100">
              {/* Mobile Header */}
              <div className="lg:hidden mb-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                    <BookOpen size={28} className="text-white" />
                  </div>
                  <h1
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    Bite&Roam
                  </h1>
                </div>
                <h2
                  className="text-2xl font-bold text-gray-900"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {isLoginMode ? "Welcome Back" : "Create Account"}
                </h2>
              </div>

              <form onSubmit={onHandleSubmit} className="flex flex-col gap-5">
                {/* Name field for Signup */}
                {!isLoginMode && (
                  <div className="flex flex-col gap-3">
                    <Label
                      htmlFor="name"
                      className="text-sm font-semibold text-gray-700"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Full Name
                    </Label>
                    <div className="relative flex items-center group">
                      <span className="absolute left-4 text-gray-400 flex items-center h-full group-focus-within:text-blue-600 transition-colors">
                        <PersonIcon fontSize="small" />
                      </span>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={input?.name}
                        onChange={handleChange}
                        required
                        className={`${classes.font} pl-12 py-3 rounded-lg border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-0 focus-visible:ring-0 transition-all duration-200 placeholder:text-gray-400`}
                      />
                    </div>
                  </div>
                )}

                {/* Email field */}
                <div className="flex flex-col gap-3">
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-700"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Email Address
                  </Label>
                  <div className="relative flex items-center group">
                    <span className="absolute left-4 text-gray-400 flex items-center h-full group-focus-within:text-blue-600 transition-colors">
                      <MailOutlineIcon fontSize="small" />
                    </span>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="you@example.com"
                      value={input?.email}
                      onChange={handleChange}
                      className={`${classes.font} pl-12 py-3 rounded-lg border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-0 focus-visible:ring-0 transition-all duration-200 w-full placeholder:text-gray-400`}
                      required
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <Label
                      htmlFor="password"
                      className="text-sm font-semibold text-gray-700"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Password
                    </Label>
                    {isLoginMode && (
                      <Link
                        to="#"
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Forgot?
                      </Link>
                    )}
                  </div>
                  <div className="relative flex items-center group">
                    <span className="absolute left-4 text-gray-400 flex items-center h-full group-focus-within:text-blue-600 transition-colors">
                      <LockOutlinedIcon fontSize="small" />
                    </span>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      value={input?.password}
                      placeholder="••••••••"
                      onChange={handleChange}
                      required
                      className={`${classes.font} pl-12 py-3 rounded-lg border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-0 focus-visible:ring-0 transition-all duration-200 w-full placeholder:text-gray-400`}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3 mt-4 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {status === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin">⟳</span>
                      {isLoginMode ? "Signing in..." : "Creating account..."}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      {isLoginMode ? "Sign In" : "Create Account"}
                      <ArrowRight size={18} />
                    </span>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span
                    className="px-3 bg-white text-gray-500"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    or
                  </span>
                </div>
              </div>

              {/* Toggle Auth Mode */}
              <div className="text-center">
                <p
                  className="text-sm text-gray-600 mb-4"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {isLoginMode ? (
                    <>
                      Don&apos;t have an account?{" "}
                      <Link
                        to="/signup"
                        className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                      >
                        Sign up here
                      </Link>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                      >
                        Login here
                      </Link>
                    </>
                  )}
                </p>
              </div>

              {/* Terms & Privacy */}
              <p
                className="text-xs text-gray-500 text-center mt-6"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                By continuing, you agree to our{" "}
                <Link to="#" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
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
