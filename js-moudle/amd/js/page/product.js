require(['art-template','app','../mod/fun'], function (template,app,fun){
	//app支持调用
	//app.handleOpenMask();
	
	// jquery插件调用
	fun.init("#product");
	
	//art-template的使用
	var data = {
        title: 'art-template基本例子',
        isSuccess: true,
        list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
    };
    var html = template('test', data);
    $('#content').html(html);
	
});
