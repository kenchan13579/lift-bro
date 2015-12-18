var gulp = require("gulp"),
    sass = require("gulp-sass");

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
