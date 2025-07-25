import React, { useEffect } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import { Routes, Route } from "react-router-dom";
import Blogs from "./components/Blogs";
import AddBlog from "./components/AddBlog";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { authActions } from "./store/index.js";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  //if user is logged in while loading the first page then directly go the blog page
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      localStorage.removeItem("userId");
      dispatch(authActions.login());
    }
  }, [dispatch]);
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header>
        <Header />
      </header>

      <div className="flex-grow">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            {!isLoggedIn ? (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </>
            ) : (
              <>
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/add" element={<AddBlog />} />
                <Route path="/myblogs" element={<UserBlogs />} />
                <Route path="/myblogs/:id" element={<BlogDetail />} />
              </>
            )}
          </Routes>
        </main>
      </div>
      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
