/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        primary: "rgb(59 130 246)",
        secondary: "rgb(107 114 128)",
      },
      fontFamily: {
        sans: ["Geist", ...defaultTheme.fontFamily.sans], // Geist as default sans font
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
