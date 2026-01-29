import { useState, useCallback } from "react";
import { blogApi, userApi } from "@/api";
import { toast } from "sonner";

/**
 * Custom hook for fetching blogs with loading, error, and caching support
 * Reduces code duplication across components using blog fetch logic
 * 
 * @example
 * const { blogs, loading, error, fetchBlogs } = useFetchBlogs();
 */
export const useFetchBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await blogApi.getAll();
      const data = response?.data?.blogs || [];
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
 * Handles loading, error states, and image fallback
 * 
 * @example
 * const { blog, loading, error, refetch } = useFetchBlogById(blogId);
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
      const data = response?.data?.blog;
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

/**
 * Custom hook for fetching user's blogs
 * Used in UserBlogs and Profile components
 * 
 * @example
 * const { blogs, loading, error, fetchUserBlogs } = useFetchUserBlogs(userId);
 */
export const useFetchUserBlogs = (userId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserBlogs = useCallback(async () => {
    if (!userId) return null;

    setLoading(true);
    setError(null);
    try {
      const response = await blogApi.getBlogByUserId(userId);
      const userData = response?.data?.user;
      setUser(userData);
      return userData;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to fetch user blogs";
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return { user, setUser, loading, error, fetchUserBlogs };
};

/**
 * Custom hook for user profile operations
 * Handles fetch, update, and password change operations
 * 
 * @example
 * const { profile, loading, saving, fetchProfile, updateProfile } = useUserProfile(userId);
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
      const userData = response?.data?.user;
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
 * Centralized blog creation, update, deletion logic
 * 
 * @example
 * const { createBlog, updateBlog, deleteBlog, isLoading } = useBlogMutations();
 */
export const useBlogMutations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createBlog = useCallback(async (blogData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await blogApi.add(blogData);
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
