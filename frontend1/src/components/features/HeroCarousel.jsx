import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
   {
      id: 1,
      title: "Discover Amazing Travel Stories",
      description: "Explore breathtaking destinations around the world through authentic experiences.",
      image: "/assets/dish.jpg",
      // Adjusted gradients for better blending and accessibility
      gradient: "from-blue-900/80 to-purple-900/80"
   },
   {
      id: 2,
      title: "Share Your Culinary Adventures",
      description: "Document your food journeys and inspire others with delicious discoveries.",
      image: "/assets/dish.jpg",
      gradient: "from-purple-900/80 to-pink-900/80"
   },
   {
      id: 3,
      title: "Connect with Fellow Explorers",
      description: "Join a vibrant community of travelers and food enthusiasts.",
      image: "/assets/dish.jpg",
      gradient: "from-pink-900/80 to-orange-900/80"
   }
];

const HeroCarousel = () => {
   const [currentSlide, setCurrentSlide] = useState(0);
   const [direction, setDirection] = useState(0);
   const [isPaused, setIsPaused] = useState(false);

   // Accessibility: Respect user's OS motion preferences
   const shouldReduceMotion = useReducedMotion();

   const paginate = useCallback((newDirection) => {
      setDirection(newDirection);
      setCurrentSlide((prev) => {
         let nextSlide = prev + newDirection;
         if (nextSlide >= slides.length) return 0;
         if (nextSlide < 0) return slides.length - 1;
         return nextSlide;
      });
   }, []);

   // Auto-play with pause on hover for accessibility
   useEffect(() => {
      if (isPaused) return;
      const timer = setInterval(() => {
         paginate(1);
      }, 6000); // Slightly longer for better reading time
      return () => clearInterval(timer);
   }, [isPaused, paginate]);

   // Premium, smooth sliding and fading animations
   const slideVariants = {
      enter: (direction) => ({
         x: shouldReduceMotion ? 0 : direction > 0 ? '10%' : '-10%',
         opacity: 0,
         scale: shouldReduceMotion ? 1 : 0.98
      }),
      center: {
         x: 0,
         opacity: 1,
         scale: 1
      },
      exit: (direction) => ({
         x: shouldReduceMotion ? 0 : direction < 0 ? '10%' : '-10%',
         opacity: 0,
         scale: shouldReduceMotion ? 1 : 0.98
      })
   };

   return (
      <div
         className="relative w-full h-[400px] md:h-[500px] lg:h-[550px] overflow-hidden rounded-3xl group bg-black"
         onMouseEnter={() => setIsPaused(true)}
         onMouseLeave={() => setIsPaused(false)}
         aria-roledescription="carousel"
         aria-label="Featured content"
      >
         {/* Glass border effect */}
         <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-white/5 border border-white/30 pointer-events-none z-30" />
         <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
               key={currentSlide}
               custom={direction}
               variants={slideVariants}
               initial="enter"
               animate="center"
               exit="exit"
               transition={{
                  x: { type: "tween", duration: 0.6, ease: [0.25, 1, 0.5, 1] }, // Elegant easing function
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.6 }
               }}
               className="absolute inset-0"
            >
               {/* Background Image & Accessible Gradients */}
               <div className="absolute inset-0 bg-black">
                  <img
                     src={slides[currentSlide].image}
                     alt=""
                     aria-hidden="true"
                     className="w-full h-full object-cover mix-blend-overlay opacity-60"
                  />
                  {/* Two-layer gradient for depth and text readability */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].gradient} mix-blend-multiply`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
               </div>

               {/* Content */}
               <div className="relative h-full flex flex-col justify-center items-center text-center px-6 md:px-14 z-10">
                  <motion.h2
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.2, duration: 0.5 }}
                     className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
                     style={{ fontFamily: "Playfair Display, serif" }}
                  >
                     {slides[currentSlide].title}
                  </motion.h2>
                  <motion.p
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.3, duration: 0.5 }}
                     className="text-lg md:text-xl text-gray-100 max-w-2xl font-light"
                     style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                     {slides[currentSlide].description}
                  </motion.p>
               </div>
            </motion.div>
         </AnimatePresence>

         {/* Navigation Buttons - True Glassmorphism & Accessible Focus */}
         <button
            onClick={() => paginate(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full p-3 hover:bg-white/20 transition-all duration-300 z-20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent opacity-0 group-hover:opacity-100 sm:opacity-100 hover:cursor-pointer"
            aria-label="Previous slide"
         >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
         </button>
         <button
            onClick={() => paginate(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full p-3 hover:bg-white/20 transition-all duration-300 z-20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent opacity-0 group-hover:opacity-100 sm:opacity-100 hover:cursor-pointer"
            aria-label="Next slide"
         >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
         </button>

         {/* Indicators */}
         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {slides.map((_, index) => (
               <button
                  key={index}
                  onClick={() => {
                     setDirection(index > currentSlide ? 1 : -1);
                     setCurrentSlide(index);
                  }}
                  className={`h-2 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent ${index === currentSlide
                     ? "bg-white w-8"
                     : "bg-white/40 hover:bg-white/70 w-2"
                     }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === currentSlide ? "true" : "false"}
               />
            ))}
         </div>
      </div>
   );
};

export default HeroCarousel;