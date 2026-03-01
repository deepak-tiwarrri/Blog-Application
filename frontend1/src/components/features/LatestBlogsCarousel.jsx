import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";

const LatestBlogsCarousel = ({ blogs, loading, error }) => {
   const [currentIndex, setCurrentIndex] = useState(0);
   const [direction, setDirection] = useState(0);
   const [itemsPerView, setItemsPerView] = useState(3);
   const [isPaused, setIsPaused] = useState(false);

   // Adjust items per view based on screen size
   useEffect(() => {
      const handleResize = () => {
         if (window.innerWidth < 768) {
            setItemsPerView(1);
         } else if (window.innerWidth < 1024) {
            setItemsPerView(2);
         } else {
            setItemsPerView(3);
         }
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   }, []);

   // Auto-play carousel
   useEffect(() => {
      if (isPaused || blogs.length === 0) return;
      const timer = setInterval(() => {
         handleNext();
      }, 5000);
      return () => clearInterval(timer);
   }, [currentIndex, isPaused, blogs.length]);

   const handleNext = () => {
      setDirection(1);
      setCurrentIndex((prev) => {
         const maxIndex = Math.max(0, blogs.length - itemsPerView);
         return prev >= maxIndex ? 0 : prev + 1;
      });
   };

   const handlePrev = () => {
      setDirection(-1);
      setCurrentIndex((prev) => {
         const maxIndex = Math.max(0, blogs.length - itemsPerView);
         return prev <= 0 ? maxIndex : prev - 1;
      });
   };

   const visibleBlogs = blogs.slice(currentIndex, currentIndex + itemsPerView);

   const containerVariants = {
      hidden: { opacity: 0 },
      show: {
         opacity: 1,
         transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
         },
      },
   };

   const itemVariants = {
      hidden: (direction) => ({
         opacity: 0,
         x: direction > 0 ? 100 : -100,
      }),
      show: {
         opacity: 1,
         x: 0,
         transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 0.6,
         },
      },
      exit: (direction) => ({
         opacity: 0,
         x: direction > 0 ? -100 : 100,
         transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 0.6,
         },
      }),
   };

   if (loading) {
      return (
         <div className="flex justify-center py-12">
            <div className="h-64 w-full bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 rounded-2xl animate-pulse" />
         </div>
      );
   }

   if (error) {
      return (
         <div className="bg-primary/10 border border-primary/30 p-6 rounded-2xl max-w-2xl mx-auto text-center">
            <p className="text-red-700 font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
               {error}
            </p>
         </div>
      );
   }

   if (blogs.length === 0) {
      return (
         <div className="text-center py-20 bg-primary/10 rounded-3xl border border-primary/30 max-w-2xl mx-auto">
            <div className="text-5xl mb-4">📝</div>
            <p className="text-primary-foreground text-lg font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
               No blogs found yet. Be the first to share your story!
            </p>
         </div>
      );
   }

   return (
      <div className="relative">
         {/* Animated background glow */}
         <div className="absolute -inset-x-20 top-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-[100px] pointer-events-none -z-10" />

         <div
            className="relative px-4 md:px-8 overflow-visible"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
         >
            {/* Main Carousel Container */}
            <div className="relative overflow-visible -mx-4 md:-mx-8">
               <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                     key={currentIndex}
                     custom={direction}
                     variants={containerVariants}
                     initial="hidden"
                     animate="show"
                     exit="exit"
                     className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-8"
                  >
                     {visibleBlogs.map((blog, idx) => (
                        <motion.div
                           key={blog._id}
                           custom={direction}
                           variants={itemVariants}
                           className="h-full"
                        >
                           {/* Glass morphism wrapper */}
                           <div className="group relative h-full p-0.5 rounded-2xl bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 overflow-hidden transition-all duration-500 hover:from-primary/40 hover:via-primary/30 hover:to-primary/20">
                              {/* Inner glow effect */}
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-300/0 via-purple-300/0 to-pink-300/0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

                              {/* Content */}
                              <div className="relative h-full bg-gradient-to-br from-primary/40 to-primary/30 rounded-2xl overflow-hidden">
                                 <BlogCard blog={blog} />
                              </div>
                           </div>
                        </motion.div>
                     ))}
                  </motion.div>
               </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            {blogs.length > itemsPerView && (
               <>
                  {/* Previous Button */}
                  <button
                     onClick={handlePrev}
                     disabled={currentIndex === 0}
                     className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-4 z-20 group/btn focus:outline-none"
                     aria-label="Previous blogs"
                  >
                     <div className="relative">

                        <button className="relative p-3 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground hover:bg-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                           <ChevronLeft size={24} strokeWidth={2.5} />
                        </button>
                     </div>
                  </button>

                  {/* Next Button */}
                  <button
                     onClick={handleNext}
                     disabled={currentIndex >= blogs.length - itemsPerView}
                     className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-4 z-20 group/btn focus:outline-none"
                     aria-label="Next blogs"
                  >
                     <div className="relative">
                        <button className="relative p-3 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground hover:bg-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                           <ChevronRight size={24} strokeWidth={2.5} />
                        </button>
                     </div>
                  </button>
               </>
            )}
         </div>

         {/* Progress Indicators */}
         {blogs.length > itemsPerView && (
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5, duration: 0.6 }}
               className="flex justify-center gap-3 mt-12"
            >
               {Array.from({ length: Math.ceil(blogs.length / itemsPerView) }).map(
                  (_, idx) => (
                     <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`transition-all duration-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${currentIndex === idx
                           ? "bg-gradient-to-r from-blue-500 to-purple-500 w-8 h-3"
                           : "bg-white/30 hover:bg-white/50 w-3 h-3 border border-white/20"
                           }`}
                        aria-label={`Go to slide group ${idx + 1}`}
                        aria-current={currentIndex === idx ? "true" : "false"}
                     />
                  )
               )}
            </motion.div>
         )}

         {/* View All Link */}
         {blogs.length > itemsPerView && (
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6, duration: 0.6 }}
               className="text-center mt-12"
            >
               <Link to="/blogs" className="group focus:outline-none inline-block">
                  <button
                     className="px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                     style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                     Explore All Blogs
                     <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                     />
                  </button>
               </Link>
            </motion.div>
         )}
      </div>
   );
};

export default LatestBlogsCarousel;
