/**
 * CTA Section Component
 * Call-to-action section with glass morphism styling
 * Reusable CTA for login/signup prompts
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { H2 } from '@/components/Typography';
import { Body } from '@/components/Typography';

const CTASection = ({
   title = "Ready to Share Your Story?",
   description = "Join our community of passionate writers and readers. Create, share, and inspire the world today.",
   showOnAuth = false
}) => {
   if (showOnAuth) return null;

   return (
      <section className="py-20 md:py-32 relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 -z-20" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

         <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.7 }}
               className="bg-primary/20 backdrop-blur-md border border-white/20 rounded-[2.5rem] p-8 md:p-14 lg:p-20"
            >
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6 text-center md:text-left">
                     <H2 className="text-white">
                        {title}
                     </H2>
                     <Body className="text-lg text-white/90 font-light max-w-md mx-auto md:mx-0">
                        {description}
                     </Body>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
                     <Link to="/login" className="w-full sm:w-auto group focus:outline-none">
                        <button
                           className="w-full px-8 py-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-semibold focus:ring-4 focus:ring-white/50 hover:cursor-pointer"
                        >
                           Login to Account
                        </button>
                     </Link>
                     <Link to="/signup" className="w-full sm:w-auto group focus:outline-none">
                        <button
                           className="w-full px-8 py-4 rounded-full border border-white/40 text-white bg-white/5 hover:bg-white/10 transition-all duration-300 font-semibold focus:ring-4 focus:ring-white/50 hover:cursor-pointer"
                        >
                           Create Free Account
                        </button>
                     </Link>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>
   );
};

export default CTASection;
