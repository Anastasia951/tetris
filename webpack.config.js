const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: './src/styles/styles.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(?:ico|png|jpg|jpeg|svg)$/i,
        type: 'asset/inline'
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader'
        ]
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
        ]
      }
    ],
  },
  devServer: {
    port: 8080,
    open: true,
    hot: true,
  }
}