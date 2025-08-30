
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { blogApi } from "@/api";
import { toast } from "sonner";


const Blog = ({ title, description, imageUrl, userName, isUser, id, onDelete }) => {
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
      toast.error("Failed to delete blog");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all overflow-hidden flex flex-col w-full">
      {isUser && (
        <div className="flex justify-end gap-2 p-2">
          <button onClick={handleEdit} className="text-blue-600 hover:text-blue-800">
            <EditIcon />
          </button>
          <button onClick={handleDelete} className="text-red-600 hover:text-red-800">
            <DeleteIcon />
          </button>
        </div>
      )}
      <img
        src={imageUrl}
        onError={(e) => {
          e.target.src = '/assets/dish.jpg';
        }}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
            {userName ? userName.charAt(0).toUpperCase() : ''}
          </span>
          <span className="text-lg font-semibold text-gray-900">{title}</span>
        </div>
        <p className="text-gray-700 mb-2">{description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm text-gray-500">By {userName}</span>
        </div>
      </div>
    </div>
  );
};

export default Blog;
