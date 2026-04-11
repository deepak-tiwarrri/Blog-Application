/**
 * Typography Color and Font Configuration
 * Centralized font family and color definitions to reduce repetition
 */

export const FONTS = {
  playfair: 'Playfair Display, serif',
  poppins: 'Poppins, sans-serif',
  geist: 'Geist, sans-serif',
};

export const FONT_STYLES = {
  // Headings
  h1: {
    fontFamily: FONTS.playfair,
    fontWeight: '800',
    letterSpacing: '-0.5px',
  },
  h2: {
    fontFamily: FONTS.playfair,
    fontWeight: '700',
    letterSpacing: '0.5px',
  },
  h3: {
    fontFamily: FONTS.playfair,
    fontWeight: '700',
  },
  
  // Body text
  body: {
    fontFamily: FONTS.poppins,
    lineHeight: '1.6',
  },
  bodyLarge: {
    fontFamily: FONTS.poppins,
    fontSize: '1.125rem',
    lineHeight: '1.8',
  },
  
  // Small text
  small: {
    fontFamily: FONTS.poppins,
    fontSize: '0.875rem',
  },
  
  // Meta info
  meta: {
    fontFamily: FONTS.poppins,
    fontSize: '0.75rem',
    fontWeight: '500',
    letterSpacing: '0.3px',
  },
};

export const COLORS = {
  primary: {
    600: '#2563eb',
    700: '#1d4ed8',
  },
  secondary: {
    600: '#7c3aed',
    700: '#6d28d9',
  },
  gray: {
    600: '#4b5563',
    700: '#6b7280',
    900: '#111827',
  },
};
