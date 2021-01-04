const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack') // 热更新
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyZerPlugin  = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// HMR 热更新
// HappyPack 和 thread-loader  多线程进行打包
// const HappyPack = require('happypack')
// // 根据CPU的数量创建线程池
// const happyThreadPool = HappyPack.ThreadPool({size:0scillatorNode.cpus().length})
// 预编译
// 单纯换一个loader  fast-sass-loader

// tree-shaking // 无用代码消除
module.exports = {
  optimization: { //存放和压缩有关的东西
    minimize: true,
    minimizer: [new TerserPlugin({
      // 使用缓存，加快构建速度
      cache: true,
      parallel: true, // 开启多线程
      terserOptions: {
        compress: { // 压缩的
          unused: true, // 一些没有用的代码会被踢出掉
          drop_debugger: true, // 为了调试把debugger去掉
          drop_console: true, // 把console去掉
          dead_code: true
        }
      }
    })]
  },
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.jsx', '.json'] // 如果不想在引入文件加后缀，可以再这配置，webpack会进行找到匹配
  },
  entry: path.resolve(__dirname, 'src/index.jsx'), // 入口
  module: {
    noParse: /node_modules\/(jquery\.js)/,
    rules: [
      // {
      //   test:/\.js$/,
      //   include: path.resolve('src'),
      //   use: [
      //       'thread-loader'
      //   ]
      // },
      {
        test: /\.jsx?/, // js或者jsx文件
        exclude: /node_modules/, // 把node_modules庞然大物排除在外
        // include: ,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false, // 不要满世界找 .babelrc文件了
            presets: [
              require.resolve('@babel/preset-react'),
              [require.resolve('@babel/preset-env',{modules:false})] // 已有commonJS规范了，，不需要再去是别import from  这种es6语法，不需要进行二次编译打包了
            ],
            cacheDirectory: true // 是否要对编译的结果做缓存
          }
        }
      }
    ]
  },
  plugins: [
      new HtmlWebPackPlugin({ // 编译html文件
        template: path.resolve(__dirname, 'src/index.html'),
        filename: "index.html"
      }),
      new webpack.HotModuleReplacementPlugin(), // 热更新
      new BundleAnalyZerPlugin(),
      // new HappyPack({
      //   id: 'jsx',
      //   threads: happyThreadPool,
      //   // loader必须支持happypack才能在这配置 例如url-laoder src-loader
      //   loaders: ['babel-laoder']
      // })
  ],
  devServer: {
    hot: true // 热更新
  }
}