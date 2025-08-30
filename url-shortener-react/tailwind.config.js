/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'btnColor': '#3364F7',
        'customRed': '#E3606A',
        'customBlue': '#3768B4',
        'navbarColor': '#ffffff',
        'linkColor': '#2a5bd7',
      },
      backgroundImage: {
        'custom-gradient': "linear-gradient(to right, #3b82f6, #9333ea)",
        'custom-gradient-2': "linear-gradient(to left, #3b82f6, #f43f5e)",
        'card-gradient': "linear-gradient(to right, #38b2ac, #4299e1)",
      },
      boxShadow: {
        'custom': "0 0 15px rgba(0, 0, 0, 0.3)",
        'right': "10px 0px 10px -5px rgba(0, 0, 0, 0.3)",
      },
      fontFamily: {
        'roboto': ["Roboto", "sans-serif"],
        'montserrat': ["Montserrat"],
      },
    },
  },
  plugins: [],
}
