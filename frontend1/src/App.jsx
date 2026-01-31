import { useEffect } from "react";
import Login from "./components/Login";
import Home from "./components/pages/Home";
import Signup from "./components/Signup";
import { Routes, Route } from "react-router-dom";
import Blogs from "./components/pages/Blogs";
import BlogDetailPage from "./components/pages/BlogDetailPage";
import AddBlog from "./components/features/AddBlog";
import UserBlogs from "./components/pages/UserBlogs";
import BlogDetail from "./components/features/EditBlog";
import Profile from "./components/Profile";
import ChangePassword from "./components/pages/ChangePassword";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ErrorBoundary from "./components/common/ErrorBoundary";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { authActions } from "./store/index.js";
import { useSelector, useDispatch } from "react-redux";
import { Toaster } from "sonner";
import { useTokenExpiration } from "./hooks/useTokenExpiration";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  const dispatch = useDispatch();

  // Check token expiration on app load and periodically
  useTokenExpiration();

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      // preserve userId in localStorage and mark user as logged in
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-500">
      <Toaster richColors position="top-right" />
      <header>
        <Header />
      </header>

      <div className="flex-grow">
        <main>
          <ErrorBoundary>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:id" element={<BlogDetailPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Routes - Only accessible when logged in */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/change-password"
                element={
                  <ProtectedRoute>
                    <ChangePassword />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/blogs/add"
                element={
                  <ProtectedRoute>
                    <AddBlog />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/myblogs"
                element={
                  <ProtectedRoute>
                    <UserBlogs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/myblogs/:id"
                element={
                  <ProtectedRoute>
                    <BlogDetail />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </ErrorBoundary>
        </main>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
