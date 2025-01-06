/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf2f3',
          100: '#fde3e5',
          200: '#fbccd0',
          300: '#f7a8ae',
          400: '#f27983',
          500: '#e94d59',
          600: '#dc3444', // Our main brand color
          700: '#b91c2c',
          800: '#991b27',
          900: '#7f1d25',
        },
      },
    },
  },
  plugins: [],
};