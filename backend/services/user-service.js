import User from "../models/User.js";
import bcrypt from "bcrypt";
import { verifyGoogleToken } from "../config/googleAuth.js";
import { SECURITY } from '../config/constants.js';
import { hasCommonPatterns, validatePasswordStrength } from '../utils/passwordValidator.js';
import { sanitizeHTMLContent } from '../utils/sanitizer.js';
import { InvalidCredentialsError, NotFoundError, ConflictError, ForbiddenError } from '../utils/AppError.js';

export const getPaginatedUsers = async (page, limit) => {
  const [users, total] = await Promise.all([
    User.find({})
      .select('-password')
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }),
    User.countDocuments(),
  ]);

  if (!users.length) throw new NotFoundError('User');
  return { users, total };
};

export const createUserSignup = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ConflictError('User with this email already exists. Please login instead.');
  }

  hasCommonPatterns(password);
  validatePasswordStrength(password);

  const hashedPassword = await bcrypt.hash(password, SECURITY.BCRYPT_ROUNDS);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    authMethod: 'email',
    blogs: [],
  });

  await newUser.save();
  return newUser;
};

export const verifyLogin = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user || user.authMethod !== 'email') {
    throw new InvalidCredentialsError('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new InvalidCredentialsError('Invalid email or password');
  }

  user.lastLogin = new Date();
  await user.save();
  return user;
};

export const processGoogleSignIn = async (token) => {
  const googleUser = await verifyGoogleToken(token);
  let user = await User.findOne({ email: googleUser.email });

  if (!user) {
    user = new User({
      name: googleUser.name,
      email: googleUser.email,
      googleId: googleUser.googleId,
      profilePicture: googleUser.picture,
      authMethod: 'google',
      blogs: [],
    });
  } else if (!user.googleId) {
    user.googleId = googleUser.googleId;
    user.authMethod = 'google';
    if (!user.profilePicture) {
      user.profilePicture = googleUser.picture;
    }
  }

  user.lastLogin = new Date();
  await user.save();
  return user;
};

export const getUserProfileById = async (id) => {
  const user = await User.findById(id).select('-password');
  if (!user) {
    throw new NotFoundError('User');
  }
  return user;
};

export const updateUserProfileData = async (userId, updates) => {
  const user = await User.findById(userId);
  if (!user) throw new NotFoundError('User');

  const { name, bio, location, phone, website, profilePicture, socialMedia } = updates;

  if (name) user.name = name;
  if (bio !== undefined) user.bio = sanitizeHTMLContent(bio);
  if (location !== undefined) user.location = location;
  if (phone !== undefined) user.phone = phone;
  if (website !== undefined) user.website = website;
  if (profilePicture !== undefined) user.profilePicture = profilePicture;
  if (socialMedia) {
    user.socialMedia = {
      twitter: sanitizeHTMLContent(socialMedia.twitter || ""),
      linkedin: sanitizeHTMLContent(socialMedia.linkedin || ""),
      instagram: sanitizeHTMLContent(socialMedia.instagram || ""),
      github: sanitizeHTMLContent(socialMedia.github || ""),
    };
  }

  await user.save();
  return user;
};

export const changeUserPassword = async (userId, { currentPassword, newPassword }) => {
  const user = await User.findById(userId).select('+password');
  if (!user) throw new NotFoundError('User');

  if (user.authMethod === 'google') {
    throw new ForbiddenError('Cannot change password for Google-authenticated accounts');
  }

  const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
  if (!isCurrentPasswordValid) {
    throw new InvalidCredentialsError('Current password is incorrect');
  }

  validatePasswordStrength(newPassword);

  const hashedPassword = await bcrypt.hash(newPassword, SECURITY.BCRYPT_ROUNDS);
  user.password = hashedPassword;

  await user.save();
  return user;
};
