import webpack from 'webpack';

export default {
  context: __dirname,
  entry: './index.js',
  output: {
    path: `${__dirname}/__build__`,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: ((argv) => {
    const plugins = [];
    const mode = (() => {
      if (argv.indexOf('-p') !== -1) return 'production';
      if (argv.indexOf('-d') !== -1) return 'development';
      return undefined;
    })();

    if (mode) {
      plugins.push(new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }));
    }

    if (mode === 'production') {
      plugins.push(new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false,
        },
      }));
    }

    return plugins;
  })(process.argv),
};
