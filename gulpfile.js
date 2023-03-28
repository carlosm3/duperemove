const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const cleanCSS = require("gulp-clean-css");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

const srcFolder = "src/";
const distFolder = "dist/";

// Gulp Uglify JS
const compress = () =>
    gulp
        .src(distFolder + "js/*.js")
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
        .pipe(gulp.dest(distFolder + "js"));

// Gulp Babel
const babelTask = () =>
    gulp
        .src(srcFolder + "js/main.js")
        .pipe(babel({ presets: ["@babel/env"] }))
        .pipe(gulp.dest(distFolder + "js"));

// Gulp Minify CSS
const minifyCSS = () =>
    gulp
        .src(srcFolder + "css/styles.css")
        .pipe(cleanCSS({ compatibility: "ie8" }))
        .pipe(gulp.dest(distFolder + "css"));

// Gulp Minify HTML
const minifyHTML = () =>
    gulp
        .src(srcFolder + "*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(distFolder));

gulp.task(
    "default",
    gulp.series(babelTask, compress, minifyCSS, minifyHTML)
);
