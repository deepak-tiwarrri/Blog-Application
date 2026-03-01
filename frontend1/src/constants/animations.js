/**
 * Shared Animation Variants
 * Reusable animation definitions for Framer Motion across the app
 */

export const ANIMATION_VARIANTS = {
  // Fade and slide up
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] }
    }
  },

  // Fade and scale
  fadeScale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  },

  // Slide from left
  slideInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] }
    }
  },

  // Slide from right
  slideInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] }
    }
  },

  // Stagger container
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    }
  },

  // Stagger item
  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      }
    }
  },
};

// Transition presets
export const TRANSITION_PRESETS = {
  smooth: { type: 'tween', duration: 0.6, ease: [0.25, 1, 0.5, 1] },
  spring: { type: 'spring', stiffness: 100, damping: 20 },
  fast: { type: 'tween', duration: 0.3 },
  slow: { type: 'tween', duration: 0.8 },
};
