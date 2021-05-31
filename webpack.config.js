'use strict';

const webpack = require('webpack');

module.exports = {
  entry: "./resources/assets/js/main",

  resolve: {
    modulesDirectories: ["."]
  },

  output: {
    path: "./public/js",
		publicPath: "public/js/",
    filename: "bundle.js"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel"
      }
    ]
  },

  //watch: true
};
