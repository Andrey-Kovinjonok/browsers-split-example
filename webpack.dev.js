const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const { browsers, polyfills } = require('./target');

const stats = {
  assets: true,
  colors: true,
  errors: true,
  errorDetails: true,
  modules: false,
  performance: true,
  hash: false,
  version: false,
  timings: true,
  warnings: true,
  children: false
};

module.exports = {
  mode: 'development',
  entry: {
    app: [...polyfills, path.resolve('src', 'index.jsx')]
  },
  output: {
    filename: process.env.TARGET + '_js/[name].bundle.js',
    path: path.resolve('dist'),
    publicPath: '/'
  },
  resolve: {
    alias: {
      router: path.resolve('src', 'router.js')
    },
    modules: ['node_modules'],
    extensions: ['.jsx', '.js', '.styl']
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve('dist'),
    historyApiFallback: true,
    stats,
    port: 5000,
    hot: true,
    watchOptions: {
      poll: true
    }
  },
  stats,
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader?cacheDirectory',
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              modules: true,
              localIdentName: '[local]-[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer({ remove: false, browsers })]
            }
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: false
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve('src', 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
