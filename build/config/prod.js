const path = require('path')
  , webpack = require('webpack')
  , {config:baseConfig, webpackConfig:baseWebpackConfig} = require('./base')
  , HtmlWebpackPlugin = require('html-webpack-plugin')
  , ExtractTextPlugin = require('extract-text-webpack-plugin')
  , _ = require('lodash');

module.exports = _.merge({}, baseWebpackConfig, {
  output: {
    path: baseConfig.buildPath,
    filename: 'assets/js/[name].[chunkhash].js',
    publicPath: '',
    chunkFilename: 'assets/js/[id].[chunkhash].chunk.js'
  },
  cache: false,
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      allChunks: true,
      template: path.resolve(baseConfig.srcPath, 'index.html'),
      minify: {
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: `assets/js/common.[chunkhash].js`
    }),
    new webpack.DefinePlugin({
      __ENV: baseConfig.env,
      __VERSION: baseConfig.version,
    }),
    new webpack.ProvidePlugin({
      'Promise': 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise'
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000}),
    new ExtractTextPlugin({
      filename: 'assets/css/[name].css',
      disable: false,
      allChunks: true,
    })
  ],
  module: _.merge({}, baseWebpackConfig.module, {
    rules: baseWebpackConfig.module.rules.concat([
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: `assets/image/[name].[hash].[ext]`,
            limit: 8192
          },
        }]
      },
      {
        test: /\.svg?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: `assets/image/[name].[hash].[ext]`,
            limit: 8192,
            mimetype: 'image/svg+xml'
          }
        }]
      },
      {
        test: /\.woff?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            mimetype: 'application/font-woff',
          }
        }]
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            mimetype: 'application/font-woff2',
          }
        }]
      },
      {
        test: /\.[ot]tf?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            mimetype: 'application/octet-stream',
          }
        }]
      },
      {
        test: /\.eot?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            mimetype: 'application/vnd.ms-fontobject',
          }
        }]
      }
    ])
  })
});