import blogController from "../controllers/blog-controller.js";
import express from "express";
import authMiddleware from "../middleware/auth.js";
import { optionalAuthMiddleware } from "../middleware/auth.js";
import {
  validateBlogCreate,
  validateBlogUpdate,
  validatePagination,
  validateBlogId,
  validateIdParam,
  handleValidationErrors,
} from "../middleware/validators.js";
import { upload } from "../middleware/upload.js";

const blogRouter = express.Router();

// Public routes
blogRouter.get(
  "/",
  validatePagination,
  handleValidationErrors,
  blogController.getAllBlogs
);

blogRouter.get(
  "/:id",
  validateIdParam,
  handleValidationErrors,
  optionalAuthMiddleware,
  blogController.getAllBlogById
);

blogRouter.get(
  "/user/:id",
  validateIdParam,
  handleValidationErrors,
  blogController.getUserById
);

// Protected routes
blogRouter.post(
  "/add",
  authMiddleware,
  upload.single("image"),
  validateBlogCreate,
  handleValidationErrors,
  blogController.addBlog
);

blogRouter.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  validateIdParam,
  validateBlogUpdate,
  handleValidationErrors,
  blogController.updateBlog
);

blogRouter.delete(
  "/:id",
  authMiddleware,
  validateIdParam,
  handleValidationErrors,
  blogController.deleteBlog
);

// Like routes
blogRouter.post(
  "/:blogId/like",
  authMiddleware,
  validateBlogId,
  handleValidationErrors,
  blogController.likeBlog
);

blogRouter.delete(
  "/:blogId/like",
  authMiddleware,
  validateBlogId,
  handleValidationErrors,
  blogController.unlikeBlog
);

// Bookmark routes
blogRouter.post(
  "/:blogId/bookmark",
  authMiddleware,
  validateBlogId,
  handleValidationErrors,
  blogController.bookmarkBlog
);

blogRouter.delete(
  "/:blogId/bookmark",
  authMiddleware,
  validateBlogId,
  handleValidationErrors,
  blogController.removeBookmark
);

// Check interactions
blogRouter.get(
  "/:blogId/interactions",
  optionalAuthMiddleware,
  validateBlogId,
  handleValidationErrors,
  blogController.checkUserInteractions
);

// Comment routes
blogRouter.get(
  "/:blogId/comments",
  validateBlogId,
  handleValidationErrors,
  blogController.getComments
);

blogRouter.post(
  "/:blogId/comments",
  authMiddleware,
  validateBlogId,
  handleValidationErrors,
  blogController.addComment
);

blogRouter.delete(
  "/comments/:commentId",
  authMiddleware,
  blogController.deleteComment
);

export default blogRouter;
