(function () {

	//配置seajs
	seajs.config({
		base : "./js/",		//开发环境
		debug: false
	});

	//加载入口模块
	seajs.use('app/area');
})();



define(function(require, exports, module){
	
	//初始化App模块
	window.app = require('module/app');		//App模块
	app.init();
	
	//初始化Area模块
	window.area = require('module/area');
	var areaData = require('app/areaData');//数据需要遵循 area自定义格式   
	area.init('#area_item',areaData); 
	
})