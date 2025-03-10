import {nextui} from "@nextui-org/react";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
      },
      fontFamily: {
        sans: ['var(--font-family)'], // This will be dynamically updated
        inter: ['Inter', 'sans-serif'],
        vazirmatn: ['Vazirmatn', 'sans-serif'],
        'noto-kufi': ['"Noto Kufi Arabic"', 'sans-serif'],
      },
      colors: {
        black: "var(--black)",
        gray1: "var(--Gray1)",
        gray2: "var(--Gray2)",
        gray3: "var(--Gray3)",
        gray4: "var(--Gray4)",
        light1: "var(--light1)",
        light2: "var(--light2)",
        light3: "var(--light3)",
        light4: "var(--light4)",
        primary: "var(--primary)",
        primary50: "var(--primary50)",
        primary75: "var(--primary75)",
        primary100: "var(--primary100)",
        primary200: "var(--primary200)",
        primary300: "var(--primary300)",
        primary400: "var(--primary400)",
      },
      boxShadow: {
        shadow1: "-2px 2px 10px 1px rgba(149, 149, 149, 0.15)",
      },
      zIndex: {
        'sticky': '1200',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
};