import React from "react";

/**
 * Reusable section header component
 * Used for section titles across the app with consistent styling
 * 
 * @example
 * <SectionHeader
 *   badge="Featured Content"
 *   title="Latest Blogs"
 *   subtitle="Discover inspiring stories from our community"
 * />
 */
const SectionHeader = ({ badge, title, subtitle, centered = true }) => {
  const containerClass = centered ? "text-center" : "";

  return (
    <div className={`mb-12 md:mb-16 ${containerClass}`}>
      {badge && (
        <div className="inline-block mb-4 px-4 py-2 bg-blue-50 rounded-full">
          <span
            className="text-sm font-semibold text-blue-600"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {badge}
          </span>
        </div>
      )}

      <h2
        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
        style={{ fontFamily: "Playfair Display, serif" }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="text-lg text-gray-600 max-w-2xl mx-auto"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
