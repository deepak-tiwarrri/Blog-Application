import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PropTypes from "prop-types";
import { SquarePenIcon, Trash } from 'lucide-react';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BlogActionButtons from "@/components/common/BlogActionButtons";
import { useBlogInteractions, useCopyToClipboard } from "@/hooks/useCommonLogic";
import { useBlogMutations } from "@/hooks/useBlogAPI";

const Blog = ({
  title,
  description,
  imageUrl,
  userName,
  isUser,
  id,
  onDelete,
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

  return (
    <div className="card-container group cursor-pointer" onClick={handleViewBlog}>
      {isUser && (
        <div className="card-header-actions" onClick={(e) => e.stopPropagation()}>
          <button onClick={handleEdit} className="edit-btn">
            <SquarePenIcon sx={{ fontSize: "18px" }} size={20} />
          </button>
          <button onClick={handleDeleteBlog} className="delete-btn">
            <Trash sx={{ fontSize: "18px" }} size={20} />
          </button>
        </div>
      )}
      <img
        src={imageUrl}
        onError={(e) => {
          e.target.src = "/assets/dish.jpg";
        }}
        alt="Blog"
      />
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
            <span>{/* publish date if available */}</span>
          </div>
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
        <div className="blog-meta mt-4">
          <span className="blog-meta-author" style={{ fontFamily: "Poppins, sans-serif", fontSize: "0.85rem", fontWeight: "500", color: "#6b7280", letterSpacing: "0.3px" }}>By {userName}</span>
        </div>
      </div>
    </div>
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
};

export default Blog;
