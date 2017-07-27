!function(){
	
	function XwDialog(cfg){
		this.config = {   
	        width: 260,
	        height: 'auto',   
	        type : 'alert',
	        title: '提示框',
	        content: '正在处理',  
	        alertBtnText: '关闭',
	        windowDom: window,   
	        setTime: 20000,   
	        autoClose: 0,
	        hasMask: true,    
	        hasMaskWhite: false,   
	        clickDomCancel: false,  
	        hasBtn: true,
	        callBack: null 
	    }; 
	    $.extend(this.config,cfg || {});    
	    if(XwDialog.prototype.boundingBox) return;    
	    this.init(this.config.type);
		return this;
	}
	
	//外层box  
	XwDialog.prototype.boundingBox = null;  
	  
	//初始化
	XwDialog.prototype.init = function(tipType,container){    
		if(this.config.type === 'comfirm') this.config.title = '确认框';
	    this.renderUI(tipType);   
	    //绑定事件  
	    this.bindEvent();     
	    //初始化UI  
	    this.syncUI();   
	    $(container || this.config.windowDom.document.body).append(XwDialog.prototype.boundingBox);     
	};  
	  
	//渲染UI  
	XwDialog.prototype.renderUI = function(tipType){   
	    XwDialog.prototype.boundingBox = $("<div id='xw-dialog' class='xw-dialog'></div>");         
		tipType === 'alert' && this.renderCommonUI();
		tipType === 'confirm' && this.renderCommonUI();
		tipType === 'smsconfirm' && this.renderSMSConfirmUI();
	    XwDialog.prototype.boundingBox.appendTo(this.config.windowDom.document.body);  
	                  
	    //是否显示遮罩  
	    if(this.config.hasMask){  
	        this.config.hasMaskWhite ? this._mask = $("<div class='xw-mask-white'></div>") : this._mask = $("<div class='xw-mask-default'></div>");  
	        this._mask.appendTo(this.config.windowDom.document.body);  
	    }     
	    // 是否显示按钮
	    if(this.config.hasBtn){
	        switch(this.config.type){
	            case 'alert':
	            	$(".xw-dialog-btn").append("<button class='xw-center-button xw-close-button'>"+this.config.alertBtnText+"</button>");
	                break;
	            case 'smsconfirm':case 'confirm':
	            	$(".xw-dialog-btn").append("<button class='xw-close-button'>取消</button><button class='xw-ok-button'>确定</button>");
	                break;
	            default: break;
	        }
	        //关闭/取消
	        $('.xw-close-button').on('click',function(){_this.close();});
	        //确定
	        $('.xw-ok-button').on('click',function(){_this.confirm();});
	    }
	};  
	
	/**
	 * 遮罩层事件
	 */
	XwDialog.prototype.bindEvent = function(){  
	    _this = this;             
	    //点击空白立即取消  
	    this.config.clickDomCancel && this._mask && this._mask.click(function(){_this.close();});  
	    //定时消失   
	    //this.config.autoClose && typeof this.config.callBack != "function" && (this.config.autoClose = 1);  
	    //this.config.autoClose && this.config.setTime && setTimeout( function(){ _this.close(); }, _this.config.setTime );   
	};
	
	
	/**
	 * 根据配置参数进行css重置
	 */
	XwDialog.prototype.syncUI = function(){             
	    XwDialog.prototype.boundingBox.animate({  
	        width: $("#xw-dialog").width(),  
	        height: $("#xw-dialog").height(),  
	        marginLeft: "-"+($("#xw-dialog").width()/2)+'px',  
	        marginTop: "-"+($("#xw-dialog").height()/2)+'px'
	    });
	};  
	   
	/**
	 *根据type类型，渲染是alert 还是confirm的弹出框
	 */
	XwDialog.prototype.renderCommonUI = function(){  
	    var html =" <div class='xw-dialog-content'>"+this.config.content+"</div>";  
	    	html += "<div class='xw-dialog-btn'></div>";
	    XwDialog.prototype.boundingBox.append(html);  
	};
	
	/**
	 *根据type类型，渲染是SMSConfirm的弹出框
	 */
	XwDialog.prototype.renderSMSConfirmUI = function(){ 
	    var html =" <div class='xw-dialog-content xw-dialog-check-content'>";
	    	html +="<div class='xw-check-item'><input type='text' maxlength='11' placeholder='请输入手机号码' class='xw-mobile xw-input' /></div>";
	    	html +="<div class='xw-check-item'><input type='text' maxlength='6' placeholder='输入验证码' class='xw-checkcode xw-input wx-input-40' />";
	    	html +="<span class='xw-code-btn'>点击获取</span></div><p class='xw-dialog-tips'></p></div>";
	    	html += "<div class='xw-dialog-btn'></div>";
	    XwDialog.prototype.boundingBox.append(html); 
	};
	
	  
	/**
	 * 点击关闭按钮或者取消按钮  销毁dialog
	 */
	XwDialog.prototype.close = function(){       
	    this.destroy();  
	};  
	
	/**
	 * 点击确定按钮进行回调操作
	 */
	XwDialog.prototype.confirm = function(){ 
	    this.config.setTime && typeof this.config.callBack === "function" && this.config.callBack();                  
	}; 
	  
	/**
	 * 销毁 
	 */
	XwDialog.prototype.destroy = function(){  
		this._mask && this._mask.remove();  
	    XwDialog.prototype.boundingBox && XwDialog.prototype.boundingBox.remove();   
	    XwDialog.prototype.boundingBox = null;  
	};  
	
	window.XwDialog = XwDialog;
}();
