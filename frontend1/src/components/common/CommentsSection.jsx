import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MessageSquare, Trash2, Send } from "lucide-react";
import { useBlogComments } from "@/hooks/useBlogAPI";

const CommentsSection = ({ blogId, currentUserId }) => {
  const { comments, loading, fetchComments, addComment, removeComment } = useBlogComments(blogId);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const added = await addComment(newComment);
    if (added) setNewComment("");
  };

  return (
    <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 border border-gray-100">
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare className="text-blue-600 w-6 h-6" />
        <h2 style={{ fontFamily: "Playfair Display, serif" }} className="text-2xl font-bold text-gray-900">
          Comments ({comments.length})
        </h2>
      </div>

      {currentUserId ? (
        <form onSubmit={handleSubmit} className="mb-10">
          <div className="flex gap-4">
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none min-h-[100px]"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !newComment.trim()}
              className="px-6 py-3 h-fit bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 transition-all duration-200 flex items-center gap-2 flex-shrink-0"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Post</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="mb-10 p-6 bg-blue-50 border border-blue-100 rounded-xl text-center">
          <p style={{ fontFamily: "'Poppins', sans-serif" }} className="text-blue-800">
            Please log in to join the conversation.
          </p>
        </div>
      )}

      {loading && comments.length === 0 ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment._id} className="group p-5 bg-gray-50 border border-gray-100 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {comment.user?.name ? comment.user.name.charAt(0).toUpperCase() : "?"}
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "'Poppins', sans-serif" }} className="font-semibold text-gray-900 text-sm">
                      {comment.user?.name || "Unknown"}
                    </h4>
                    <span className="text-xs text-gray-400">
                      {new Date(comment.createdAt).toLocaleDateString("en-US", {
                        month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit"
                      })}
                    </span>
                  </div>
                </div>
                {currentUserId === comment.user?._id && (
                  <button
                    onClick={() => removeComment(comment._id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 focus:opacity-100"
                    title="Delete Comment"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p style={{ fontFamily: "'Poppins', sans-serif" }} className="text-gray-700 text-sm sm:text-base leading-relaxed pl-13">
                {comment.text}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-medium text-gray-900 mb-1">
            No comments yet
          </h3>
          <p style={{ fontFamily: "'Poppins', sans-serif" }} className="text-gray-500 text-sm">
            Be the first to share your thoughts on this story!
          </p>
        </div>
      )}
    </div>
  );
};

CommentsSection.propTypes = {
  blogId: PropTypes.string.isRequired,
  currentUserId: PropTypes.string,
};

export default CommentsSection;
