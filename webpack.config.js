const webpack = require('webpack');
const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve('.', 'dist'),
    filename: 'loader.js',
    library: '@oinkiguana/outline-loader',
    libraryTarget: 'umd',
  },
  target: 'node',
  plugins: [
    new webpack.ProvidePlugin({
      TextEncoder: ['util', 'TextEncoder'],
      TextDecoder: ['util', 'TextDecoder'],
    }),
  ],
};
