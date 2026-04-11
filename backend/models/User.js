import mongoose from "mongoose";
import { USER } from '../config/constants.js';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [USER.NAME_MIN_LENGTH, `Name must be at least ${USER.NAME_MIN_LENGTH} characters`],
    maxlength: [USER.NAME_MAX_LENGTH, `Name cannot exceed ${USER.NAME_MAX_LENGTH} characters`],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email already exists'],
    lowercase: true,
    trim: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email format'],
    index: true,
  },
  password: {
    type: String,
    required: function() {
      return this.authMethod === 'email';
    },
    minlength: [12, 'Password must be at least 12 characters'],
    select: false,
  },
  googleId: {
    type: String,
    default: null,
    sparse: true,
  },
  profilePicture: {
    type: String,
    default: null,
    validate: {
      validator: function(v) {
        if (!v) return true;
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
      },
      message: 'Invalid image URL'
    }
  },
  authMethod: {
    type: String,
    enum: {
      values: ['email', 'google'],
      message: 'Auth method must be either email or google'
    },
    default: 'email',
  },
  bio: {
    type: String,
    default: "",
    maxlength: [USER.BIO_MAX_LENGTH, `Bio cannot exceed ${USER.BIO_MAX_LENGTH} characters`],
    trim: true,
  },
  location: {
    type: String,
    default: "",
    trim: true,
  },
  phone: {
    type: String,
    default: "",
    trim: true,
  },
  website: {
    type: String,
    default: "",
    validate: {
      validator: function(v) {
        if (!v) return true;
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Invalid website URL'
    }
  },
  socialMedia: {
    twitter: {
      type: String,
      default: "",
      trim: true,
    },
    linkedin: {
      type: String,
      default: "",
      trim: true,
    },
    instagram: {
      type: String,
      default: "",
      trim: true,
    },
    github: {
      type: String,
      default: "",
      trim: true,
    },
  },
  blogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Blog",
    }
  ],
  followers: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    }
  ],
  following: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    }
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
  lastLogin: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ authMethod: 1 });

// Update updatedAt before save
userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Hide sensitive fields when converting to JSON
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

export default mongoose.model("User", userSchema);