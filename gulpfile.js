var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

gulp.task('hello'), function() {
	console.log('hello there');
};

gulp.task('sass', function() {
	return gulp.src('src/scss/**/*.scss')
		.pipe(sass()) // converts sass to css with gulp-sass
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

// gulp.task('watch', ['browserSync', 'sass'], function() {
// 	gulp.watch('src/scss/**/*.scss', ['sass']);
// 	gulp.watch('src/*.html', browserSync.reload);
// 	gulp.watch('src/js/**/*.js', browserSync.reload);

// });
gulp.task('watch', ['browserSync'], function() {
	gulp.watch('css/**/*.css', browserSync.reload);
	gulp.watch('**/*.html', browserSync.reload);
	gulp.watch('js/**/*.js', browserSync.reload);

});


gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'src'
		},
		port: 8792,
		browser: "google chrome"
	})
});

gulp.task('useref', function() {
	return gulp.src('src/*.html')
		.pipe(useref())
		// minifies only if it's a javascript file
		.pipe(gulpIf('*.js', uglify()))
		// minifies only if it's a css file
		.pipe(gulpIf('*.css', cssnano()))
		//.pipe('src/img/*')
		.pipe(gulp.dest('build'))
});

gulp.task('clean:build', function() {
	return del.sync('build');
});

gulp.task('build', function(callback) {
	runSequence('clean:build', ['sass', 'useref', 'images', 'userefportfolio', 'copyportfolio', 'copyportfolio2'], callback);
});

gulp.task('default', function(callback) {
	runSequence(['sass', 'browserSync', 'watch'], callback);
})

gulp.task('startbuild', function(callback) {
	runSequence(['build', 'browserSyncBuild'], callback);
})

gulp.task('browserSyncBuild', function() {
	browserSync.init({
		server: {
			baseDir: 'build'
		},
		port: 8792,
		browser: "google chrome"
	})
});

gulp.task('images', function(){
	return gulp.src('src/img/**/*.+(png|jpg|gif|svg)')
	.pipe(cache(imagemin({
      interlaced: true
    })))
	.pipe(gulp.dest('build/img'))
});

gulp.task('userefportfolio', function() {
	return gulp.src('src/portfolio/*.html')
		.pipe(useref())
		// minifies only if it's a javascript file
		.pipe(gulpIf('*.js', uglify()))
		// minifies only if it's a css file
		.pipe(gulpIf('*.css', cssnano()))
		//.pipe('src/img/*')
		.pipe(gulp.dest('build/portfolio'))
});

gulp.task('copyportfolio', function() {
   gulp.src('src/portfolio/*/*.*')
   .pipe(gulp.dest('build/portfolio'));
});

gulp.task('copyportfolio2', function() {
   gulp.src('src/portfolio/*.js')
   .pipe(gulp.dest('build/portfolio'));
});