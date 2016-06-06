module.exports = {
  context: __dirname,
  entry: './index.js',
  output: {
    path: `${__dirname}/__build__`,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
