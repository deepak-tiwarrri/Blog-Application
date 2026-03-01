import { BookOpen, Sparkles, Users } from 'lucide-react';
import React from 'react'
import { motion } from 'framer-motion';

const FeaturedSection = () => {
  const features = [
    { icon: BookOpen, title: "Easy Publishing", desc: "Create and publish blogs in minutes with our intuitive editor" },
    { icon: Users, title: "Build Community", desc: "Connect with readers who share your passion and interests" },
    { icon: Sparkles, title: "Beautiful Design", desc: "Professional layouts that showcase your content beautifully" }
  ];

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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  return (
    <section className="features py-16 md:py-24 relative overflow-hidden ">
      <div className="absolute -top-40 -right-40 w-80 h-80  rounded-full pointer-events-none -z-10" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80  rounded-full  pointer-events-none -z-10" />
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Why Choose Our Platform
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-primary-foreground/80" style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Everything you need to share your story with the world
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group relative h-full"
            >
              <div className="relative p-8 md:p-10 rounded-2xl bg-gradient-to-br from-primary/40 to-primary/30 hover:from-primary/50 hover:to-primary/40 transition-all duration-500 shadow-md hover:shadow-lg h-full flex flex-col">
                {/* Icon Container */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                  className="mb-6 inline-block p-4 bg-primary/30 rounded-xl border border-primary/40 group-hover:bg-primary/40 transition-all duration-500"
                >
                  <feature.icon size={28} className="text-white group-hover:text-white transition-colors" />
                </motion.div>

                {/* Text Content */}
                <h3
                  className="text-xl md:text-2xl font-bold text-primary-foreground mb-3 group-hover:text-primary-700 transition-colors duration-300"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {feature.title}
                </h3>
                <p className="text-primary-foreground/80 group-hover:text-primary-foreground transition-colors duration-300 leading-relaxed flex-grow" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {feature.desc}
                </p>

                {/* Accent line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "2rem" }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
                  className="mt-6 h-1 bg-gradient-to-r from-primary to-primary-700 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedSection;