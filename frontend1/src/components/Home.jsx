
import React from "react";
import { blogApi } from "@/api";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Home = () => {
  const [blogs, setBlogs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    blogApi.getAll()
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
    <div>
      <section className="hero bg-gray-100 py-10 md:py-20">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Create a blog worth sharing
          </h2>
          <p className="text-lg md:text-xl mb-4">
            Explore travel adventures, uncover global cuisines<br /> and share your flavourful journey.
          </p>
          <Link to="/signup" className="inline-block">
            <button className="px-6 py-3 rounded-full shadow text-white bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 transition-all">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      <section className="blogs py-10 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Latest Blogs</h2>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-pulse w-32 h-32 bg-gray-200 rounded-full"></div>
            </div>
          ) : error ? (
            <p className="text-red-600 text-center">{error}</p>
          ) : blogs.length === 0 ? (
            <p className="text-gray-600 text-center">No blogs found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {blogs.slice(0, 6).map((blog) => (
                <div key={blog._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all overflow-hidden flex flex-col">
                  <img src={blog.image} onError={(e) => { e.target.src = '/assets/dish.jpg' }} alt={blog.title} className="w-full h-48 object-cover" />
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{blog.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">{blog.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm text-gray-500 dark:text-gray-400">By {blog.user?.name}</span>
                      <Link to={`/myblogs/${blog._id}`} className="text-blue-500 hover:underline">Read More</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="login-prompt py-10 bg-gray-200">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Start Your Own Blog</h2>
          <p className="text-lg mb-6">
            Login to create and share your own stories.
          </p>
          <Link to="/login">
            <button className="px-6 py-3 rounded-full shadow text-white bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 transition-all">
              Login
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
