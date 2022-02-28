module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
        margin: 'margin'
      }
    }
  },
  variants: {
    extend: {
      ringWidth: ['hover']
    }
  },
  plugins: []
};
