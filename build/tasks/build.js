var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var paths = require('../paths');
var ts = require('gulp-typescript');
var tsLib = require("typescript");

// compiles the typescript files to js
gulp.task('build-ts', function () {
  var tsResult = gulp.src(paths.source)
    .pipe(plumber())
    .pipe(ts({
      module: "system",
      removeComments: true,
      target: "es5",
      declarationFiles: false,
      noImplicitAny: true,
      typescript: tsLib // use 1.5 beta
    }));

  return tsResult.js.pipe(gulp.dest(paths.output));
});

// copies changed html files to the output directory
gulp.task('build-html', function () {
  return gulp.src(paths.html)
    .pipe(changed(paths.output, {extension: '.html'}))
    .pipe(gulp.dest(paths.output));
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-ts', 'build-html'],
    callback
  );
});
