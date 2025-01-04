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
        papaya: {
          50: '#fff9f5',
          100: '#ffefde',
          200: '#ffd8b8',
          300: '#ffc092',
          400: '#ff9e57',
          500: '#ff7d1b',
          600: '#e67118',
          700: '#bf5e14',
          800: '#994b10',
          900: '#7d3e0d',
          950: '#50270a',
        },
      },
    },
  },
};
