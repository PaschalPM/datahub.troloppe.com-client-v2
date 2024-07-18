/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  daisyui: {
    themes: [{
      light: {
        ...require("daisyui/src/theming/themes")["light"],
        secondary: "#ba6b12",
      }
    }, {
      sunset: {
        ...require("daisyui/src/theming/themes")["sunset"],
        primary: "#1975e6",
        secondary: "#e88617"

      },
    }],
  },
  theme: {
    extend: {

    },
  },

  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-mixins'),
    require('daisyui')
  ],
};
