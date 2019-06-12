const { src, dest, task, series, watch, parallel } = require("gulp"); //подключение методов
const rm = require("gulp-rm"); //for clean dist
const sass = require('gulp-sass'); //for SASS
const concat = require('gulp-concat'); //склейка файлов
const browserSync = require('browser-sync').create(); //создаем сервер browser sync
const reload = browserSync.reload; //автоматическая перезагрузка сервера
const sassGlob = require('gulp-sass-glob'); //автоматическое добавление sass файлов
const autoprefixer = require('gulp-autoprefixer'); //автопрефиксер
//const px2rem = require('gulp-smile-px2rem'); //пиксели в рем
const cleanCSS = require('gulp-clean-css'); //сжатие css
const sourcemaps = require('gulp-sourcemaps'); //запись sourcemaps
const babel = require('gulp-babel'); //переписывает код под любые заданные версии браузеров
const uglify = require('gulp-uglify'); //минифицирует код JS
const gulpif = require('gulp-if'); //подключаем условие для prod и dev

const env = process.env.NODE_ENV;

sass.compiler = require('node-sass'); //for SASS

task("clean", () => { //for clean dist

  return src("dist/**/*", { read: false }).pipe(rm());
});

task("copy:html", () => { //копируем html
  return src("src/*.html") //откуда
    .pipe(dest("dist")) //куда
    .pipe(reload({ stream: true })); //синхронизация изменений
});

task("copy:fonts", () => {
  return src("src/fonts/*.*")
    .pipe(dest("dist/fonts/"))
    .pipe(reload({ stream: true }));
});

task("copy:img", () => {
  return src("src/img/**/*.*")
    .pipe(dest("dist/img/"))
    .pipe(reload({ stream: true }));
});

task("copy:svg", () => {
  return src("src/img/sprite.svg")
    .pipe(dest("dist/img/"))
    .pipe(reload({ stream: true }));
});

task("copy:js-libs", () => {
  return src("src/js/libs/*.js")
    .pipe(dest("dist/js/libs/"))
    .pipe(reload({ stream: true }));
});
task("copy:video", () => {
  return src("src/vid/*.mp4")
    .pipe(dest("dist/vid/"))
    .pipe(reload({ stream: true }));
});

const styles = [ //создаем переменную со стилями
  'node_modules/normalize.css/normalize.css',
  'src/css/main.scss'
];

task('styles', () => { //for SASS
  return src(styles) //вставляем переменную со стилями
    .pipe(gulpif(env === 'dev', sourcemaps.init())) //инициализируем SourceMap
    .pipe(concat('main.min.scss')) //склеиваем в один файл
    .pipe(sassGlob()) //автоматическое добавление sass файлов
    .pipe(sass().on('error', sass.logError)) //обрабатываем sass
    //.pipe(px2rem()) //px to rem
    .pipe(gulpif(env === 'dev', autoprefixer({ //автопрефиксер
      browsers: ['last 2 versions'],
      cascade: false
    })))
    .pipe(gulpif(env === 'prod', cleanCSS())) //сжимаем CSS
    .pipe(gulpif(env === 'dev', sourcemaps.write())) //записываем SourceMap
    .pipe(dest('dist/css')) // складываем в готовую папку с проектом
    .pipe(reload({ stream: true }));
});

const libs = [ //создаем массив с библиотеками
  "node_modules/jquery/dist/jquery.js",
  "src/js/libs/*.js",
  "src/js/*.js"
];

task('scripts', () => {
  return src(libs) //включаем все библиотеки в обработку
    .pipe((env === 'dev', sourcemaps.init())) //инициализируем SourceMap
    .pipe(concat('main.min.js', { newLine: ";" })) //склеиваем в один файл
    .pipe(babel({ //запускаем babel
      presets: ['@babel/env']
    }))
    .pipe(gulpif(env === 'prod', uglify())) //минифицируем JS
    .pipe(gulpif(env === 'dev', sourcemaps.write())) //записываем SourceMap
    .pipe(dest('dist/js')) // складываем в готовую папку с проектом
    .pipe(reload({ stream: true }));
});

task('server', () => { //разворачиваем сервер
  browserSync.init({
    server: {
      baseDir: "./dist" //папка, из которой сервер возьмет файлы
    },
    open: false
  });
});

task('watch', () => {
  watch('./src/css/**/*.scss', series('styles')); //следим за изменениями в sass-файлах
  watch('./src/*.html', series('copy:html')); //следим за изменениями в html
  watch('./src/img/**/*.*', series('copy:img')); //следим за изменениями в html
  watch('./src/js/*.js', series('scripts')); //следим за изменениями в JS
});

task(
  "default",
  series("clean", 
  parallel("copy:html", "copy:fonts", "copy:img", "styles", "scripts", "copy:video"), 
  parallel("watch", "server"))
); //запуск серии тасков

task(
  "build",
  series("clean", 
  parallel("copy:html", "copy:fonts", "copy:img", "styles", "scripts", "copy:video")) 
); //запуск серии тасков