import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";

import { useScrollToTop } from "@/hooks/useScrollToTop.js";
import { ANIMATION_VARIANTS } from "@/constants/animations";
import { H1, BodyLarge, BadgeText, GradientText } from "@/components/Typography";
import { PrimaryButton, SecondaryButton } from "@/components/Button";

import FeaturedSection from "../features/FeaturedSection";
import HeroCarousel from "../features/HeroCarousel";
import CTASection from "../sections/CTASection";
import FeaturedContent from "../features/FeaturedContent";

const Home = () => {
  useScrollToTop();
  const [blogs, setBlogs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const token = localStorage.getItem("token");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

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
                    <PrimaryButton icon={ArrowRight} className="w-full sm:w-auto hover:cursor-pointer">
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
      <FeaturedContent/>

      {/* CTA Section */}
      <CTASection showOnAuth={isLoggedIn} />
    </div>
  );
};

export default Home;