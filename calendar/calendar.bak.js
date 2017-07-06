/**
 * calendar.nowDate() ：获取当前日期
 * calendar.renderHtml() ：初始化 rendar日历 
 * calendar.preMonth() ：上个月
 * calendar.nextMonth() ： 下个月
 * calendar.getYearAndMonth() ：获取点击的年月
 * calendar.dateParse(date); ：将日期转换为unix时间戳
 * 
 **/
var calendar = {
	nowMonth: null,
	nowYear: null,
	nowDate: null,
	getDates: function(Y,M) { //获取当前月有多少天	
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
//			    console.log("year="+year);
//				console.log("month="+month);
//			    console.log("days="+days);
	    
	    return days
	},
	getMonthOne: function(M) { //获取当前月第一天是星期几
		var D = new Date(),
			D2 = new Date(D.getFullYear(), M, 1)
		return D2.getDay()
	},
	nowDate: function() {
		var D = new Date();
		calendar.nowMonth = D.getMonth();
		calendar.nowYear = D.getFullYear();
		calendar.nowDate = D.getDate();
		$(".datetime").html(calendar.nowYear + "年" + (calendar.nowMonth + 1) +"月")
	},
	nextMonth: function() {
		if(calendar.nowMonth >= 11) {
			calendar.nowYear +=1;
			calendar.nowMonth =0;
		} else {
			calendar.nowMonth += 1;
		}
		$(".datetime").html(calendar.nowYear + "年" + (calendar.nowMonth + 1) +"月")
		calendar.renderHtml();
	},
	preMonth: function() {
		if(calendar.nowMonth <= 0) {
			calendar.nowYear -=1;
			calendar.nowMonth =11;	
		} else {
			calendar.nowMonth -= 1;
		}
		$(".datetime").html(calendar.nowYear + "年" + (calendar.nowMonth + 1) +"月")
		calendar.renderHtml();
	},
	getYearAndMonth: function(){
		return calendar.nowYear+"-"+(calendar.nowMonth+1);
	},
	dateParse: function(d){
		//var currentTimestamp = Date.parse(new Date()) / 1000;
		return Date.parse(d) / 1000;
	},
	renderHtml: function() {
		var Da = new Date(),
			dates = calendar.getDates(calendar.nowYear, calendar.nowMonth),
			day = calendar.getMonthOne(calendar.nowMonth),
			zHtml = "";
		var d = 0;
		
		
		var _firstDay = new Date(calendar.nowYear, calendar.nowMonth, 1); // 当前月第一天	
		for(var j=0;j<42;j++){
			var _thisDay = new Date(calendar.nowYear, calendar.nowMonth, j + 1 - _firstDay.getDay());
			console.log(_thisDay);
		}
		
		
		if(day != 0) {
			for(p = 0; p < day; p++) {
				zHtml += "<li></li>"
			}
		}
		for(i = 0; i < dates; i++) {
			if(Da.getMonth() == calendar.nowMonth) {
				if(Da.getDate() == (i + 1)) {
					zHtml += "<li class='on'>" + (i + 1) + "</li>";
				} else {
					zHtml += "<li>" + (i + 1) + "</li>";
				}
			} else {
				zHtml += "<li>" + (i + 1) + "</li>";
			}
		}

		$(".calendar-days").html(zHtml)
		var dL = $(".calendar-days li").length,
			zLeng = 42
		if(dL != zLeng) {
			for(k = 0; k < (zLeng - dL); k++) {
				$(".calendar-days").append("<li></li>")
			}
		};
		//拓展

	}
};