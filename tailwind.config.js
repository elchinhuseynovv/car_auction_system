/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        blue: {
          400: '#42B5E8',
          500: '#3ba1d1',
          600: '#2f8ab8',
          700: '#256d92',
        },
        pink: {
          500: '#F74A8A',
          600: '#e63e79',
          700: '#cf3169',
        },
      },
      boxShadow: {
        subtle: '0 2px 10px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};