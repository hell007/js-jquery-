//app子模块

define(['jquery'], function($){
	
		//设置全局对象
		var golbal ={
			winW:$(window).width(),
			winH:$(window).height(),
			maskDom:$('<div class="layout_mask"></div>'),
			rootDom:$('body') || window.document.body
		};
			
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
		};
		
		/**
		 * 移除遮罩层
		 */
		var setRemoveMask = function(){
			golbal.maskDom.remove();
		};
		// E
		
		//
		return {
			handleOpenMask: setOpenMask,
			handleRemoveMask: setRemoveMask
		};
});
