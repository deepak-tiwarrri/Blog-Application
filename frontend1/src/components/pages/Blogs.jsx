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
  const { currentPage, totalPages, paginatedItems, setCurrentPage } = usePagination(blogs, 6);

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <SectionHeader
          badge="All Stories"
          title="Discover All Blogs"
          subtitle="Explore inspiring stories, tips, and insights from our community of talented writers"
        />

        <StateDisplay
          loading={loading}
          error={error}
          isEmpty={blogs.length === 0}
          errorMessage={error}
          emptyMessage="No blogs found yet. Be the first to share your story!"
          onRetry={fetchBlogs}
        >
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
              {paginatedItems
                .filter((blog) => blog && blog.user && blog._id && blog.title)
                .map((blog, index) => (
                  <div
                    key={blog._id || index}
                    className="transform hover:scale-105 transition-transform duration-300"
                  >
                    <Blog
                      isUser={
                        localStorage.getItem("userId") === blog?.user?._id
                      }
                      id={blog?._id}
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
        </StateDisplay>
      </div>
    </div>
  );
};

export default Blogs;
