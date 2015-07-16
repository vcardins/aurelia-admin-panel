var gulp = require('gulp');
var browserSync = require('browser-sync');
var historyApiFallback = require('connect-history-api-fallback')

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve', ['build'], function(done) {
  browserSync({
    open: false,
    port: 9000,
    server: {
      baseDir: ['.'],
      middleware: [historyApiFallback(), function (req, res, next) { // it's the first one in the array
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }]
    }
  }, done);
});
