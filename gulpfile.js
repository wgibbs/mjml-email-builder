const { dest, series, src, watch } = require('gulp');
const gulp = require('gulp'),
htmlmin = require('gulp-htmlmin'),
mjml = require('gulp-mjml'),
mjmlEngine = require('mjml'),
browserSync = require('browser-sync');

const mjmlIndex = ['./source/index.mjml'];
const mjmlSrcPath = ['./source/**/*.mjml', '!'];
const buildDest = ['./build/'];

function build() {
  gulp.src(mjmlIndex)
    .pipe(mjml(mjmlEngine))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(buildDest))
    .pipe(browserSync.stream());
}

function serve() {
  browserSync.init({
    server: buildDest,
    port: 8000,
    open: true,
    notify: false
  });
  watch(mjmlSrcPath).on('change', series(build, browserSync.reload));
}

exports.default = function() {
  build();
  serve();
}