var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    folders = require('gulp-folders'),
    path = require('path'),
    pathToFolder = 'app/modules';

//init

gulp.task('main-init', function () {
    gulp.src([
        'app/*.js',
        'app/*/*.js'
    ])
        .pipe(plumber())
        .pipe(concat('app.js'))
        .pipe(plumber.stop())
        .pipe(gulp.dest('dist/'));

    gulp.src([
        'app/*.html',
        'app/*/*.html'
    ]).pipe(gulp.dest('dist/templates/'));

});

gulp.task('style-init', function () {
    gulp.src([
        'style/*.css'
    ]).pipe(gulp.dest('dist/style'));
});

gulp.task('init', ['main-init', 'style-init']);

///serve, watch

gulp.task('serve', ['watch'], function() {
    gulp.src('.')
        .pipe(webserver({
          port: 6639,
            fallback: "index.html"
        }));
});

gulp.task('watch', ['init'], function () {
    browserSync.init({
        server: "."
    });

    gulp.watch(['app/*', 'app/**/*', "style/*"], ['init']);
    gulp.watch(['app/*', 'app/**/*', "style/*", "index.html"]).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
