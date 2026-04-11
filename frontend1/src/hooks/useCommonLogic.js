import { useState, useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";
import { blogApi } from "@/api";

// Global cache to track interaction requests and prevent rate limiting
const interactionCache = new Map();

/**
 * Custom hook for managing blog interaction states (like, bookmark, share)
 * Fetches initial state from backend and syncs with server on changes
 * 
 * @example
 * const { liked, bookmarked, toggleLike, toggleBookmark, handleShare } = useBlogInteractions(blogId);
 */
export const useBlogInteractions = (blogId) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [sharing, setSharing] = useState(false);
  const token = localStorage.getItem("token");
  const hasInitialized = useRef(false);

  // Fetch initial state from backend - with caching to prevent repeated calls
  useEffect(() => {
    if (!token || !blogId || hasInitialized.current) return;

    const checkInteractions = async () => {
      try {
        // Check if we've already fetched this blog's interactions
        const cacheKey = `interactions_${blogId}`;
        if (interactionCache.has(cacheKey)) {
          const cached = interactionCache.get(cacheKey);
          setLiked(cached.liked);
          setBookmarked(cached.bookmarked);
          hasInitialized.current = true;
          return;
        }

        const response = await blogApi.checkInteractions(blogId);
        const result = {
          liked: response?.data?.liked || false,
          bookmarked: response?.data?.bookmarked || false,
        };
        
        // Cache the result for 5 minutes
        interactionCache.set(cacheKey, result);
        setTimeout(() => interactionCache.delete(cacheKey), 5 * 60 * 1000);
        
        setLiked(result.liked);
        setBookmarked(result.bookmarked);
        hasInitialized.current = true;
      } catch (error) {
        console.error("Failed to fetch interaction state:", error);
        hasInitialized.current = true;
      }
    };

    checkInteractions();
  }, [blogId, token]);

  const toggleLike = useCallback(async () => {
    if (!token) {
      toast.error("Please log in to like blogs");
      return;
    }

    try {
      if (liked) {
        // Unlike
        await blogApi.unlikeBlog(blogId);
        setLiked(false);
        toast.success("Removed like");
      } else {
        // Like
        await blogApi.likeBlog(blogId);
        setLiked(true);
        toast.success("Blog liked");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to update like";
      toast.error(errorMsg);
      // Reset state if the request failed
      if (!liked) setLiked(true);
      else setLiked(false);
    }
  }, [liked, blogId, token]);

  const toggleBookmark = useCallback(async () => {
    if (!token) {
      toast.error("Please log in to bookmark blogs");
      return;
    }

    try {
      if (bookmarked) {
        // Remove bookmark
        await blogApi.removeBookmark(blogId);
        setBookmarked(false);
        toast.success("Removed bookmark");
      } else {
        // Bookmark
        await blogApi.bookmarkBlog(blogId);
        setBookmarked(true);
        toast.success("Bookmarked");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to update bookmark";
      toast.error(errorMsg);
      // Reset state if the request failed
      if (!bookmarked) setBookmarked(true);
      else setBookmarked(false);
    }
  }, [bookmarked, blogId, token]);

  const handleShare = useCallback(
    async (shareUrl) => {
      setSharing(true);
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Blog link copied to clipboard");
      } catch (error) {
        console.error(error);
        toast.error("Failed to copy link");
      } finally {
        setSharing(false);
      }
    },
    []
  );

  return {
    liked,
    bookmarked,
    sharing,
    toggleLike,
    toggleBookmark,
    handleShare,
  };
};

/**
 * Custom hook for managing form state with nested objects
 * Used for blog forms and profile forms
 * 
 * @example
 * const { formData, handleChange, handleNestedChange, resetForm } = useFormState(initialData);
 */
export const useFormState = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleNestedChange = useCallback((parentKey, childKey, value) => {
    setFormData((prev) => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [childKey]: value,
      },
    }));
  }, []);

  const handleNestedInputChange = useCallback((e, parentKey) => {
    const { name, value } = e.target;
    handleNestedChange(parentKey, name, value);
  }, [handleNestedChange]);

  const resetForm = useCallback(() => {
    setFormData(initialState);
  }, [initialState]);

  const updateForm = useCallback((newData) => {
    setFormData(newData);
  }, []);

  return {
    formData,
    setFormData,
    handleChange,
    handleNestedChange,
    handleNestedInputChange,
    resetForm,
    updateForm,
  };
};

/**
 * Custom hook for password strength calculation
 * Reusable across password change and signup forms
 * 
 * @example
 * const { strength, strengthText, strengthColor } = usePasswordStrength(password);
 */
export const usePasswordStrength = (password = "") => {
  const getStrength = useCallback((pwd) => {
    let strength = 0;
    if (pwd.length >= 6) strength += 20;
    if (pwd.length >= 8) strength += 20;
    if (/[a-z]/.test(pwd)) strength += 15;
    if (/[A-Z]/.test(pwd)) strength += 15;
    if (/[0-9]/.test(pwd)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength += 15;
    return Math.min(strength, 100);
  }, []);

  const strength = getStrength(password);

  const getStrengthColor = () => {
    if (strength < 40) return "bg-red-500";
    if (strength < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (strength < 40) return "Weak";
    if (strength < 70) return "Fair";
    return "Strong";
  };

  return {
    strength,
    strengthColor: getStrengthColor(),
    strengthText: getStrengthText(),
  };
};

/**
 * Custom hook for handling pagination
 * Centralized pagination logic for blog lists
 * 
 * @example
 * const { currentPage, totalPages, paginatedItems, setCurrentPage } = usePagination(items, pageSize);
 */
export const usePagination = (items = [], pageSize = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  const paginatedItems = items.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = useCallback((page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);

  return {
    currentPage,
    totalPages,
    paginatedItems,
    setCurrentPage: handlePageChange,
  };
};

/**
 * Custom hook for copy to clipboard functionality
 * Reusable share logic across components
 * 
 * @example
 * const { copied, copyToClipboard } = useCopyToClipboard();
 */
export const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy to clipboard");
      return false;
    }
  }, []);

  return { copied, copyToClipboard };
};
