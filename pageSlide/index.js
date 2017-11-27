var Slide = (function(){
	
	//define
	var content = $('.content'),
    	leftContent = $('.left-content'),
        rightContent = $('.right-content'),
        leftMenuItem = $('.left-content ul li'),
        rightDataContainer = $('.right-content ul li'),
        //获取默认fixed:top值
        defaultHeight = $('header').height(),
        height = $(window).height()-defaultHeight,
        leftW = leftContent.width(),
        rightW = $(window).width() - leftW;
    
    /**
     * [默认加载设置]
     */
    var setInit = function(){
    	$('.scroll-page').css({
    		top:defaultHeight
    	});
        leftContent.css('height',height );
        rightContent.css({
        	'width':rightW,
        	'height':height,
        	'margin-left':leftW
        });
        // 默认选中为第0个
        leftMenuItem.eq(0).addClass('active');
        // 默认右边第一个fixed
        rightDataContainer.eq(0).find('.class-title').css({
            position:"fixed",
            top: defaultHeight + "px"
        })
        rightDataContainer.eq(0).find(".list").css({marginTop:'32px'})
    }
    
    /**
     * [监听右侧滚动事件]
     */
    var setScroll = function(){
        rightContent.on("touchmove",function(event) {
            //滚动到标杆位置,左侧导航加active
            rightDataContainer.each(function() {
                var target = parseInt($(this).offset().top - $(window).scrollTop() - $('header').height());
                var i = $(this).index();
                if (target <= 0) {
                    leftMenuItem.removeClass('active');
                    leftMenuItem.eq(i).addClass('active');
                    //设置fixed
                    setFixed(i)
                }
            });
        });
    }
    
    /**
     * [监听左侧菜单点击事件]
     */
   	var setClick = function(){
        leftMenuItem.on("click", function() {
        	//rightContent.unbind("scroll");
        	if(rightContent.is(':animated')) return;
            $(this).addClass('active').siblings().removeClass('active');
            var i = $(this).index('.left-content ul li');
            var height = 0;
            for (var j = 0; j < i; j++) {
                var className = '.item' + [j + 1];
                height += $(className).height();
            }
        	setFixed(i);
            rightContent.stop().animate({
                scrollTop: height
            }, 500,function(){
            	//console.log('是否动画中====',rightContent.is(':animated'))
            	//rightContent.bind("scroll",setScroll());
            	/*setTimeout(function(){
            		rightContent.bind("scroll",setScroll());
            	},3000)*/
            })
            //console.log("是否动画中",rightContent.is(':animated'))
        });
   	}
    
    /**
     * [重置当前title]
     * @param {String} i
     */
	var setFixed = function(i){
		rightDataContainer.find('.class-title').css({
            position:"",
            top:""
        })
        rightDataContainer.find(".list").css({marginTop:''})
        rightDataContainer.eq(i).find('.class-title').css({
            position:"fixed",
            top: defaultHeight + "px"
        })
        rightDataContainer.eq(i).find(".list").css({marginTop:'32px'})
	}
	
	return{
		init: function(){
			setInit();
			setClick();
			setScroll();
		}
	}
})();



//load
$(function() {
	Slide.init();
});
