var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var requireDir = require('require-dir');

// add hot-reload related code to entry chunks
var addToEntryArray = ['webpack/hot/dev-server', 'webpack-hot-middleware/client', './build/dev-client'];
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  // baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
  baseWebpackConfig.entry[name] = addToEntryArray.concat(baseWebpackConfig.entry[name])
})

var extendWebpackConfig = {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   title: 'vue index',
    //   filename: 'index.html',
    //   template: 'index.html',
    //   // inject: true
    // }),
    // new HtmlWebpackPlugin({
    //   title: 'gem',
    //   filename: 'gem.html',
    //   template: './src/pages/gem/gem.html',
    //   // inject: true
    // }),
    new FriendlyErrorsPlugin()
  ]
}

var pages = utils.getEntries('./src/pages/**/*.ejs');
for(var page in pages) {
  // 配置生成的html文件，定义路径等
  var conf = {
    filename: page + '.html',
    template: pages[page], //模板路径
    inject: true,
    // ejs 模版使用的数据
    assets: requireDir('../inject').page,
    // excludeChunks 允许跳过某些chunks, 而chunks告诉插件要引用entry里面的哪几个入口
    // 如何更好的理解这块呢？举个例子：比如本demo中包含两个模块（index和about），最好的当然是各个模块引入自己所需的js，
    // 而不是每个页面都引入所有的js，你可以把下面这个excludeChunks去掉，然后npm run build，然后看编译出来的index.html和about.html就知道了
    // filter：将数据过滤，然后返回符合要求的数据，Object.keys是获取JSON对象中的每个key
    excludeChunks: Object.keys(pages).filter(item => {
      return (item != page)
    })
  }
  // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
  extendWebpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}



module.exports = merge(baseWebpackConfig, extendWebpackConfig);

