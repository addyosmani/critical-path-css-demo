const gulp = require("gulp");
const { series, parallel } = require("gulp");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const critical = require("critical");

function js() {
  return gulp.src("./src/**/*.js").pipe(terser()).pipe(gulp.dest("./dist/"));
}

function images() {
  return gulp
    .src("./src/**/*.{png,jpg,gif,svg}")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(gulp.dest("./dist/"));
}

function styles() {
  return gulp.src("./src/**/*.css").pipe(gulp.dest("./dist"));
}

function html() {
  return gulp.src("./src/*.html").pipe(gulp.dest("./dist/"));
}

function criticalCSS(cb) {
  critical.generate({
    inline: true,
    base: "./dist/",
    src: "../src/index.html",
    // Output results to file
    target: {
      css: "critical.css",
      html: "index.html",
      uncritical: "uncritical.css",
    },
    minify: true,
    width: 320,
    height: 480,
  });
  cb();
}

exports.default = parallel(js, images, styles, html);
exports.critical = series(parallel(js, images, styles, html), criticalCSS);
