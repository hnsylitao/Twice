const path = require('path')
  , webpack = require('webpack')
  , {config:baseConfig, webpackConfig:baseWebpackConfig} = require('./base')
  , HtmlWebpackPlugin = require('html-webpack-plugin')
  , ExtractTextPlugin = require('extract-text-webpack-plugin')
  , _ = require('lodash');

module.exports = _.merge({}, baseWebpackConfig, {
  entry: _.merge({}, baseWebpackConfig.entry, {
    main: path.resolve(baseConfig.modulesPath, 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000')
  }),
  output: {
    path: baseConfig.buildPath,
    filename: 'assets/js/[name].js',
    publicPath: '',
    chunkFilename: 'assets/js/[id].chunk.js'
  },
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
      minify: {
        minifyJS: false,
        minifyCSS: false,
        removeComments: false,
        collapseWhitespace: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: `assets/js/common.js`
    }),
    new webpack.DefinePlugin({
      __ENV: JSON.stringify(baseConfig.env),
      __VERSION: JSON.stringify(baseConfig.version),
    }),
    new webpack.ProvidePlugin({
      'Promise': 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
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