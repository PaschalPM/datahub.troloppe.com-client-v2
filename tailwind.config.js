/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  daisyui: {
    themes: ["light", "dark", { sunset: {
      ...require("daisyui/src/theming/themes")["sunset"],
      primary: "#1975e6",
      secondary: "#e88617",
      
    },} ],
  },
  theme: {
    extend: {},
  },

  plugins: [
    require('@tailwindcss/aspect-ratio'), 
    require('@tailwindcss/forms'), 
    require('@tailwindcss/typography'),
    require('tailwindcss-mixins'),
    require('daisyui')
  ],
};
