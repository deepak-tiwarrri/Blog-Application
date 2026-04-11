import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * Reusable page header with back button
 * Reduces duplication of header sections across detail pages
 * 
 * @example
 * <PageHeader
 *   title="Edit Blog"
 *   subtitle="Update your blog content"
 *   backTo="/myblogs"
 * />
 */
const PageHeader = ({
   title,
   subtitle,
   backTo,
   onBackClick,
   showBackButton = true,
   actions,
   theme = "dark",
}) => {
   const navigate = useNavigate();

   const handleBack = () => {
      if (onBackClick) {
         onBackClick();
      } else if (backTo) {
         navigate(backTo);
      } else {
         navigate(-1);
      }
   };

   return (
      <div className="mb-8 md:mb-10">
         {showBackButton && backTo && (
            <button
               onClick={handleBack}
               className={`inline-flex items-center gap-2 mb-6 transition-colors duration-200 group
                  ${theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}
               `}
            >
               <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
               <span
                  style={{ fontFamily: "Poppins, sans-serif" }}
                  className="text-sm font-medium"
               >
                  Back
               </span>
            </button>
         )}

         <div className="flex justify-between items-start gap-4">
            <div>
               <h1
                  style={{ fontFamily: "Playfair Display, serif" }}
                  className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
               >
                  {title}
               </h1>
               {subtitle && (
                  <p
                     style={{ fontFamily: "Poppins, sans-serif" }}
                     className={`text-sm sm:text-base ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                  >
                     {subtitle}
                  </p>
               )}
            </div>
            {actions && <div className="flex gap-2">{actions}</div>}
         </div>
      </div>
   );
};

export default PageHeader;
