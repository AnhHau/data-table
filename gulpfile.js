// Include gulp
var gulp = require('gulp');
// Ext-Gulp
var concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  browserSync = require('browser-sync').create();

// options
var pathApp = './app/',
  pathAssets = './app/assets/',
  pathCSS = './app/assets/style/',
  pathJS = './app/assets/script/';

// Browser Sync
browserSync.init({
  open: true,
  server: {
    baseDir: pathApp
  }
  // proxy: {
  //   target: "http://shopv1.com"
  // }
});

// Compile Our Sass at Client Interface
gulp.task('sass', function () {
  console.log('sass compiling');
  return gulp.src(pathCSS + '**/*.scss')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(concat('style.css'))
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest(pathAssets + 'css/'));
});

// Concat-min js at Client Interface
gulp.task('js', function () {
  console.log('js compiling');
  return gulp.src(pathJS + '**/*.js')
    .pipe(concat('all.js'))
    // .pipe(uglify())
    .pipe(gulp.dest(pathAssets + 'js/'));
});

// Watch Files For Changes
gulp.task('watch', function () {
  gulp.watch(pathCSS + '**/*.scss', ['sass']);
  gulp.watch(pathJS + '**/*.js', ['js']);
  gulp.watch(pathApp + '**/*', browserSync.reload);
});

// Default Task
gulp.task('default', ['sass', 'js', 'watch']);