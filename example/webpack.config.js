const path = require('path');
module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve('output'),
    filename: 'example.js',
  },
  module: {
    rules: [
      { test: /\.js\.(tex|md|html|bird)$/, loader: '@oinkiguana/outline-loader' },
    ],
  },
};
