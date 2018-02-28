var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var sassGlob = require('gulp-sass-glob');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var del = require('del');
const browserSync = require('browser-sync');


gulp.task('clean_dev', function (cb) {
  return del(['./dist/**/*']);
});

gulp.task('pack_css', function () {
    return gulp.src(['./app/**/*.css', '!./app/bower_components/**'])
      .pipe(concat('css.css'))
      .pipe(gulp.dest('./dist/css'));
  }
);

gulp.task('pack_js', function () {
    return gulp.src([
      //'./app/bower_components/angularjs-datepicker/dist/angular-datepicker.js',
      './app/app.js',
      './app/**/*.js',
      '!./app/bower_components/**'
    ])
      .pipe(concat('js.js'))
      .pipe(gulp.dest('./dist/js'));
  }
);

gulp.task('other', function () {
    return gulp.src([
      './app/**/*.html',
      '!./app/bower_components/**',
      './app/**/*.jpg',
      './app/**/*.png',
      './app/**/*.json',
      './app/*.ico'])
      .pipe(gulp.dest('./dist'));
  }
);

gulp.task('all_vendor', function () {
    return gulp.src(['./app/bower_components/**'])

      .pipe(gulp.dest('./dist/bower_components'));
  }
);

gulp.task('build_dev', gulp.parallel('pack_css', 'pack_js', 'other', 'all_vendor'));

gulp.task('clean_build_dev', gulp.series('clean_dev', 'build_dev'));

gulp.task('watch_dev', function () {
  gulp.watch(['./app/**/*.css'], gulp.parallel('pack_css'));
  gulp.watch(['./app/**/*.js'], gulp.parallel('pack_js'));
  gulp.watch(['./app/**/*.html', './app/**/*.jpg', './app/**/*.png'], gulp.parallel('other'));
  gulp.watch('./dist/index.html', gulp.parallel('reloadBrowserSync'))
});

gulp.task('reloadBrowserSync', reloadBrowserSync);

function reloadBrowserSync(cb) {
  browserSync.reload();
  cb();
}

