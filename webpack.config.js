const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: `${__dirname}/src/index.tsx`,
  output: {
    path: `${__dirname}/build`,
    publicPath: '/build/',
    filename: 'bundle.js',
  },

  // generate different source maps for dev and production
  devtool: process.argv.indexOf('-p') === -1 ? 'eval-source-map' : 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  module: {
    rules: [
      // use ts-loader for ts and js files so all files are converted to es5
      { test: /\.(tsx?|js)$/, exclude: /node_modules/, loader: 'ts-loader' },
      { test: /\.js$/, loader: 'source-map-loader' },
    ],
  },

  // required because the defaults for webpack -p don't remove multiline comments
  optimization:
    process.argv.indexOf('-p') === -1
      ? {}
      : {
          minimize: true,
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                output: {
                  comments: false,
                },
              },
              extractComments: false,
            }),
          ],
        },

  // to mimic GitHub Pages serving 404.html for all paths
  // and test spa-github-pages redirect in dev
  devServer: {
    historyApiFallback: {
      rewrites: [{ from: /\//, to: '/404.html' }],
    },
  },
};
