/**
 * Reusable Background Glow Component
 * Common animated background glow effect used across multiple sections
 */

import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundGlow = ({
   position = 'top-right',
   color = 'blue',
   size = 'w-96 h-96',
   delay = 0,
   className = '',
}) => {
   const colorGradients = {
      blue: 'from-blue-400/15 via-purple-400/10 to-transparent',
      purple: 'from-purple-400/15 via-pink-400/10 to-transparent',
      pink: 'from-pink-400/15 to-transparent',
      mixed: 'from-blue-300/15 to-purple-300/15',
   };

   return (
      <motion.div
         initial={{ opacity: 0, scale: 0.8 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 1.2, delay, ease: 'easeOut' }}
         className={`absolute ${position} ${size} bg-gradient-to-br ${colorGradients[color]} rounded-full mix-blend-multiply filter blur-[100px] -z-10 pointer-events-none ${className}`}
      />
   );
};

export const AnimatedBackgroundGlows = () => {
   return (
      <>
         <BackgroundGlow color="blue" position="top-[-5%] right-[-3%]" size="w-[600px] h-[600px]" />
         <BackgroundGlow color="purple" position="bottom-[-5%] left-[-3%]" size="w-[600px] h-[600px]" delay={0.2} />
      </>
   );
};
