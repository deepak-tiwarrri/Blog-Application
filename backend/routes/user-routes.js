import express from "express";

const userRouter = express.Router();
import userController from "../controllers/user-controller.js";
// import authMiddleware from "../middleware/auth.js";
//get request
userRouter.get("/", userController.getAllUser);
userRouter.post("/signup", userController.signUp);
userRouter.post("/login", userController.login);
// userRouter.put("/:id", authMiddleware, userController.updateUser);
export default userRouter;
