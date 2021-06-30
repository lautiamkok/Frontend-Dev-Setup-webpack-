const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// Get the webpack envn `mode` variable.
const { mode, watch, outputPublicPath } = require('webpack-nano/argv')
console.log('watch =', watch)
console.log('mode =', mode)
console.log('outputPublicPath =', outputPublicPath)

// Generating multiple HTML pages with HTMLWebpackPlugin.
// https://extri.co/2017/07/11/generating-multiple-html-pages-with-htmlwebpackplugin/
// We need Nodes fs module to read directory contents
const fs = require('fs')
function generateHtmlPlugins (templateDir) {
  // Read files in template directory
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
  const htmlFiles = templateFiles.filter(item => {
    // Split names and extension
    const parts = item.split('.')
    const name = parts[0]
    const extension = parts[1]

    // Make sure only process extension with html only.
    if (extension != 'html') {
      return
    }
    return this
  })

  // List html files here:
  console.log('htmlFiles =', htmlFiles)

  return htmlFiles.map(item => {
    // Split names and extension
    const parts = item.split('.')
    const name = parts[0]
    const extension = parts[1]

    // Create new HtmlWebpackPlugin with options
    // Install html-webpack-plugin@5.0.0-alpha.6 instead to fix webpack 5 upgrade issue:
    // https://github.com/jantimon/html-webpack-plugin/issues/1523
    // https://www.npmjs.com/package/html-webpack-plugin/v/5.0.0-alpha.6
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),

      // Serve favicon.
      // https://stackoverflow.com/a/60351342/413225
      favicon: './public/favicon.ico'
    })
  })
}

// Call our function on our views directory.
const htmlPlugins = generateHtmlPlugins('./public/')

// Get npm config variable for using Vue single file component or not.
// Usage:
// 1. $ npm run dev --vue
// 2. $ npm run build --vue
// 3. $ npm run build:gh-pages --vue
// https://stackoverflow.com/a/19381235/413225
const vue = process.env.npm_config_vue
console.log('process.env.npm_config_vue =', process.env.npm_config_vue)

module.exports = {
  entry: {
    // Load and compile styles first.
    styles: './src/assets/stylesheets/styles.js',

    // Load and compile js.
    app: './src/main.js' // When using Vue as the first class citizen.
  },

  output: {
    // Move the bundle.js file under the js/ folder
    filename: 'assets/js/[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
  },

  resolve: {
    // preferRelative: true,
    alias: {
      'vue$': 'vue/dist/vue.js',

      // Only can access this in JavaScript.
      '@': path.resolve(__dirname, './src/'),

      // Access these path via:
      // ~<path name> in HTML and CSS
      // <path name> in JavaScript
      // https://stackoverflow.com/a/51297383/413225
      static: path.resolve(__dirname, './public/static/'),
      assets: path.resolve(__dirname, './src/assets/'),
      styles: path.resolve(__dirname, './src/assets/stylesheets/'),
      'node-modules': path.resolve(__dirname, './node_modules/'),
    }
  },

  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,

    // Use historyApiFallback: true for HTML5 History Mode in Vue.
    // https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
    // https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback
    // https://stackoverflow.com/a/56217267/413225
    historyApiFallback: true
  },

  module: {
    rules: [
      // Allow webpack to compile Vue components in single file components.
      // https://vue-loader.vuejs.org/guide/#manual-setup
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },

      // Allow webpack to compile ES6+ in JavaScript.
      // this will apply to both plain `.js` files
      // AND `<script>` blocks in `.vue` files
      {
        // Allow webpack to compile async/await statements in the root js file.
        // https://babeljs.io/docs/en/babel-plugin-transform-runtime
        // https://webpack.js.org/loaders/babel-loader/#babel-is-injecting-helpers-into-each-file-and-bloating-my-code
        // https://stackoverflow.com/a/61211001/413225
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },

      // Allow webpack to compile images. 'url-loader' allows you to conditionally
      // inline a file as base-64 data URL if they are smaller than a given
      // threshold. This can reduce the number of HTTP requests for trivial
      // files. If the file is larger than the threshold, it automatically falls
      // back to file-loader.
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        // exclude: [/static/],
        use: [
          {
            loader: 'url-loader',

            options: {
              limit: 1000, // 1kB

              // To fix Webpack file-loader outputs [object Module] in css
              // images and fonts.
              // https://stackoverflow.com/questions/59070216/webpack-file-loader-outputs-object-module
              esModule: false,

              // Specifies a custom filename template for the target file(s).
              // Add this line to fix background images not loaded in HTML doc.
              // https://webpack.js.org/loaders/file-loader/#name
              // https://github.com/webpack/webpack-dev-server/issues/1381#issuecomment-481753934
              // name: '[path][name].[ext]', // src/assets/images/xx.jpg
              name: '[name]-[contenthash].[ext]',

              // Specify a filesystem path where the target file(s) will be placed.
              // Output images in a folder called 'images'.
              // https://webpack.js.org/loaders/file-loader/#outputpath
              outputPath: 'assets/images',

              // Specifies a custom public path for the target file(s).
              // https://webpack.js.org/loaders/file-loader/#publicpath
              publicPath: outputPublicPath + 'assets/images'
            },
          },
        ]
      },

      // Allow webpack to compile fonts.
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000, // 1kB
              esModule: false,
              name: '[name]-[contenthash].[ext]',
              outputPath: 'assets/fonts/',
              publicPath: outputPublicPath + 'assets/fonts'
            },
          },
        ]
      },

      // Allow webpack to pick up (import) the images from HTML <img> tags
      // without the use of require statements, but it prevented _lodash <%= %>
      // being interpreted by HTMLWebpackPlugin (leaving the text untranslated)
      // Otherwise, use the <%= %> lodash template to load image, for example:
      // <img src='<%=require('../assets/images/sample.jpg')%>'>
      // https://stackoverflow.com/a/53784390/413225
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          attributes: {
            // https://webpack.js.org/loaders/html-loader/#urlfilter
            urlFilter: (attribute, value, resourcePath) => {
              // The `attribute` argument contains a name of the HTML attribute.
              // The `value` argument contains a value of the HTML attribute.
              // The `resourcePath` argument contains a path to the loaded HTML file.

              // Don't process any url starts with static, e.g. static/sample-1.jpg.
              if (/^static\/*/.test(value)) {
                return false
              }
              return true
            },
          },
        },
      },
    ]
  },

  plugins: [
    // new BundleAnalyzerPlugin(),

    // Make sure to include the plugin for Vue.
    new VueLoaderPlugin(),

    // Generate an asset manifest.
    // https://webpack.js.org/concepts/manifest/
    // https://www.npmjs.com/package/webpack-manifest-plugin
    // Use webpack-manifest-plugin@3.0.0-rc.0 for webpack 5 upgrade issue:
    // https://github.com/shellscape/webpack-manifest-plugin/issues/186
    // https://www.npmjs.com/package/webpack-manifest-plugin/v/3.0.0-rc.0
    new WebpackManifestPlugin(),

    // Copy static files.
    // https://webpack.js.org/plugins/copy-webpack-plugin/
    // https://stackoverflow.com/a/33374807/413225
    new CopyWebpackPlugin({
      patterns: [
        { from: './public/static/', to: 'static/' }
      ]
    }),

    // Pass the process env variables to the app, e.g. vue. DefinePlugin allows
    // global variables to be set and made available in JavaScript code.
    // https://www.robertcooper.me/front-end-javascript-environment-variables
    // https://stackoverflow.com/questions/50828904/using-environment-variables-with-vue-js
    // https://stackoverflow.com/a/52389695/413225
    new webpack.DefinePlugin({
      "ROUTE_BASE": JSON.stringify(outputPublicPath)
    })
  ]
  // Join our htmlPlugin array to the end of our webpack plugins array.
  .concat(htmlPlugins)
}

// Push different css rule for dev and prod.
// https://stackoverflow.com/questions/36205819/webpack-how-can-we-conditionally-use-a-plugin
if (mode === 'development') {
  module.exports.module.rules.push(
    {
      test: /\.css$/,
      use: [
        'vue-style-loader',

        // style-loader is required, otherwise fonts are not loaded in dev mode.
        // https://webpack.js.org/loaders/style-loader/
        'style-loader',

        'css-loader',

        // Require this line for Tailwind to work with webpack.
        // Also, you should install postcss and postcss-loader:
        // $ npm i postcss postcss-loader -D
        // https://github.com/tailwindlabs/webpack-starter
        'postcss-loader',
      ]
    },

    {
      test: /\.s[ac]ss$/i,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
    },

    {
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        'less-loader',
      ]
    },
  )
}

if (mode === 'production') {
  module.exports.module.rules.push(
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
      ]
    },

    {
      test: /\.s[ac]ss$/i,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader',
      ],
    },

    {
      test: /\.less$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'less-loader',
      ]
    },
  )
}
