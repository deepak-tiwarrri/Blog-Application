import { useState, useEffect } from "react";
import Blog from "../features/Blog";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Search, Tag } from "lucide-react";
import { useScrollToTop } from "@/hooks/useScrollToTop.js";
import SectionHeader from "../common/SectionHeader";
import StateDisplay from "../common/StateDisplay";
import { useFetchBlogs } from "@/hooks/useBlogAPI";
import { usePagination } from "@/hooks/useCommonLogic";

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const { blogs, loading, error, fetchBlogs } = useFetchBlogs();

  // Filter invalid layouts prior to pagination
  const validBlogs = blogs.filter((blog) => blog && blog.user && blog._id && blog.title);

  const { currentPage, totalPages, paginatedItems, setCurrentPage } =
    usePagination(validBlogs, 6);
  useScrollToTop([currentPage]);

  // Extract all unique tags
  const uniqueTags = [...new Set(validBlogs.flatMap(blog => blog.tags || []))]
    .filter(Boolean)
    .sort();

  // Debounce effect to avoid hammering API on every keystroke
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchBlogs({ search: searchTerm, tag: tagFilter });
      setCurrentPage(1); // reset to page 1 on new search
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, tagFilter, fetchBlogs, setCurrentPage]);

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

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 max-w-3xl mx-auto items-center">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search blogs by title or description..."
              className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-500 transition-all duration-200"
              style={{ fontFamily: "'Poppins', sans-serif" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative w-full sm:w-64">
            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <select
              className="w-full pl-11 pr-10 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white transition-all duration-200 appearance-none cursor-pointer"
              style={{ fontFamily: "'Poppins', sans-serif" }}
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
            >
              <option value="" className="bg-gray-900 text-gray-300">All Tags</option>
              {uniqueTags.map((tag, idx) => (
                <option key={idx} value={tag} className="bg-gray-900 text-white">
                  {tag}
                </option>
              ))}
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>

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
