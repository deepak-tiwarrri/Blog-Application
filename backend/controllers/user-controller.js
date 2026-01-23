import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../config/token.js";
import { verifyGoogleToken } from "../config/googleAuth.js";

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}); // Fetch all users
    if (!users.length) {
      return res.status(404).json({ message: "No users found." });
    }
    return res.status(200).json({ users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to retrieve users", error: error.message });
  }
};

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists!! Login Instead" });
    }
    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);
    let newUser = new User({
      name,
      email,
      password: hashPassword,
      blogs: [],
    });
    await newUser.save();
    // Generate JWT token

    const token = generateToken(newUser._id, "2h");

    return res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials,Email is not registered!!",
      });
    }
    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is wrong" });
    }
    // Generate JWT token
    const token = generateToken(user._id, "2h");

    return res.status(200).json({
      message: "Login Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong :(", error: error.message });
  }
};

/**
 * Google Sign-In Handler
 * Verifies Google token and creates/updates user
 */
const googleSignIn = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Google token is required" });
  }

  try {
    // Verify Google token
    const googleUser = await verifyGoogleToken(token);
    console.log("google User details", googleUser);
    // Check if user exists
    let user = await User.findOne({ email: googleUser.email });

    if (!user) {
      // Create new user from Google data
      user = new User({
        name: googleUser.name,
        email: googleUser.email,
        googleId: googleUser.googleId,
        profilePicture: googleUser.picture,
        authMethod: "google",
        blogs: [],
      });
      console.log(user);
      await user.save();
    } else if (!user.googleId) {
      // Update existing user with Google ID if not set
      user.googleId = googleUser.googleId;
      user.authMethod = "google";
      if (!user.profilePicture) {
        user.profilePicture = googleUser.picture;
      }
      await user.save();
    }

    // Generate JWT token
    const jwtToken = generateToken(user._id, "7d");
    console.log("jwt token generate after google login ", jwtToken);

    return res.status(200).json({
      message: "Google Sign-In Successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      },
      token: jwtToken,
    });
  } catch (error) {
    console.error("Google Sign-In Error:", error.message);
    return res.status(400).json({
      message: "Google Sign-In failed",
      error: error.message,
    });
  }
};

/**
 * Get user profile by ID
 * @param {string} userId - User ID from params or from authenticated request
 */
const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(id).select("-password");
    console.log("User details from backend: ", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      user: {
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
        createdAt: user.createdAt,
        blogsCount: user.blogs.length,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch user profile",
      error: error.message,
    });
  }
};

/**
 * Update user profile
 * @param {string} userId - User ID (from authenticated request)
 * @param {Object} updates - Profile updates (name, bio, location, phone, website, profilePicture)
 */
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId || req.params.id;
    const { name, bio, location, phone, website, profilePicture, socialMedia } =
      req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find and update user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update only provided fields
    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (location !== undefined) user.location = location;
    if (phone !== undefined) user.phone = phone;
    if (website !== undefined) user.website = website;
    if (profilePicture !== undefined) user.profilePicture = profilePicture;
    if (socialMedia) {
      user.socialMedia = {
        twitter: socialMedia.twitter || "",
        linkedin: socialMedia.linkedin || "",
        instagram: socialMedia.instagram || "",
        github: socialMedia.github || "",
      };
    }

    user.updatedAt = new Date();

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
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
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

/**
 * Change user password
 * @param {string} userId - User ID
 * @param {string} currentPassword - Current password
 * @param {string} newPassword - New password
 */
const changePassword = async (req, res) => {
  try {
    const userId = req.userId || req.params.id;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message:
          "Current password, new password, and confirmation are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "New passwords do not match",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters long",
      });
    }

    // Get user with password field
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Only password-authenticated users can change password
    if (user.authMethod === "google") {
      return res.status(400).json({
        message: "Cannot change password for Google-authenticated accounts",
      });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash new password
    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    user.updatedAt = new Date();

    await user.save();

    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to change password",
      error: error.message,
    });
  }
};

export default {
  getAllUser,
  signUp,
  login,
  googleSignIn,
  getUserProfile,
  updateUserProfile,
  changePassword,
};
