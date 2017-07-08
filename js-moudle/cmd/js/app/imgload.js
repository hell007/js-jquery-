
(function () {

	//配置seajs
	seajs.config({
		base : "./js/",		//开发环境
		debug: false
	});

	//加载入口模块
	seajs.use('app/imgload');
})();



define(function(require, exports, module){
	
	var $ = require('library/jquery/jquery2');
	
	//引入App模块
	window.app = require('module/app');
	app.init();
	
	
	window.imgLazyLoad = require('module/imgLazyLoad');
	
	imgLazyLoad.init({src:'name',time:300, filter:function(node){
		if ( $(node).attr("data-loading") != 'tp_lazy_loader_img' ) return false;
		return true; 
		}
	});
	
})
