
import { useState, useEffect, useCallback } from "react";
import { blogApi } from "@/api";
import Blog from "./Blog";
import { toast } from "sonner";

const UserBlogs = () => {
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
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        My Blogs
      </h2>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-pulse w-32 h-32 bg-gray-200 rounded-full"></div>
        </div>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : !user || user.blogs.length === 0 ? (
        <p className="text-gray-600 text-center">No blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {user.blogs.map((blog, index) => (
            <Blog
              id={blog._id}
              key={index}
              title={blog.title}
              description={blog.description}
              imageUrl={blog.image}
              userName={user.name}
              onDelete={() => handleDelete(blog._id)}
              isUser={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBlogs;
