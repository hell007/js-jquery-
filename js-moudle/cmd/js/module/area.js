//Area CMD 规范

define(function(require, exports, module){
		
	var Area = function(){
		
		//引用lArea模块
		var lArea = require('library/lArea');
		
		//设置地区选择功能
		//id: Dom
		//data: 地区json数据
		var setAreaChoose = function(id,data){
			
			var larea = new lArea();
			larea.init({
			    'trigger': id,
			    'data': data
			});
		}
		
		return{
			init:function(id,data){
				setAreaChoose(id,data);
			}	
		}
	}();
	
	module.exports = Area;	
})