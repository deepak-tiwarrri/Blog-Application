import { useEffect } from "react";
import Blog from "../features/Blog";
import { useScrollToTop } from "@/hooks/useScrollToTop.js";
import SectionHeader from "../common/SectionHeader";
import StateDisplay from "../common/StateDisplay";
import { useFetchUserBlogs, useBlogMutations } from "@/hooks/useBlogAPI";
import { usePagination } from "@/hooks/useCommonLogic";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const UserBlogs = () => {
  const userId = localStorage.getItem("userId");
  const { user, blogs, loading, error, fetchUserBlogs } = useFetchUserBlogs(userId);
  const { deleteBlog } = useBlogMutations();
  const { currentPage, totalPages, paginatedItems, setCurrentPage } = usePagination(blogs, 6);
  useScrollToTop([currentPage]);

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
    <div className="min-h-screen py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-950">
      {/* Ambient glow blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-0">
        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #6366f1, transparent)" }}
        />
        <div
          className="absolute top-1/3 -right-32 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }}
        />
        <div
          className="absolute bottom-20 left-1/3 w-72 h-72 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }}
        />
      </div>
      <div className="relative z-10 container mx-auto max-w-7xl">
        <SectionHeader
          badge="Your Content"
          title="My Blogs"
          subtitle="Manage and showcase all your published stories"
          badgeClassName="text-blue-400 bg-blue-500/15 border border-blue-500/25"
        />
        <StateDisplay
          loading={loading}
          error={error}
          isEmpty={blogs.length === 0}
          errorMessage={error}
          emptyMessage="No blogs yet. Start creating your first blog!"
          onRetry={fetchUserBlogs}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-12">
            {paginatedItems.map((blog) => (
              <Blog
                key={blog._id}
                id={blog._id}
                title={blog.title}
                description={blog.description}
                imageUrl={blog.image}
                userName={user?.name}
                createdAt={blog.createdAt}
                readingTime={blog.readingTime}
                onDelete={() => handleDelete(blog._id)}
                isUser={true}
              />
            ))}
          </div>
          <Stack spacing={2} className="flex justify-center items-center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => setCurrentPage(page)}
              variant="outlined"
              color="secondary"
              showFirstButton
              showLastButton
              size="small"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "rgba(255,255,255,0.6)",
                  borderColor: "rgba(255,255,255,0.15)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.08)",
                    borderColor: "rgba(255,255,255,0.3)",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "rgba(99,102,241,0.35)",
                    borderColor: "rgba(139,92,246,0.6)",
                    color: "#fff",
                  },
                },
              }}
            />
          </Stack>
        </StateDisplay>
      </div>
    </div>
  );
};

export default UserBlogs;