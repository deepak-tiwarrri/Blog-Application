import mongoose from "mongoose";

const Schema = mongoose.Schema;

const likeSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  blog: {
    type: mongoose.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure unique constraint: one like per user per blog
likeSchema.index({ user: 1, blog: 1 }, { unique: true });

export default mongoose.model("Like", likeSchema);
