var gulp = require("gulp"),
    sass = require("gulp-sass"),
    browserify = require("gulp-browserify"),
    reactify = require("reactify"),
    concat = require('gulp-concat'),
    notify = require("gulp-notify");

var path = {
  "sass" : ["public/css/*.sass"]
};
function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}
gulp.task("sass" , function (){
  gulp.src(path.sass)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("public/css/"));
});

gulp.task("sass-watch" , function (){
  gulp.watch(path.sass , ["sass"]);
});

gulp.task("brsf-app",function(){
  gulp.src("src/js/app/*.js")
    .pipe(browserify({
      transform:[reactify],
		  debug : !gulp.env.production
    })).on("error",handleErrors)
    //.pipe(concat("app.js"))
    .pipe(gulp.dest("public/js/"));
});

gulp.task("brsf-app-watch", function(){
  gulp.watch("src/js/app/*",["brsf-app"]);
});

gulp.task("default",['brsf-app-watch',"sass-watch"]);
