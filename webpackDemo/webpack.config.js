const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './app.js', // 工程资源的入口
  output: {
    path: path.join(__dirname, 'dist'), // 绝对路径
    filename: 'bundle.js'
  },
  devServer: {
    port: 3000,
    publicPath: '/dist'
  },
  // 文件加载器-loader，如果需要打包除js其他的东西，就需要配置loader
  // 添加压缩工程 需要plugin
  module: {
    rules: [
      {
        test:/\.css$/,
        use:[
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
      new UglifyJSPlugin() // 减少代码的体积
  ]
}