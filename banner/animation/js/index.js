// JavaScript Document
var Index = (function(){
	
	var setBannerAnimation = function(id){
		var index = 0,picTimer,
			$picList = $(id).find('ul'),
			$picItem = $picList.children('li'),			
			picWidth = $(window).width(),
			$arrowLeft = $(id).find('.banner_arrow_l'),
			$arrowRight = $(id).find('.banner_arrow_r'),
			$bannerDot = $(id).find('.banner_dot');
		$picList.append($picItem.first().clone());	
		$picList.find("li").width(picWidth);
		var length = $picList.find('li').size();
		for (var i=0; i < length-1; i++ ){
            $bannerDot.append("<span></span>");
       	}
		$bannerDot.children('span').eq(0).addClass('active');
		$picList.css({width:(length+1)*picWidth});
		
		$(id).hover(function() {
			clearInterval(picTimer);
		},function() {
			picTimer = setInterval(function() {
				 index++;
            		 move();
			},5000); 
		}).trigger("mouseleave");

		$bannerDot.children().on('click',function(){
            var i=$(this).index();
            console.log(picWidth)
            $picList.animate({left: -i*picWidth},400);
            $bannerDot.children().eq(i).addClass("active").siblings().removeClass("active");
        });
		
		$arrowLeft.stop(true).on("click",function(){
			index++;
			move();
		})
		
		$arrowRight.stop(true).on("click",function(){
			index--;
			move();
		});	
		
		function move(){
	        if (index == length){
	            $picList.css({left:0});
	            index=1;
	        }
	        if (index == -1){
	            $picList.css({left:-picWidth*(length-1)});
	            index=length-2
	        }
	        $picList.stop(true).animate({
	            left:-index*picWidth
	        });
	        (index == length-1) ? $bannerDot.children().eq(0).addClass("active").siblings().removeClass("active") : $bannerDot.children().eq(index).addClass("active").siblings().removeClass("active");
	    }
			
	}
	
	//首页分类显示
	var setIndexAssortShow = function(){
		$(".assort_box").show();
	}
	// E
	
	return{
		handleBannerAnimation: function(id){
			setBannerAnimation(id);
		},
		assortShow: function(){
			setIndexAssortShow();
		}
	}
})();



//首页图片滚动
$(function(){
	Index.handleBannerAnimation('#banner');
})


