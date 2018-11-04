const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/indexCaching.js',
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'caching'
    }),
    new webpack.HashedModuleIdsPlugin()
  ],
  output: {
    //   文件名设置hash
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },

  optimization: {
    // 提取公用模板
    runtimeChunk: {
      name: 'mainfest'
    },
    splitChunks: {
      // 提取第三方lib, 比如：react,lodash
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};
