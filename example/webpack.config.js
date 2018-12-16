const path = require('path');
module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve('output'),
    filename: 'example.js',
  },
  module: {
    rules: [
      { test: /\.js\.(tex|md|html|bird)$/, loader: 'outline-loader' },
    ],
  },
};
