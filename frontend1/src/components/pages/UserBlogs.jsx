import { useEffect } from "react";
import Blog from "../features/Blog";
import { useScrollToTop } from "@/hooks/useScrollToTop.js";
import SectionHeader from "../common/SectionHeader";
import StateDisplay from "../common/StateDisplay";
import { useFetchUserBlogs } from "@/hooks/useBlogAPI";
import { useBlogMutations } from "@/hooks/useBlogAPI";

const UserBlogs = () => {
  useScrollToTop();
  const userId = localStorage.getItem("userId");
  const { user, loading, error, fetchUserBlogs } = useFetchUserBlogs(userId);
  const { deleteBlog } = useBlogMutations();

  useEffect(() => {
    if (userId) {
      fetchUserBlogs();
    }
  }, [userId]);

  const handleDelete = async (blogId) => {
    const success = await deleteBlog(blogId);
    if (success) {
      fetchUserBlogs();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionHeader
          badge="Your Content"
          title="My Blogs"
          subtitle="Manage and showcase all your published stories"
        />

        <StateDisplay
          loading={loading}
          error={error}
          isEmpty={!user || user.blogs.length === 0}
          errorMessage={error}
          emptyMessage="No blogs yet. Start creating your first blog!"
          onRetry={fetchUserBlogs}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {user?.blogs?.map((blog, index) => (
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
                  createdAt={blog.createdAt}
                  readingTime={blog.readingTime}
                  onDelete={() => handleDelete(blog._id)}
                  isUser={true}
                />
              </div>
            ))}
          </div>
        </StateDisplay>
      </div>
    </div>
  );
};

export default UserBlogs;
