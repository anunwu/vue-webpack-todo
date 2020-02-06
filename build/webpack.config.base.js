const path = require('path')
// 新版webpack的vue-loader已经帮我们做了createVueLoaderOptions的事情
const VueLoader = require('vue-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const createVueLoaderOptions = require('./vue-loader.config.js')

// const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  mode:  process.env.NODE_ENV || 'production',
  entry: path.join(__dirname, '../client/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      // {
      //   test: /\.(vue|js|jsx)$/,
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/,
      //   // 预处理pre或者后处理post
      //   enforce: 'pre'
      // },
      {
        test: /.vue$/,
        loader: 'vue-loader'
        // options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resources/[path][name]-[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    // 加载.vue文件这个插件是必须的！
    // 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。
    // 例如，如果你有一条匹配 /\.css$/ 的规则，那么它会应用到 .vue 文件里的 <style> 块;
    // 如果有一条匹配到/\.js$/规则，那么它会应用到.vue文件的<script>块
    new VueLoader.VueLoaderPlugin(),
     new CleanWebpackPlugin()
  ]
}

module.exports = config

