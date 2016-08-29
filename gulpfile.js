var gulp = require('gulp'),
  jade = require('gulp-jade'),
  less = require('gulp-less'),
  wiredep = require('wiredep').stream,
  gulpinject = require('gulp-inject')
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  bower = require('gulp-bower'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  cssmin = require('gulp-cssmin'),
  path = require('path');

//Paths to watch for changes using the watch task.
var paths = {
  jade: 'app/**/*.jade',
  index: 'public/index.html',
  images: ['app/images/**/*'],
  scripts: {
    js: './public/js/index.js',
    css: './public/css/*.css'
  },
  compileScripts: {
    js: ['app/app.js', 'app/js/**/*.js'],
    css: 'app/styles/*.+(less|css)'
  }
};

//Compile Jade files to html and save them into the public directory.
gulp.task('jade:compile', function () {
  gulp.src(paths.jade)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./public'));
});

//Concatinate js into index.js, minify and save in public/js.
gulp.task('js:minify', function () {
  gulp.src(paths.compileScripts.js)
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/'));
});

//Concatinate custom css into styles.css, minify and save in public/css.
gulp.task('css:minify', function () {
  gulp.src(paths.compileScripts.css)
    .pipe(less({
      paths: [path.join(__dirname, 'styles')]
    }))
    .pipe(concat('styles.css'))
    .pipe(cssmin())
    .pipe(plumber())
    .pipe(gulp.dest('./public/css'));
});

//Copy the images folder from app to public recursively
gulp.task('copy:images', function () {
  gulp.src(paths.images)
    .pipe(gulp.dest('./public/images'));
});

//Run bower install.
gulp.task('bower:run', function () {
  bower();
});

//Inject bower scripts and custom scripts into /public/index.html.
gulp.task('scripts:inject', ['jade:compile'], function () {
  gulp.src(paths.index)
    .pipe(wiredep())
    .pipe(gulpinject(gulp.src(paths.scripts.js), { relative: true }))
    .pipe(gulpinject(gulp.src(paths.scripts.css), { relative: true }))
    .pipe(gulp.dest('./public/'));
});

//Rn nodemon.
gulp.task('nodemon:run', function () {
  nodemon({
    script: 'index.js',
    ext: 'js html',
    ignore: ['public/**', 'app/**', 'node_modules/**']
  });
});

//Watch for changes in files.
gulp.task('watch', function () {
  gulp.watch(paths.jade, ['jade:compile']);
  gulp.watch(paths.compileScripts.js, ['js:minify']);
  gulp.watch(paths.compileScripts.css, ['css:minify']);
  gulp.watch(paths.index, ['scripts:inject']);
  gulp.watch(paths.images, ['copy:images'])
});

//Default task.
gulp.task('default', ['nodemon:run', 'bower:run', 'jade:compile', 'js:minify', 'css:minify', 'scripts:inject', 'watch', 'copy:images']);
