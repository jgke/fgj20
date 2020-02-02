const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: 'public',
  },
  watchOptions: {
    poll: 1000, // Check for changes every second
    ignored: /node_modules/
  }
});
