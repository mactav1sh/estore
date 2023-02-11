/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        home: "url('/src/assets/imgs/sun-tornado.png')",
        headphone: "url('/src/assets/imgs/headphone.png')",
      },
      fontFamily: {
        logo: ['"Exo 2"', 'sans-serif'],
      },
      colors: {
        'brand-pink': {
          25: '#fff2f5',
          50: '#ffe9ee',
          100: '#ffbecc',
          200: '#ff93ab',
          300: '#ff6789',
          400: '#ff3c67',
          500: '#ff2656',
          600: '#e6224d',
          700: '#cc1e45',
          800: '#b31b3c',
          900: '#80132b',
          1000: '#4c0b1a',
        },
      },
    },
  },
  plugins: [],
};
