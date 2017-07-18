require(['app','utils','../index/template','../mod/fun'], function (app,Utils,template,fun){
	//console.log(app)
	
	//工具类调用
	var utils = new Utils();
	console.log("空:"+ utils.isEmpty("dasdfs"));
	
	//app支持调用
	app.handleOpenMask();
	
	//js数据渲染 模板调用（underscore.js插件使用）
	template.init();
	
	//js交互
	fun.init("#container");
	
});
