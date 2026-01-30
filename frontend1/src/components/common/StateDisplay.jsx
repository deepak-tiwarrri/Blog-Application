import React from "react";
import Loader from "@/components/common/Loader";
import { BookOpen } from "lucide-react";

/**
 * Generic state display component that handles loading, error, and empty states
 * Reduces code duplication for these common UI patterns
 * 
 * @example
 * <StateDisplay
 *   loading={loading}
 *   error={error}
 *   isEmpty={blogs.length === 0}
 *   errorMessage={error}
 *   emptyMessage="No blogs found"
 * >
 *   <div>Your content here</div>
 * </StateDisplay>
 */
const StateDisplay = ({
   loading,
   error,
   isEmpty,
   children,
   errorMessage = "An error occurred",
   emptyMessage = "No data found",
   emptyIcon: EmptyIcon = BookOpen,
   onRetry,
   loaderSize = 60,
}) => {
   if (loading) {
      return <Loader fullScreen={false} size={loaderSize} />;
   }

   if (error) {
      return (
         <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg max-w-2xl mx-auto">
            <p
               className="text-red-700 font-semibold text-sm sm:text-base mb-4"
               style={{ fontFamily: "Poppins, sans-serif" }}
            >
               {errorMessage}
            </p>
            {onRetry && (
               <button
                  onClick={onRetry}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
               >
                  Retry
               </button>
            )}
         </div>
      );
   }

   if (isEmpty) {
      return (
         <div className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-20">
            <EmptyIcon size={48} className="text-gray-400 mb-4" />
            <p
               className="text-gray-600 text-center text-base sm:text-lg"
               style={{ fontFamily: "Poppins, sans-serif" }}
            >
               {emptyMessage}
            </p>
         </div>
      );
   }

   return <>{children}</>;
};

export default StateDisplay;
