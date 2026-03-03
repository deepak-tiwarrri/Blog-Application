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
         whileHover={hoverEffect ? { y: -8, scale: 1.02 } : {}}
         className={cn(
            "glass rounded-xl border border-white/20 shadow-lg backdrop-blur-md bg-white/20",
            hoverEffect && "transition-all duration-300",
            className
         )}
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
