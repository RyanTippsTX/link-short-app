/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        peach: {
          50: '#FFF5F1',
          100: '#FFE5DE',
          200: '#FFCDC4',
          300: '#FFB2A5',
          400: '#F5A48B',
          500: '#F58B6A',
          600: '#EF734F',
          700: '#E05E3A',
          800: '#F56032',
          900: '#C54B26',
          950: '#6F2613',
        },
      },
    },
  },
};
