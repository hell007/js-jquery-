// JavaScript Document
define(function(require,exports,module){
	
	var $ = require('library/jquery/jquery2');
	
	var imgLazyLoad = function(){
		/**
	     * 配置对象，初始化是传入src表示图片的真实地址在img中的属性
	     * time 表示延时加载时间
	     */
	    var imgConfig = null,
	    //图片数组对象，将所有需要延时加载的Img标签全部存入数组中
	    docImgs = new Array(),
	    //已经加载的图片
	    hasLoadImg = [];
		
		var preLoad = function( _options ){
	        imgConfig = (arguments.length == 0)?{src:'name',time:300,filter:null}:{src:_options.src,time:_options.time,filter:_options.filter};
	        //获取所有的img标签
	        docImgs = document.images;
	        //获取需要延时加载的图片
	        if ( typeof imgConfig.filter === 'function' ){
	            imgs = [];
	            for ( var i = 0; i < docImgs.length; i++ ){
	                if ( imgConfig.filter(docImgs[i]) )
	                    imgs.push(docImgs[i]);
	            }
	            docImgs = imgs;
	        }  
	        //添加滚动事件
	        window.onscroll = function(){
	            setTimeout(function(){
	                loadImg();
	            },imgConfig.time);
	        }
	         
	        setTimeout(function(){
	            loadImg();
	        },imgConfig.time);
	    }
		
		//加载图片
		var loadImg = function(){
	        if ( docImgs.length == 0 ){
	            window.onscroll = null;
	            return;
	        } 
	        //滚动条与页面顶部的高度
	        var offsetPage = window.pageYOffset ? window.pageYOffset : window.document.documentElement.scrollTop;  
	        var offsetWindow = offsetPage + Number(window.innerHeight ? window.innerHeight : document.documentElement.clientHeight);  
	        var _len = docImgs.length;
	        if ( _len <= 0 || _len == undefined )   return;
	         
	        for ( var i = 0; i < _len; i++ ){
	            if ( hasLoadImg[i] != undefined )  continue;
	  
	            //获取属性
	            var attrSrc = docImgs[i].getAttribute(imgConfig.src);
	            var o = docImgs[i];
	            var _tagName = o.nodeName.toLowerCase();
	            if ( o ){
	                //图片与页面顶部的高度
	                var postPage = o.getBoundingClientRect().top + window.document.documentElement.scrollTop + window.document.body.scrollTop; 
					var postWindow = postPage + $(o).height();
	                //判断是否符合加载图片的条件
	                if ( postPage > offsetPage && postPage < offsetWindow || postWindow > offsetPage && postWindow < offsetWindow){
	                    if ( _tagName === "img" && attrSrc !== null ){
							$(this).removeClass("ploading");
							o.setAttribute("src",attrSrc);
	                        o.removeAttribute(attrSrc);
	                        hasLoadImg[i] = o;
	                    }
	                    o = null;
	                }
	            }
	        }    
	    }
		
		return{
			init: function(opts){
				preLoad(opts);
			}
		}
		
	}();
	
	module.exports = imgLazyLoad;
})






