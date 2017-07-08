# gulp打包amd规范代码

## package.json

{
  "name": "gulp",
  "version": "1.0.0",
  "description": "study",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "https:git/username/"
  },
  "keywords": [
    "gulp",
    "css",
    "sprite",
    "md5-js",
    "js"
  ],
  "author": "wzh",
  "license": "ISC",
  "dependencies": {
  },
  "devDependencies": {
    "gulp": "^3.8.10",
    "gulp-less": "^3.0.3",
    "gulp-css-base64": "^1.3.2",
    "gulp-css-spriter": "^0.3.3",
    "gulp-clean": "^0.3.1",
    "gulp-concat": "^2.6.1",
    "gulp-jshint": "^2.0.4",
    "gulp-minify-css": "^1.2.4",
    "gulp-rename": "^1.2.2",
    "gulp-uglify": "^1.5.1",
    "gulp-md5-plus": "^0.1.8",
    "jshint": "^2.9.4",
    "gulp-imagemin": "^2.0.0",  
    "imagemin-pngcrush": "^4.0.0",
    "gulp-requirejs-optimize": "^1.2.0"  
  }
}


## gulpfile.js

/**
 * gulp-requirejs-optimize的使用: https://github.com/jlouns/gulp-requirejs-optimize
 */


//引入gulp
var gulp = require('gulp');


//引入组件
var concat = require('gulp-concat');           //合并
var jshint = require('gulp-jshint');           //js规范验证
var uglify = require('gulp-uglify');           //压缩
var rename = require('gulp-rename');          //文件名命名
var md5 = require('gulp-md5-plus');
var requirejsOptimize = require('gulp-requirejs-optimize');   //require优化




//脚本检查
gulp.task('lint', function () {
    gulp.src('./src/js/mod/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


//require合并
gulp.task('rjs', function () {
    gulp.src('./src/js/mod/*.js')
        .pipe(requirejsOptimize({ //require config
            mainConfigFile: 'src/js/config.js',
            exclude: [
                'jquery',
                'underscore'
            ]
        }))
        //.pipe(concat("index.js"))           //合并
        //.pipe(gulp.dest("dist/js"))          //输出保存
        .pipe(rename("main.js"))          //重命名
        .pipe(uglify())                        //压缩
        .pipe(gulp.dest("dist/js/mod/"));         //输出保存
});

//将js加上10位md5
gulp.task('md5:js', function (done) {
    gulp.src('dist/js/mode/*.js')
        .pipe(gulp.dest('dist/js/mode/'))
        .on('end', done);
});

gulp.task('default', function () {
    gulp.run('lint', 'rjs');
});
