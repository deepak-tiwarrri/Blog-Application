import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { blogApi } from "@/api";
import { toast } from "sonner";
import PropTypes from "prop-types";
import { Pencil, Trash } from 'lucide-react';

import FavoriteIcon from '@mui/icons-material/Favorite';
import "@fontsource/poppins";
import "@fontsource/playfair-display";

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
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleEdit = () => {
    navigate(`/myblogs/${id}`);
  };

  const handleDelete = async () => {
    try {
      await blogApi.delete(id);
      toast.success("Blog deleted successfully!");
      if (onDelete) onDelete();
    } catch (error) {
      toast.error("Failed to delete blog", error);
    }
  };

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
      const url = `${window.location.origin}/myblogs/${id}`;
      await navigator.clipboard.writeText(url);
      toast.success("Blog link copied to clipboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="card-container">
      {isUser && (
        <div className="card-header-actions">
          <button onClick={handleEdit} className="edit-btn">
            <Pencil sx={{ fontSize: "18px" }} size={20} />
          </button>
          <button onClick={handleDelete} className="delete-btn">
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
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className="blogs-card-buttons hover:text-red-600 transition-colors duration-200"
              title="Like this blog"
            >
              <FavoriteIcon sx={{ fontSize: "18px" }} color={liked ? "error" : "inherit"} />
            </button>
            <button
              onClick={handleBookmark}
              className="blogs-card-buttons hover:text-amber-500 transition-colors duration-200"
              title="Bookmark this blog"
            >
              <BookmarkOutlinedIcon sx={{ fontSize: "18px" }} color={bookmarked ? "warning" : "inherit"} />
            </button>
            <button
              onClick={handleShare}
              className="blogs-card-buttons hover:text-emerald-600 transition-colors duration-200"
              title="Share this blog"
            >
              <ShareOutlinedIcon sx={{ fontSize: "18px" }} />
            </button>
          </div>
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
