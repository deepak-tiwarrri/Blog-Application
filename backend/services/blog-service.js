import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import User from "../models/User.js";
import Like from "../models/Like.js";
import Bookmark from "../models/Bookmark.js";
import Comment from "../models/Comment.js";
import { NotFoundError, ForbiddenError, ConflictError } from "../utils/AppError.js";

export const getPaginatedBlogs = async (page, limit, search = "", tag = "") => {
  const skip = (page - 1) * limit;
  const query = { isDeleted: { $ne: true } };

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } }
    ];
  }

  if (tag) {
    query.tags = { $in: [tag] }; // exactly matches tag string
  }

  const blogs = await Blog.find(query)
    .populate("user", "name email profilePicture bio")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Blog.countDocuments(query);
  return { blogs, total };
};

export const getBlogById = async (id) => {
  const blog = await Blog.findById(id).populate("user", "name email profilePicture bio");
  if (!blog || blog.isDeleted) throw new NotFoundError("Blog");
  return blog;
};

export const getUserWithBlogs = async (id) => {
  const user = await User.findById(id)
    .select("-password")
    .populate({
      path: "blogs",
      match: { isDeleted: { $ne: true } },
      select: "title description image createdAt updatedAt likes bookmarks",
      options: { sort: { createdAt: -1 } },
    });

  if (!user) throw new NotFoundError("User");
  return user;
};

export const createBlog = async (userId, blogData) => {
  const existingUser = await User.findById(userId);
  if (!existingUser) throw new NotFoundError("User");

  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const blog = new Blog({
      ...blogData,
      user: existingUser._id,
    });

    if (blogData.tags && typeof blogData.tags === 'string') {
      blog.tags = blogData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    } else if (Array.isArray(blogData.tags)) {
      blog.tags = blogData.tags;
    }

    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });

    await session.commitTransaction();
    return blog;
  } catch (error) {
    if (session) await session.abortTransaction();
    throw error;
  } finally {
    if (session) await session.endSession();
  }
};

export const updateBlogById = async (id, userId, updateData) => {
  const blog = await Blog.findById(id);
  if (!blog || blog.isDeleted) throw new NotFoundError("Blog");

  if (blog.user.toString() !== userId) {
    throw new ForbiddenError("Only blog owner can update");
  }

  if (updateData.tags && typeof updateData.tags === 'string') {
    updateData.tags = updateData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    updateData,
    { new: true }
  ).populate("user", "name email profilePicture");

  return updatedBlog;
};

// ======== Comments Operations ======== //

export const getCommentsForBlog = async (blogId) => {
  const blog = await Blog.findById(blogId);
  if (!blog || blog.isDeleted) throw new NotFoundError("Blog");

  const comments = await Comment.find({ blog: blogId })
    .populate("user", "name profilePicture")
    .sort({ createdAt: -1 });

  return comments;
};

export const addCommentToBlog = async (blogId, userId, text) => {
  const blog = await Blog.findById(blogId);
  if (!blog || blog.isDeleted) throw new NotFoundError("Blog");

  const comment = new Comment({
    text,
    blog: blogId,
    user: userId,
  });

  await comment.save();
  // Populate user data immediately for frontend return
  await comment.populate("user", "name profilePicture");

  return comment;
};

export const deleteCommentFromBlog = async (commentId, userId) => {
  const comment = await Comment.findById(commentId);
  if (!comment) throw new NotFoundError("Comment");

  // Check if comment owner
  if (comment.user.toString() !== userId) {
    throw new ForbiddenError("Only comment owner can delete it");
  }

  await Comment.findByIdAndDelete(commentId);
  return true;
};

export const softDeleteBlogById = async (id, userId) => {
  const blog = await Blog.findById(id).populate("user");
  if (!blog || blog.isDeleted) throw new NotFoundError("Blog");

  if (blog.user._id.toString() !== userId) {
    throw new ForbiddenError("Only blog owner can delete");
  }

  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    blog.isDeleted = true;
    await blog.save({ session });

    if (blog.user) {
      blog.user.blogs.pull(blog._id);
      await blog.user.save({ session });
    }

    await session.commitTransaction();
  } catch (error) {
    if (session) await session.abortTransaction();
    throw error;
  } finally {
    if (session) await session.endSession();
  }
};

export const toggleLikeBlog = async (blogId, userId, isLike) => {
  const blog = await Blog.findById(blogId);
  if (!blog || blog.isDeleted) throw new NotFoundError("Blog");

  if (isLike) {
    const existingLike = await Like.findOne({ user: userId, blog: blogId });
    if (existingLike) throw new ConflictError("Blog already liked");

    const like = new Like({ user: userId, blog: blogId });
    await like.save();
    blog.likes.push(like._id);
    await blog.save();
    return like;
  } else {
    const like = await Like.findOneAndDelete({ user: userId, blog: blogId });
    if (!like) throw new NotFoundError("Like");
    await Blog.findByIdAndUpdate(blogId, { $pull: { likes: like._id } });
    return null;
  }
};

export const toggleBookmarkBlog = async (blogId, userId, isBookmark) => {
  const blog = await Blog.findById(blogId);
  if (!blog || blog.isDeleted) throw new NotFoundError("Blog");

  if (isBookmark) {
    const existingBookmark = await Bookmark.findOne({ user: userId, blog: blogId });
    if (existingBookmark) throw new ConflictError("Blog already bookmarked");

    const bookmark = new Bookmark({ user: userId, blog: blogId });
    await bookmark.save();
    blog.bookmarks.push(bookmark._id);
    await blog.save();
    return bookmark;
  } else {
    const bookmark = await Bookmark.findOneAndDelete({ user: userId, blog: blogId });
    if (!bookmark) throw new NotFoundError("Bookmark");
    await Blog.findByIdAndUpdate(blogId, { $pull: { bookmarks: bookmark._id } });
    return null;
  }
};

export const checkInteractions = async (blogId, userId) => {
  if (!userId) return { liked: false, bookmarked: false };

  const liked = await Like.exists({ user: userId, blog: blogId });
  const bookmarked = await Bookmark.exists({ user: userId, blog: blogId });

  return { liked: !!liked, bookmarked: !!bookmarked };
};
