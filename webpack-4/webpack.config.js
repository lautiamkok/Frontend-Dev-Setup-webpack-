const configDevelopment = require('./webpack.development.js')
const configProduction = require('./webpack.production.js')

// https://webpack.js.org/guides/environment-variables/
// https://webpack.js.org/guides/production/
// https://github.com/webpack/webpack/issues/6460
// https://github.com/webpack/webpack/issues/7005
module.exports = (env, argv) => {
  // Use env.<YOUR VARIABLE> here, for example in package.json:
  // "build": "webpack --env.production"
  console.log('env =', env)

  // Use --mode <YOUR VARIABLE> here, for example in package.json:
  // "dev": "webpack-dev-server --mode development"
  console.log('mode =', argv.mode)

  if (argv.mode === 'production') {
    return configProduction
  }
  return configDevelopment
}
