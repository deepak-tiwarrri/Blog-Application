import express from "express";
import userController from "../controllers/user-controller.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();
//get request
userRouter.get("/", userController.getAllUser);
userRouter.post("/signup", userController.signUp);
userRouter.post("/login", userController.login);
// Example: userRouter.put("/:id", authMiddleware, userController.updateUser); // Uncomment if updateUser is implemented
export default userRouter;
