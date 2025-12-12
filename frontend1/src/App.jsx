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
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { authActions } from "./store/index.js";
import { useSelector, useDispatch } from "react-redux";
import { Toaster } from "sonner";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  //if user is logged in while loading the first page then directly go the blog page
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      // preserve userId in localStorage and mark user as logged in
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster richColors position="top-right" />
      <header>
        <Header />
      </header>

      <div className="flex-grow">
        <main>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:id" element={<BlogDetailPage />} />
              {!isLoggedIn ? (
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                </>
              ) : (
                <>
                  <Route path="/blogs/add" element={<AddBlog />} />
                  <Route path="/myblogs" element={<UserBlogs />} />
                  <Route path="/myblogs/:id" element={<BlogDetail />} />
                  {/* <Route path="/profile" element={<Profile />} /> */}
                </>
              )}
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
