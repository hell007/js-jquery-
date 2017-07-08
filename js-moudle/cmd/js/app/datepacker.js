(function () {

	//配置seajs
	seajs.config({
		base : "./js/",		//开发环境
		debug: false
	});

	//加载入口模块
	seajs.use('app/datepacker');
})();


define(function(require, exports, module){
	
	//初始化App模块
	window.app = require('module/app');		//App模块
	app.init();
	
	//初始化Calendar模块
	window.calendar = require('module/calendar');
	calendar.init('#calendar_item1','date'); 
	calendar.init('#calendar_item2','datetime'); 
	calendar.init('#calendar_item3','time'); 
	
	calendar.init('#calendar_item4','datetime'); 
	calendar.init('#calendar_item5','datetime'); 
	
})