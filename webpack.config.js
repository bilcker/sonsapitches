const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: {
    main: './src/js/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'vue-style-loader',
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(gif|png|jp(e*)g|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1000000, //Convert images < 1mb to base 64 strings
            name: 'images/[name].[ext]'
          }
        }]
      },
      {
        test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
            publicPath: '../'
          }
        }]
      }
    ]
  },
  devServer: {
    contentBase: "./dist"
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@data': path.resolve(__dirname, 'src/data')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  plugins: [
    new HtmlWebPackPlugin({
      vue: true,
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
      chunkFilename: 'css/style.css'
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([{
      from: './src/images',
      to: 'images'
    }])
  ]
}