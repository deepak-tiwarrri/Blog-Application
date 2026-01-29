import { useState, useCallback } from "react";
import { toast } from "sonner";

/**
 * Custom hook for managing blog interaction states (like, bookmark, share)
 * Reduces duplication of interaction logic across Blog and BlogDetailPage
 * 
 * @example
 * const { liked, bookmarked, toggleLike, toggleBookmark, handleShare } = useBlogInteractions(blogId);
 */
export const useBlogInteractions = (blogId) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [sharing, setSharing] = useState(false);

  const toggleLike = useCallback(() => {
    setLiked((prev) => !prev);
    toast.success(liked ? "Removed like" : "Blog liked");
  }, [liked]);

  const toggleBookmark = useCallback(() => {
    setBookmarked((prev) => !prev);
    toast.success(bookmarked ? "Removed bookmark" : "Bookmarked");
  }, [bookmarked]);

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
