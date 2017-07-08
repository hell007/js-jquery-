//(function () {
//
//	//配置seajs
//	seajs.config({
//		base : "./js/",		//开发环境
//		debug: false
//	});
//
//	//加载入口模块
//	seajs.use('app/index');
//})();

/*! 初始化seajs配置 */
(function () {
	//配置seajs
	seajs.config({
		base : "./js/",		//开发环境
		//base : '../source/scripts/',		//开发环境
		//preload : ['app.min.js'],			//生产环境
//		map: [
//			[/^\.(css|js)$/,
//				function(url) {
//					return url += (url.indexOf('?') === -1 ? '?' : '&') + version;
//				}
//			]
//		],
		alias: {
          "iscroll": "./js/library/iscroll.js"
          //"bootstrap":"bootstrap.min.js",
          //"backstretch":"jquery.backstretch.min.js"
        },
        charset: 'utf-8',
		debug: false
	});

	//加载入口模块
	seajs.use('app/index');
})();
	

//准则：CMD 规范
define(function(require, exports, module){

	//初始化App模块
	//var $ = require('library/jquery/jquery2');			//jquery2模块

	//初始化App模块
	window.app = require('module/app');		//App模块
	app.init();
	
})

