import React from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 p-6 mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section */}
        <div>
          <h2 className="text-white font-bold text-3xl mb-3 hover:text-white-100 transition duration-300 hidden">
            Bite&Roam
          </h2>
          <p className="text-gray-400 italic mb-4">
            Explore the world's most exciting destinations and cuisines <br></br>
            with our expertly crafted travel guides and itineraries.<br></br>{" "}
            Plan your perfect adventure effortlessly!
          </p>
          <div className="space-y-2">
            <Link
              to="/"
              className="block hover:text-white transition duration-300"
            >
              About Us
            </Link>
            <Link
              to="/"
              className="block hover:text-white transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-white font-semibold mb-2 cursor-pointer">
              Solutions
            </h3>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer">
                Travel Planning
              </li>
              <li className="hover:text-white cursor-pointer">
                Guides & Blogs
              </li>
              <li className="hover:text-white cursor-pointer">
                Custom Itineraries
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Products</h3>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer">Destinations</li>
              <li className="hover:text-white cursor-pointer">Cuisine Tips</li>
              <li className="hover:text-white cursor-pointer">
                Travel Accessories
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Company</h3>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer">Our Story</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
              <li className="hover:text-white cursor-pointer">Partners</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-6 pt-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; 2024 TravCusi. All rights reserved.</p>
        <div className="flex space-x-4 mt-3 md:mt-0">
          <IconButton
            color="inherit"
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition duration-300"
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-600 transition duration-300"
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-950 transition duration-300"
          >
            <XIcon />
          </IconButton>
        </div>
        <div className="flex space-x-4 mt-3 md:mt-0">
          <Link to="/" className="hover:text-white transition duration-300">
            Terms of Use
          </Link>
          <Link to="/" className="hover:text-white transition duration-300">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
