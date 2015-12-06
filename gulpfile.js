var gulp = require('gulp');
var browserify = require('browserify');
var del = require('del');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

var paths = {
    app_entry: ['./src/js/app.js'],
    sass: ['./src/css/*.scss']
};

gulp.task('clean', function (callback) {
    del.sync(['build'], {force: true});
    callback();
});

gulp.task('sass', function () {
    gulp.src(paths.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/css/'));
});

gulp.task('js', function () {
    browserify(paths.app_entry)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('build/js/'));
});

gulp.task('default', ['clean'], function () {
    gulp.start('sass', 'js');
});