import { useCallback, useEffect, useState } from "react";
import { blogApi } from "@/api";
import Blog from "./Blog";
import { toast } from "sonner";
import { Button } from "./ui/button";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        All Blogs
      </h2>
      {loading ? (
        <div className="centered-flex h-32">
          <div className="animate-pulse w-32 h-32 bg-gray-200 rounded-full"></div>
        </div>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : blogs.length === 0 ? (
        <p className="text-gray-600 text-center">No blogs found.</p>
      ) : (
        <>
          <div className="blogs-grid">
            {blogs
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map((blog, index) => (
                <Blog
                  isUser={localStorage.getItem("userId") === blog.user._id}
                  id={blog._id}
                  key={index}
                  title={blog.title}
                  description={blog.description}
                  imageUrl={blog.image}
                  userName={blog.user.name}
                  onDelete={fetchBlogs}
                />
              ))}
          </div>
          {/* Material UI Pagination */}
          <Stack spacing={2} className="mt-8 flex justify-center items-center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(e, page) => setCurrentPage(page)}
              variant="outlined"
              color="secondary"
              showFirstButton
              showLastButton
            />
          </Stack>
        </>
      )}
    </div>
  );
};

export default Blogs;
