import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { SquarePenIcon, Trash } from "lucide-react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BlogActionButtons from "@/components/common/BlogActionButtons";
import { useBlogInteractions } from "@/hooks/useCommonLogic";
import { useBlogMutations } from "@/hooks/useBlogAPI";
import GlassCard from "../common/GlassCard";
import DOMPurify from 'dompurify';

const Blog = ({
  title,
  description,
  imageUrl,
  userName,
  isUser,
  id,
  onDelete,
  createdAt,
  readingTime: propReadingTime,
}) => {
  const navigate = useNavigate();
  const { liked, bookmarked, sharing, toggleLike, toggleBookmark, handleShare } =
    useBlogInteractions(id);
  const { deleteBlog } = useBlogMutations();

  const handleEdit = () => navigate(`/myblogs/${id}`);
  const handleViewBlog = () => navigate(`/blogs/${id}`);

  const handleDeleteBlog = async () => {
    const success = await deleteBlog(id);
    if (success && onDelete) onDelete();
  };

  const handleShareBlog = async () => {
    const url = `${window.location.origin}/blogs/${id}`;
    await handleShare(url);
  };

  const cleanDescription = DOMPurify.sanitize(description, { ALLOWED_TAGS: [] });

  const readingTime =
    propReadingTime ||
    Math.ceil((cleanDescription?.split(/\s+/).length || 0) / 200);

  return (
    <GlassCard
      className="group cursor-pointer flex flex-col w-full overflow-hidden"
      onClick={handleViewBlog}
    >
      {/* Edit / Delete actions */}
      {isUser && (
        <div
          className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleEdit}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white backdrop-blur-sm transition-all duration-200 hover:scale-110"
          >
            <SquarePenIcon size={16} />
          </button>
          <button
            onClick={handleDeleteBlog}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-red-500/30 text-gray-300 hover:text-red-400 backdrop-blur-sm transition-all duration-200 hover:scale-110"
          >
            <Trash size={16} />
          </button>
        </div>
      )}

      {/* Thumbnail */}
      <div className="relative w-full pt-[56.25%] overflow-hidden">
        <img
          src={imageUrl}
          onError={(e) => {
            e.target.src = "/assets/dish.jpg";
          }}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5" style={{ fontFamily: "Poppins, sans-serif" }}>
        {/* Author + Title */}
        <div className="flex items-center gap-3 mb-3">
          <span
            className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-md"
          >
            {userName ? userName.charAt(0).toUpperCase() : "?"}
          </span>
          <h3
            className="text-white font-bold text-sm leading-snug line-clamp-2"
            style={{ fontFamily: "Playfair Display, serif", letterSpacing: "0.3px" }}
          >
            {title}
          </h3>
        </div>

        {/* Description */}
        <p
          className="text-gray-400 text-sm line-clamp-3 leading-relaxed flex-1"
          dangerouslySetInnerHTML={{ __html: cleanDescription }}
        />

        {/* Reading time + actions */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10 w-full min-h-[44px]">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 whitespace-nowrap flex-shrink-0">
            <AccessTimeIcon sx={{ fontSize: "14px" }} />
            <span>{readingTime} min read</span>
          </div>
          <div onClick={(e) => e.stopPropagation()} className="flex-shrink-0 ml-4">
            <BlogActionButtons
              liked={liked}
              bookmarked={bookmarked}
              sharing={sharing}
              onLike={toggleLike}
              onBookmark={toggleBookmark}
              onShare={handleShareBlog}
              variant="row"
              size="sm"
            />
          </div>
        </div>

        {/* Meta: author + date */}
        <div className="mt-3">
          <span className="text-xs text-gray-500" style={{ letterSpacing: "0.3px" }}>
            By{" "}
            <span className="text-gray-400 font-medium">{userName}</span>
            {createdAt && (
              <>
                {" "}
                •{" "}
                {new Date(createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </>
            )}
          </span>
        </div>
      </div>
    </GlassCard>
  );
};

Blog.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  userName: PropTypes.string,
  isUser: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onDelete: PropTypes.func,
  createdAt: PropTypes.string,
  readingTime: PropTypes.number,
};

export default Blog;
