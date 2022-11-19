const gulp = require("gulp");
// const { src, series, dest } = require("gulp");
const htmlmin = require("gulp-htmlmin");
const cleanCSS = require("gulp-clean-css");
const babel = require("gulp-babel");
var uglify = require("gulp-uglify");

// Gulp Uglify JS
gulp.task("compress", function () {
    return gulp
        .src("dist/js/*.js")
        .pipe(
            uglify({
                mangle: {
                    toplevel: true,
                },
                compress: true,
                output: {
                    comments: false,
                },
            })
        )
        .pipe(gulp.dest("dist/js"));
});

// Gulp Babel
gulp.task("babel", () =>
    gulp
        .src("src/js/main.js")
        .pipe(
            babel({
                presets: ["@babel/env"],
            })
        )
        .pipe(gulp.dest("dist/js"))
);

// Gulp Minify CSS
gulp.task("minify-css", () => {
    return gulp
        .src("src/css/styles.css")
        .pipe(cleanCSS({ compatibility: "ie8" }))
        .pipe(gulp.dest("dist/css"));
});

// Gulp Minify HTML
gulp.task("minify", () => {
    return gulp
        .src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist"));
});

gulp.task("default", gulp.series("babel", "compress", "minify-css", "minify"));
