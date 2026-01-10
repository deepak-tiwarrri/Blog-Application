import express from "express";
import userController from "../controllers/user-controller.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

//get request
userRouter.get("/", userController.getAllUser);
userRouter.get("/:id", userController.getUserProfile);
userRouter.post("/signup", userController.signUp);
userRouter.post("/login", userController.login);
userRouter.post("/google-signin", userController.googleSignIn);
userRouter.put("/:id", authMiddleware, userController.updateUserProfile);

export default userRouter;
