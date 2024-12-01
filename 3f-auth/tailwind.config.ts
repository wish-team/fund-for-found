const { fontFamily } = require('tailwindcss/defaultTheme')
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'purple-1': '#644FC1',
        'purple-2': '#8D75F7',

        'gray-1': '#E7E7E7',
        'gray-2': '#959595',
        'gray-3': '#F5F5F5',
        'gray-4': '#C7C6C6',
      },
    },
    plugins: [require('tailwindcss-animate'), addVariablesForColors],
  },
  plugins: [require('tailwindcss-animate'), addVariablesForColors],
}

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]))

  addBase({
    ':root': newVars,
  })
}
