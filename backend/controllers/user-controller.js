import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
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
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
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

export default { getAllUser, signUp, login };
