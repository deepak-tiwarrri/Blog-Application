import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop.js";
import Loader from "../common/Loader";
import PageHeader from "../common/PageHeader";
import BlogActionButtons from "@/components/common/BlogActionButtons";
import { useFetchBlogById } from "@/hooks/useBlogAPI";
import { useBlogInteractions, useCopyToClipboard } from "@/hooks/useCommonLogic";
import { Calendar } from "lucide-react";

const BlogDetailPage = () => {
    useScrollToTop();
    const { id } = useParams();
    const navigate = useNavigate();
    const { blog, loading, error, fetchBlogById } = useFetchBlogById(id);
    const { liked, bookmarked, sharing, toggleLike, toggleBookmark, handleShare: handleShareInteraction } = useBlogInteractions(id);

    useEffect(() => {
        fetchBlogById();
    }, [id]);

    const handleShare = async () => {
        const url = `${window.location.origin}/blogs/${id}`;
        await handleShareInteraction(url);
    };

    if (loading) {
        return <Loader fullScreen={true} size={60} />;
    }

    if (error || !blog) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <PageHeader
                        title="Error"
                        backTo="/blogs"
                    />
                    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                        <p className="text-red-700 font-semibold" style={{ fontFamily: "Poppins, sans-serif" }}>
                            {error || "Blog not found"}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <PageHeader
                    title={blog.title}
                    backTo="/blogs"
                />

                {/* Featured Image */}
                <div className="mb-8 md:mb-10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img
                        src={blog.image || "/assets/dish.jpg"}
                        alt={blog.title}
                        onError={(e) => {
                            e.target.src = "/assets/dish.jpg";
                        }}
                        className="w-full h-96 sm:h-[28rem] md:h-[32rem] object-cover"
                    />
                </div>

                {/* Main Content */}
                <article className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">
                    {/* Title */}
                    <h1
                        style={{ fontFamily: "Playfair Display, serif" }}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight"
                    >
                        {blog.title}
                    </h1>

                    {/* Meta Information */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8 pb-8 border-b border-gray-200">
                        {/* Author Info */}
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
                                {blog.user?.name?.charAt(0).toUpperCase() || "U"}
                            </div>
                            <div>
                                <p style={{ fontFamily: "Poppins, sans-serif" }} className="font-semibold text-gray-900">
                                    {blog.user?.name || "Unknown Author"}
                                </p>
                                <p style={{ fontFamily: "Poppins, sans-serif" }} className="text-sm text-gray-600">
                                    {blog.user?.email || ""}
                                </p>
                            </div>
                        </div>

                        {/* Publish Date */}
                        <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <p style={{ fontFamily: "Poppins, sans-serif" }} className="text-sm">
                                {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                }) : "No date available"}
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    <div
                        style={{ fontFamily: "Poppins, sans-serif" }}
                        className="prose prose-sm sm:prose md:prose-lg max-w-none mb-8"
                    >
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base sm:text-lg">
                            {blog.description}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-8 border-t border-gray-200">
                        <BlogActionButtons
                            liked={liked}
                            bookmarked={bookmarked}
                            sharing={sharing}
                            onLike={toggleLike}
                            onBookmark={toggleBookmark}
                            onShare={handleShare}
                            variant="row"
                        />
                    </div>
                </article>

                {/* Related Section */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <h2
                        style={{ fontFamily: "Playfair Display, serif" }}
                        className="text-2xl md:text-3xl font-bold text-gray-900 mb-6"
                    >
                        Continue Reading
                    </h2>
                    <button
                        onClick={() => navigate("/blogs")}
                        className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                        Explore More Blogs
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogDetailPage;
