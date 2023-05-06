/** @type {import('tailwindcss').Config} */
// const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    fontSize: {
      "2xs": ["10px", "12px"],
      xs: ["12px", "15px"],
      sm: ["14px", "16px"],
      base: ["16px", "20px"],
      lg: ["18px", "22px"],
      xl: ["20px", "24px"],
      "2xl": ["24px", "28px"],
    },
    colors: {
      ...colors,
      primary: {
        DEFAULT: "rgb(var(--color-primary))",
        light: "rgba(var(--color-primary), .9)",
      },
      secondary: {
        DEFAULT: "rgb(var(--color-secondary))",
        light: "rgba(var(--color-secondary), .2)",
      },
      main: "rgba(var(--color-main))",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}