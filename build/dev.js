const path = require('path')
  , {config:baseConfig, webpackConfig:baseWebpackConfig} = require('./config/base')
  , webpackConfig = require('./config/dev')
  , webpack = require('webpack')
  , webpackDevServer = require('webpack-dev-server')
  , _ = require('lodash');

let compiler = webpack(webpackConfig);
let app = new webpackDevServer(compiler, webpackConfig.devServer);
app.listen(webpackConfig.devServer.port, '0.0.0.0', (err) => {
  if (err) {
    return console.error(err)
  }
  console.log('Listening at localhost:' + webpackConfig.devServer.port)
});