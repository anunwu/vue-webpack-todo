const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

let config

const devServer = {
  port: '8000',
  host: '0.0.0.0',
  overlay: {
    // webpack编译出现错误时显示到网页上
    errors: true
  },
  // 当vue-router采用history模式时，必须有后端进行配置，否则当页面刷新时会出现404，
  // 这是因为后端不认识当前刷新的路由，找不到对应的路径，所以会返回404，
  // 在开发环境下为了解决这个问题可以进行historyApiFallback配置使得任意的 404 响应都可能需要被替代为 index.html。
  // 若在webpack的output配置中有配置到publicPath: '/public/'，则这里应该对应配置成index: '/public/index.html'
  historyApiFallback: {
    index: '/index.html'
  },
  // open: true,
  hot: true
}

const isDev = process.env.NODE_ENV === 'development'

// 由于后期的服务端渲染时webpack配置不需要这些配置，所以这一块不能写到webpack.config.base.js中
const defaultPlugins = [
  // 该插件的好处是使得process.env.NODE_ENV可以在js代码中引用
   new webpack.DefinePlugin({
     'process.env': {
       NODE_ENV: isDev ? "'development'" : "'production'"
     }
   }),
   new HtmlWebpackPlugin({
     template: path.join(__dirname, 'template.html')
   })
]

if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    devServer,
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
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js')
      // vendor: ['vue']
    },
    output: {
      /*
        chunkhash与hash的区别：
        chunkhash是将每个js文件都用不同的hash值打包
        hash是每一次打包所有js文件的hash都一样
        因此在production环境下必须用chunkhash，这样方便浏览器缓存
        否则，每次更改业务代码后重新打包，类库文件的hash也跟着改变
        这样的话讲业务代码和类库代码分开打包就没有意义了，因为每次重新打包都改变了所有文件的hash
     */
      filename: '[name]_[chunkhash:8].js'
    },
    module: {
      rules: [
        // 配置css代码单独打包，而不是打包到js代码里
        {
          test: /\.styl/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: './',
                hmr: process.env.NODE_ENV === 'development'
              }
            },
            'css-loader',
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
    // 代替webpack3.x的webpack.optimize.CommonsChunkPlugin配置
    optimization: {
      // 默认将node_modules中代码打包到vendor
      splitChunks: {
        chunks: 'all'
      },
      // 实现浏览器持久化缓存
      runtimeChunk: true
    },
    plugins: defaultPlugins.concat([
       // 将css代码分开打包
      new MiniCssExtractPlugin('styles_[chunkhash:8].css')
       // webpack4已将以下配置废弃
      // // 将类库代码与业务代码分开打开，使类库代码可以被浏览器缓存
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'vendor'
      // }),
      // // 把webpack生成在app.js中相关代码打包在另一个文件
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'runtime'
      // })
    ])
  })

}

module.exports = config

