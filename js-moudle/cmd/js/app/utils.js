
(function () {

	//配置seajs
	seajs.config({
		base : "./js/",		//开发环境
		debug: false
	});

	//加载入口模块
	seajs.use('app/utils');
})();



define(function(require, exports, module){
	
	//var $ = require("library/jquery/jquery2");
	
	//引入App模块
	window.app = require('module/app');
	app.init();
	
	
	window.utils = require("library/utils");
	var str = " 123dd45 ";
	//1.替换字符串
	var s1 = utils.repalce("123dd45","dd","aa");
	console.log(s1);
	
	//2.去除字符串空格
	console.log(str.length);
	console.log(utils.trim(str).length);
	console.log(utils.ltrim(str).length);
	console.log(utils.rtrim(str).length);
	
	//3.过滤字符串里的html标签
	var str2 ="abv<a href='#'>点击me</a>dddd";
	console.log(utils.stripTags(str2));
	
	//4.验证为空
	var str3 ="";
	console.log("空:"+ utils.isEmpty(str3));
	console.log("空:"+ utils.isNotEmpty(str3));
	
	//5.数字
	var str4="3";
	var n = 3.2;
	
	console.log("数字："+ utils.isNumber(str4));
	console.log("n数字："+ utils.isNumber(n));
	
	console.log("int："+ utils.isInt(n));
	
	//6.字母
	var abc ="abc";
	var str5 = "中国字";
	console.log("英文："+ utils.isLetter(abc));
	console.log("中文："+ utils.isChina(str5));
	console.log("html5 localStorage:"+ utils.isSupportLocalStorage());
	
	//7.网址
	console.log("网址："+ utils.isUrl("http://www.345834573.com"));
	console.log("邮箱："+ utils.isEmail("103333.@sina.com.cn"));
	console.log("手机号码："+ utils.isMobile("15588888888"));
	console.log("座机号码："+ utils.isTell("0871-3232323"));
	
	
	
})