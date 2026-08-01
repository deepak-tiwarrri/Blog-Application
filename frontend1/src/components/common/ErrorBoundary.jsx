import React from "react";
import { toast } from "sonner";

class ErrorBoundary extends React.Component {
   constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
   }

   static getDerivedStateFromError(error) {
      return { hasError: true, error };
   }

   componentDidCatch(error, info) {
      // Log error to console and show toast
      // In production you might send this to a monitoring service
      // eslint-disable-next-line no-console
      console.error("Uncaught error:", error, info);
      try {
         toast.error("Something went wrong. Reload the page.");
      } catch (e) {
         // swallow
      }
   }

   render() {
      if (this.state.hasError) {
         return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
               <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-8 text-center">
                  <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
                  <p className="text-gray-600 mb-6">An unexpected error occurred. Please try refreshing the page.</p>
                  {this.state.error && (
                     <p className="text-left text-xs font-mono text-red-600 bg-red-50 rounded p-3 mb-6 overflow-auto max-h-40">
                        {this.state.error.message}
                     </p>
                  )}
                  <button
                     onClick={() => window.location.reload()}
                     className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
                  >
                     Reload
                  </button>
               </div>
            </div>
         );
      }
      return this.props.children;
   }
}

export default ErrorBoundary;
