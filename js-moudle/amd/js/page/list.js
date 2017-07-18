require(['juicer','app','utils','../mod/fun'], function (juicer,app,Utils,fun){
	
	var utils = new Utils();
	
	//app支持调用
	//app.handleOpenMask();
	
	// jquery插件调用
	fun.init("#list");
	
	//juicer模板使用
	var tpl = $("#tpl").html();
	var data = {
        title: 'juicer基本例子',
        time: utils.formatDate(1500349860000),
        time2: 1500349860000, 
        date: '2017-07-018 11:55:00',
        isSuccess: true,
        list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
    };
    
    //将时间戳转换成时间格式
    juicer.register('formatDate', function(ns){
    	return utils.formatDate(ns);
    });
    //juicer.unregister('function_name');
    
    //将时间戳转换成时间格式
    juicer.register('formatTimestamp', function(date){
    	return utils.formatTimestamp(date);
    });

	$("#content").html(juicer(tpl,data));

	
});
