/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        peach: {
          50: '#fff8f4',
          100: '#ffece4',
          200: '#ffd4c6',
          300: '#ffbba8',
          400: '#ff9975',
          500: '#ff7742',
          600: '#e6663b',
          700: '#bf5632',
          800: '#99472a',
          900: '#7d3b22',
          950: '#522618',
        },
      },
    },
  },
};
