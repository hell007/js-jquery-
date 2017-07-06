/*
 * @日历组件 
 * @auther kunyujie.com
 * @method  Calendar  
 * @description 默认配置参数   
 * @param {Object} calendarHd -年月显示dom
 * @param {Object} calendarBd -天数显示dom         
 * @param {Number} salaryday -默认null 
 * @param {Boolean} isShowOtherMonth -是否显示其他月的天数 
 * @example  
 * new Calendar({
	calendarHd : '.calendar-date',  
	calendarBd : '.calendar-days',
	salaryday : 16,
	isShowOtherMonth : true
});
*/  
!function(){
	
	function Calendar(cfg){
		this.config = {
			calendarHd : 'calendar-date',  //dom
			calendarBd : 'calendar-days', //dom
			salaryday :  null,
			isShowOtherMonth: true
		};	
		this.config = $.extend(this.config, cfg);
		this.nowYear = null;
		this.nowMonth = null;
		this.nowDay = null;
		this.init();
		this.renderHtml();
		return this;
	}
	
	/**
	 * 日历初始化
	 */
	Calendar.prototype.init = function(){
		var self = this,
			D = new Date();
		self.nowYear = D.getFullYear();
		self.nowMonth = D.getMonth();
		self.nowDay = D.getDate();
		//console.log(self.getDays(self.nowYear,self.nowMonth));
		$(self.config.calendarHd).html(self.nowYear + "年" + (self.nowMonth + 1) +"月");
	}
	
	/**
	 * render 日历
	 */
	Calendar.prototype.renderHtml = function() {
		var self = this,
			firstDay = new Date(self.nowYear, self.nowMonth,1),//当前月第一天
			calendarHtml = "";		
			console.log(self.config.salaryday);
			//console.log(self.nowDay);
		for(var j=0; j<42; j++){
			var selfDay = new Date(self.nowYear, self.nowMonth, j + 1 - firstDay.getDay());
			if(self.formatDate(selfDay).substr(0, 6) === self.formatDate(firstDay).substr(0, 6)) {
				//当前月内扩展
				calendarHtml += "<li class='"+ self.addClass(selfDay.getDate()) +"' data='"+ self.formatDate(selfDay) +"' >" + selfDay.getDate() + "</li>";
			}else{
				//是否显示上个月下个月的部分天数
				if(self.config.isShowOtherMonth){
					calendarHtml += "<li class='off'>" + selfDay.getDate() + "</li>";
				}else{
					calendarHtml += "<li class='off'></li>";
				}
			}
		}
		$(self.config.calendarBd).html(calendarHtml);
	}
	
	/**
	 * 扩展添加class
	 * @param {Number} day
	 */
	Calendar.prototype.addClass = function(day){
		var clazz;self = this;
		switch (day){
			case self.nowDay:
				clazz = self.config.salaryday===self.nowDay ? 'normal on salary' : 'normal on'; 
				break;
			case self.config.salaryday:
				clazz = 'normal salary'; 
				break;
			default:
				clazz = 'normal';
				break;
		}
		return clazz;
	}
	
	/**
	 *  下一个月调用
	 */
	Calendar.prototype.nextMonth = function(){
		var self = this;
		if(self.nowMonth >= 11) {
			self.nowYear +=1;
			self.nowMonth =0;
		}else{
			self.nowMonth += 1;
		}
		$(self.config.calendarHd).html(self.nowYear + "年" + (self.nowMonth + 1) +"月")
		self.renderHtml();
	}
	
	/**
	 *上一个月调用 
	 */
	Calendar.prototype.prevMonth = function(){
		var self = this;
		if(self.nowMonth <= 0) {
			self.nowYear -=1;
			self.nowMonth =11;	
		}else{
			self.nowMonth -= 1;
		}
		$(self.config.calendarHd).html(self.nowYear + "年" + (self.nowMonth + 1) +"月")
		self.renderHtml();
	}
	
	/**
	 * 将日期转换为unix时间戳
	 * @param {Object} D date
	 */
	Calendar.prototype.dateParse = function(D){
		//var currentTimestamp = Date.parse(new Date()) / 1000;
		return Date.parse(D) / 1000;
	}
	
	/**
	 * 将日期转换为字符串
	 * @param {Object} D
	 */
	Calendar.prototype.formatDate =function(D) {
		//日期转化为字符串， 4位年+2位月+2位日
		var y = D.getFullYear(),
			m = D.getMonth() + 1, // 月从0开始计数
			d = D.getDate(),
			m = (m > 9) ? ("" + m) : ("0" + m),
			d = (d > 9) ? ("" + d) : ("0" + d);
		return y + m + d;
	}
	
	/**
	 * 获取当前月有多少天
	 * @param {Number} Y
	 * @param {Number} M
	 */
	Calendar.prototype.getDays = function(Y,M){
		//下面注释的方法获取天数有bug
		var D = new Date(),
//			D.setMonth(M + 1);
//			D.setDate(0);
//			return D.getDate()
		//获取年份
		year = Y,
		//获取当前月份
		month = M + 1,
		//定义当月的天数；
		days ;
		//当月份为二月时，根据闰年还是非闰年判断天数
		if(month == 2){
		        days= !(year % (year % 100 ? 4 : 400)) ? 29 : 28;
		}else if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
	        //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
	        days= 31;
	   }else{
	        //其他月份4,6,9,11 天数为：30.
	        days= 30;      
	    }
			    //console.log("year="+year+"month="+month+"days="+days);
	    return days
	}
	
	/**
	 * 获取当前月第一天是星期几
	 * @param {Number} M
	 */
	Calendar.prototype.getOneOfMonth = function(M){
		var D = new Date(),
			firstDay = new Date(D.getFullYear(), M, 1);
		return firstDay.getDay();
	}
	
	window.Calendar = Calendar;
}();



