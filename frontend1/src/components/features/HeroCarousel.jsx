import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
   {
      id: 1,
      title: "Discover Amazing Travel Stories",
      description: "Explore breathtaking destinations around the world through authentic experiences",
      image: "/assets/dish.jpg",
      gradient: "from-blue-600 to-purple-600"
   },
   {
      id: 2,
      title: "Share Your Culinary Adventures",
      description: "Document your food journeys and inspire others with delicious discoveries",
      image: "/assets/dish.jpg",
      gradient: "from-purple-600 to-pink-600"
   },
   {
      id: 3,
      title: "Connect with Fellow Explorers",
      description: "Join a vibrant community of travelers and food enthusiasts",
      image: "/assets/dish.jpg",
      gradient: "from-pink-600 to-orange-600"
   }
];

const HeroCarousel = () => {
   const [currentSlide, setCurrentSlide] = useState(0);
   const [direction, setDirection] = useState(0);

   useEffect(() => {
      const timer = setInterval(() => {
         setDirection(1);
         setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);

      return () => clearInterval(timer);
   }, []);

   const goToNext = () => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
   };

   const goToPrev = () => {
      setDirection(-1);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
   };

   const slideVariants = {
      enter: (direction) => ({
         x: direction > 0 ? 1000 : -1000,
         opacity: 0
      }),
      center: {
         x: 0,
         opacity: 1
      },
      exit: (direction) => ({
         x: direction > 0 ? -1000 : 1000,
         opacity: 0
      })
   };

   return (
      <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-2xl">
         <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
               key={currentSlide}
               custom={direction}
               variants={slideVariants}
               initial="enter"
               animate="center"
               exit="exit"
               transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.5 }
               }}
               className="absolute inset-0"
            >
               {/* Background Image */}
               <div className="absolute inset-0">
                  <img
                     src={slides[currentSlide].image}
                     alt={slides[currentSlide].title}
                     className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].gradient} opacity-80`} />
               </div>

               {/* Content */}
               <div className="relative h-full flex flex-col justify-center items-center text-center px-6 md:px-12">
                  <motion.h2
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.2 }}
                     className="text-3xl md:text-5xl font-bold text-white mb-4"
                     style={{ fontFamily: "Playfair Display, serif" }}
                  >
                     {slides[currentSlide].title}
                  </motion.h2>
                  <motion.p
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.4 }}
                     className="text-lg md:text-xl text-white/90 max-w-2xl"
                     style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                     {slides[currentSlide].description}
                  </motion.p>
               </div>
            </motion.div>
         </AnimatePresence>

         {/* Navigation Buttons */}
         <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 glass rounded-full p-2 hover:bg-white/30 transition-all z-10"
            aria-label="Previous slide"
         >
            <ChevronLeft className="w-6 h-6 text-white" />
         </button>
         <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 glass rounded-full p-2 hover:bg-white/30 transition-all z-10"
            aria-label="Next slide"
         >
            <ChevronRight className="w-6 h-6 text-white" />
         </button>

         {/* Indicators */}
         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {slides.map((_, index) => (
               <button
                  key={index}
                  onClick={() => {
                     setDirection(index > currentSlide ? 1 : -1);
                     setCurrentSlide(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${index === currentSlide
                        ? "bg-white w-8"
                        : "bg-white/50 hover:bg-white/75"
                     }`}
                  aria-label={`Go to slide ${index + 1}`}
               />
            ))}
         </div>
      </div>
   );
};

export default HeroCarousel;
