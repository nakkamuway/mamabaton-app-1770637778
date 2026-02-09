/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F7F4F3',
          100: '#EFE9E7',
          200: '#E7DFDC',
          300: '#DFD3CF',
          400: '#D7C8C2',
          500: '#C2ADA5',
          600: '#AD9288',
          700: '#98776B',
          800: '#835C4E',
          900: '#6E4131',
        },
      },
    },
  },
  plugins: [],
};