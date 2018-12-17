import path from 'path';
import webpack from 'webpack';
import MemoryFs from 'memory-fs';

export default (fixture, options = {}) => {
  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [{
        test: /\.js\.(md|tex|bird|html)$/,
        use: {
          loader: path.resolve(__dirname, '../dist/loader.js'),
          options,
        }
      }]
    }
  });

  compiler.outputFileSystem = new MemoryFs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      resolve(stats);
    });
  });
};
