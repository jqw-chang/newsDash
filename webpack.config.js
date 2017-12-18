const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  context: __dirname + "/client",
  entry: './main.jsx',
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
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
    ]
  }
}