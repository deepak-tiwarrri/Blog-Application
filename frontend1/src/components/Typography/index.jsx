/**
 * Typography Components
 * Reusable typography components to eliminate repetitive font styling
 */

import React from 'react';
import { FONT_STYLES } from '@/constants/typography';

export const H1 = ({ children, className = '', ...props }) => (
   <h1 style={FONT_STYLES.h1} className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-100 ${className}`} {...props}>
      {children}
   </h1>
);

export const H2 = ({ children, className = '', ...props }) => (
   <h2 style={FONT_STYLES.h2} className={`text-3xl md:text-4xl font-bold text-gray-100 ${className}`} {...props}>
      {children}
   </h2>
);

export const H3 = ({ children, className = '', ...props }) => (
   <h3 style={FONT_STYLES.h3} className={`text-xl md:text-2xl font-bold text-gray-100 ${className}`} {...props}>
      {children}
   </h3>
);

export const BodyLarge = ({ children, className = '', ...props }) => (
   <p style={FONT_STYLES.bodyLarge} className={`text-lg md:text-xl text-gray-100 leading-relaxed ${className}`} {...props}>
      {children}
   </p>
);

export const Body = ({ children, className = '', ...props }) => (
   <p style={FONT_STYLES.body} className={`text-gray-600 ${className}`} {...props}>
      {children}
   </p>
);

export const Meta = ({ children, className = '', ...props }) => (
   <span style={FONT_STYLES.meta} className={`text-gray-500 ${className}`} {...props}>
      {children}
   </span>
);

export const GradientText = ({ children, className = '', ...props }) => (
   <span className={`bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${className}`} {...props}>
      {children}
   </span>
);

export const BadgeText = ({ children, className = '', ...props }) => (
   <span style={FONT_STYLES.small} className={`font-semibold text-blue-700 tracking-wide ${className}`} {...props}>
      {children}
   </span>
);
