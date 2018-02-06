/* eslint-env node */
require('dotenv').config();
const HtmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/build`,
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
      'process.env.AUTH_DOMAIN': JSON.stringify(process.env.AUTH_DOMAIN),
      'process.env.DATABASE_URL': JSON.stringify(process.env.DATABASE_URL),
      'process.env.PROJECT_ID': JSON.stringify(process.env.PROJECT_ID),
      'process.env.STORAGE_BUCKET': JSON.stringify(process.env.STORAGE_BUCKET),
      'process.env.MESSAGING_SENDER_ID': JSON.stringify(process.env.MESSAGING_SENDER_ID) 
    }),
    new HtmlPlugin({ template: './src/index.html' })
  ],
  module: {
    rules: [
      {
        test: /.html$/,
        use: {
          loader: 'html-loader',
          options: {
            interpolate: true,
            // attrs: false
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'css-loader',
            options: { 
              importLoaders: 1, 
              sourceMap: true 
            }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true }

          }
        ]
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 5000,
          },
        },
      }
    ]
  }
};