module.exports = {
  purge: {
    // https://tailwindcss.com/docs/optimizing-for-production#enabling-manually
    enabled: true,
    content: ['./public/**/*.html'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
