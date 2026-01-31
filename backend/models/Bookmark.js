import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookmarkSchema = new Schema({
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

// Ensure unique constraint: one bookmark per user per blog
bookmarkSchema.index({ user: 1, blog: 1 }, { unique: true });

export default mongoose.model("Bookmark", bookmarkSchema);
