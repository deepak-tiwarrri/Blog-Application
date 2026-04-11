import express from "express";
import userController from "../controllers/user-controller.js";
import authMiddleware from "../middleware/auth.js";
import { loginLimiter, signupLimiter, passwordChangeLimiter } from "../middleware/rateLimiter.js";
import {
  validateSignUp,
  validateLogin,
  validateUpdateProfile,
  validateChangePassword,
  validateObjectId,
  handleValidationErrors,
} from "../middleware/validators.js";
import { asyncHandler } from "../middleware/errorHandler.js";

const userRouter = express.Router();

// Public routes
userRouter.post(
  "/signup",
  signupLimiter,
  validateSignUp,
  handleValidationErrors,
  userController.signUp
);

userRouter.post(
  "/login",
  loginLimiter,
  validateLogin,
  handleValidationErrors,
  userController.login
);

userRouter.post("/google-signin", userController.googleSignIn);

// Protected routes
userRouter.get(
  "/:id",
  validateObjectId,
  handleValidationErrors,
  userController.getUserProfile
);

userRouter.put(
  "/:id",
  authMiddleware,
  validateObjectId,
  validateUpdateProfile,
  handleValidationErrors,
  userController.updateUserProfile
);

userRouter.put(
  "/:id/change-password",
  authMiddleware,
  validateObjectId,
  validateChangePassword,
  handleValidationErrors,
  passwordChangeLimiter,
  userController.changePassword
);

// Admin route (minimal support for now)
userRouter.get("/", authMiddleware, userController.getAllUser);

export default userRouter;
