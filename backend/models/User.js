import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
    minlength: 6,
  },
  googleId: {
    type: String,
    default: null,
  },
  profilePicture: {
    type: String,
    default: null,
  },
  authMethod: {
    type: String,
    enum: ['email', 'google'],
    default: 'email',
  },
  bio: {
    type: String,
    default: "",
    maxlength: 500,
  },
  location: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  website: {
    type: String,
    default: "",
  },
  blogs: [{ type: mongoose.Types.ObjectId, ref: "Blog", required: true }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("User", userSchema);
// users