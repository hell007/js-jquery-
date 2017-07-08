//Calendar CMD 规范

define(function(require, exports, module){
	
	var Calendar = function(){
		
		//引用lCalendar模块
		var lCalendar = require('library/lCalendar');
		
		//console.log(lCalendar);
		
		//设置日期 日期时间  时间
		//date: type==date
		//datetime: type==datetime
		//time: type==time
		var setCalendar = function(id,type){
			//console.log(id);
			//console.log(type);
			var lcalender = new lCalendar();
			lcalender.init({
				'trigger': id,
				'type': type
			})
		}
		
		return{
			init:function(id,type){
				setCalendar(id,type);
			}
		}
	}();
	
	module.exports = Calendar;
})


