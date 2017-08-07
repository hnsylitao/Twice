const path = require('path')
  , {config:baseConfig, webpackConfig:baseWebpackConfig} = require('./config/base')
  , webpackConfig = require(`./config/${baseConfig.env}`)
  , devServerConfig = require('./config/dev.server')
  , webpack = require('webpack')
  , open = require('open')
  , webpackDevServer = require('webpack-dev-server')
  , webpackDevMiddleWare = require('webpack-dev-middleware')
  , webpackHotMiddleWare = require('webpack-hot-middleware')
  , _ = require('lodash');

let compiler = webpack(webpackConfig);
let app = new webpackDevServer(compiler, devServerConfig);
app.use(webpackHotMiddleWare(compiler, {
  path: "/__webpack_hmr",
  heartbeat: 5000
}));
app.use(webpackDevMiddleWare(compiler, {
  noInfo: true,
  stats: {colors: true},
  publicPath: webpackConfig.output.publicPath
}));
app.listen(devServerConfig.port, '0.0.0.0', (err) => {
  if (err) {
    return console.error(err)
  }
  console.log('Listening at localhost:' + devServerConfig.port)
  open(`http://localhost:${devServerConfig.port}`);
});