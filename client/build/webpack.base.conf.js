var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require('webpack')

var util = require('util')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

console.log('NODE_ENV_WY', process.env.NODE_ENV_WY);
// 测试正式和生产环境
var env = process.env.NODE_ENV_WY;
var feature = {
  __DEV__: 'false',
  __TEST__: 'false',
  __PRO__: 'false'
};

if(env == 'DEV'){
  feature.__DEV__ = 'true';
}
else if(env == 'TEST'){
  feature.__TEST__ = 'true';
}else if(env == 'PRO'){
  feature.__PRO__ = 'true';
}

module.exports = {
  // entry: [
  //   'webpack/hot/dev-server',
  //   'webpack-hot-middleware/client',
  //   './src/pages/index/index.js'
  // ],
  entry: utils.getEntries('./src/pages/**/*.js'),
  output: {
    // path: config.build.assetsRoot,
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  // postcss: [
  //   require('autoprefixer')(),
  // ],
  // 
  plugins: [
    new webpack.DefinePlugin(feature)
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        // query: {
        //   limit: 10000,
        //   name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        // }
      }
    ]
  }
}
