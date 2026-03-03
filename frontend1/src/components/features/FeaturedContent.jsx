import React, { useEffect } from 'react'
import LatestBlogsCarousel from './LatestBlogsCarousel';
import { motion } from "framer-motion";
import { blogApi } from '@/api';

const FeaturedContent = () => {
   const [blogs, setBlogs] = React.useState([]);
   const [loading, setLoading] = React.useState(false);
   const [error, setError] = React.useState(null);

   const token = localStorage.getItem("token");
   useEffect(() => {
      setLoading(true);
      blogApi
         .getAll()
         .then((res) => {
            setBlogs(res.data.blogs || []);
            setLoading(false);
         })
         .catch((err) => {
            setError(err.response?.data?.message || "Failed to fetch blogs");
            toast.error(err.response?.data?.message || "Failed to fetch blogs");
            setLoading(false);
         });
   }, []);

   return (
      <section className="blogs py-20 md:py-32 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] -z-10 pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-[100px] -z-10 pointer-events-none" />

         <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.7 }}
               className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
            >
               <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="inline-block mb-6 px-5 py-2.5 bg-primary rounded-full transition-all duration-300"
               >
                  <span className="text-sm font-semibold text-white tracking-wide" style={{ fontFamily: "Poppins, sans-serif" }}>
                     ✨ Featured Content
                  </span>
               </motion.div>

               <h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4" style={{ fontFamily: "Playfair Display, serif" }}
               >
                  Latest Blogs
               </h2>

               <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed" style={{ fontFamily: "Poppins, sans-serif" }}
               >
                  Discover inspiring stories from our community of writers and explorers. New content awaits your discovery.
               </motion.p>
            </motion.div>

            {/* Latest Blogs Carousel */}
            <div
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.8, delay: 0.3 }}
            >
               <LatestBlogsCarousel blogs={blogs} loading={loading} error={error} />
            </div>
         </div>
      </section>
   )
}

export default FeaturedContent;