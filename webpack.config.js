const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const env = require('node-env-file');

// env(__dirname + '/.env');

const extractPlugin = new ExtractTextPlugin({
  filename: 'main.css'
});

const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');

const config = {
  entry: SRC_DIR + '/app/index.jsx',
  output: {
    path: DIST_DIR + '/app',
    filename: 'bundle.js',
    publicPath: '/app/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: extractPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    extractPlugin,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        NEWS_API_KEY: JSON.stringify(process.env.NEWS_API_KEY),
        MERCURY_API_KEY: JSON.stringify(process.env.MERCURY_API_KEY),
        CLIENT_ID: JSON.stringify(process.env.CLIENT_ID),
      }
    }),
  ]
};

module.exports = config;
