var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var ora = require('ora');
var argv = require('yargs').argv;
var chalk = require('chalk');
var webpack = require('webpack');
var config = require('./config');
var $ 	 = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var proxyMiddleware = require('http-proxy-middleware');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var historyApiFallback = require('connect-history-api-fallback');
var proxyTable = config.dev.proxyTable;
var usage = require('gulp-help-doc');


const log = console.log;
const macro = {
	FILE_EXISTS: '目录已存在',
}

const gulpConf = {
	tpl: {
		// 页面模版路径
		page: './build/template-page/*',
		// 模块模版路径
		common: './build/template-common/*'
	}
}


gulp.task('test', () => {
	gulp.src('./src/pages/**/*.html')
		.pipe($.clean())
})

/**
 * 开发模式，启动本地服务  e.g. (gulp serve -p)
 * @task {serve}
 */
gulp.task('serve', () => {
	setEnvrionment('DEV');
	// console.log('argv.open', argv);
	var open = argv.p;

	const webpackConf = require('./build/webpack.dev.conf');
	var compiler = webpack(webpackConf);
	var devMiddelware = webpackDevMiddleware(compiler, {
		publicPath: webpackConf.output.publicPath,
		quiet: true,
		stats: {
			colors: true
		},
	});
	var hotMiddleware = webpackHotMiddleware(compiler, {log: () => {}});
	
	// force page reload when html-webpack-plugin template changes
	compiler.plugin('compilation', function (compilation) {
	  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
	    hotMiddleware.publish({ action: 'reload' })
	    cb()
	  })
	});

	var browserSyncMiddleware = getProxyTable().concat([
		historyApiFallback(),
		devMiddelware,
		hotMiddleware
	]);

	browserSync.init({
		port: process.env.PORT || config.dev.port,
		open: open || !!config.dev.autoOpenBrowser,
		// logLevel: 'debug',
		startPath: '/login.html',
		server: {baseDir: ['./dist', './static']},
		middleware: browserSyncMiddleware,
	})
});
/**
 * 打包到测试环境
 * @task {build:test}
 */
gulp.task('build:test', () => {
	setEnvrionment('TEST');
	return build();
});
/**
 * 打包到生产环境
 * @task {build:online}
 */
gulp.task('build:online', () => {
	setEnvrionment('PRO');
	return build();
})

// 使用说明
gulp.task('help', () => {
	usage(gulp)
})

/**
 * 新建页面
 * @task {page}
 */
gulp.task('page', () => {
	var page_argv = require('yargs')
		.usage('使用说明: gulp page -n <pageName>')
		.describe('n', '新建页面的页面名称')
		.demandOption(['n'])
		.argv;

	var name = page_argv.n, src = gulpConf.tpl.page, task;

	var distPath = path.resolve('./src/pages', name);
	// 目录必须存在 防止覆盖
	if(dirExists(distPath)) return log(chalk.red(distPath, macro.FILE_EXISTS));
	return copyTemplate(src, distPath, name);
});

/**
 * 新建通用模块
 * @task {common}
 */
gulp.task('common', () => {
	var page_argv = require('yargs')
		.usage('使用说明: gulp common -n <commonName>')
		.describe('n', '新建模块的模块名称')
		.demandOption(['n'])
		.argv;

	var name = argv.n, src = gulpConf.tpl.common, task;

	var distPath = path.resolve('./src/common', name);
	// 目录必须存在 防止覆盖
	if(dirExists(distPath)) return log(chalk.red(distPath, macro.FILE_EXISTS));
	return copyTemplate(src, distPath, name);
});

gulp.task('default', ['serve']);

// 打包构建
function build(){
	process.env.NODE_ENV = 'production';
	var task = gulp.src(config.build.assetsRoot)
		.pipe($.clean({force: true}))
	var spinner = ora('building for production...')
	spinner.start()

	var webpackConfig = require('./build/webpack.prod.conf')
	webpack(webpackConfig, (err, stats) => {
		spinner.stop()
		if (err) throw err
		process.stdout.write(stats.toString({
		  colors: true,
		  modules: false,
		  children: false,
		  chunks: false,
		  chunkModules: false
		}) + '\n\n')

		console.log(chalk.cyan('  Build complete.\n'))
		console.log(chalk.yellow(
		  '  Tip: built files are meant to be served over an HTTP server.\n' +
		  '  Opening index.html over file:// won\'t work.\n'
		))
	})
	return task;
}
// 设置环境变量
function setEnvrionment(env){
	process.env.NODE_ENV_WY = env;
}
// 获取代理中间件
function getProxyTable(){
	var proxyTables = [];
	// proxy api requests
	Object.keys(proxyTable).forEach(function (context) {
	  var options = proxyTable[context]
	  if (typeof options === 'string') {
	    options = { target: options }
	  }
	  proxyTables.push(proxyMiddleware(options.filter || context, options))
	})
	return proxyTables;
}
// 判断目录是否存在
function dirExists(dir){
	if(fs.existsSync(dir))
		return true;
	else 
		return false;
}
// 拷贝模版
function copyTemplate(tplPath, distPath, name){
	task = gulp.src(tplPath)
				.pipe($.debug())
				.pipe($.replace('$PAGE' ,name))
				.pipe($.rename(function(pt){
					pt.basename = name;
					return pt;
				}))
				.pipe(gulp.dest(distPath))
	return task;
}
