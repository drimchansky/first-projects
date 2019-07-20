	var gulp = require('gulp'),
		rename         = require('gulp-rename'),
		concat         = require('gulp-concat'),
		autoprefixer   = require('gulp-autoprefixer'),
		cssnext = require("postcss-cssnext"),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		postcss = require("gulp-postcss"),
		sourcemaps = require('gulp-sourcemaps'),
		concatCss = require('gulp-concat-css'),
		uncss = require('gulp-uncss'),
		browserSync    = require('browser-sync');


gulp.task("css", function() {
  gulp.src("src/css/main.css")
  .pipe(sourcemaps.init())

  .pipe(concatCss("main.css"))
  
  .pipe(rename({suffix: '.min', prefix : ''}))
   .pipe(postcss([
  cssnext()
])) 
.pipe(cleanCSS())
 .pipe(uncss({
            html: ['public/index.html']
        }))
.pipe(sourcemaps.write())
.pipe(gulp.dest("public/css"))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('common-js', function() {
	return gulp.src([
		'src/js/common.js',
		])
	.pipe(concat('common.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('public/js'));
});

gulp.task('js', ['common-js'], function() {
	return gulp.src([
		'public/js/common.min.js',
		])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify()) 
	.pipe(gulp.dest('public/js'))
	.pipe(browserSync.reload({stream: true}));
});


gulp.task('watch', ['css','js', 'browser-sync'], function() {
	gulp.watch('src/css/*.css', ['css']);
	gulp.watch('src/css/**/*.css', ['css']);
	gulp.watch(['src/js/common.js'], ['js']);
	gulp.watch('public/*.html', browserSync.reload);
});


		gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./public/"
        }
    });
});






gulp.task('default', ['watch']);
