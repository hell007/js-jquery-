
(function () {

	//配置seajs
	seajs.config({
		base : "./js/",		//开发环境
		debug: false
	});

	//加载入口模块
	seajs.use('app/cookie');
})();



define(function(require, exports, module){
	
	//引入App模块
	window.app = require('module/app');
	app.init();
	
	var $ = require("library/jquery/jquery2");
	
	//cookie.js
	window.cookie = require("module/cookie");
	
	//存储
	//cookie("test1", "test1content");
	//cookie("test2", "test2content", {expires:7} );
	//cookie('test3', 'test3content', { expires: 7, path: '/' });
	
	//删除cookie
	//cookie('test2', null);
	//cookie('test3', null, { expires: 7, path: '/' });
	
	//说明:浏览器支持的转换方式(Firefox，chrome，opera，safari，ie9，ie8)等浏览器
	//JSON.parse(jsonstr); //可以将json字符串转换成json对象 
	//JSON.stringify(jsonobj); //可以将json对象转换成json对符串 
	//注：ie8(兼容模式),ie7和ie6没有JSON对象，推荐采用JSON官方的方式，引入json.js
	
	var arr = [{id:"6033",name:"苹果Apple Watch",image:"/upload1/2015/03/20150310142557653_100.jpg",url:"/product-6033.html",price:"4188.00"}];
	
	//console.log(data[0].id);
	
	//存
	cookie("1000",JSON.stringify(arr));
	
	//取
	var c = cookie("1000");
	
	//获取j对象 array
	var j = JSON.parse(c);
	console.log(j);
	
	
	var data2 = {id:"6034",name:"小米手机",image:"/upload1/2015/03/20150310142557653_100.jpg",url:"/product-6034.html",price:"2000.00"};
	
	j.push(data2);
	
	cookie("1000", JSON.stringify(j));
	
	var jj = JSON.parse(cookie("1000"));
	console.log(jj);
	
	
	//console.log(j[0].id)
	
	//cookie("1000",null);
	
	
	
})