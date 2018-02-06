<<<<<<< HEAD
/* eslint-env node */
=======

>>>>>>> 908a8739adb37f2a70e6d753fff4684b9c44b6b3
require('dotenv').config({ path: '.env.prod' });
const HtmlPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: '[hash].bundle.js',
    path: `${__dirname}/docs`,
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(`${__dirname}/docs`), 
    new webpack.DefinePlugin({
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
      'process.env.AUTH_DOMAIN': JSON.stringify(process.env.AUTH_DOMAIN),
      'process.env.DATABASE_URL': JSON.stringify(process.env.DATABASE_URL),
      'process.env.PROJECT_ID': JSON.stringify(process.env.PROJECT_ID),
      'process.env.STORAGE_BUCKET': JSON.stringify(process.env.STORAGE_BUCKET),
      'process.env.MESSAGING_SENDER_ID': JSON.stringify(process.env.MESSAGING_SENDER_ID) 
    }),
    new ExtractTextPlugin('[hash].styles.css'),
    new HtmlPlugin({ template: './src/index.html' }),
    new UglifyJsPlugin({ sourceMap: true })
  ],
  module: {
    rules: [
      {
        test: /.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { 
                importLoaders: 1, 
                sourceMap: true,
                minimize: true 
              }
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: true }

            }
          ]
        })
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