const path = require('path')
const VueLoader = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: "web",
  mode: 'development',
  entry: path.join(__dirname, 'client/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
     // 加载.vue文件这个插件是必须的！
    // 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。
    // 例如，如果你有一条匹配 /\.css$/ 的规则，那么它会应用到 .vue 文件里的 <style> 块;
    // 如果有一条匹配到/\.js$/规则，那么它会应用到.vue文件的<script>块
     new VueLoader.VueLoaderPlugin(),
     new HtmlWebpackPlugin(),
     // 该插件的好处是使得procee.env.NODE_ENV可以在js代码中引用
     new webpack.DefinePlugin({
       'process.env': {
         // 内外引号的作用是使得NODE_ENV的值是字符串而不是development或production变量
         NODE_ENV: isDev ? '"development"' : '"production"'
       }
     }),
     new CleanWebpackPlugin()
  ]
}

if (isDev) {
  config.module.rules.push(
     {
       test: /\.styl/,
       use: [
         'style-loader',
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
  )
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: '8080',
    host: '0.0.0.0',
    overlay: {
      // webpack编译出现错误时显示到网页上
      errors: true
    },
    // open: true,
    hot: true
  }
  config.plugins.push(
     new webpack.HotModuleReplacementPlugin(),
     new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  // config.entry = {
  //   app: path.join(__dirname, 'client/index.js'),
  //   vendor: ['vue']
  // }
  /*
    chunkhash与hash的区别：
    chunkhash是将每个js文件都用不同的hash值打包
    hash是每一次打包所有js文件的hash都一样
    因此在production环境下必须用chunkhash，这样方便浏览器缓存
    否则，每次更改业务代码后重新打包，类库文件的hash也跟着改变
    这样的话讲业务代码和类库代码分开打包就没有意义了，因为每次重新打包都改变了所有文件的hash
   */
  config.output.filename = '[name].[chunkhash:8].js'
  // 配置css代码单独打包，而不是打包到js代码里
  config.module.rules.push(
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
 )
  config.plugins.push(
     new MiniCssExtractPlugin('styles.[contentHash:8].css')
     // // 将类库代码与业务代码分开打开，使类库代码可以被浏览器缓存
     // new webpack.optimization.splitChunks({
     //   name: 'vendor'
     // }),
     // // 把webpack生成在app.js中相关代码打包在另一个文件
     // new webpack.optimization.splitChunks({
     //   name: 'runtime'
     // })
  )
}

module.exports = config

