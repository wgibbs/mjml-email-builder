const { dest, series, src, watch } = require('gulp');
const gulp = require('gulp'),
mjml = require('gulp-mjml'),
mjmlEngine = require('mjml'),
browserSync = require('browser-sync');

const mjmlSrcPath = ['./source/index.mjml'];

function buildMjml() {
  gulp.src(mjmlSrcPath)
  .pipe(mjml(mjmlEngine, {minify: true}))
  .pipe(gulp.dest('./build/'))
  .pipe(browserSync.stream());
}

function serve() {
  browserSync.init({
    server: "./build/",
    port: 8000,
    open: true,
    notify: false
  });
  watch(mjmlSrcPath).on('change', series(buildMjml, browserSync.reload));
}

exports.default = function() {
  buildMjml();
  serve();
};