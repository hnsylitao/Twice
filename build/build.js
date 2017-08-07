const path = require('path')
  , {config:baseConfig, webpackConfig:baseWebpackConfig} = require('./config/base')
  , webpackConfig = require(`./config/${baseConfig.env}`)
  , webpack = require('webpack')
  , open = require('open')
  , rimraf = require('rimraf')
  , _ = require('lodash');

let compiler = webpack(webpackConfig);
rimraf(baseConfig.buildPath, () => {
  console.log(`remove ${baseConfig.buildPath}`)
  console.log(`start build`)
  compiler.run(function (err, states) {
    if (err) {
      return console.error(err)
    }
    console.log(`end build`)
    open(baseConfig.buildPath);
  });
});