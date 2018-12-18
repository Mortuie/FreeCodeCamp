const HTMLPLUGIN = require('html-webpack-plugin');

module.exports = {
  devServer: {
    port: 3001,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new HTMLPLUGIN({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
};
