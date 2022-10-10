const colors = require('tailwindcss/colors')

module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter'],
      },
      colors: {
        primary: {
          DEFAULT: colors.orange[500],
          ...colors.orange
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@headlessui/tailwindcss')
  ],
}
