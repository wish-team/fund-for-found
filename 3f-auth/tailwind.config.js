/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
        EduAUVICWANTDots: ['var(--font-EduAUVICWANTDots)'],
      },
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
      colors: {
        'purple-1': '#644FC1',
        'purple-2': '#8D75F7',

        'gray-1': '#E7E7E7',
        'gray-2': '#959595',
      },
    },
    plugins: [require('tailwindcss-animate')],
  },
}
