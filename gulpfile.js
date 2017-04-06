var gulp = require('gulp');
var plumber = require('gulp-plumber');

// connect
var connect = require('gulp-connect-multi')(); 
gulp.task('connect', connect.server({
    host: '127.0.0.1',
    root: ['../prod'],
    port: 9090,
    livereload: true,
    
}));

//styles
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');

gulp.task('styles', function(){
		gulp.src('./bislite-master/scss/styles.scss')
			.pipe(plumber())
            .pipe(sass({
				outputSlyle: 'compressed'
			}))
			.pipe(prefix('last 2 version'))
			.pipe(gulp.dest('../prod/css'))
            .pipe(connect.reload());
});

//templates
var htmlmin = require('gulp-htmlmin');
var prefix = require('gulp-autoprefixer');
gulp.task('templates', function(){
		gulp.src('./bislite-master/index.html')
			.pipe(htmlmin({
				collapseWhitespace: true
			}))
			.pipe(gulp.dest('../prod/'));

});

//imagemin
var imagemin = require('gulp-imagemin');
 
gulp.task('images', function() {
    gulp.src('./bislite-master/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('../prod/images'))
        .pipe(connect.reload());
});

// watcher
gulp.task('watcher', function() {
    gulp.watch('./bislite-master/*.html', {cwd:'bislite-master/'}, ['templates']);
    gulp.watch('./bislite-master/scss/*.scss', {cwd:'bislite-master/'}, ['styles']);
    gulp.watch('./bislite-master/images/**/*.{png,jpg,jpeg,gif,svg}', {cwd:'bislite-master/'}, ['images']);
});


gulp.task('default', ['styles', 'images', 'templates']);
gulp.task('site', ['default', 'connect', 'watcher']);