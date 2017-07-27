/**
 * App
 */
!function(){
	//constructor
	function App(cfg){
		this.config = {};	
		this.asynFlag = true;
		this.color = "red";
		this.config = $.extend(this.config, cfg);
		return this;
	}
	
	//设置全局对象
	var golbal ={
		winW:$(window).width(),
		winH:$(window).height(),
		maskDom:$('<div class="layout_mask"></div>'),
		rootDom:$('body') || window.document.body
	};
	
	/**
	 * 弹出遮罩层
	 */
	App.prototype.handleOpenMask = function(){
		golbal.maskDom.css({
			width:"100%",
			height:"100%",
			position:"absolute",
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
	App.prototype.handleRemoveMask = function(){
		golbal.maskDom.remove();
	}
	
	
	/**
	 * 
	 * @param {Object} res
	 */
	App.prototype.init = function(res){    
    		console.log(res);
	}; 
	
	
	/**
	 * 跨域请求 
	 * @param {String} url 请求链接地址
	 * @param {Boolean} async 是否采用异步方式加载数据
	 * @param {Object} param 发送请求时附带参数数据
	 * @param {Function} callback fun
	 */
	App.prototype.handleJSONP = function(url, async, param, fun){		    	
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
	
	
	/**
	 * ajax请求/提交
	 * @param {String} url 请求链接地址
	 * @param {Boolean} async 是否采用异步方式加载数据
	 * @param {Object} param 发送请求时附带参数数据
	 * @param {Function} callback fun
	 */
	App.prototype.handleAjax = function(url,async,param,fun){
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
	            //new TipBox({type:'error',str:'提交出错了!',hasBtn:true});
	        }
	    });
	}
	
	
	/**
	 * tab选项卡
	 * @param {String} navItem
	 * @param {String} tabBd
	 * @param {String} events
	 * @param {String} clazz
	 */
	App.prototype.handleTabs = function(navItem,tabBd,events,clazz){
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
	
	
	/**
	 * 图片延迟加载
	 * @param {Object} option
	 * use
	 * .ploading{background-color:#ccc;background:url(images/loding.gif) no-repeat center;}
	 * <img lazy-src="imgUrl" class="ploading"  alt=" " />
	 * lazyload({defObj: ".index-f-saleBanner ul"})
	 */
	App.prototype.handleLazyload = function (option) {
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
	
	
	
	window.App = App;
}();


/**
 * 子类继承父类方法
 * 深度拷贝继承
 * @param {Object} Child
 * @param {Object} Parent
 */
function extend(Child, Parent) {
	if (!Child || typeof Child !== 'function') return false;
    var p = Parent.prototype;
    var c = Child.prototype;
    for (var i in p) {
        c[i] = p[i];
    }
}
