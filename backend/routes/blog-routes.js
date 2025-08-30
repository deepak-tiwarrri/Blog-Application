import blogController from "../controllers/blog-controller.js";
import express from "express";
import authMiddleware from "../middleware/auth.js";

const blogRouter = express.Router();

blogRouter.get("/", blogController.getAllBlogs);
blogRouter.get("/:id", blogController.getAllBlogById);
blogRouter.get("/user/:id", blogController.getUserById);
blogRouter.post("/add", authMiddleware, blogController.addBlog);
blogRouter.put("/update/:id", authMiddleware, blogController.updateBlog);
blogRouter.delete("/:id", authMiddleware, blogController.deleteBlog);

export default blogRouter;
