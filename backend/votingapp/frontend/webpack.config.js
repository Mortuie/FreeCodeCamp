const HTMLPLUGIN = require('html-webpack-plugin');
const MINICSS = require('mini-css-extract-plugin');

module.exports = {
  devServer: {
    public: '0.0.0.0:3001',
    port: 3001
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
      },
      {
        test: /\.css$/,
        use: [MINICSS.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new HTMLPLUGIN({
      template: './src/index.html',
      filename: './index.html'
    }),
    new MINICSS({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
};
