const path = require('path')
  , webpack = require('webpack')
  , {config:baseConfig, webpackConfig:baseWebpackConfig} = require('./base')
  , devServerConfig = require('./dev.server')
  , HtmlWebpackPlugin = require('html-webpack-plugin')
  , ExtractTextPlugin = require('extract-text-webpack-plugin')
  , _ = require('lodash');

module.exports = _.merge({}, baseWebpackConfig, {
  output: {
    path: path.resolve(baseConfig.rootPath, '__build__'),
    filename: 'js/[name].js',
    publicPath: '/',
    chunkFilename: 'js/[id].chunk.js'
  },
  devServer: devServerConfig,
  cache: true,
  devtool: 'cheap-source-map',
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      allChunks: true,
      template: path.resolve(baseConfig.srcPath, 'index.html'),
    }),
    new webpack.DefinePlugin({
      __ENV: baseConfig.env,
      __VERSION: baseConfig.version,
    }),
    new webpack.ProvidePlugin({
      'Promise': 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000}),
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      disable: false,
      allChunks: true,
    })
  ],
  module: _.merge({}, baseWebpackConfig.module, {
    rules: baseWebpackConfig.module.rules.concat([
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'react-hot-loader',
          },
          {
            loader: 'babel-loader',
          }
        ],
        include: baseConfig.srcPath,
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [{
          loader: 'url-loader',
        }]
      },
      {
        test: /\.svg?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000000,
            mimetype: 'image/svg+xml',
          }
        }]
      },
      {
        test: /\.woff?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000000,
            mimetype: 'application/font-woff',
          }
        }]
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000000,
            mimetype: 'application/font-woff2',
          }
        }]
      },
      {
        test: /\.[ot]tf?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000000,
            mimetype: 'application/octet-stream',
          }
        }]
      },
      {
        test: /\.eot?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000000,
            mimetype: 'application/vnd.ms-fontobject',
          }
        }]
      }
    ])
  })
});