require(['app','utils','../index/template','../mod/fun'], function (app,Utils,template,fun){
	//console.log(app)
	
	var utils = new Utils();
	console.log("空:"+ utils.isEmpty("dasdfs"));
	
	//app支持调用
	app.handleOpenMask();
	
	//模板调用（underscore.js插件使用）
	template.init();
	
	// jquery插件调用
	fun.init("#container");
	
});
