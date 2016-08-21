const gulp    = require('gulp'),
    nodemon = require('gulp-nodemon'),
    fs = require('fs');

gulp.task('default', function() {
});

gulp.task('start', function () {
    nodemon({
        script: 'server.js',
        ext: 'js',
        env: { 'NODE_ENV': 'development' }
    });
});

gulp.task('console', function() {
    nodemon({
        script: 'console.js',
        ext: 'js',
        env: { 'NODE_ENV': 'development' }
    });
});

gulp.task('seed', function () {
    require("./fixtures/seed").call(this, {});
});