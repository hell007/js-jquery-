 
/*  
 * @弹出提示层 ( 加载动画(load), 提示动画(tip), 成功(success), 错误(error), )  
 * @method  tipBox  
 * @description 默认配置参数   
 * @param {Number} width -宽度  
 * @param {Number} height -高度         
 * @param {String} str -默认文字  
 * @param {Object} windowDom -载入窗口 默认当前窗口  
 * @param {Number} setTime -定时消失(毫秒) 默认为0 不消失  
 * @param {Boolean} hasMask -是否显示遮罩  
 * @param {Boolean} hasMaskWhite -显示白色遮罩   
 * @param {Boolean} clickDomCancel -点击空白取消  
 * @param {Function} callBack -回调函数 (只在开启定时消失时才生效)  
 * @param {Function} hasBtn -显示按钮  
 * @param {String} type -动画类型 (加载,成功,失败,提示)  
 * @example   
 * new TipBox();   
 * new TipBox({type:'success',content:'成功'}});   
*/  
 
 var TipBox = (function(cfg) {
	
	/**
	 * @class TipBox
	 * @constructor
	 */
	function TipBox(cfg) {
	    this.config = {   
	        width: 260, 
	        height: 206,   
	        type : 'success',//弹出框类型  success error  tips
	        title: '提示框', //弹出框提示文本
	        content: '正在处理',  //提示文本内容
	        alertBtnText: '关闭',//alert 按钮文本内容
	        windowDom: window,   
	        hasMask: true,    //是否显示遮罩层
	        hasMaskWhite: false, //是否是白色遮罩层 默认不支持 黑色遮罩层
	        clickDomCancel: false,  //点击遮罩层关闭弹出框  默认不支持
	        hasBtn: true, //是否显示确定  取消 关闭  按钮   默认显示
	        closeCallback: null, //关闭按钮点击触发回调    null默认是关闭弹出框 ，如果进行其他操作请重写function(){}
	        cancleCallback: null, //取消按钮点击触发回调    null默认是关闭弹出框 ，如果进行其他操作请重写function(){}
	        confirmCallback: null  //确定按钮点击触发回调   null默认是关闭弹出框 ，如果进行其他操作请重写function(){}
	    };
	    $.extend(this.config,cfg || {});        
	    //存在就retrun  
	    if(TipBox.prototype.boundingBox) return;      
	    //初始化  
	    this.init(this.config.type);
		return this;
	}
  
	//外层box  
	TipBox.prototype.boundingBox = null;  
	  
	/**
	 * 渲染  
	 * @param {Object} tipType
	 * @param {Object} container
	 * @return {void}
	 */
	TipBox.prototype.init = function(tipType,container){    
	    this.renderUI(tipType);     
	    //绑定事件  
	    this.bindEvent();   
	    //初始化UI  
	    this.syncUI();   
	    $(container || this.config.windowDom.document.body).append(TipBox.prototype.boundingBox);     
	};  
	  

	/**
	 * 渲染UI 
	 * @param {Object} tipType
	 * @return {void}
	 */
	TipBox.prototype.renderUI = function(tipType){   
	    TipBox.prototype.boundingBox = $("<div id='animationTipBox'></div>");         
	    tipType == 'success' && this.successRenderUI();   
	    tipType == 'error'   && this.errorRenderUI();  
	    tipType == 'tip'     && this.tipRenderUI();  
	    TipBox.prototype.boundingBox.appendTo(this.config.windowDom.document.body);  
	    
	    //是否显示遮罩  
	    if(this.config.hasMask){  
	        this.config.hasMaskWhite ? this._mask = $("<div class='mask-white'></div>") : this._mask = $("<div class='mask-default'></div>");  
	        this._mask.appendTo(this.config.windowDom.document.body);  
	    }     
	    // 是否显示按钮
	    if(this.config.hasBtn){
	        switch(this.config.type){
	            case 'success':
	            	$(".success").after("<button class='o-button closeButton'>"+ this.config.alertBtnText +"</button>");
	                break;
	            case 'error':
	            	$(".lose").after("<button class='o-button red-button closeButton'>"+ this.config.alertBtnText +"</button>");
	                break;
	            case 'tip':
	            	$(".tip").after("<button class='o-button r-button okButton'>确定</button><button class='o-button g-button closeButton'>取消</button>");
	                break;
	            default: break;
	        }
	    } 
	};  
	  
	  
	/**
	 * 事件绑定
	 * @return {void}
	 */
	TipBox.prototype.bindEvent = function(){  
	    _this = this;                   
	    //点击空白立即取消  
	    this.config.clickDomCancel && this._mask && this._mask.click(function(){_this.close()}); 
	    //关闭
        $('.closeButton').off().on('click',function(){
        	_this.config.closeCallback && typeof _this.config.closeCallback==='function' ? _this.config.closeCallback() : _this.close()
        })
        //取消
        $('.xw-cancle-button').off().on('click',function(){
        	_this.config.cancleCallback && typeof _this.config.cancleCallback==='function' ? _this.config.cancleCallback() : _this.close()
        })
        //确定
        $('.okButton').off().on('click',function(){
        	_this.config.confirmCallback && typeof _this.config.confirmCallback==='function' ? _this.config.confirmCallback() : _this.close()
        })
	}; 
	
	
	/**
	 * 根据配置参数进行css重置
	 * @return {void}
	 */
	TipBox.prototype.syncUI = function(){             
	    TipBox.prototype.boundingBox.css({  
	        width       : this.config.width+'px',  
	        height      : this.config.height+'px',  
	        marginLeft  : "-"+(this.config.width/2)+'px',  
	        marginTop   : "-"+(this.config.height/2)+'px'  
	    });   
	};  
	  
	  
	/**
	 *根据type类型，渲染是tip的弹出框
	 * @return {void}
	 */
	TipBox.prototype.tipRenderUI = function(){  
	    var tip = "<div class='tip'>";  
	        tip +="     <div class='icon'>i</div>";  
	        tip +="     <div class='dec-txt'>"+this.config.content+"</div>";  
	        tip += "</div>";  
	    TipBox.prototype.boundingBox.append(tip);  
	};  
	  

	/**
	 *根据type类型，渲染是success的弹出框
	 * @return {void}
	 */
	TipBox.prototype.successRenderUI = function(){  
	    var suc = "<div class='success'>";  
	        suc +=" <div class='icon'>";  
	        suc +=      "<div class='line-short'></div>";  
	        suc +=      "<div class='line-long'></div>  ";        
	        suc +=  "</div>";  
	        suc +=" <div class='dec-txt'>"+this.config.content+"</div>";  
	        suc += "</div>";  
	    TipBox.prototype.boundingBox.append(suc);  
	};  
	  
	  
	/**
	 *根据type类型，渲染是error的弹出框
	 * @return {void}
	 */
	TipBox.prototype.errorRenderUI = function(){  
	    var err  = "<div class='lose'>";  
	        err +=  "   <div class='icon'>";  
	        err +=  "       <div class='icon-box'>";  
	        err +=  "           <div class='line-left'></div>";  
	        err +=  "           <div class='line-right'></div>";  
	        err +=  "       </div>";  
	        err +=  "   </div>";  
	        err +=  "<div class='dec-txt'>"+this.config.content+"</div>";  
	        err +=  "</div>";  
	    TipBox.prototype.boundingBox.append(err);  
	};   
	  
	  
	/**
	 * 点击关闭按钮或者取消按钮  销毁dialog
	 * @return {void}
	 */
	TipBox.prototype.close = function(){       
	    this.destroy(); 
	};  
	
	  
	/**
	 * 销毁 
	 * @return {void}
	 */ 
	TipBox.prototype.destroy = function(){  
	    this._mask && this._mask.remove();  
	    TipBox.prototype.boundingBox && TipBox.prototype.boundingBox.remove();   
	    TipBox.prototype.boundingBox = null;  
	};  
	
	return TipBox;	

})();
 
 
 
