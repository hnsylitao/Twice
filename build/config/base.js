const path = require('path')
  , rootPath = path.resolve(__dirname, '../../')
  , srcPath = path.resolve(rootPath, 'src')
  , modulesPath = path.resolve(rootPath, 'node_modules')
  , args = require('minimist')(process.argv.slice(2))
  , _ = require('lodash')
  , ExtractTextPlugin = require('extract-text-webpack-plugin')
  , package = require(path.join(rootPath, 'package.json'));

/**
 * env 开发环境
 * test 测试环境
 * prod 线上环境
 * @type {*}
 */
const env = process.env.REACT_WEBPACK_ENV = process.env.NODE_ENV = (args.env || process.env.NODE_ENV || 'dev');

const config = {
  env: env,
  version: package.version,
  rootPath: rootPath,
  srcPath: srcPath,
  modulesPath: modulesPath,
  buildPath: path.resolve(rootPath, 'build', 'public', `${package.version}${env != 'dist' && `-${env}`}`),
};

const webpackConfig = {
  entry: {
    app: path.resolve(srcPath, 'app.js')
  },
  resolve: {
    alias: {
      Assets: `${srcPath}/assets`,
      Config: `${srcPath}/config/${env}`,
      Const: `${srcPath}/const`,
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