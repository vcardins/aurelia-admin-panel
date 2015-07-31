var path = require('path');

var appRoot = 'src/';
var outputRoot = 'dist/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.ts',
  typings: "typings/**/*.d.ts",
  html: appRoot + '**/*.html',  
  style: appRoot + '_layout/main.less',
  output: outputRoot,
  sourceMapRelativePath: '../' + appRoot,
  doc:'./doc',
  e2eSpecsSrc: 'test/e2e/src/*.js',
  e2eSpecsDist: 'test/e2e/dist/',
  bundleSrc: ['config.js', 'favicon.ico', 'index.html', 'dist/app-bundle.html', 'dist/app-bundle.js',
    'dist/main.css', 'jspm_packages/es6-module-loader.js', 'jspm_packages/system.js'],
  bundleOutput: './www/'
};
