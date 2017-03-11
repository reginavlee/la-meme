// You shouldn't have to touch this webpack file. 
const webpack = require('webpack');
const path = require('path');

// Removes Deprecation Warning
process.noDeprecation = true;

// Build directory is where the bundle file will be placed
const BUILD_DIR = path.resolve(__dirname, 'client/dist');
// App directory is where all of your raw JSX files will be placed
const APP_DIR = path.resolve(__dirname, `client/src`);

const config = {
  entry: `${APP_DIR}/index.jsx`,
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader'
      }
    ]
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};

module.exports = config;