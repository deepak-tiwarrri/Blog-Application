import { useEffect } from "react";
import Blog from "../features/Blog";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useScrollToTop } from "@/hooks/useScrollToTop.js";
import SectionHeader from "../common/SectionHeader";
import StateDisplay from "../common/StateDisplay";
import { useFetchBlogs } from "@/hooks/useBlogAPI";
import { usePagination } from "@/hooks/useCommonLogic";

const Blogs = () => {
  useScrollToTop();
  const { blogs, loading, error, fetchBlogs } = useFetchBlogs();
  const { currentPage, totalPages, paginatedItems, setCurrentPage } =
    usePagination(blogs, 6);

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div
      className="min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-950"
    >
      {/* Subtle ambient blobs for the glass effect to blur against */}
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
          badge="All Stories"
          title="Discover All Blogs"
          subtitle="Explore inspiring stories, tips, and insights from our community of talented writers"
          badgeClassName="text-blue-400 bg-blue-500/15 border border-blue-500/25"

        />

        <StateDisplay
          loading={loading}
          error={error}
          isEmpty={blogs.length === 0}
          errorMessage={error}
          emptyMessage="No blogs found yet. Be the first to share your story!"
          onRetry={fetchBlogs}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {paginatedItems
              .filter((blog) => blog && blog.user && blog._id && blog.title)
              .map((blog, index) => (
                <Blog
                  key={blog._id || index}
                  isUser={
                    localStorage.getItem("userId") === blog?.user?._id
                  }
                  id={blog?._id}
                  title={blog.title}
                  description={blog.description}
                  imageUrl={blog.image}
                  userName={blog.user.name}
                  createdAt={blog.createdAt}
                  readingTime={blog.readingTime}
                  onDelete={fetchBlogs}
                />
              ))}
          </div>

          {/* Pagination */}
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

export default Blogs;
