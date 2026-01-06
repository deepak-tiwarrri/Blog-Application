import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { blogApi } from "@/api";
import { toast } from "sonner";
import { ChevronLeft, Heart, Bookmark, Share2, Calendar } from "lucide-react";
import Loader from "../common/Loader";
import { useScrollToTop } from "@/hooks/useScrollToTop.js";

const BlogDetailPage = () => {
    useScrollToTop();
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    const fetchBlogDetail = useCallback(async () => {
        setLoading(true);
        try {
            const response = await blogApi.getById(id);
            setBlog(response.data.blog);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch blog");
            toast.error(err.response?.data?.message || "Failed to fetch blog");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchBlogDetail();
    }, [fetchBlogDetail]);

    const handleLike = () => {
        setLiked((v) => !v);
        toast.success(liked ? "Removed like" : "Blog liked");
    };

    const handleBookmark = () => {
        setBookmarked((v) => !v);
        toast.success(bookmarked ? "Removed bookmark" : "Bookmarked");
    };

    const handleShare = async () => {
        try {
            const url = `${window.location.origin}/blogs/${id}`;
            await navigator.clipboard.writeText(url);
            toast.success("Blog link copied to clipboard");
        } catch (error) {
            console.error(error);
            toast.error("Failed to copy link");
        }
    };

    if (loading) {
        return <Loader fullScreen={true} size={60} />;
    }

    if (error || !blog) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => navigate("/blogs")}
                        className="inline-flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
                    >
                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                        <span style={{ fontFamily: "Poppins, sans-serif" }} className="text-sm font-medium">
                            Back to Blogs
                        </span>
                    </button>
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
                {/* Back Button */}
                <button
                    onClick={() => navigate("/blogs")}
                    className="inline-flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
                >
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                    <span style={{ fontFamily: "Poppins, sans-serif" }} className="text-sm font-medium">
                        Back to Blogs
                    </span>
                </button>

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
                    <div className="flex flex-wrap gap-4 pt-8 border-t border-gray-200">
                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${liked
                                ? "bg-red-50 text-red-600 border border-red-200"
                                : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-200"
                                }`}
                        >
                            <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
                            <span style={{ fontFamily: "Poppins, sans-serif" }} className="text-sm font-medium">
                                {liked ? "Liked" : "Like"}
                            </span>
                        </button>

                        <button
                            onClick={handleBookmark}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${bookmarked
                                ? "bg-amber-50 text-amber-600 border border-amber-200"
                                : "bg-gray-100 text-gray-600 hover:bg-amber-50 hover:text-amber-600 border border-transparent hover:border-amber-200"
                                }`}
                        >
                            <Bookmark className={`w-5 h-5 ${bookmarked ? "fill-current" : ""}`} />
                            <span style={{ fontFamily: "Poppins, sans-serif" }} className="text-sm font-medium">
                                {bookmarked ? "Bookmarked" : "Bookmark"}
                            </span>
                        </button>

                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 border border-transparent hover:border-emerald-200 transition-all duration-200"
                        >
                            <Share2 className="w-5 h-5" />
                            <span style={{ fontFamily: "Poppins, sans-serif" }} className="text-sm font-medium">
                                Share
                            </span>
                        </button>
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
