/**
 *underscore.js测试 
 */
define(['jquery','underscore'],function($, _){
	
	var tpl = _.template($("#tpl").html());
	var obj = {
		list:[
			{id:1,title:'iphone7'},
			{id:2,title:'iphone6'}
		]
	};
	
	//模板使用
	var setUnderscoreTemplate = function(){
		$("#demo_underscore").html(tpl(obj));
	}
	
	return {
		init: setUnderscoreTemplate
	};
})
