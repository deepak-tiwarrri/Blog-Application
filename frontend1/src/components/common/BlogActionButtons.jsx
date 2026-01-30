import React from "react";
import { Heart, Bookmark, Share2 } from "lucide-react";
import FavoriteIcon from "@mui/icons-material/Favorite";

/**
 * Reusable blog action buttons component
 * Replaces duplicate like/bookmark/share logic across multiple components
 * 
 * @example
 * <BlogActionButtons
 *   liked={liked}
 *   bookmarked={bookmarked}
 *   onLike={toggleLike}
 *   onBookmark={toggleBookmark}
 *   onShare={handleShare}
 *   variant="row" // or "column"
 * />
 */
const BlogActionButtons = ({
  liked = false,
  bookmarked = false,
  sharing = false,
  onLike,
  onBookmark,
  onShare,
  variant = "row",
  size = "default",
  className = "",
}) => {
  const containerClass =
    variant === "column"
      ? "flex flex-col gap-3"
      : "flex flex-wrap gap-4";

  const getButtonClass = (isActive, theme) => {
    const baseClass =
      "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium";

    if (size === "sm") {
      return `${baseClass} px-3 py-1.5 text-xs`;
    }

    if (isActive) {
      const activeTheme = {
        like: "bg-red-50 text-red-600 border border-red-200",
        bookmark:
          "bg-amber-50 text-amber-600 border border-amber-200",
        share: "bg-emerald-50 text-emerald-600 border border-emerald-200",
      };
      return `${baseClass} ${activeTheme[theme]}`;
    } else {
      const inactiveTheme = {
        like: "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-200",
        bookmark:
          "bg-gray-100 text-gray-600 hover:bg-amber-50 hover:text-amber-600 border border-transparent hover:border-amber-200",
        share: "bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 border border-transparent hover:border-emerald-200",
      };
      return `${baseClass} ${inactiveTheme[theme]}`;
    }
  };

  return (
    <div className={`${containerClass} ${className}`}>
      {onLike && (
        <button
          onClick={onLike}
          className={getButtonClass(liked, "like")}
          title={liked ? "Unlike" : "Like this blog"}
        >
          <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
          <span style={{ fontFamily: "Poppins, sans-serif" }}>
            {liked ? "Liked" : "Like"}
          </span>
        </button>
      )}

      {onBookmark && (
        <button
          onClick={onBookmark}
          className={getButtonClass(bookmarked, "bookmark")}
          title={bookmarked ? "Remove bookmark" : "Bookmark this blog"}
        >
          <Bookmark className={`w-5 h-5 ${bookmarked ? "fill-current" : ""}`} />
          <span style={{ fontFamily: "Poppins, sans-serif" }}>
            {bookmarked ? "Bookmarked" : "Bookmark"}
          </span>
        </button>
      )}

      {onShare && (
        <button
          onClick={onShare}
          disabled={sharing}
          className={getButtonClass(false, "share")}
          title="Share this blog"
        >
          <Share2 className="w-5 h-5" />
          <span style={{ fontFamily: "Poppins, sans-serif" }}>
            {sharing ? "Sharing..." : "Share"}
          </span>
        </button>
      )}
    </div>
  );
};

export default BlogActionButtons;
