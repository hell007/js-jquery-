! function(){
	"use strict";
	function FormValidate(cfg){ 
		this.defaults = {                
	        tag:'msg',       
	        //hasBtn:false, 
	        container:'#formId'  
	    }  
		$.extend(this.defaults,cfg);
		//初始化    
		this.defaults.$container = $(this.defaults.container);
		return this;
	}
	
	/**
	 * checked fun:对form的 isRquired必须参数的验证
	 */
	FormValidate.prototype.checked = function() {
		var self = this,
			res = {flag:true,msg:''},
			$container = self.defaults.$container;
		$.each($container.find("input[isRequired],textarea[isRequired],select[isRequired]"), function(i, o) {
			$(o).poshytip('destroy');
			res.msg = $.trim($(o).attr(self.defaults.tag));
			
			if ($.trim($(o).val()) == ""){
				self.tip($(o),$(o).attr(self.defaults.tag));
				return res.flag = false;
			};
			
			res = self.onSwitch(o,$(o).attr("validatetype"));
			
			if (!res.flag) {
				self.tip($(o), res.msg);
				return res.flag
			}
		});
		if (!res.flag) {
			return res.flag
		}
		return true;
	}
	
	/**
	 * mayFilChecked fun:对form的 mayFil参数的验证
	 */
	FormValidate.prototype.mayFilChecked = function() {
		var self = this,
			res = {flag:true,msg:''},
			$container = self.defaults.$container;
		$.each($container.find("input[mayFil],textarea[mayFil]"), function(i, o) {
			$(o).poshytip('destroy');
			res.msg = $.trim($(o).attr(self.defaults.tag));
			if ($.trim($(o).val()) == "") return true;
			
			res = self.onSwitch(o,$(o).attr("validatetype"));
			
			if (!res.flag) {
				self.tip($(o), res.msg);
				return res.flag
			}
		});
		if (!res.flag) {
			return res.flag
		}
		return true
	}
	
	/**
	 * blurChecked fun:对form的 isRequired mayFil参数的onBlur验证
	 */
	FormValidate.prototype.blurChecked = function() {
		var self = this,
			msg = "",
			$container = self.defaults.$container;
		$container.find("input[isRequired]").on("blur",function(){
			self.onBlur(this,type="isRequired");
		});
		$container.find("textarea[isRequired]").on("blur",function(){
			self.onBlur(this,type="isRequired");
		});
		$container.find("select[isRequired]").on("blur",function(){
			self.onBlur(this,type="isRequired");
		});
		$container.find("input[mayFil]").on("blur",function(){
			self.onBlur(this,type="mayFil");
		});
		$container.find("textarea[mayFil]").on("blur",function(){
			self.onBlur(this,type="mayFil");
		});
	}
	
	/**
	 * onBlur fun:对form的 isRequired mayFil参数的onBlur验证
	 * @param {Object} o
	 * @param {Object} type
	 */
	FormValidate.prototype.onBlur = function(o,type){
		var self = this,
			res = {};
		if ($.trim($(o).val()) == "") {
			if(type=="mayFil") return $(o).poshytip('destroy');;
			return self.tip($(o), $(o).attr(self.defaults.tag));
		}
		
		res = self.onSwitch(o,$(o).attr("validatetype"));
		
		if (!res.flag) {
			return self.tip($(o), res.msg);
		}
		$(o).poshytip('destroy');
	}
	
	/**
	 * onSwitch fun:对form的 isRequired mayFil参数的validatetype验证
	 * @param {Object} o
	 * @param {Object} validatetype
	 */
	FormValidate.prototype.onSwitch = function(o,validatetype){
		var self = this, 
			flag = true,msg='',
			res = {flag:true,msg:''};
		switch (validatetype) {
			case "String":
				flag = self.validate(o, "String");
                msg = "请输入2个以上字符!";
				break;
			case "Nospecial":
				if(self.specialString($(o).val())){
                		flag = false;
                		msg = "不能输入特殊字符！"
                }else{
                		flag = self.validate(o, "String");
                		msg = "请输入2个以上字符!";
                } 
				break;
			case "Int":
				flag = self.validate(o, "Int");
				msg = "请输入整数！";
				break;
			case "Float":
				flag = self.validate(o, "Float");
				msg = "请输入浮点数！";
				break;
			case "Date":
				flag = self.validate(o, "Date");
				msg = "请输入日期型！";
				break;
			case "Zip":
				flag = self.validate(o, "Zip");
				msg = "请输入正确的邮编！";
				break;
			case "Email":
				flag = self.validate(o, "Email");
				msg = "请输入正确的邮箱格式！";
				break;
			case "PID":
				flag = self.validate(o, "PID");
				msg = "请输入正确的身份证格式！";
				break;
			case "Tell":
				flag = self.validate(o, "Tell");
				msg = "请输入正确的固定电话格式！";
				break;
			case "FN":
				flag = self.validate(o, "FN");
				msg = "请输入正确的传真号码！";
				break;
			case "Phone":
				flag = self.validate(o, "Phone");
				msg = "请输入正确的手机号码！";
				break;
			case "Money":
				flag = self.validate(o, "Money");
				msg = "请输入正确的金额！";
				break;
			case "Day":
				flag = self.validate(o, "Day");
				msg = "请输入正确的天数！";
				break;
			case "Url":
				flag = self.validate(o, "Url");
				msg = "请输入正确的网址！";
				break;
			case "QQ":
				flag = self.validate(o, "QQ");
				msg = "请输入正确的QQ号码！";
				break;
		}
		res.flag = flag;
		res.msg = msg;
		return res;
	}
	
	/**
	 * tip fun:对poshytip方法的封装
	 * @param {Object} o
	 * @param {String} msg
	 **/
	FormValidate.prototype.tip = function(o,msg){
		$(o).poshytip('destroy');
	    $(o).poshytip({
	        className: 'tip-yellowsimple',
	        content: msg,
	        showOn: 'none',
	        alignTo: 'target',
	        alignX: 'inner-left',
	        offsetX: 0,  
	        offsetY: 5   
	    });
	    $(o).poshytip('show');
	    $(o).focus();
	}
	
	/**
	 * validate fun:对类型的验证
	 * @param {Object} o
	 * @param {String} validatetype
	 **/
	FormValidate.prototype.validate = function(o,validatetype){
		var reg, res;
	    switch (validatetype) {
	    		case "String"://用户名,可以为中文
				reg = /[\w\u4e00-\u9fa5]{2,255}$/;
				break;
			case "Pwd"://密码
				reg = /^\w{4,20}$/;
				break;
			case "Num"://数字
				reg = /^\d{1,10}$/;
				break;
			case "Int"://整形
				reg = /^[-\+]?\d+$/;
				break;
			case "Float"://浮点型
				reg = /^[0-9]+(.[0-9]{1,10})?$/;
				break;
			case "Date"://日期
				reg = /^((\\d{4})|(\\d{2}))-(\\d{1,2})-(\\d{1,2})$/;
				break;
			case "Zip": //邮编
	            reg = /^\d{6}$/;
	            break;
			case "Email"://邮箱
				reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
				break;
			case "PID"://身份证
				reg = /^(^\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
				break;
			case "Tell"://固定电话
				reg = /^[0-9,-]{5,30}$/;
				break;
			case "FN"://传真
				reg = /^[0-9,-]{7,30}$/;
				break;
			case "Phone"://手机
				reg = /^((\(\d{3}\))|(\d{3}\-))?0?1[358][0-9]\d{8}([,]((\(\d{3}\))|(\d{3}\-))?0?1[358][0-9]\d{8}){0,2}$/;
				break;
			case "Money"://金额
				reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
				break;
			case "Day"://天数
				reg = /(^[1-9]([0-9]+)?(\.[0-9]{1})?$)|(^(0){1}$)|(^[0-9]\.[0-9]?$)/;
				break;
			case "Url"://网址
				reg = /([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/; //不包括"http://"
	            //re = /http:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
				break;
			case "QQ"://QQ
				reg = /^\d{5,10}$/;
				break;
			default:
				return false;	  
	    }
	    return res = reg.test($.trim($(o).val()));
	}
	
	FormValidate.prototype.specialString = function(str){ 
		var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）|{}【】‘；：”“'。，、？]");
		return pattern.test(str);
//		var rs = ""; 
//		for (var i = 0; i < str.length; i++) { 
//			rs = rs+str.substr(i, 1).replace(pattern, ''); 
//		} 
//		return rs; 
	} 
	
	window.FormValidate = FormValidate;
}();

