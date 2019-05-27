const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCss = require('mini-css-extract-plugin');
const { browsers, polyfills } = require('./target');

const htmlMinify = {
  removeComments: true,
  preserveLineBreaks: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true
};

const { TARGET } = process.env;

module.exports = {
  mode: 'production',
  entry: {
    app: [...polyfills, path.resolve('src', 'index.jsx')]
  },
  output: {
    filename: TARGET + '_js/[name].[chunkhash].js',
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
  devtool: false,
  stats: {
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
    children: false,
    entrypoints: false
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader?cacheDirectory',
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        use: [
          MiniCss.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              modules: true,
              localIdentName: '[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer({ browsers })]
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
    runtimeChunk: 'single',
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
      filename: TARGET + '_index.html',
      template: path.resolve('src', 'index.html'),
      minify: { ...htmlMinify }
    }),
    new MiniCss({ filename: TARGET + '_css/[name].[contenthash].css' }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/,
      cssProcessorOptions: {
        zindex: false,
        discardComments: { removeAll: true }
      }
    })
  ]
};
