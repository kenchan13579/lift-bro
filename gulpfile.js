var gulp = require("gulp"),
    sass = require("gulp-sass"),
    browserify = require("gulp-browserify"),
    reactify = require("reactify"),
    concat = require('gulp-concat');

var path = {
  "sass" : ["public/css/*.sass"]
};
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
    }))
    .pipe(concat("app.js"))
    .pipe(gulp.dest("public/js/"));
});

gulp.task("auto", function(){
  gulp.watch("src/js/app/*",["brsf-app"]);
});
