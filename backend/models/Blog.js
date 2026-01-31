import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  readingTime: {
    type: Number,
    default: 0, // calculated as word count / 200
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Like",
    },
  ],
  bookmarks: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Bookmark",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Calculate reading time before saving (200 words per minute average)
blogSchema.pre("save", function (next) {
  if (this.description) {
    const wordCount = this.description.trim().split(/\s+/).length;
    this.readingTime = Math.ceil(wordCount / 200);
  }
  next();
});

export default mongoose.model("Blog", blogSchema);