// https://purgecss.com/configuration.html#options
module.exports = {
  content: ['dist/**/*.html'],
  css: ['dist/assets/css/styles.css'],

  // Standard.
  // safelist: [
  //   /^dropdown/,
  //   /dropdown/,
  //   /submenu/,
  //   /submenu$/,
  // ],

  safelist: {
    standard: [
      // /\./,
      // /\%/,
    ],
    deep: [
      /menu/,
      /dropdown/,
      /accordion/,
      /form-input/,
    ],
    greedy: [
      /menu/,
      /dropdown/,
      /accordion/,
      /form-input/,
    ]
  },

  // Include any special characters you're using in this regular expression.
  // https://ironeko.com/posts/optimize-tailwindcss-by-removing-unused-css-classes/
  defaultExtractor: content => content.match(/[\w-/:.!%@]+(?<!:)/g) || []
}
