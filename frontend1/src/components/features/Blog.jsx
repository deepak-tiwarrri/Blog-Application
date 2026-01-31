import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PropTypes from "prop-types";
import { SquarePenIcon, Trash } from 'lucide-react';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BlogActionButtons from "@/components/common/BlogActionButtons";
import { useBlogInteractions, useCopyToClipboard } from "@/hooks/useCommonLogic";
import { useBlogMutations } from "@/hooks/useBlogAPI";
import GlassCard from "../common/GlassCard";

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
  const { liked, bookmarked, sharing, toggleLike, toggleBookmark, handleShare } = useBlogInteractions(id);
  const { deleteBlog } = useBlogMutations();

  const handleEdit = () => {
    navigate(`/myblogs/${id}`);
  };

  const handleViewBlog = () => {
    navigate(`/blogs/${id}`);
  };

  const handleDeleteBlog = async () => {
    const success = await deleteBlog(id);
    if (success && onDelete) {
      onDelete();
    }
  };

  const handleShareBlog = async () => {
    const url = `${window.location.origin}/blogs/${id}`;
    await handleShare(url);
  };

  // Calculate reading time from prop or fallback to description
  const readingTime = propReadingTime || Math.ceil((description?.split(/\s+/).length || 0) / 200);

  return (
    <GlassCard className="group cursor-pointer flex flex-col w-full" onClick={handleViewBlog}>
      {isUser && (
        <div className="card-header-actions" onClick={(e) => e.stopPropagation()}>
          <button onClick={handleEdit} className="edit-btn cursor-pointer hover:scale-110 transition-transform">
            <SquarePenIcon sx={{ fontSize: "18px" }} size={20} />
          </button>
          <button onClick={handleDeleteBlog} className="delete-btn cursor-pointer hover:scale-110 transition-transform">
            <Trash sx={{ fontSize: "18px" }} size={20} />
          </button>
        </div>
      )}
      <div className="relative w-full pt-[56.25%] overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          onError={(e) => {
            e.target.src = "/assets/dish.jpg";
          }}
          alt="Blog"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="card-content" style={{ fontFamily: "Poppins, sans-serif" }}>
        <div className="flex items-center gap-3 mb-3">
          <span className="avatar-circle" style={{ fontFamily: "Poppins, sans-serif", fontSize: "0.75rem", fontWeight: "600" }}>
            {userName ? userName.charAt(0).toUpperCase() : ""}
          </span>
          <span className="blog-title" style={{ fontFamily: "Playfair Display, serif", fontWeight: "700", letterSpacing: "0.5px" }}>{title}</span>
        </div>
        <p className="blog-description" style={{ fontFamily: "Poppins, sans-serif", lineHeight: "1.7", fontSize: "0.95rem", color: "#4b5563" }}>{description}</p>
        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center gap-2 text-xs" style={{ fontFamily: "Poppins, sans-serif", color: "#9ca3af", letterSpacing: "0.3px" }}>
            <AccessTimeIcon sx={{ fontSize: "16px" }} />
            <span>{readingTime} min read</span>
          </div>
          <div onClick={(e) => e.stopPropagation()}>
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
        <div className="blog-meta mt-4">
          <span className="blog-meta-author" style={{ fontFamily: "Poppins, sans-serif", fontSize: "0.85rem", fontWeight: "500", color: "#6b7280", letterSpacing: "0.3px" }}>
            By {userName}
            {createdAt && (
              <> • {new Date(createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</>
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
