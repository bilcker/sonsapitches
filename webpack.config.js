const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const devMode = process.env.NODE_ENV !== 'production'

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
          { loader: 'css-loader', options: { sourceMap: devMode ? true : false, importLoaders: 1 }},
          { loader: 'postcss-loader', options: { sourceMap: devMode ? true : false }},
          { loader: 'sass-loader', options: { sourceMap: devMode ? true : false }},
        ]
      },
      {
        test: /\.(gif|png|jp(e*)g|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[ext]'
        }
      },
      {
        test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[ext]',
        }
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    }
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@data': path.resolve(__dirname, 'src/data'),
      '@fonts': path.resolve(__dirname, 'src/fonts'),
      '@images': path.resolve(__dirname, 'src/images'),
      '@scss': path.resolve(__dirname, 'src/scss'),
      '@parts': path.resolve(__dirname, 'src/components/partials')
    },
    extensions: ['*', '.js', '.vue', '.json', '.scss']
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebPackPlugin({
      title: 'Sons a Pitches',
      inject: true,
      hash: true,
      template: './src/index.html',
      filename: 'index.html',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        chartset: 'utf-8'
      }
    })
  ]
}