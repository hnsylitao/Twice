const path = require('path')
  , webpack = require('webpack')
  , {config:baseConfig, webpackConfig:baseWebpackConfig} = require('./base')
  , ExtractTextPlugin = require('extract-text-webpack-plugin')
  , _ = require('lodash');

module.exports = _.assign({}, baseWebpackConfig, {
  entry: {
    "base": [path.resolve(baseConfig.rootPath, 'build', 'dll', 'base.config.js')]
  },
  output: {
    path: path.resolve(baseConfig.srcPath, 'dll'),
    filename: '[name].js',
    library: '[name]_library',
  },
  cache: true,
  devtool: 'cheap-source-map',
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new webpack.DefinePlugin({
      __ENV: JSON.stringify(baseConfig.env),
      __VERSION: JSON.stringify(baseConfig.version),
    }),
    new webpack.ProvidePlugin({
      'Promise': 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DllPlugin({
      path: path.resolve(baseConfig.rootPath, 'build', 'dll', 'manifest.json'),
      name: '[name]_library',
      context: path.resolve(baseConfig.rootPath),
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: false,
      allChunks: false,
    })
  ],
  module: _.assign({}, baseWebpackConfig.module, {
    rules: baseWebpackConfig.module.rules.concat([
      {
        test: /\.less$/,
        include: [baseConfig.modulesPath],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!less-loader',
        })
      },
      {
        test: /\.less$/,
        include: [baseConfig.srcPath],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules&localIdentName=[name]--[local]--[hash:base64:8]!less-loader',
        })
      },
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