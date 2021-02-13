const path = require('path');

module.exports = {
  entry: './src/index.js',
  devtool: "source-map",
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  loaders: [
    { test: /\.json$/, loader: 'json' },
    // other loaders 
 ]
};