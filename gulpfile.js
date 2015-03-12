var gulp=require('gulp');
var jshint=require('gulp-jshint');
var plumber=require('gulp-plumber');
var notify=require('gulp-notify');
var htmlhint=require("gulp-htmlhint");
var webserver=require('gulp-webserver');


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
});

gulp.task('hthint',function(){
  return gulp.src([config.path.src+'*.html',config.ignore.modules])
      .pipe(plumber({
            errorHandler: notify.onError("HTML lint error: <%= error.message %>")
          }))
      .pipe(htmlhint('htmllintrc.json'))
      .pipe(htmlhint.reporter())
      .pipe(htmlhint.failReporter())
});
gulp.task('jshint',function(){
  return gulp.src([config.path.src+'/*.js',config.ignore.modules])
      .pipe(plumber({
        errorHandler: notify.onError("JS lint error: <%= error.message %>")
      }))
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(jshint.reporter('fail'));
});
gulp.task('serve',function(){
  gulp.src(config.path.src)
      .pipe(webserver({
        livereload: true,
        directoryListing: false,
        open: true
      }));
});