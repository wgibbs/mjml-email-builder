const { dest, series, src, watch } = require('gulp');
const gulp = require('gulp'),
mjml = require('gulp-mjml'),
mjmlEngine = require('mjml'),
browserSync = require('browser-sync');

const mjmlSrcPath = ['./source/index.mjml'];
const buildDest = ['./build/'];

function buildMjml() {
  gulp.src(mjmlSrcPath)
  .pipe(mjml(mjmlEngine, {minify: true}))
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
  watch(mjmlSrcPath).on('change', series(buildMjml, browserSync.reload));
}

exports.default = function() {
  buildMjml();
  serve();
};