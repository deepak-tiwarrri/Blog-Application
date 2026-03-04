import React from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const GlassCard = ({ children, className, hoverEffect = true, ...props }) => {
   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.4 }}
         whileHover={hoverEffect ? { y: -6, scale: 1.01 } : {}}
         className={cn(
            // Core glass effect
            "rounded-2xl",
            // Blur + background: dark-tinted, semi-transparent
            "backdrop-blur-xl backdrop-saturate-150",
            "bg-white/[0.06] dark:bg-black/[0.25]",
            // Border: subtle white highlight on top/left edges for glass feel
            "border border-white/[0.12] dark:border-white/[0.08]",
            // Inner highlight (top edge shimmer)
            "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_8px_32px_rgba(0,0,0,0.25)]",
            // Text defaults
            "text-gray-200",
            hoverEffect && "transition-all duration-300 ease-out",
            className
         )}
         style={{
            // Extra glass depth via box-shadow
            boxShadow:
               "inset 0 1px 0 0 rgba(255,255,255,0.12), 0 8px 40px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)",
         }}
         {...props}
      >
         {children}
      </motion.div>
   );
};

GlassCard.propTypes = {
   children: PropTypes.node.isRequired,
   className: PropTypes.string,
   hoverEffect: PropTypes.bool,
};

export default GlassCard;
