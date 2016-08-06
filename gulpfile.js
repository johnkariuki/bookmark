var gulp = require('gulp'),
  jade = require('gulp-jade');

var paths = {
  jade: 'app/**/*.jade'
};

gulp.task('jade', function () {
  gulp.src(paths.jade)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./public'));
});

gulp.task('default', ['jade']);
