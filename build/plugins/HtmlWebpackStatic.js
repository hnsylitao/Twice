var cheerio = require('cheerio')
var _ = require('lodash')
function HtmlWebpackStatic(options = {}) {
  this.options = _.merge({}, {
    css: [],
    js: [],
  }, options)
}

HtmlWebpackStatic.prototype.apply = function (compiler) {
  var options = this.options
  compiler.plugin("compilation", function (compilation) {
    compilation.plugin("html-webpack-plugin-before-html-processing", (htmlPluginData, callback) => {
        var $ = cheerio.load(htmlPluginData.html);

        // add css
        for (var i = 0; i < options.css.length; i++) {
          $('head').append(`<link rel="stylesheet" href="${options.css[i]}"/>`)
        }

        // add js
        for (var i = 0; i < options.js.length; i++) {
          $('body').append(`<script type="text/javascript" src="${options.js[i]}"/>`)
        }

        htmlPluginData.html = $.html()
        callback(null, htmlPluginData)
      }
    )
  })
}

module.exports = HtmlWebpackStatic
