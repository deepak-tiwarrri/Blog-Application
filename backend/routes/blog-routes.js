import blogController from "../controllers/blog-controller.js";
import express from "express";

const blogRouter = express.Router();

blogRouter.get("/", blogController.getAllBlogs);
blogRouter.get("/:id", blogController.getAllBlogById);
blogRouter.get("/user/:id", blogController.getUserById);
blogRouter.post("/add", blogController.addBlog);
blogRouter.put("/update/:id", blogController.updateBlog);
blogRouter.delete("/:id", blogController.deleteBlog);

export default blogRouter;
