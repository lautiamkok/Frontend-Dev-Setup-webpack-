const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

// Minimizing and extracting for production
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',

  plugins: [
    // Add the plugin here to extract your CSS into .css files.
    // https://webpack.js.org/plugins/mini-css-extract-plugin/
    new MiniCssExtractPlugin({
      // filename: "style.css"
      filename: "assets/css/[name].css",
      chunkFilename: "assets/css/[id].css"
    }),

    // Add the plugin here to remove/clean your build folder(s).
    // https://github.com/johnagan/clean-webpack-plugin#options-and-defaults-optional
    new CleanWebpackPlugin(),
  ],

  optimization: {
    minimize: true,
    minimizer: [
      // Add the plugin here to minify your JavaScript.
      // https://github.com/webpack-contrib/terser-webpack-plugin
      // https://stackoverflow.com/questions/45901974/webpack-uglify-error-unexpected-token-keyword-function?rq=1
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
        // Remove Comments
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),

      // Add the plugin here to minify your CSS.
      // https://github.com/webpack-contrib/css-minimizer-webpack-plugin
      new CssMinimizerPlugin()
    ],

    // Allow webpack to split your .js and .css into chunks.
    // https://webpack.js.org/guides/code-splitting#prevent-duplication
    splitChunks: {
      chunks: 'all'
    },
  },
})
