var gulp=require('gulp');
var plumber=require('gulp-plumber');
var notify=require('gulp-notify');
var cache=require('gulp-cached');

var jshint=require('gulp-jshint');
var htmlhint=require("gulp-htmlhint");
var webserver=require('gulp-webserver');
var sass=require('gulp-sass');
var csscomb=require('gulp-csscomb');
var csslint=require('gulp-csslint');

var config={
  path:{
    src:'src/',
    build:'build/'
  },
  ignore:{
    modules:'!./node_modules/**'
  }
}



var main='taskrepo.js';

gulp.task('live',['serve','watch']);

gulp.task('watch',function(){
  gulp.watch(config.path.src+'*.js',['jshint']);
  gulp.watch(config.path.src+'*.html',['hthint']);
  gulp.watch(config.path.src+'*.scss',['sass']);
});

gulp.task('hthint',function(){
  return gulp.src([config.path.src+'*.html',config.ignore.modules])
      .pipe(cache('hthint'))
      .pipe(plumber({
            errorHandler: notify.onError("HTML lint error: <%= error.message %>")
          }))
      .pipe(htmlhint('htmllintrc.json'))
      .pipe(htmlhint.reporter())
      // .pipe(htmlhint.failReporter())
});
gulp.task('jshint',function(){
  return gulp.src([config.path.src+'*.js',config.ignore.modules])
      .pipe(cache('jshint'))
      .pipe(plumber({
        errorHandler: notify.onError("JS lint error: <%= error.message %>")
      }))
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(jshint.reporter('fail'));
});
gulp.task('sass',function(){
  return gulp.src(config.path.src+'*.scss')
      .pipe(cache('sass'))
      .pipe(plumber({
            errorHandler: notify.onError("CSS error: <%= error.message %>")
          }))
      .pipe(sass())
      .pipe(csscomb())
      .pipe(csslint('csslintrc.json'))
      .pipe(csslint.reporter())
      .pipe(gulp.dest(config.path.src));
});
gulp.task('serve',function(){
  gulp.src(config.path.src)
      .pipe(webserver({
        livereload: true,
        directoryListing: false,
        open: true
      }));
});