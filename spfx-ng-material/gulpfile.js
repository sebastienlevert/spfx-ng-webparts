'use strict';

const gulp = require('gulp');
const path = require('path');
const build = require('@microsoft/sp-build-web');
const merge = require('webpack-merge');
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {

    if(build.configureWebpack.buildConfig.production) {
      generatedConfiguration.plugins.forEach((plugin) => {
        if (plugin instanceof webpack.optimize.UglifyJsPlugin) {
          var index = generatedConfiguration.plugins.indexOf(plugin);
          generatedConfiguration.plugins.splice(index, 1);
        }
      });

      generatedConfiguration.plugins.push(new UglifyJSPlugin({
        uglifyOptions: {
          beautify: false,
          comments: false,
          compress: {
            sequences: true,
            dead_code: true,
            conditionals: true,
            booleans: true,
            unused: true,
            if_return: true,
            join_vars: true,
            drop_console: true
          }
        }
      }));

      generatedConfiguration.plugins.push(new BundleAnalyzerPlugin());
    }

    Object.assign(generatedConfiguration.resolve, {extensions: ['.ts', '.js']});
    generatedConfiguration.module.rules = [
      { test: /\.ts$/, loader: '@ngtools/webpack' },
      {
        test: /\.scss$/,
        use: ['raw-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        loader: ['raw-loader', 'css-loader']
      },
      { test: /\.html$/, loader: 'raw-loader' }
    ];

    generatedConfiguration.plugins.push(new AngularCompilerPlugin({
      tsConfigPath: path.resolve('./tsconfig.json'),
      entryModule: path.resolve('src/elements/elements') + '#NgElementDemos'
    }));

    return generatedConfiguration;
  }
});

build.typescript.enabled = false;
build.tslint.enabled = false;

build.initialize(gulp);
