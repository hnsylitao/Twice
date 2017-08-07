const path = require('path')
  , webpack = require('webpack')
  , {config:baseConfig, webpackConfig:baseWebpackConfig} = require('./base')
  , HtmlWebpackPlugin = require('html-webpack-plugin')
  , ExtractTextPlugin = require('extract-text-webpack-plugin')
  , _ = require('lodash');

module.exports = _.assign({}, baseWebpackConfig, {
  output: {
    path: baseConfig.buildPath,
    filename: 'assets/js/[name].[chunkhash].js',
    publicPath: '',
    chunkFilename: 'assets/js/[id].[chunkhash].chunk.js'
  },
  cache: false,
  devtool: 'cheap-source-map',
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: false,
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
      filename: `assets/js/common.[chunkhash].js`
    }),
    new webpack.DefinePlugin({
      '__ENV': JSON.stringify(baseConfig.env),
      '__VERSION': JSON.stringify(baseConfig.version),
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.ProvidePlugin({
      'Promise': 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise'
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      sourceMap: true,
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
          use: 'css-loader?modules&localIdentName=[emoji:4][hash:base64:4]!less-loader',
        })
      },
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