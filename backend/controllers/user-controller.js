import { generateTokenPair } from "../config/token.js";
import { asyncHandler } from '../middleware/errorHandler.js';
import { sendSuccess } from '../utils/responseFormatter.js';
import { UnauthorizedError, InvalidCredentialsError } from '../utils/AppError.js';
import * as userService from '../services/user-service.js';

const getAllUser = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(50, parseInt(req.query.limit) || 20);

  const { users } = await userService.getPaginatedUsers(page, limit);

  return sendSuccess(res, users, 'Users retrieved successfully', 200);
});

const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = await userService.createUserSignup({ name, email, password });
  const { accessToken, refreshToken } = generateTokenPair(newUser._id);

  return sendSuccess(
    res,
    {
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        authMethod: newUser.authMethod,
      },
      accessToken,
      refreshToken,
    },
    'User created successfully',
    201
  );
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.verifyLogin({ email, password });
  const { accessToken, refreshToken } = generateTokenPair(user._id);

  return sendSuccess(
    res,
    {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        authMethod: user.authMethod,
      },
      accessToken,
      refreshToken,
    },
    'Login successful',
    200
  );
});

const googleSignIn = asyncHandler(async (req, res) => {
  const { token } = req.body;

  if (!token) {
    throw new InvalidCredentialsError('Google token is required');
  }

  const user = await userService.processGoogleSignIn(token);
  const { accessToken, refreshToken } = generateTokenPair(user._id);

  return sendSuccess(
    res,
    {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      },
      accessToken,
      refreshToken,
    },
    'Google sign-in successful',
    200
  );
});

const getUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) throw new InvalidCredentialsError('User ID is required');

  const user = await userService.getUserProfileById(id);

  return sendSuccess(
    res,
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      bio: user.bio,
      location: user.location,
      phone: user.phone,
      website: user.website,
      socialMedia: user.socialMedia,
      authMethod: user.authMethod,
      blogsCount: user.blogs.length,
      followersCount: user.followers?.length || 0,
      followingCount: user.following?.length || 0,
      createdAt: user.createdAt,
    },
    'User profile retrieved successfully',
    200
  );
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const updates = req.body;

  if (!userId) throw new UnauthorizedError('User ID not found in token');

  const user = await userService.updateUserProfileData(userId, updates);

  return sendSuccess(
    res,
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      bio: user.bio,
      location: user.location,
      phone: user.phone,
      website: user.website,
      socialMedia: user.socialMedia,
      authMethod: user.authMethod,
      updatedAt: user.updatedAt,
    },
    'Profile updated successfully',
    200
  );
});

const changePassword = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { currentPassword, newPassword } = req.body;

  if (!userId) throw new UnauthorizedError('User ID not found in token');

  await userService.changeUserPassword(userId, { currentPassword, newPassword });

  return sendSuccess(
    res,
    null,
    'Password changed successfully',
    200
  );
});

export default {
  getAllUser,
  signUp,
  login,
  googleSignIn,
  getUserProfile,
  updateUserProfile,
  changePassword,
};

