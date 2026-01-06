
import { useState, useEffect, useCallback } from "react";
import { blogApi } from "@/api";
import Blog from "../features/Blog";
import Loader from "../common/Loader";
import { useScrollToTop } from "@/hooks/useScrollToTop.js";
import { toast } from "sonner";
import { BookOpen } from "lucide-react";

const UserBlogs = () => {
  useScrollToTop();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const id = localStorage.getItem("userId");

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await blogApi.getBlogByUserId(id);
      console.log(res.data.user);
      setUser(res.data.user);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch user blogs");
      toast.error(err.response?.data?.message || "Failed to fetch user blogs");
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleDelete = async (blogId) => {
    try {
      await blogApi.delete(blogId);
      toast.success("Blog deleted successfully!");
      fetchBlogs();
    } catch (error) {
      toast.error("Failed to delete blog", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Header Section */}
        <div className="mb-8 md:mb-12 lg:mb-16">
          <div className="text-center space-y-3 md:space-y-4">
            <div className="inline-block mb-4 px-3 sm:px-4 py-2 bg-blue-50 rounded-full">
              <span
                className="text-xs sm:text-sm font-semibold text-blue-600"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Your Content
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
              style={{ fontFamily: "Playfair Display, serif", letterSpacing: "-0.5px" }}
            >
              My Blogs
            </h2>
            <p
              className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Manage and showcase all your published stories
            </p>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <Loader fullScreen={false} size={60} />
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 sm:p-6 rounded-lg max-w-2xl mx-auto">
            <p className="text-red-700 font-semibold text-sm sm:text-base" style={{ fontFamily: "Poppins, sans-serif" }}>
              {error}
            </p>
          </div>
        ) : !user || user.blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-20">
            <BookOpen size={48} className="text-gray-400 mb-4" />
            <p
              className="text-gray-600 text-center text-base sm:text-lg"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              No blogs yet. Start creating your first blog!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {user.blogs.map((blog, index) => (
              <div
                key={index}
                className="transform hover:scale-105 transition-transform duration-300"
              >
                <Blog
                  id={blog._id}
                  title={blog.title}
                  description={blog.description}
                  imageUrl={blog.image}
                  userName={user.name}
                  onDelete={() => handleDelete(blog._id)}
                  isUser={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBlogs;
