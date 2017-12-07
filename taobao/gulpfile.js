//引入模块
var gulp = require("gulp"),
	path = require("path"),
	del = require("del"),
	minHtml = require("gulp-html-minifier"),//压缩处理html
	//mincss = require("gulp-clean-css"),//压缩css（可配置）
	sass = require("gulp-sass"),//sass
	postcss = require("gulp-postcss"),//postcss
	autoprefixer = require("autoprefixer"),//autoprefixer
	cssnano = require("cssnano"),//cssnano 压缩css
	base64 = require("gulp-base64"),//base64
	webpack = require("gulp-webpack"),//gulp-webpack
	sourceMap = require("gulp-sourcemaps"),//sourcemap
	runSequence = require("run-sequence"),//任务排序
	pxtorem = require("postcss-pxtorem"),//px -> rem
	rev = require("gulp-rev"),//rev修订
	revCollector = require("gulp-rev-collector"),//修订后文件收集替换
	browserSync = require("browser-sync").create();//创建一个同步实例

//-------------------------------路径设置-------------------------------
var root = __dirname;


//-------------------------------定义task--------------------------------

//--------------------------清除dist目录下的文件(除了图片)------------------
gulp.task("clean", function() {
	return del(["dist/**/*","!dist/images/*"]);
});

//------------------------------copy images---------------------------------------
gulp.task("copyImg", function() {
	return gulp.src("src/images*/**")
			   .pipe(gulp.dest("dist"));
});

//----------------------------copy and mini html-----------------------------------------
gulp.task("copyMinHtml", function() {
	return gulp.src(["src/views/*","src/index.html"], {base: "src"})
			   .pipe(minHtml({
			   		collapseBooleanAttribute: true, //移除布尔值属性
			   		collapseInlineTagWhitespace: true,//内联元素之间空格去除
			   		collapseWhitespace: true,//移除空格
			   		minifyCSS: true,//css压缩
			   		minifyJS: true,//js压缩
			   		removeComments: true,//移除注释
			   		removeScriptTypeAttributes: true,//去除javascript的类型声明type="text/javascript"
			   		useShortDoctype: true//用H5的文档声明
			   }))
			   .pipe(gulp.dest("dist"))
			   .pipe(browserSync.stream());
});


//----------------------------copy and mini css----------------------------------------
gulp.task("mincss", function() {
	var plugins = [
		autoprefixer(), 
		cssnano(), 
		pxtorem({
			rootValue: 100,
			unitPrecise: 5,
			propList: ["*"],
			replace: true,
			mediaQuery: false,
			minPixelValue: 6
		}),
	];
	gulp.src("src/css*/swiper.min.css")
		.pipe(gulp.dest("dist"));

	return gulp.src(["src/css/*.scss", "!src/css/swiper.min.css"])
			   .pipe(sourceMap.init())
			   .pipe(sass().on("error", sass.logError))
			   .pipe(base64({
			   		maxImageSize: 4 * 1024
			   }))
			   .pipe(postcss(plugins))
			   .pipe(sourceMap.write())
			   .pipe(gulp.dest("dist/css/"))
			   .pipe(rev())
			   .pipe(rev.manifest())
			   .pipe(gulp.dest("dist/manifest/revCss/"))
			   .pipe(browserSync.stream());
});

//-----------------------------copy font-face-----------------------------------
gulp.task("copyFont", function() {
	return gulp.src("src/css*/font-face*/*")
			   .pipe(gulp.dest("dist"))
			   .pipe(browserSync.stream());
});

//------------------------------copy and mini js----------------------------------
gulp.task("minjs", function() {
	gulp.src("src/js*/vendor*/**")
		.pipe(gulp.dest("dist"));
	return gulp.src(["src/js/*.js","!src/js/vendor/**"])
			   .pipe(webpack(require("./webpack.config.js")))
			   .pipe(gulp.dest("dist/js"))
			   .pipe(rev())
			   .pipe(rev.manifest())
			   .pipe(gulp.dest("dist/manifest/revJs"))
			   .pipe(browserSync.stream());
});


//----------------------------文件修订--------------------------------------------
/*gulp.task("rev", function() {
	return gulp.src(["dist/js/**", "!dist/js/vendor/*", "dist/css/**", "!dist/css/swiper.min.css"], {base: "dist"})
		.pipe(rev())
		.pipe(rev.manifest({
			merge: true,
		}))
		.pipe(gulp.dest("dist/manifest"));
});*/


//-----------------------------文件替换--------------------------------------------
gulp.task("replace", function() {
	return gulp.src(["dist/manifest/**/*","dist/index.html"])
			   .pipe(revCollector())
			   .pipe(gulp.dest("dist"));
});


//------------------------------按顺序执行任务---------------------------------------
gulp.task("queue", function(cb) {
	runSequence(
		["clean"],
		["copyImg"],
		["copyMinHtml"],
		["mincss"],
		["minjs"],
		//["rev"],
		["replace"],
	cb);
});


//------------------------------开启服务器，同步更新------------------------------------
gulp.task("serve",["queue"], function() {
	browserSync.init({
		server: {
			baseDir: "./dist/",
		}
	});
	//监视src目录文件，有改动就reload
	//gulp.watch("src/css/font-face/*", ["copyFont"]);
	gulp.watch("src/js/*.js", ["minjs", "replace"]);
	gulp.watch("src/css/*.scss",["mincss", "replace"]);
	gulp.watch("src/index.html",["copyMinHtml", "replace"]);
});


gulp.task("default",["serve"]);



