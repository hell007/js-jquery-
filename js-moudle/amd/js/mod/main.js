require(['app','template','extend'], function (app,template,extend){
	//app支持调用
	app.handleOpenMask();
	
	//模板调用（underscore.js插件使用）
	template.init();
	
	// jquery插件调用
	extend.init();
	
});