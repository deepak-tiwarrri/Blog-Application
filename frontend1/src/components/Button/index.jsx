/**
 * Common Button Component
 * Reusable button component to eliminate repetitive button styling
 */

import React from 'react';
import { FONT_STYLES } from '@/constants/typography';

export const PrimaryButton = ({ children, icon: Icon, className = '', loading = false, ...props }) => (
   <button
      disabled={loading}
      style={{ fontFamily: FONT_STYLES.body.fontFamily }}
      className={`px-8 py-3.5 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
   >
      {children}
      {Icon && <Icon size={18} className="group-hover:translate-x-1 transition-transform" />}
   </button>
);

export const SecondaryButton = ({ children, icon: Icon, className = '', loading = false, ...props }) => (
   <button
      disabled={loading}
      style={{ fontFamily: FONT_STYLES.body.fontFamily }}
      className={`px-8 py-3.5 rounded-full border border-gray-200 shadow-sm hover:border-gray-300 text-gray-700 bg-white/80 backdrop-blur-sm hover:bg-gray-50 transition-all duration-300 font-semibold flex items-center justify-center gap-2 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
   >
      {children}
      {Icon && <Icon size={18} className="group-hover:translate-x-1 transition-transform" />}
   </button>
);

export const GhostButton = ({ children, icon: Icon, className = '', loading = false, ...props }) => (
   <button
      disabled={loading}
      style={{ fontFamily: FONT_STYLES.body.fontFamily }}
      className={`px-8 py-3.5 rounded-full border-2 border-blue-600 text-blue-700 bg-transparent hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
   >
      {children}
      {Icon && <Icon size={18} className="group-hover:translate-x-1 transition-transform" />}
   </button>
);

export const NavButton = ({ children, className = '', ...props }) => (
   <button
      style={{ fontFamily: FONT_STYLES.body.fontFamily }}
      className={`rounded-full text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm lg:text-base hover:shadow-xl duration-300 px-5 lg:px-6 py-2 transition-all hover:cursor-pointer ${className}`}
      {...props}
   >
      {children}
   </button>
);

export const SmallButton = ({ children, icon: Icon, className = '', loading = false, ...props }) => (
   <button
      disabled={loading}
      style={{ fontFamily: FONT_STYLES.small.fontFamily }}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
   >
      {children}
      {Icon && <Icon size={14} />}
   </button>
);
