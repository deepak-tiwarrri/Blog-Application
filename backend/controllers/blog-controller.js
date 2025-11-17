import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import User from "../models/User.js";

//get all the blogs available
const getAllBlogs = async (req, res) => {
  try {
    let blogs = await Blog.find({}).populate("user");
    if (!blogs || blogs.length === 0) {
      return res.status(400).json({ message: "No Blogs Found" });
    }
    return res.status(200).json({ blogs });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
//get blogs by id
const getAllBlogById = async (req, res) => {
  const { id } = req.params;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (error) {
    return res.status(500).json({ message: "Could not find Blog" });
  }
  if (!blog) return res.status(404).json({ message: "Blog is not available" });
  return res.status(200).json({ blog });
};

//get user by id
const getUserById = async (req, res) => {
  let userId = req.params.id;
  let userBlogs;
  try {
    //find user by id and populate blogs associated with the user.
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (error) {
    return res.status(500).json({
      message: "Not able to find user or blogs",
      error: error.message,
    });
  }
  if (!userBlogs) {
    return res
      .status(404)
      .json({ message: "No user found", error: error });
  }
  return res.status(200).json({ user: userBlogs });
};

//add the blog
const addBlog = async (req, res) => {
  // prefer authenticated user id (set by auth middleware) over client-supplied value
  const { title, description, image } = req.body;
  const userId = req.userId || req.body.user;

  if (!userId) {
    return res.status(400).json({ message: "User id is required" });
  }

  let exisitingUser;
  try {
    exisitingUser = await User.findById(userId);
    if (!exisitingUser) {
      return res.status(404).json({ message: "User Not Found" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Could not find the user with this id",
      error: error.message,
    });
  }

  //now create a blog
  let blog = new Blog({ title, description, image, user: exisitingUser._id });
  let session;
  try {
    //await blog.save();
    //instead of directly saving the session start the session
    session = await mongoose.startSession();
    session.startTransaction();
    //save the blog and update the user blog array
    await blog.save({ session });
    exisitingUser.blogs.push(blog);
    await exisitingUser.save({ session });
    await session.commitTransaction(); //commit the transaction

    return res.status(201).json({ blog });
    //session.endTransaction();
  } catch (error) {
    //if there is error and session is running then abort the session
    if (session) await session.abortTransaction();
    return res
      .status(500)
      .json({ message: "Failed to add blog", error: error.message });
  } finally {
    if (session) await session.endSession();
  }
};

//update the blog
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    let updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      { new: true }
    );
    if (!updatedBlog)
      return res.status(404).json({ message: "Could not update blog" });

    //if updated blog is there then return it
    return res.status(200).json({ blog: updatedBlog });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Could not update the blog", error: error.message });
  }
};
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    // find the blog first so we have access to the user reference
    const blog = await Blog.findById(id).populate("user");
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // delete the blog document
    await Blog.findByIdAndDelete(id);

    // remove reference from user's blogs array if user exists
    if (blog.user) {
      try {
        blog.user.blogs.pull(blog._id);
        await blog.user.save();
      } catch (err) {
        // log but don't fail the whole operation since blog is already deleted
        console.error("Failed to remove blog reference from user:", err);
      }
    }

    return res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Could not delete Blog", error: error.message });
  }
};

export default { getAllBlogs, addBlog, updateBlog, getUserById, deleteBlog, getAllBlogById };
