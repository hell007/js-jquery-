//app全局模块

define(function(require, exports, module){

	//引用jquery模块
	var $ = require('library/jquery/jquery2');				
	
	

	var App = function(){
		
		//设置全局对象
		var golbal ={
			winW:$(window).width(),
			winH:$(window).height(),
			maskDom:$('<div class="layout_mask"></div>'),
			rootDom:$('body') || window.document.body
		}
		
		
		/*
		 * 跨域请求 S
		 * url:请求地址
		 * param:提交参数
		 * fun:数据处理
		 */
		var setJOSNP = function(url, param, fun){		    	
		    	//jsonp方式
		    $.ajax({  
		        type : "get",  
		        async:false,  
		        url : url,  
		        dataType : "jsonp",//数据类型为jsonp  
		        jsonp:"callback",
			    jsonpCallback:'jsonp_success',
		        success:function(data){  
		           console.log(data);
		        },  
		        error:function(){  
		           console.log('fail');  
		        }  
		    }); 
		}
		//E
		
		
		/*
		 * 异步提交任务 S
		 * url:请求地址
		 * param:提交参数
		 * fun:数据处理
		 */
		var setAsyncTask = function(url, param, fun) {
		    $.ajax({
		        type: "post",
		        url: url,
		        async: false,
		        data: param,
		        cache: false,
		        dataType: "json",
		        success: function(data) {   	
		            if (data != null) {
		               console.log('获取成功！');
		               fun ? fun() : null;
		            }
		        },
		        error: function() {
		            console.log('获取失败！');
		        }
		    });
		};
		//E


		/*
		 * 禁止浏览器的默认行为 S
		 */
		var setPreventDefault = function(){
//			$(window).on("scroll.elasticity",function(e){
//				e.preventDefault();
//			}).on("touchmove.elasticity",function(e){
//				e.preventDefault();
//			}).on("doubleTap",function(e){
//				e.preventDefault();
//			})
			$("body").css({width:golbal.winW,height:golbal.winH,position:"fixed"});
		}
		//解除禁止行为
		var setAllowPreventDefault = function(){
			$("body").css({width:"auto",height:"auto",position:"relative"});
		}
		// E
		
		/**
		 * 遮罩层
		 */
		var setOpenMask = function(){
			golbal.maskDom.css({
				width:"100%",
				height:"100%",
				position:"fixed",
				left:"0",
				top:"0",
				zIndex:"100",
				background:"#000",
				opacity:".4",
				display:"block"
				});
			golbal.maskDom.appendTo(golbal.rootDom);  
		}
		/**
		 * 移除遮罩层
		 */
		var setRemoveMask = function(){
			golbal.maskDom.remove();
		}
		// E
		
		
		/*
		 * tab选项卡 S
		 */
		var setSwitchDoor = function(navItem,tabBd,events,clazz){
			var _navItem = $(navItem), _tabBd = $(tabBd);
			$.each(_navItem, function(_i, _obj){
				$(_obj).off().on(events, function(){
				  	$(_navItem).removeClass(clazz);
					$(_navItem[_i]).addClass(clazz)
					$(_tabBd).hide();
					$(_tabBd[_i]).show();
				});
			});
		}
		// E
		
		
		
		/*
		 * 设置菜单的展开与收起 S
		 *text:提示文本
		 */
		var setToogleMenu = function(){
			$(".h_menu_toggle_btn").on("click",function(){
				//禁止滚动
				setPreventDefault();
				setOpenMask();
				$(".layout_menu_bar").addClass("active").animate({left:0});
			});
			$("body").on("click",".layout_mask",function(){
				var w = $(".layout_menu_bar").width();
					setRemoveMask();
					$(".layout_menu_bar").animate({left:-w},500,function(){
						$(this).removeClass("active");
					});
				setAllowPreventDefault();//解除禁止
			});
		}
		// E
		
		
		//加载menuBar
		var setLoadMenuBar = function(){
			$('#menuBar').load('menuBar.html')
		}
		
		//图片滚动 S
		var setImageScroll = function(obj){
			var sWidth = $(obj).width(),
			ulObj = $(obj).find("ul"),
			len = $(ulObj).find("li").length,
			index = 0,
			picTimer,
			btn = "<div class='btn'>";
			for(var i=0; i < len; i++) {
				btn += "<span></span>";
			}
			$(obj).append(btn);
		
			//为小按钮添加鼠标滑入事件，以显示相应的内容
			$(obj + " .btn span").mouseenter(function() {
				index = $(obj + " .btn span").index(this);
				showPics(index);
			}).eq(0).trigger("mouseenter");
			
			//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
			$(obj).hover(function() {
				clearInterval(picTimer);
			},function() {
				picTimer = setInterval(function() {
					showPics(index);
					index++;
					if(index == len) {index = 0;}
				},4000); 
			}).trigger("mouseleave");
			
			$(ulObj).css("width",sWidth * (len));
			
			function showPics(index) { 
				var nowLeft = -index*sWidth; 
				$(ulObj).stop(true,false).animate({"left":nowLeft},300); 
				$(obj + " .btn span").removeClass("on").eq(index).addClass("on"); 
			}
		}
		//图片滚动 E
		
		//提示消息上下滚动 S
		var AutoScroll = function(obj) {
			var h = $(obj).height();
			$(obj).find("ul:first").animate({marginTop:-h}, 500, function(){
				$(this).css({ marginTop: "0" }).find("li:first").appendTo(this);
			});
		}
		
		var doTextScrollUp = function(obj){
			var noticeTimer = setInterval(function(){AutoScroll(obj)}, 2000);
			$(obj).hover(function() { clearInterval(noticeTimer); }, function() { noticeTimer = setInterval(function(){AutoScroll(obj)}, 2000) });
		}
		
		//提示消息上下滚动 E
		
		
		//类似接口调用方式
		return{
			init:function(){
				setLoadMenuBar();
				setToogleMenu();//menuBar toggle
			},
			handleAsyncTask:function(url, param, fun){//异步提交
				setAsyncTask(url, param, fun);
			},
			handleJSONP:function(url, param, fun){ //  跨域请求
				setJOSNP(url, param, fun);
			},
			handleTab:function(tabItem,tabBox,events,clazz){//选项卡 滑动门
				setSwitchDoor(tabItem,tabBox,events,clazz)
			}
		}
	}();
	
	//对外提供app对象接口
	module.exports = App;
})
