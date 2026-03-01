import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";

import { blogApi } from "@/api";
import { useScrollToTop } from "@/hooks/useScrollToTop.js";
import { ANIMATION_VARIANTS } from "@/constants/animations";
import { H1, BodyLarge, BadgeText, GradientText } from "@/components/Typography";
import { PrimaryButton, SecondaryButton } from "@/components/Button";

import BlogCard from "../features/BlogCard";
import Loader from "../common/Loader";
import FeaturedSection from "../features/FeaturedSection";
import HeroCarousel from "../features/HeroCarousel";
import LatestBlogsCarousel from "../features/LatestBlogsCarousel";
import CTASection from "../sections/CTASection";

const Home = () => {
  useScrollToTop();
  const [blogs, setBlogs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const token = localStorage.getItem("token");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

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
    <div className="min-h-screen ">
      {/* explore blog hero section */}
      <section className="hero relative overflow-hidden py-16 md:py-24 lg:py-32">

        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              className="space-y-8"
            >
              <motion.div variants={ANIMATION_VARIANTS.fadeUp} className="inline-flex items-center space-x-2 bg-primary/50 px-5 py-2.5 rounded-full">
                <Sparkles size={18} className="text-white" />
                <BadgeText className="text-white">Welcome to Your Stories</BadgeText>
              </motion.div>

              <motion.div variants={ANIMATION_VARIANTS.fadeUp}>
                <H1>
                  Create a Blog Worth <GradientText>Sharing</GradientText>
                </H1>
              </motion.div>

              <motion.div variants={ANIMATION_VARIANTS.fadeUp}>
                <BodyLarge>
                  Explore travel adventures, uncover global cuisines and share
                  your flavourful journey with the world. Connect with passionate
                  readers and build your unique voice.
                </BodyLarge>
              </motion.div>

              <motion.div variants={ANIMATION_VARIANTS.fadeUp} className="flex flex-col sm:flex-row gap-4 pt-4">
                {!token ? (
                  <>
                    <Link to="/signup" className="group focus:outline-none">
                      <PrimaryButton icon={ArrowRight}>
                        Get Started
                      </PrimaryButton>
                    </Link>
                    <Link to="/blogs" className="group focus:outline-none">
                      <SecondaryButton icon={BookOpen}>
                        Explore Blogs
                      </SecondaryButton>
                    </Link>
                  </>
                ) : (
                  <Link to="/blogs" className="group focus:outline-none w-full sm:w-auto">
                    <PrimaryButton icon={ArrowRight} className="w-full sm:w-auto">
                      Explore All Blogs
                    </PrimaryButton>
                  </Link>
                )}
              </motion.div>
            </motion.div>

            {/* Right - Carousel */}
            <HeroCarousel />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturedSection />
      {/* Featured content section */}
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

      {/* CTA Section */}
      <CTASection showOnAuth={isLoggedIn} />
    </div>
  );
};

export default Home;