const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ClearWebpckplugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new ClearWebpckplugin(['dist']),
    new HtmlWebpackPlugin({
      title: '配置'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
