import React, { useEffect } from "react";
import { blogApi } from "@/api";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import BlogCard from "./BlogCard";
import { useSelector } from "react-redux";
import { ArrowRight, BookOpen, Users, Sparkles } from "lucide-react";
import "@fontsource/poppins";
import "@fontsource/playfair-display";

const Home = () => {
  const [blogs, setBlogs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const token = localStorage.getItem("token");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    setLoading(true);
    blogApi
      .getAll()
      .then((res) => {
        setBlogs(res.data.blogs || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to fetch blogs");
        toast.error(err.response?.data?.message || "Failed to fetch blogs");
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section - Revamped */}
      <section className="hero relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16 md:py-28 lg:py-32">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10"></div>

        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6 md:space-y-8">
              <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
                <Sparkles size={18} className="text-blue-600" />
                <span className="text-sm font-semibold text-blue-600">Welcome to Your Stories</span>
              </div>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900"
                style={{ fontFamily: "Playfair Display, serif", fontWeight: "800", letterSpacing: "-0.5px" }}
              >
                Create a Blog Worth <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Sharing</span>
              </h1>

              <p
                className="text-lg md:text-xl text-gray-600 leading-relaxed"
                style={{ fontFamily: "Poppins, sans-serif", lineHeight: "1.8" }}
              >
                Explore travel adventures, uncover global cuisines and share your flavourful journey with the world. Connect with passionate readers and build your unique voice.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {!token && (
                  <>
                    <Link to="/signup" className="group">
                      <button
                        className="w-full sm:w-auto px-8 py-3 rounded-full shadow-lg hover:shadow-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        Get Started <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                    <Link to="/blogs" className="group">
                      <button
                        className="w-full sm:w-auto px-8 py-3 rounded-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        Explore Blogs <BookOpen size={18} />
                      </button>
                    </Link>
                  </>
                )}
                {token && (
                  <Link to="/blogs" className="group">
                    <button
                      className="w-full sm:w-auto px-8 py-3 rounded-full shadow-lg hover:shadow-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Explore All Blogs <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                )}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl opacity-10"></div>
              <img
                src="/assets/dish.jpg"
                alt="hero"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-6 shadow-lg">
                <Users size={32} className="text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Why Choose Our Platform
            </h2>
            <p className="text-lg text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
              Everything you need to share your story with the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: "Easy Publishing", desc: "Create and publish blogs in minutes with our intuitive editor" },
              { icon: Users, title: "Build Community", desc: "Connect with readers who share your passion and interests" },
              { icon: Sparkles, title: "Beautiful Design", desc: "Professional layouts that showcase your content beautifully" }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 transition-all duration-300 border border-gray-200 hover:border-blue-300 hover:shadow-lg"
              >
                <div className="mb-4 inline-block p-4 bg-white rounded-lg group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-purple-100 transition-all">
                  <feature.icon size={28} className="text-blue-600" />
                </div>
                <h3
                  className="text-xl font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blogs Section - Enhanced */}
      <section className="blogs py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-50 rounded-full">
              <span className="text-sm font-semibold text-blue-600" style={{ fontFamily: "Poppins, sans-serif" }}>
                Featured Content
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Latest Blogs
            </h2>
            <p className="text-lg text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
              Discover inspiring stories from our community of writers
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-pulse w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
              <p className="text-red-700 font-semibold" style={{ fontFamily: "Poppins, sans-serif" }}>{error}</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg" style={{ fontFamily: "Poppins, sans-serif" }}>No blogs found yet. Be the first to share your story!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.slice(0, 6).map((blog) => (
                <div key={blog._id} className="transform hover:scale-105 transition-transform duration-300">
                  <BlogCard blog={blog} />
                </div>
              ))}
            </div>
          )}

          {blogs.length > 0 && (
            <div className="text-center mt-12">
              <Link to="/blogs" className="group">
                <button
                  className="px-8 py-3 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold flex items-center justify-center gap-2 mx-auto"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  View All Blogs <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      {!isLoggedIn && (
        <section className="login-prompt py-16 md:py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2
                  className="text-3xl md:text-4xl font-bold text-white"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Ready to Share Your Story?
                </h2>
                <p
                  className="text-lg text-blue-100"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Join our community of passionate writers and readers. Create, share, and inspire.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {!token && (
                  <>
                    <Link to="/login" className="group">
                      <button
                        className="w-full px-8 py-3 rounded-full bg-white text-blue-600 hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        Login
                      </button>
                    </Link>
                    <Link to="/signup" className="group">
                      <button
                        className="w-full px-8 py-3 rounded-full border-2 border-white text-white hover:bg-white/10 transition-all duration-300 font-semibold"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        Create Account
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
