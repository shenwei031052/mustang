// gulp
var gulp = require('gulp');
var conf = require('./conf/gulp.conf');
var HubRegistry = require('gulp-hub');
var hub = new HubRegistry([conf.path.tasks('*.js')]);

// Tell gulp to use the tasks just loaded
gulp.registry(hub);


gulp.task('serve_dev', gulp.series('clean_build_dev', 'browserSync_dev', 'watch_dev'));

