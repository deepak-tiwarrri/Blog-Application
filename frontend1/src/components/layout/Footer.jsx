import React from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import { Mail, MapPin, Phone } from "lucide-react";
import "@fontsource/poppins";
import "@fontsource/playfair-display";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300 mt-auto">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">

        {/* Responsive Grid - 1 col on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 mb-8 md:mb-12">

          {/* Section 1: Brand */}
          <div className="space-y-4">
            <h2
              className="text-2xl sm:text-3xl font-bold text-white"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Bite&Roam
            </h2>
            <p
              className="text-sm sm:text-base text-gray-400 leading-relaxed"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Explore the world's most exciting destinations and cuisines with our expertly crafted travel guides and itineraries.
            </p>
            <div className="space-y-3 pt-2">
              <Link
                to="/"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition duration-300"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <Mail size={18} />
                <span className="text-sm sm:text-base">info@biteandroam.com</span>
              </Link>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition duration-300"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <Phone size={18} />
                <span className="text-sm sm:text-base">+1 (234) 567-890</span>
              </a>
            </div>
          </div>

          {/* Section 2: Solutions */}
          <div className="space-y-4">
            <h3
              className="text-lg sm:text-xl font-bold text-white"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Solutions
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition duration-300 text-sm sm:text-base"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Travel Planning
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition duration-300 text-sm sm:text-base"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Guides & Blogs
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition duration-300 text-sm sm:text-base"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Custom Itineraries
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Products */}
          <div className="space-y-4">
            <h3
              className="text-lg sm:text-xl font-bold text-white"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Products
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition duration-300 text-sm sm:text-base"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition duration-300 text-sm sm:text-base"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Cuisine Tips
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition duration-300 text-sm sm:text-base"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Travel Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 4: Company */}
          <div className="space-y-4">
            <h3
              className="text-lg sm:text-xl font-bold text-white"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Company
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition duration-300 text-sm sm:text-base"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition duration-300 text-sm sm:text-base"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition duration-300 text-sm sm:text-base"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Partners
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700"></div>

        {/* Footer Bottom */}
        <div className="py-8 md:py-10 space-y-6 md:space-y-0">

          {/* Top Row - Social Icons & Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">

            {/* Copyright - Responsive text */}
            <p
              className="text-xs sm:text-sm text-gray-500 text-center md:text-left order-2 md:order-1"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              &copy; 2024 Bite&Roam. All rights reserved.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 sm:gap-4 order-1 md:order-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white transition duration-300"
                title="Facebook"
              >
                <FacebookIcon fontSize="small" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-pink-600 text-gray-300 hover:text-white transition duration-300"
                title="Instagram"
              >
                <InstagramIcon fontSize="small" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition duration-300"
                title="X (Twitter)"
              >
                <XIcon fontSize="small" />
              </a>
            </div>
          </div>

          {/* Bottom Row - Legal Links (Responsive) */}
          <div className="flex flex-col sm:flex-row justify-center md:justify-between gap-4 sm:gap-6 pt-4 md:pt-0">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-center sm:text-left">
              <Link
                to="/"
                className="text-xs sm:text-sm text-gray-400 hover:text-white transition duration-300"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Terms of Use
              </Link>
              <Link
                to="/"
                className="text-xs sm:text-sm text-gray-400 hover:text-white transition duration-300"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Privacy Policy
              </Link>
              <Link
                to="/"
                className="text-xs sm:text-sm text-gray-400 hover:text-white transition duration-300"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Cookie Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
