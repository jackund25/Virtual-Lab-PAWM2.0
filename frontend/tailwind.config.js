/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#722F37',
        secondary: '#F87171',
        'navbar-blue': '#87CEEB',
      },
    },
  },
  plugins: [],
}