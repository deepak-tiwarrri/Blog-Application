import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { blogApi } from "@/api";
import { toast } from "sonner";
import PropTypes from "prop-types";

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

  return (
    <div className="card-container">
      {isUser && (
        <div className="card-header-actions">
          <button onClick={handleEdit} className="edit-btn">
            <EditIcon />
          </button>
          <button onClick={handleDelete} className="delete-btn">
            <DeleteIcon />
          </button>
        </div>
      )}
      <img
        src={imageUrl}
        onError={(e) => {
          e.target.src = "/assets/dish.jpg";
        }}
        alt={title}
        className="blog-image"
      />
      <div className="card-content">
        <div className="flex items-center gap-2 mb-2">
          <span className="avatar-circle">
            {userName ? userName.charAt(0).toUpperCase() : ""}
          </span>
          <span className="blog-title">{title}</span>
        </div>
        <p className="blog-description">{description}</p>
        <div className="blog-meta">
          <span className="blog-meta-author">By {userName}</span>
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
