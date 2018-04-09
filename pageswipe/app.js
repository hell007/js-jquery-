// JavaScript Document

var App = function(){
	//动画设置
	var animate ={
		linear:"linear",
		swing:"swing",
		jswing:"jswing",
		easeInQuad:"easeInQuad",
		easeOutQuad:"easeOutQuad",
		easeInOutQuad:"easeInOutQuad",
		easeInCubic:"easeInCubic", 
		easeOutCubic:"easeOutCubic",
		easeInOutCubic:"easeInOutCubic",
		easeInQuart:"easeInQuart",
		easeOutQuart:"easeOutQuart",
		easeInOutQuart:"easeInOutQuart", 
		easeInQuint:"easeInQuint",
		easeOutQuint:"easeOutQuint",
		easeInOutQuint:"easeInOutQuint",
		easeInSine:"easeInSine",
		easeOutSine:"easeOutSine",
		easeInOutSine:"easeInOutSine",
		easeInExpo:"easeInExpo",
		easeOutExpo:"easeOutExpo",
		easeInOutExpo:"easeInOutExpo",
		easeInCirc:"easeInCirc", 
		easeOutCirc:"easeOutCirc",
		easeInOutCirc:"easeInOutCirc",
		easeInElastic:"easeInElastic",
		easeOutElastic:"easeOutElastic",
		easeInOutElastic:"easeInOutElastic", 
		easeInBack:"easeInBack",
		easeOutBack:"easeOutBack",
		easeInOutBack:"easeInOutBack",
		easeInBounce:"easeInBounce",
		easeOutBounce:"easeOutBounce",
		easeInOutBounce:"easeInBounce"
	};
	var easing = animate.jswing;
	
	//单页高度设置 S
	var vHeight = null;
	var setPageHeight = function(){
		var documentH = getDocHeigth(),
			pageH = $(".page").height();
			documentH >= pageH ? vHeight = documentH : vHeight = pageH;
			//设置页面的高度
			$(".page").height(vHeight); 	
			$(".wrap").height(vHeight);
		
		function getDocHeigth() {
			if(document.compatMode == "BackCompat")
				var Node = document.body;
			else
				var Node = document.documentElement;
			 return Math.max(Node.scrollHeight,Node.clientHeight);
		}
	
	}
	// E
	
	//页面切换效果 S
	var Msize = $(".page").size(), 	//页面的数目
		pageIndex			= 1,			//初始页面位置
		initP			= null,			//初值控制值
		moveP			= null,			//每次获取到的值
		firstP			= null,			//第一次获取的值
		newM			= null,			//重新加载的浮层
		p_b				= null,			//方向控制值
		indexP			= null, 		//控制首页不能直接找转到最后一页
		move			= null,			//触摸能滑动页面
		start			= true, 		//控制动画开始
		startM			= null,			//开始移动
		position		= null,			//方向值
		DNmove			= false,		//其他操作不让页面切换
		canmove			= false;		//首页返回最后一页
		
	var setPageChange = function(){
		$(".page").on("mousedown touchstart",pageTouchstart);
		$(".page").on("mousemove touchmove",pageTouchmove);
		$(".page").on("mouseup touchend mouseout",pageTouchend);
		
		//触摸（鼠标按下）执行函数
		function pageTouchstart(e){
			if(e.type == "touchstart"){
				initP = window.event.touches[0].pageY;
			}else{
				initP = e.y || e.pageY;
				mousedown = true;
			}
			firstP = initP;	
		};
		
		//触摸移动（鼠标移动）执行函数
		function pageTouchmove(e){
			e.preventDefault();
			e.stopPropagation();	
	
			//判断是否开始或者在移动中获取值
			if(start||startM){
				startM = true;
				if (e.type == "touchmove") {
					moveP = window.event.touches[0].pageY;
				} else { 
					if(mousedown) moveP = e.y || e.pageY;
				}
				pageIndex == 1 ? indexP = false : indexP = true ;	//true 为不是第一页 false为第一页
			}
			
			//设置一个页面开始移动
			if(moveP&&startM){
				
				//判断方向并让一个页面出现开始移动
				if(!p_b){
					p_b = true;
					position = moveP - initP > 0 ? true : false;	//true 为向下滑动 false 为向上滑动
					if(position){
						//第一页禁止向上移动
						/*if(pageIndex == 1){ 
							move = null;
							return ;
						}*/
						//向下移动
						console.log("向下移动");
						if(indexP){								
							newM = pageIndex - 1 ;
							$(".page").eq(newM-1).addClass("active").css("top",-vHeight);
							move = true ;
						}else{
							if(canmove){
								move = true;
								newM = Msize;
								$(".page").eq(newM-1).addClass("active").css("top",-vHeight);
							}
							else move = false;
						}
								
					}else{
						//最后一页禁止向下移动
						/*if(pageIndex == Msize){ 
							move = null;
							return ;
						}*/
						//向上移动
						console.log("向上移动");
						if(pageIndex != Msize){
							newM = pageIndex + 1 ;
						}else{
							newM = 1 ;
						}
						$(".page").eq(newM-1).addClass("active").css("top",vHeight);
						move = true ;
					} 
				}
				
				//根据移动设置页面的值
				if(!DNmove){
					//滑动带动页面滑动
					if(move){	
						//开启声音
						if($("#controlBar").length>0 && audioSwitchBtn && Math.abs(moveP - firstP)>100){
							$("#controlBar")[0].play();
							audioLoop = true;
						}
					
						//移动中设置页面的值（top）
						start = false;
						var topV = parseInt($(".page").eq(newM-1).css("top"));
						$(".page").eq(newM-1).css({"top":topV+moveP-initP});	
						initP = moveP;
					}else{
						moveP = null;	
					}
				}else{
					moveP = null;	
				}
			}
		};
		
		//触摸结束（鼠标起来或者离开元素）执行函数
		function pageTouchend(e){	
				
			//结束控制页面
			startM =null;
			p_b = false;
			
			//关闭声音
			 setAudioClose();
			
			//判断移动的方向
			var move_p;	
			position ? move_p = moveP - firstP > 100 : move_p = firstP - moveP > 100 ;
			if(move){
				//切画页面(移动成功)
				if( move_p && Math.abs(moveP) >5 ){	
					$(".page").eq(newM-1).animate({"top":0},300,easing,function(){	
						//切换成功回调的函数
						success();
					})
				//返回页面(移动失败)
				}else if (Math.abs(moveP) >=5){	//页面退回去
					position ? $(".page").eq(newM-1).animate({"top":-vHeight},100,easing) : $(".page").eq(newM-1).animate({"top":vHeight},100,easing);
					$(".page").eq(newM-1).removeClass("active");
					start = true;
				}
			}
			/* 初始化值 */
			initP		= null,			//初值控制值
			moveP		= null,			//每次获取到的值
			firstP		= null,			//第一次获取的值
			mousedown	= null;			//取消鼠标按下的控制值
		};
		
		//页面切换成功执行函数
		function success(){						
			//设置页面的出现
			$(".page").eq(pageIndex-1).removeClass("show active").addClass("hide");
			$(".page").eq(newM-1).removeClass("active hide").addClass("show");
			
			// 滑动成功加载多面的图片
			setLazyPicture();
			
			//重新设置页面移动的控制值
			pageIndex = newM;
			start = true;
			
			//判断是不是最后一页，出现提示文字
			if(pageIndex == Msize) {
				canmove = true;
				$(".arrow").hide();
			}else{
				$("arrow").show();
			}
		}
	
	}
	//E
	
	//页面延迟加载图片 S
	//事先加载
	var setLoadPicture = function(){
		var lazyNode = $('.lazy-bk');
		lazyNode.each(function(){
			var self = $(this);
			if(self.is('img')){
				self.attr('src','data:images/pic.jpg');
			}else{
				self.css({
					'background-image'	: 'url(/images/loading.gif)',
					'background-size'	: '120px 120px'
	
				})
			}
		})	
		// 前三个页面的图片延迟加载
		setTimeout(function(){
			for(var i=0;i<3;i++){
				var node = $(".page").eq(i);
				if(node.length==0) break;
				if(node.find('.lazy-bk').length!=0){
					setLazyChange(node);
				}else continue;
			}
		},200)
	}
	//图片延迟加载
	var setLazyPicture = function(){
		for(var i=3;i<=5;i++){
			var node = $(".page").eq(pageIndex+i-1);
			if(node.length==0) break;
			if(node.find('.lazy-bk').length!=0){
				setLazyChange(node);
			}else continue;
		}
	}
	// 图片延迟替换函数
	function setLazyChange(node){
		var lazy = node.find('.lazy-bk');
		lazy.each(function(){
			var self = $(this),
				srcImg = self.attr('data-bk');

			$('<img />')
				.on('load',function(){
					if(self.is('img')){
						self.attr('src',srcImg)
					}else{
						self.css({
							'background-image'	: 'url('+srcImg+')',
							'background-size'	: 'cover'
						})
					}

					// 判断下面页面进行加载
					for(var i =0;i<$(".page").size();i++){
						var page = $(".page").eq(i);
						if($(".page").find('.lazy-bk').length==0) continue
						else{
							setLazyChange(page);
						}
					}
				}).attr("src",srcImg);
			self.removeClass('lazy-bk');
		})	
	}
	// E
	
	
	//场景音乐播放暂停操作 S
	//声音功能的控制
	audioSwitchBtn= true,			//声音开关控制值
	audioBtn		= true,			//声音播放完毕
	audioLoop		= false,		//声音循环
	audioTime		= null,         //声音播放延时
	audioTimeT		= null,			//记录上次播放时间
	audioInterval	= null,			//声音循环控制器
	audioStart		= null,			//声音加载完毕
	audioStop		= null,			//声音是否在停止
	mousedown		= null;			//PC鼠标控制鼠标按下获取值
	
	//设置声音状态
	var setAudioStatus = function(){	
		$(".audio").bind("click",function(){
			var controlBar = $(this).find("#controlBar");
			if(controlBar==undefined) return;
			if(audioSwitchBtn){
				//pause
				controlBar[0].pause();
				audioSwitchBtn = false;
				controlBar[0].currentTime = 0;
				$(this).find("li").eq(0).hide();
				$(this).find("li").eq(1).show();
			}else{
				//play
				controlBar[0].play();
				audioSwitchBtn = false;
				$(this).find("li").eq(1).hide();
				$(this).find("li").eq(0).show();
			}
			
		})
	}
	
	//关闭声音
	var setAudioClose = function(){
		if(audioBtn && audioLoop){
			audioBtn =false;
			audioTime = Number($("#controlBar")[0].duration-$("#controlBar")[0].currentTime)*1000;	
			if(audioTime<0){ audioTime=0; }
			if(audioStart){
				if(isNaN(audioTime)){
					audioTime = audioTimeT;
				}else{
					audioTime > audioTimeT ? audioTime = audioTime: audioTime = audioTimeT;
				}
			};
			if(!isNaN(audioTime)&&audioTime!=0){
				audioBtn =false;		
				setTimeout(
					function(){	
						$("#controlBar")[0].pause();
						$("#controlBar")[0].currentTime = 0;
						audioBtn = true;
						audioStart = true;	
						if(!isNaN(audioTime)&&audioTime>audioTimeT) audioTimeT = audioTime;
					},audioTime);
			}else{
				audioInterval = setInterval(function(){
					if(!isNaN($("#controlBar")[0].duration)){
						if($("#controlBar")[0].currentTime !=0 && $("#controlBar")[0].duration!=0 && $("#controlBar")[0].duration==$("#controlBar")[0].currentTime){
							$("#controlBar")[0].currentTime = 0;	
							$("#controlBar")[0].pause();
							clearInterval(audioInterval);
							audioBtn = true;
							audioStart = true;
							if(!isNaN(audioTime)&&audioTime>audioTimeT) audioTimeT = audioTime;
						}
					}
				},20)	
			}
		}
	}
	// E
		 
	
	return{
		init: function(){
			setPageHeight();//设置页面高度
			setLoadPicture();//设置图片事先加载部分
			setPageChange();//设置页面的切换
			setAudioStatus();//设置声音状态
		}
	}
}();

//load
$(function(){
	App.init();
})


//设备旋转提示
$(function(){
	var bd = $(document.body);
	window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', _orientationchange, false);
	function _orientationchange() {
		scrollTo(0, 1);
		switch(window.orientation){
			case 0:		//横屏
				bd.addClass("landscape").removeClass("portrait");
				init_pageH();					
				break;
			case 180:	//横屏
				bd.addClass("landscape").removeClass("portrait");	
				init_pageH();
				break;

			case -90: 	//竖屏

				init_pageH();
				//bd.addClass("portrait").removeClass("landscape");
				if($(".m-video video")[0]!=undefined && $(".m-video video")[0].paused){
						 alert("请竖屏查看页面，效果更佳");
				}else{
						alert("请竖屏查看页面，效果更佳");
				}

				break;
			case 90: 	//竖屏
				init_pageH();
				bd.addClass("portrait").removeClass("landscape");
				if($(".m-video video")[0].paused)
				alert("请竖屏查看页面，效果更佳");
				break;
		}
	}
	$(window).on('load',_orientationchange);
});
