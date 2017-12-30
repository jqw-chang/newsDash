const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: __dirname + "/client",
  entry: './index.jsx',
  output: {
    path: __dirname + '/build',
    filename: 'webpack-bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['react', 'env']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ]
  }
}