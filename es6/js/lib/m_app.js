// JavaScript Document

var App = (function(){
	
	
	/**
	 * 跨域请求 
	 * @param {String} url 请求链接地址
	 * @param {Boolean} async 是否采用异步方式加载数据
	 * @param {Object} param 发送请求时附带参数数据
	 * @param {Function} callback fun
	 * @return {void}
	 */
	var setJOSNP = function(url, async, param, fun){		    	
	    //jsonp方式
	    $.ajax({  
	        type : "get",  
	        async: async || true,//（默认为true 异步）  false表示同步加载，会在ajax的success执行完成之后 
	        data: param,
	        url : url,  
	        dataType : "jsonp",//数据类型为jsonp  
	        jsonp:"callback",
		    jsonpCallback:'jsonp_success',
	        success:function(data){  
	        		if(fun && typeof fun === 'function') fun(data);
	        },  
	        error:function(){  
	           new TipBox({type:'error',str:'提交出错了!',hasBtn:true});
	        }  
	    }); 
	}
	//E
	
	
	
	/**
	 * ajax请求/提交
	 * @param {String} url 请求链接地址
	 * @param {Boolean} async 是否采用异步方式加载数据
	 * @param {Object} param 发送请求时附带参数数据
	 * @param {Function} callback fun
	 * @return {void}
	 */
	var setAjax = function(url,async,param,fun){
	    $.ajax({
	        type: "post",
	        url: url,
	        async: async || true,//（默认为true 异步）  false表示同步加载，会在ajax的success执行完成之后 
	        data: param,
	        cache: false,
	        dataType: "json",
	        success: function(data) {   	
	            if (data != null) {
	               if(fun && typeof fun === 'function') fun(data);
	            }
	        },
	        error: function() {
	            new TipBox({type:'error',str:'提交出错了!',hasBtn:true});
	        }
	    });
	}
	//E



	/**
	 * tab选项卡
	 * @param {String} navItem
	 * @param {String} tabBd
	 * @param {String} events
	 * @param {String} clazz
	 * @return {void}
	 */
	var setSwitchTabs = function(navItem,tabBd,events,clazz){
		var navItem = $(navItem), tabBd = $(tabBd);
		$.each(navItem, function(i, obj){
			$(obj).off().on(events, function(){
			 	$(navItem).removeClass(clazz);
				$(navItem[i]).addClass(clazz)
				$(tabBd).hide();
				$(tabBd[i]).show();
			});
		});
	}
	// E
	
	
	
	/**
	 * 图片延迟加载
	 * @param {Object} option
	 * @return {void}
	 * use
	 * .ploading{background-color:#ccc;background:url(images/loding.gif) no-repeat center;}
	 * <img lazy-src="imgUrl" class="ploading"  alt=" " />
	 * app.handleLazyload({defObj: ".index-f-saleBanner ul"})
	 */
	var setLazyload = function (option) {
	    var settings = {defObj: null, defHeight: 0};
	    settings = $.extend(settings, option || {});
	    var defHeight = settings.defHeight;
	    var img = (typeof settings.defObj == "object") ? settings.defObj.find("img") : $(settings.defObj).find("img");
	    var pageTop = function () {
	        return document.documentElement.clientHeight + Math.max(document.documentElement.scrollTop, document.body.scrollTop) - settings.defHeight;
	    };
	    var imgLoad = function () {
	        img.each(function () {
	            if ($(this).offset().top <= pageTop()) {
	                var imageSource = $(this).attr("lazy-src");
	                if (imageSource) {
	                    $(this).attr("src", imageSource).removeAttr("lazy-src");
	                }
	            }
	        });
	    };
	    imgLoad();
	    $(window).on("scroll", function () {
	        imgLoad();
	    });
	}
	// E
	
	
	
	/**
	 * placeholder模拟 
	 * @return {void}
	 */
	/*var setPlaceholder = function(obj){
		var temval=$(obj).val();
		$(obj).focus(function(){
		    if($(this).val()==temval){
				$(this).val("");
			}
	   })
	   .blur(function(){ 
		   if($(this).val()=="") $(this).val(temval); 
	   })
	}*/
	var setPlaceholder = function(){
		if(!placeholderSupport()){   // 判断浏览器是否支持 placeholder
		    $('[placeholder]').focus(function() {
		        var input = $(this);
		        if (input.val() == input.attr('placeholder')) {
		            input.val('');
		            input.removeClass('placeholder');
		        }
		    }).blur(function() {
		        var input = $(this);
		        if (input.val() == '' || input.val() == input.attr('placeholder')) {
		            input.addClass('placeholder');
		            input.val(input.attr('placeholder'));
		        }
		    }).blur();
		};
		
		function placeholderSupport() {
		    return 'placeholder' in document.createElement('input');
		}
	}	
	// E
	
	
	
	/**
	 * 全选 反选
	 * @return {void}
	 */
	var clickCheckbox = function(){
	    $(".chooseAll").click(function(){
	        var status=$(this).prop('checked');
	        $("tbody input[type='checkbox']").prop("checked",status);
	        $(".chooseAll").prop("checked",status);
	        $(".unsetAll").prop("checked",false);
	    });
	    $(".unsetAll").click(function(){
	        var status=$(this).prop('checked');
	        $("tbody input[type='checkbox']").each(function(){
	            $(this).prop("checked",! $(this).prop("checked"));
	        });
	        $(".unsetAll").prop("checked",status);
	        $(".chooseAll").prop("checked",false);
	    });
	}
	// E
	
	
	
	/**
	 * 初始化窗口尺寸
	 * @return {void}
	 */
	var autoSize = function(){
	    var webBodyWidth=$(window).width();
	    var webBodyHight=$(window).height()
	    var h=(webBodyHight-80);
	    h=h<300?300:h;
	    $('#control').css('height',h+'px');
	    var btns=$(".commonBtnArea").length;
	    var rh=btns>0?h-50:h;
	    $('#Right').css({
	        height:rh+'px',
	        width:(webBodyWidth-230)+'px'
	    });
	    if(btns>0){
	        $(".commonBtnArea").css({
	            width:(webBodyWidth-210-40-16)+'px'
	        });
	    }
	    var c_s=0;
	    $('#control').click(function(){
	        if(c_s==1){
	            if(btns>0){
	                $(".commonBtnArea").animate({
	                    width:(webBodyWidth-210-40-16)+'px'
	                }, "fast");
	            }
	            $("#Right").animate({
	                width: (webBodyWidth-230)+'px'
	            }, "fast");
	            $("#Left").animate({
	                marginLeft:"0px"
	            }, "fast");
	            $(this).removeClass("close");
	            c_s=0;
	        }else{
	            if(btns>0){
	                $(".commonBtnArea").animate({
	                    width: (webBodyWidth-66)+'px'
	                }, "fast");
	            }
	            $("#Right").animate({
	                width: (webBodyWidth-26)+'px'
	            }, "fast");
	            $("#Left").animate({
	                marginLeft:"-197px"
	            }, "fast");
	            $(this).addClass("close");
	            c_s=1;
	        }
	    });
	}
	// E
	
	
	
	/**
	 * 导航滑动 
	 * @return {void}
	 */
	var setMenuListSlide = function(){
		var crumbs = $(".jsSubMenu").find("li.current").children("a").text();
		$("#crumbs").text(crumbs);
	}
	// E
	


	/**
	 * 单选按钮模拟 
	 * @param {Object} option
	 * @param {Object} radioID
	 * @return {void}
	 */
	var setRadioDfaut = function(option,radioID){
		if(option.checked){
			$(radioID).children(".radio-li-w").eq(option.no).addClass("checked");	
			$(radioID).children(".radio-li-w").eq(option.no).children("input").attr("checked",true);	
		}
	};
	//点击操作选择状态
	var setRadioChecked = function(radioLiObj,fun){
		$(radioLiObj).off().on("click",function(){
			$(this).addClass("checked").siblings("div.radio-li-w").removeClass("checked");
			if(fun && typeof fun === 'function') fun();
		})
	};
	// E



	/**
	 * 退出 登录
	 * @return {void}
	 */
	var setLoginOut = function(){
		$(".loginOut").off().on("click",function(){
			new TipBox({type:'tip',str:'确定要退出？',setTime:10000500,hasBtn:true,callBack:function(){    
				$.post("login/logout",{},
				function(data){
					if(data.success){
						window.location.href="login/login";
					}
				},'json');
		    }});
		});
	};
	// E
	


	/**
	 * 单条数据删除 
	 * @param {Object} url
	 * @param {Object} json
	 * @param {Object} tr dom
	 * @return {void}
	 */
	var deleteOne = function(url,json,tr){
		new TipBox({type:'tip',str:'确定要删除吗？',setTime:10000500,hasBtn:true,callBack:function(){   
			
			setAjax(url,true,json,function(data){
				if(data.success){
					tr.remove();
				}else{
					new TipBox({type:'error',str:data.message,hasBtn:true});
				}
			});
			
	    }});
	};
	// E
	


	/**
	 * 批量删除 
	 * @param {Object} delUrl
	 * @param {Object} json
	 * @param {Object} number 要删除的数据总数
	 * @param {Object} ids
	 * @return {void}
	 */
	var deleteMore = function(url,json,number,ids){
		new TipBox({type:'tip',str:'确定要删除'+ number +'条数据吗？',setTime:10000500,hasBtn:true,callBack:function(){    
			
			setAjax(url,true,json,function(data){
				if(data.success){
					for(var i=0;i<ids.length;i++){
						$("#tr-"+ids[i]).remove();
					}
				}else{
					new TipBox({type:'error',str:data.message,hasBtn:true});
				}
			});
			
	    }});
	};
	// E
	
	return{
		init: function(){
			clickCheckbox();//全选
			autoSize();//
			setMenuListSlide();//导航菜单滑动
			$(window).resize(autoSize);
			setLoginOut();//退出
			//var time=self.setInterval(function(){$("#today").html(date("Y-m-d H:i:s"));},1000);
		},
		switchTabs: function(swLi,swDiv,evt,currClazz){
			setSwitchTabs(swLi,swDiv,evt,currClazz); //选项卡
		},
		placeholder: function(obj){
			setPlaceholder(obj);
		},
		radioModel:function(option,radioID,radioLiObj,fn){
			setRadioDfaut(option,radioID);//初始化设置
			setRadioChecked(radioLiObj,fn);//点击选择
		},
		delMore: function(url,json,number,ids){
			deleteMore(url,json,number,ids); //批量删除
		},
		delOne: function(url,id,tr){
			deleteOne(url,id,tr); //单条删除
		},
	};
})();


//加载init
$(function(){	
	App.init();
})


 
