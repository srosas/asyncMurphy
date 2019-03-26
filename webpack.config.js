// const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  output: {
    publicPath: '/',
  },
  module: {
    rules: [
<<<<<<< HEAD
      { test: /\.(png|jpg|gif|svg)$/, loader: 'file-loader', options: {} },
=======
      { test: /\.(gif|png|jpeg|svg)$/i, loader: 'file-loader', options: {} },
>>>>>>> 4b1e93890de8245ea0e086df260a5f479faa42ae
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
};
