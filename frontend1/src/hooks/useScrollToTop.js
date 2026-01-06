import { useEffect } from "react";

/**
 * Custom hook to scroll page to top on component mount or dependency change
 * @param {Array} dependencies - Optional array of dependencies to trigger scroll
 * @param {boolean} smooth - Whether to use smooth scrolling (default: false)
 *
 * @example
 * // Scroll to top on mount
 * const MyComponent = () => {
 *   useScrollToTop();
 *   return <div>My Content</div>;
 * };
 *
 * @example
 * // Scroll to top with smooth animation
 * useScrollToTop([], true);
 *
 * @example
 * // Scroll to top when specific dependencies change
 * useScrollToTop([userId, blogId]);
 */
export const useScrollToTop = (dependencies = [], smooth = false) => {
  useEffect(() => {
    // Scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: smooth ? "smooth" : "auto",
    });
  }, dependencies);
};
