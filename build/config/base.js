const path = require('path')
  , rootPath = path.resolve(__dirname, '../../')
  , srcPath = path.resolve(rootPath, 'src')
  , modulesPath = path.resolve(rootPath, 'node_modules')
  , args = require('minimist')(process.argv.slice(2))
  , _ = require('lodash')
  , ExtractTextPlugin = require('extract-text-webpack-plugin')
  , package = require(path.join(rootPath, 'package.json'));


const env = process.env.REACT_WEBPACK_ENV = args.env || 'dev';

const config = {
  env: env,
  rootPath: rootPath,
  srcPath: srcPath,
  modulesPath: modulesPath,
  version: package.version,
};

const webpackConfig = {
  entry: {
    app: path.resolve(srcPath, 'app.js')
  },
  resolve: {
    alias: {
      Assets: `${srcPath}/assets`,
      Components: `${srcPath}/components`,
      Redux: `${srcPath}/redux`,
      Routes: `${srcPath}/routes`,
      Service: `${srcPath}/service`,
      Util: `${srcPath}/util`,
      Views: `${srcPath}/views`
    },
    extensions: ['.js', '.jsx'],
    enforceExtension: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        include: [srcPath],
        use: [{
          loader: 'eslint-loader',
        }]
      },
      {
        test: /\.(js|jsx)$/,
        include: [srcPath],
        use: [{
          loader: 'babel-loader',
        }]
      },
      {
        test: /\.css$/,
        include: [srcPath],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!less-loader',
        })
      },
    ],
  }
};

module.exports = _.merge({}, config, webpackConfig);
module.exports.config = config;
module.exports.webpackConfig = webpackConfig;