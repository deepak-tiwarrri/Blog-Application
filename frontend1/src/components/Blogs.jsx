import { useCallback, useEffect, useState } from "react";
import { blogApi } from "@/api";
import Blog from "./Blog";
import { toast } from "sonner";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import "@fontsource/playfair-display/700.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import { BookOpen } from "lucide-react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await blogApi.getAll();
      const data = response?.data?.blogs;
      setBlogs(data || []);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch blogs");
      toast.error(err.response?.data?.message || "Failed to fetch blogs");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const totalPages = Math.max(1, Math.ceil(blogs.length / pageSize));


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-50 rounded-full">
            <span
              className="text-sm font-semibold text-blue-600"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              All Stories
            </span>
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Discover All Blogs
          </h1>
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Explore inspiring stories, tips, and insights from our community of talented writers
          </p>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full"></div>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
            <p className="text-red-700 font-semibold" style={{ fontFamily: "Poppins, sans-serif" }}>
              {error}
            </p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen size={56} className="mx-auto text-gray-400 mb-4" />
            <p
              className="text-gray-600 text-lg"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              No blogs found yet. Be the first to share your story!
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
              {blogs
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((blog, index) => (
                  <div
                    key={index}
                    className="transform hover:scale-105 transition-transform duration-300"
                  >
                    <Blog
                      isUser={localStorage.getItem("userId") === blog.user._id}
                      id={blog._id}
                      title={blog.title}
                      description={blog.description}
                      imageUrl={blog.image}
                      userName={blog.user.name}
                      onDelete={fetchBlogs}
                    />
                  </div>
                ))}
            </div>

            {/* Pagination */}
            <Stack spacing={2} className="flex justify-center items-center">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(e, page) => setCurrentPage(page)}
                variant="outlined"
                color="secondary"
                showFirstButton
                showLastButton
                size="large"
              />
            </Stack>
          </>
        )}
      </div>
    </div>
  );
};

export default Blogs;
