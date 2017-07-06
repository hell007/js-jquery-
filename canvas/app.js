! function(){
	//class
	function CanvasPlayer(cfg){
		this.options = {
			videoSelector: '.js-video',
			canvasSelector: '.js-canvas',
			framesPerSecond: 25,
			hideVideo: true,
			autoplay: false,
			audio: false,
			timelineSelector: false,
		};
		
		$.extend(true,this.options,cfg);
		
		console.log(this.options);
		//获取dom对象
		
		return this;
	}
	
	window.CanvasPlayer = CanvasPlayer;
}();



/**
 *App
 */
var App = (function(){
	
	var global = {
		width:$(window).width(),
		height:$(window).height()
	};
	
	/**
	 * 设置画布的尺寸
	 * 注意：<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
	 * 页面 content="width=device-width 存在bug，需要在头部js判断进行渲染
	 */
	var canvas = {width:0,height:0};
	var setCanvasSize = function(){
		canvas.width = Math.ceil(global.height*0.8),
		canvas.height = global.height;
		$(".canvas").attr("width",canvas.width).attr("height",canvas.height);
		$(".canvas").css({"left":(320-canvas.width*0.5)+"px"});
	}
	// E
	
	
	
	var imageURL = "http://cdn1.wanleyun.cn/newlover/images/",
		images = [
			{"name":"img0","url":imageURL+"frame_0.jpg"},
			{"name":"img1","url":imageURL+"frame_1.jpg"},
			{"name":"img2","url":imageURL+"frame_2.jpg"},
			{"name":"img3","url":imageURL+"frame_3.jpg"},
			{"name":"img4","url":imageURL+"frame_4.jpg"},
			{"name":"img5","url":imageURL+"frame_5.jpg"},
			{"name":"img6","url":imageURL+"frame_6.jpg"},
			{"name":"img7","url":imageURL+"frame_7.jpg"},
			{"name":"img8","url":imageURL+"frame_8.jpg"},
			{"name":"img9","url":imageURL+"frame_9.jpg"},
			{"name":"img10","url":imageURL+"frame_10.jpg"}
		],
		imageSize = {width:800,height:1000},
		oimage = {},
	    oimageCount = 0,
		loaderProcess=0;
	/**
	 * 加载图片对象，当加载进度为100%的时候，即加载完成后绘制图片动画
	 */
	var setImageLoading = function(){
		//将图片数据封装在对象里面
		for(i=0;i<images.length;i++){
			oimage[images[i].name] = new Image();
			oimage[images[i].name].src = images[i].url;
			oimage[images[i].name].onload = function(){
				oimageCount++;
			}
		}	
		//loader定时器
		var loaderInterval = setInterval(function(){
			//计算加载百分百
			if(Math.ceil(oimageCount/images.length * 100)>= loaderProcess) loaderProcess++;
			//加载完成,清除定时器，然后开始绘制图片动画
			if(loaderProcess === 100){
				clearInterval(loaderInterval);
				setTimeout(function(){
					$("#image_box").show();	
					setImageCanvas();
				},500)
			}
			
		},50)
	}
	// E
	
	
	var isPlay = true;
	var index = 0;
	/**
	 * 设置图片动画
	 * 注意：图片需要在images.onload = function()后才能绘制
	 */
	var setImageCanvas = function(){
		$('.image_mask').eq(0).css("opacity",0.2).siblings(".image_mask").css("opacity",0);
		var imageCanvas = document.getElementById("imageCanvas");
		var imageCtx = imageCanvas.getContext("2d");
		imageCtx.clearRect(0,0,canvas.width,canvas.height);
		imageCtx.drawImage(oimage['img'+index],0,0,imageSize.width,imageSize.height,0,0,canvas.width,canvas.height);
		//图片动画
		imageAnimation = setInterval(function(){
			if (isPlay){
				index++;
			}else{
				index--
			}
			if(index>10) {
				index=10;
				isPlay = false;
			}
			if (index<0){
				index=1;
				isPlay=true;
			}
			imageCtx.drawImage(oimage['img'+index],0,0,imageSize.width,imageSize.height,0,0,canvas.width,canvas.height);
		},100)
	}
	
	
	
	//
	var setVideoCanvas = function(){
		$("#p_audio").attr("src","http://cdn1.wanleyun.cn/newlover/movie/p2.mp4");
		$("#p_video").attr("src","http://cdn1.wanleyun.cn/newlover/movie/p2.mp4");
		setTimeout(function(){
			$("#video_box").show();
			var canvasVideo = new CanvasVideoPlayer({
				videoSelector: '.js-video',
				canvasSelector: '.js-canvas',
				hideVideo: true,
				audio: true,
			});
			canvasVideo.play();	
		},1000)
		
	}
	
	
	
	
	
	
	return{
		init:function(){
			document.body.addEventListener("touchmove",function(e){e.preventDefault()},false);
			setCanvasSize();//设置画布尺寸  
		},
		handleImageCanvas:function(){
			setImageLoading();//绘制图片动画
		},
		handleVideoCanvas:function(){
			setVideoCanvas();
		}
	}
})();

//load
$(function(){
	App.init();
})
