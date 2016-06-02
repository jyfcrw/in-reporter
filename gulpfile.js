var gulp    = require('gulp'),
    nodemon = require('gulp-nodemon'),
    config  = require('./config');

gulp.task('default', function() {
});

gulp.task('start', function () {
  nodemon({
    script: 'server.js',
    ext: 'js',
    env: Object.assign({
        'NODE_ENV': 'development'
    }, config.app)
  });
});

gulp.task('seed', function () {
});