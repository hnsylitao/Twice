const path = require('path')
  , {config:baseConfig, webpackConfig:baseWebpackConfig} = require('./base')
  , _ = require('lodash');

module.exports = {
  https: false,
  disableHostCheck: true,
  contentBase: baseConfig.srcPath,
  historyApiFallback: true,
  hot: true,
  port: 7081,
  publicPath: '',
  noInfo: true,
  quiet: false,
  compress: false,
  stats: {colors: true},
};