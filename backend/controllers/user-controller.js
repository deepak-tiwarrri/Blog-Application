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

export default { getAllUser, signUp, login, googleSignIn };
