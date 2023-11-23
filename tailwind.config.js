/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ],
  theme: {
    
    extend: {
      colors: {
        'yellow': '#dde244',
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        roboto: ['Roboto Condensed', 'sans-serif'],
      }
    },
  },
  plugins: [require("daisyui")],

}

