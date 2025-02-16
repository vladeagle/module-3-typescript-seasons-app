const commonConfig = require('./webpack.config.common')
const { merge } = require('webpack-merge')

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 3020,
    hot: true,
    open: true,
  },
})