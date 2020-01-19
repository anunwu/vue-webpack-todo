const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

let config

const devServer = {
  port: '8080',
  host: '0.0.0.0',
  overlay: {
    // webpack编译出现错误时显示到网页上
    errors: true
  },
  // open: true,
  hot: true
}

// 由于后期的服务端渲染时webpack配置不需要这些配置，所以这一块不能写到webpack.config.base.js中
const defaultPlugins = [
  // 该插件的好处是使得process.env.NODE_ENV可以在js代码中引用
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: "'development'"
    }
  }),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, './template.html')
  })
]

config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  devtool: '#cheap-module-eval-source-map',
  devServer,
  resolve: {
    alias: {
      // 默认情况下，import Vue from 'vue'
      // 在development环境下webpack自动加载vue.runtime.esm.js
      // 在production环境下webpack自动加载vue.runtime.min.js
      // 有runtime和没有runtime的区别在runtime无法new Vue({})template配置项
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          'vue-style-loader',
          'css-loader',
          // {
          //   loader: 'css-loader',
          //   options: {
          //     modules: {
          //       localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]'
          //     }
          //   }
          // },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin()
    // new webpack.NoEmitOnErrorsPlugin()
  ])
})

module.exports = config

