const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      colors: {
        'yellow': '#dde244',
        'slate-900':'#1d232a'
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        roboto: ['Roboto Condensed', 'sans-serif'],
      }
    },
  },

  plugins: [require("daisyui")],
});