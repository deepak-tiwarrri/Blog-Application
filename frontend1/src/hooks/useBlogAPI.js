import { useState, useCallback } from "react";
import { blogApi, userApi } from "@/api";
import { toast } from "sonner";

/**
 * Custom hook for fetching blogs with loading, error, and caching support
 */
export const useFetchBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBlogs = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await blogApi.getAll(params);
      const data = response?.data?.data?.blogs || [];
      setBlogs(data);
      return data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to fetch blogs";
      setError(errorMsg);
      toast.error(errorMsg);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return { blogs, setBlogs, loading, error, fetchBlogs };
};

/**
 * Custom hook for fetching a single blog by ID
 */
export const useFetchBlogById = (blogId) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogById = useCallback(async () => {
    if (!blogId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await blogApi.getById(blogId);
      const data = response?.data?.data;
      setBlog(data);
      return data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to fetch blog";
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [blogId]);

  return { blog, setBlog, loading, error, fetchBlogById };
};

export const useFetchUserBlogs = (userId) => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserBlogs = useCallback(async () => {
    if (!userId) return null;

    setLoading(true);
    setError(null);
    try {
      const response = await blogApi.getBlogByUserId(userId);
      const responseData = response?.data?.data || {};

      // Separate blogs array from the rest of the user data
      const { blogs: blogsData = [], ...userData } = responseData;

      // If the API returns user info embedded in each blog, fall back to
      // extracting it from the first blog that has a populated user object.
      const resolvedUser =
        Object.keys(userData).length > 1   // has real user fields
          ? userData
          : blogsData.find((b) => b.user)?.[" user"] ?? // nested user object
            blogsData.find((b) => b.user) // keep whole blog.user as fallback
            ? blogsData.find((b) => b.user).user
            : null;

      setUser(resolvedUser);
      setBlogs(blogsData);
      return { user: resolvedUser, blogs: blogsData };
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to fetch user blogs";
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return { user, setUser, blogs, setBlogs, loading, error, fetchUserBlogs };
};

/**
 * Custom hook for user profile operations
 */
export const useUserProfile = (userId) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    if (!userId) return null;

    setLoading(true);
    setError(null);
    try {
      const response = await userApi.getProfile(userId);
      const userData = response?.data?.data;
      setProfile(userData);
      return userData;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to fetch profile";
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const updateProfile = useCallback(
    async (profileData) => {
      if (!userId) return null;

      setSaving(true);
      setError(null);
      try {
        const response = await userApi.updateProfile(userId, profileData);
        const updatedUser = response?.data?.user;
        setProfile(updatedUser);
        toast.success("Profile updated successfully!");
        return updatedUser;
      } catch (err) {
        const errorMsg = err.response?.data?.message || "Failed to update profile";
        setError(errorMsg);
        toast.error(errorMsg);
        return null;
      } finally {
        setSaving(false);
      }
    },
    [userId]
  );

  return { profile, setProfile, loading, saving, error, fetchProfile, updateProfile };
};

/**
 * Custom hook for blog CRUD operations
 */
export const useBlogMutations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createBlog = useCallback(async (blogData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await blogApi.add(blogData);
      console.log("---create blog called---", response);
      toast.success("Blog posted successfully!");
      return response?.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to create blog";
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateBlog = useCallback(async (blogId, blogData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await blogApi.update(blogId, blogData);
      console.log("---update blog called---", response);
      toast.success("Blog updated successfully!");
      return response?.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to update blog";
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteBlog = useCallback(async (blogId) => {
    setIsLoading(true);
    setError(null);
    try {
      await blogApi.delete(blogId);
      console.log("---delete blog called---", response);
      toast.success("Blog deleted successfully!");
      return true;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to delete blog";
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { createBlog, updateBlog, deleteBlog, isLoading, error };
};

/**
 * Custom hook for managing comments on a blog
 */
export const useBlogComments = (blogId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = useCallback(async () => {
    if (!blogId) return;
    setLoading(true);
    try {
      const response = await blogApi.getComments(blogId);
      setComments(response?.data?.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch comments");
    } finally {
      setLoading(false);
    }
  }, [blogId]);

  const addComment = useCallback(async (text) => {
    try {
      const response = await blogApi.addComment(blogId, { text });
      const newComment = response?.data?.data;
      if (newComment) {
        setComments((prev) => [newComment, ...prev]);
        toast.success("Comment added!");
      }
      return newComment;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to add comment";
      toast.error(errorMsg);
      return null;
    }
  }, [blogId]);

  const removeComment = useCallback(async (commentId) => {
    try {
      await blogApi.deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
      toast.success("Comment deleted");
      return true;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to delete comment";
      toast.error(errorMsg);
      return false;
    }
  }, []);

  return { comments, loading, error, fetchComments, addComment, removeComment };
};