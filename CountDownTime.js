/**
 * Index
 */
var Index = (function(){
	
	//倒计时
	var setCountDownTime = function(){
		//获取当前时间  
	    var date = new Date();  
	    var now = date.getTime();  
	    //设置截止时间  
	    var endDate = new Date("2017-09-22 00:00:00");  
	    var end = endDate.getTime();  
	    //时间差  
	    var leftTime = end-now;  

	    console.log('leftTime===',leftTime);
	    //定义变量 d,h,m,s保存倒计时的时间  
	    var d,h,hh,m,s,html,timer;  
	    if (leftTime>=0) {  
	        d = Math.floor(leftTime/1000/60/60);  
	        h = Math.floor(leftTime/1000/60/60%24); 
	        hh = (d+h);
	        m = Math.floor(leftTime/1000/60%60);  
	        s = Math.floor(leftTime/1000%60); 
	        html = '<em>'+ (hh>9 ? hh : '0'+hh) +'</em> : <em>'+ (m>9 ? m : '0'+m) +'</em> : <em>'+ (s>9 ? s : '0'+s) +'</em>'; 
		    $("#timer-clock").html(html);
		    
		    timer = setInterval(function(){setCountDownTime();},1000);
	    }else{
	    	clearInterval(timer);
	    	timer = null;
	    	$(".timer").hide();
	    }   
	}
	
	return{
		init:function(){
			setCountDownTime();//倒计时
		}
	}
})();
