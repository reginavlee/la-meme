// You shouldn't have to touch this webpack file. 
const webpack = require('webpack');
const path = require('path');
const DashboardPlugin = require('webpack-dashboard/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Removes Deprecation Warning
process.noDeprecation = true;


// Build directory is where the bundle file will be placed
const BUILD_DIR = path.resolve(__dirname, 'client/dist');
// App directory is where all of your raw JSX files will be placed
const SRC_DIR = path.resolve(__dirname, `client/src`);
//Public directory is where all of are html/css files will be placed
const PUBLIC_DIR = path.resolve(__dirname, 'client/public');

const config = {
  entry: path.resolve(SRC_DIR, 'index.jsx'),
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR
  },
  module: {
    rules: [
      {
        loader: 'react-hot-loader',
        test: SRC_DIR
      },
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: SRC_DIR,
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-runtime', 'transform-decorators-legacy', 'transform-class-properties'],
        },
      },
    ],
    loaders: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-runtime', 'transform-decorators-legacy', 'transform-class-properties'],
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader'
      }
    ]
  },
  resolve: {
<<<<<<< HEAD
    extensions: ['*', '.js', '.jsx'],
=======
    extensions: ['*', '.js', '.jsx'],
>>>>>>> socketio countdown working (backend)
  },
  plugins: [
    new CopyWebpackPlugin([{ from: PUBLIC_DIR }]),
    new DashboardPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
  ],
  watch: true,
  stats: { colors: true },
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: false
  }
};

module.exports = config;