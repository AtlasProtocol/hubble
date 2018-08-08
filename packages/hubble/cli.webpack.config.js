var path = require("path");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');
var pkg = require("./package.json");
var rootDir = path.join(__dirname, "../..");
var outputDir = path.join(__dirname, "build");

module.exports = {
  entry: {
    cli: path.join(__dirname, "../..", "node_modules", "hubble-core", "cli.js"),
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  context: rootDir,
  output: {
    path: outputDir,
    filename: '[name].bundled.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.js$/, use: "shebang-loader" }
    ]
  },
  externals: [

    function(context, request, callback) {

      if (/^original-require$/.test(request)) {
        return callback(null, 'commonjs original-require');
      }

      if (/^jest-cli$/.test(request)) {
        return callback(null, 'commonjs jest-cli');
      }

      callback();
    },
  ],
  plugins: [
    new webpack.DefinePlugin({
      "BUNDLE_VERSION": JSON.stringify(pkg.version),
    }),

    // Put the shebang back on.
    new webpack.BannerPlugin({banner: '#!/usr/bin/env node\n', raw: true}),

    new CleanWebpackPlugin(["build"]),
  ],
  resolve: {
    alias: {
      "fsevents": path.join(__dirname, "./nil.js"),
      "ws": path.join(__dirname, "./nil.js"),
      "original-fs": path.join(__dirname, "./nil.js"),
      "scrypt": "js-scrypt",
      //"secp256k1": path.join(__dirname, "node_modules", "secp256k1", "elliptic.js")
      "secp256k1": "secp256k1"
    }
  },
  stats: {
    warnings: false
  }
}
