/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2E5BFF", // Electric Blue
          dark: "#0035BE",
        },
        secondary: {
          DEFAULT: "#0A0B14", // Deep Navy
        },
        accent: {
          DEFAULT: "#FF6B00", // Accent Orange
        },
        surface: {
          DEFAULT: "#111415",
          bright: "#373A3B",
        }
      },
      fontFamily: {
        sans: ["Hanken Grotesk", "sans-serif"],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
