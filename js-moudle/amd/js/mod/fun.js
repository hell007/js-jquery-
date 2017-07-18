define(['jquery'],function($){
	
	//模板使用
	var setInit = function(dom){
		$(dom).html("这是通过js添加的文字");
	}
	
	return {
		init: setInit
	};
})
