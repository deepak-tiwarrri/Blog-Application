import { asyncHandler } from "../middleware/errorHandler.js";
import { sendSuccess, sendError } from "../utils/responseFormatter.js";
import { UnauthorizedError, AppError } from "../utils/AppError.js";
import * as blogService from "../services/blog-service.js";

const getAllBlogs = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(50, parseInt(req.query.limit) || 20);
  const search = req.query.search || "";
  const tag = req.query.tag || "";

  const { blogs, total } = await blogService.getPaginatedBlogs(page, limit, search, tag);

  if (!blogs || blogs.length === 0) {
    return sendSuccess(res, {
      blogs: [],
      pagination: {
        total: 0,
        page,
        pages: 0,
        limit,
      }
    }, "No blogs found", 200);
  }

  return sendSuccess(
    res,
    {
      blogs,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    },
    "Blogs retrieved successfully",
    200
  );
});

const getAllBlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await blogService.getBlogById(id);
  return sendSuccess(res, blog, "Blog retrieved successfully", 200);
});

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await blogService.getUserWithBlogs(id);

  return sendSuccess(
    res,
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      bio: user.bio,
      location: user.location,
      website: user.website,
      blogCount: user.blogs.length,
      blogs: user.blogs,
    },
    "User profile with blogs retrieved successfully",
    200
  );
});

const addBlog = asyncHandler(async (req, res) => {
  const { title, description, tags } = req.body;
  const userId = req.userId;
  
  let image = req.body.image;
  if (req.file) {
    image = `/uploads/${req.file.filename}`;
  }

  if (!userId) {
    throw new UnauthorizedError("User authentication required to create blog");
  }

  const blog = await blogService.createBlog(userId, { title, description, image, tags });
  return sendSuccess(res, blog, "Blog created successfully", 201);
});

const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const { title, description, tags } = req.body;

  let image = req.body.image;
  if (req.file) {
    image = `/uploads/${req.file.filename}`;
  }

  const updatedBlog = await blogService.updateBlogById(id, userId, { title, description, image, tags });
  return sendSuccess(res, updatedBlog, "Blog updated successfully", 200);
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  await blogService.softDeleteBlogById(id, userId);
  return sendSuccess(res, null, "Blog deleted successfully", 200);
});

const likeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const userId = req.userId;

  if (!userId) throw new UnauthorizedError("User authentication required");

  const like = await blogService.toggleLikeBlog(blogId, userId, true);
  return sendSuccess(res, like, "Blog liked successfully", 201);
});

const unlikeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const userId = req.userId;

  if (!userId) throw new UnauthorizedError("User authentication required");

  await blogService.toggleLikeBlog(blogId, userId, false);
  return sendSuccess(res, null, "Blog unliked successfully", 200);
});

const bookmarkBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const userId = req.userId;

  if (!userId) throw new UnauthorizedError("User authentication required");

  const bookmark = await blogService.toggleBookmarkBlog(blogId, userId, true);
  return sendSuccess(res, bookmark, "Blog bookmarked successfully", 201);
});

const removeBookmark = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const userId = req.userId;

  if (!userId) throw new UnauthorizedError("User authentication required");

  await blogService.toggleBookmarkBlog(blogId, userId, false);
  return sendSuccess(res, null, "Bookmark removed successfully", 200);
});

const checkUserInteractions = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const userId = req.userId; // Usually optional route, meaning userId might be undefined

  const interactions = await blogService.checkInteractions(blogId, userId);
  return sendSuccess(res, interactions, "Interactions retrieved successfully", 200);
});

// ======== Comments Controllers ======== //

const getComments = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const comments = await blogService.getCommentsForBlog(blogId);
  return sendSuccess(res, comments, "Comments retrieved successfully", 200);
});

const addComment = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const { text } = req.body;
  const userId = req.userId;

  if (!text) {
    return sendError(res, new AppError("Comment text is required", 400));
  }

  const comment = await blogService.addCommentToBlog(blogId, userId, text);
  return sendSuccess(res, comment, "Comment added successfully", 201);
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.userId;

  await blogService.deleteCommentFromBlog(commentId, userId);
  return sendSuccess(res, null, "Comment deleted successfully", 200);
});

export default {
  getAllBlogs,
  getAllBlogById,
  getUserById,
  addBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  unlikeBlog,
  bookmarkBlog,
  removeBookmark,
  checkUserInteractions,
  getComments,
  addComment,
  deleteComment,
};
