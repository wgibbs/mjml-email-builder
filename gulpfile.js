const gulp = require('gulp'),
mjml = require('gulp-mjml'),
prettyHtml = require('gulp-pretty-html'),
mjmlEngine = require('mjml'),
browserSync = require('browser-sync');


gulp.task('mjml', (done) => {
  gulp.src('./source/index.mjml')
  .pipe(mjml(mjmlEngine, {minify: true}))
  .pipe(gulp.dest('./build/'))
  done();
});

gulp.task("build", gulp.series(['mjml']));

gulp.task('serve', () => {
  browserSync.init({
    server: "./build/",
    port: 8000,
    open: true,
    notify: false
  });
  gulp.watch('./source/**/*.mjml').on('change', browserSync.reload);
  gulp.watch('./source/**/*.mjml', gulp.series(['build']));
});

gulp.task('default', gulp.series('build', 'serve'));