import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop.js";
import Loader from "../common/Loader";
import PageHeader from "../common/PageHeader";
import BlogActionButtons from "@/components/common/BlogActionButtons";
import CommentsSection from "@/components/common/CommentsSection";
import { useFetchBlogById } from "@/hooks/useBlogAPI";
import { useBlogInteractions, useCopyToClipboard } from "@/hooks/useCommonLogic";
import { Calendar, Clock } from "lucide-react";
import DOMPurify from 'dompurify';

const BlogDetailPage = () => {
    useScrollToTop();
    const { id } = useParams();
    const navigate = useNavigate();
    const currentUserId = localStorage.getItem("userId");
    const { blog, loading, error, fetchBlogById } = useFetchBlogById(id);
    const { liked, bookmarked, sharing, toggleLike, toggleBookmark, handleShare: handleShareInteraction } = useBlogInteractions(id);

    useEffect(() => {
        fetchBlogById();
    }, [id, fetchBlogById]);

    const handleShare = async () => {
        const url = `${window.location.origin}/blogs/${id}`;
        await handleShareInteraction(url);
    };

    // Calculate reading time from backend or fallback to description
    const strippedDescription = blog?.description ? blog.description.replace(/<[^>]*>?/gm, '') : '';
    const readingTime = blog?.readingTime || (strippedDescription ? Math.ceil(strippedDescription.split(/\s+/).length / 200) : 0);

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
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20 blur-3xl bg-blue-600" />
                <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full opacity-15 blur-3xl bg-purple-600" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
                <PageHeader
                    title={blog.title}
                    backTo="/blogs"
                />
                <div className="mb-8 md:mb-10 rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80 z-10 pointer-events-none"></div>
                    <img
                        src={blog.image || "/assets/dish.jpg"}
                        alt={blog.title}
                        onError={(e) => {
                            e.target.src = "/assets/dish.jpg";
                        }}
                        className="w-full h-96 sm:h-[28rem] md:h-[32rem] object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                    />
                </div>

                {/* Main Content */}
                <article className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 mb-12">
                    {/* Title */}
                    <h1
                        style={{ fontFamily: "Playfair Display, serif" }}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6 leading-tight"
                    >
                        {blog.title}
                    </h1>

                    {/* Meta Information */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8 pb-8 border-b border-white/10 flex-wrap">
                        {/* Author Info */}
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                {blog.user?.name ? blog.user.name.charAt(0).toUpperCase() : "U"}
                            </div>
                            <div>
                                <p style={{ fontFamily: "Poppins, sans-serif" }} className="font-semibold text-gray-200">
                                    {blog.user?.name || "Unknown Author"}
                                </p>
                                <p style={{ fontFamily: "Poppins, sans-serif" }} className="text-sm text-gray-400">
                                    {blog.user?.email || ""}
                                </p>
                            </div>
                        </div>

                        {/* Publish Date */}
                        <div className="flex items-center gap-2 text-gray-400">
                            <Calendar className="w-4 h-4 text-blue-400" />
                            <p style={{ fontFamily: "Poppins, sans-serif" }} className="text-sm">
                                {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                }) : "No date available"}
                            </p>
                        </div>

                        {/* Reading Time */}
                        <div className="flex items-center gap-2 text-gray-400">
                            <Clock className="w-4 h-4 text-purple-400" />
                            <p style={{ fontFamily: "Poppins, sans-serif" }} className="text-sm">
                                {readingTime} min read
                            </p>
                        </div>
                    </div>

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            {blog.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-semibold tracking-wide hover:bg-blue-500/20 transition-colors"
                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <div
                        style={{ fontFamily: "Poppins, sans-serif" }}
                        className="prose prose-sm sm:prose md:prose-lg max-w-none text-gray-300 leading-relaxed text-base sm:text-[1.05rem] quill-content mb-8"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(blog.description)
                        }}
                    />
                    <div className="pt-8 border-t border-white/10 mt-8">
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

                {/* Comments Section */}
                <CommentsSection blogId={id} currentUserId={currentUserId} />

                {/* Related Section */}
                <div className="mt-12 pt-8 border-t border-white/10 text-center">
                    <h2
                        style={{ fontFamily: "Playfair Display, serif" }}
                        className="text-2xl md:text-3xl font-bold text-white mb-6"
                    >
                        Continue Reading
                    </h2>
                    <button
                        onClick={() => navigate("/blogs")}
                        className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-500 hover:to-purple-500 active:scale-95 transition-all duration-200 shadow-md shadow-blue-900/20"
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
