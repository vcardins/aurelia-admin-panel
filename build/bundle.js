var gulp = require('gulp');
var exec = require('child_process').exec;
var runSequence = require('run-sequence');
var vinylPaths = require('vinyl-paths');
var paths = require('../paths');
var del = require('del');

gulp.task('copy-aurelia-build-files', function () {
    return gulp.src([paths.top + 'aureliafile.js', paths.top + 'package.json'])
        .pipe(gulp.dest(paths.tmp));
});

gulp.task('copy-files', ['copy-aurelia-build-files'], function () {
    return gulp.src(paths.output + '**/*')
        .pipe(gulp.dest(paths.tmp + 'app/'));
});

gulp.task('build-bundle', function (callback) {
    exec('aurelia bundle', {cwd: 'tmp'}, function (err) {
        callback(err);
    });
});

gulp.task('copy-deploy-jspm', function () {
    return gulp.src([
        paths.tmp + 'app/jspm_packages/**/*'
    ]).pipe(gulp.dest(paths.deploy + 'jspm_packages'));
});

gulp.task('copy-deploy-styles', function () {
    return gulp.src([
        paths.tmp + 'app/styles/**/*'
    ]).pipe(gulp.dest(paths.deploy + 'styles'));
});

gulp.task('build-deploy', ['copy-deploy-styles', 'copy-deploy-jspm'], function () {
    return gulp.src([
        paths.tmp + 'app/index.html',
        paths.tmp + 'app/config.js',
        paths.tmp + 'app/app-bundle.*'
    ]).pipe(gulp.dest(paths.deploy));

});

gulp.task('clean-deploy', function() {
    return gulp.src([paths.deploy, paths.tmp])
        .pipe(vinylPaths(del));
});

gulp.task('clean-tmp', function() {
    return gulp.src([paths.tmp])
        .pipe(vinylPaths(del));
});

gulp.task('bundle', function (callback) {
    return runSequence(
        'clean-deploy',
        'build',
        'copy-files',
        'build-bundle',
        'build-deploy',
        'clean-tmp',
        callback
    );
});