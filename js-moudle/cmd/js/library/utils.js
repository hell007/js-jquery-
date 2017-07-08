//Utils CMD规范

define(function(require,exports,module){
	
var Utils = (function() {
	
	var instance;
 
	/**
	 * @class Utils
	 * @constructor
	 */
	function Utils() {
		instance = this;
		return this;
	}
	
	
/*==================字符处理===================*/
	/*  替换字符串 
	    @str        要处理的字符集
	    @oldStr     被替换的原字符
	    @newStr     将替换的新字符
	*/
	Utils.prototype.repalce = function(str,oldStr,newStr) {
		var reg = eval("/"+oldStr+"/g");   
    		return str.replace(reg,newStr);
	};
	/*  Trim:清除两边空格 
	    @str  要处理的字符集
	*/
	Utils.prototype.trim = function(str){
	    if (typeof str == 'string') return str.replace(/(^\s*)|(\s*$)/g, '');
	}
	/*  LTrim:清除左边的空格 
	    @str        要处理的字符集
	*/
	Utils.prototype.ltrim = function(str){
	    if (typeof str == 'string') return str.replace(/(^\s*)/g, '');
	}
	/*  RTrim: 清除右边的空格 
	    @str        要处理的字符集
	*/
	Utils.prototype.rtrim = function(str){
	    if (typeof str == 'string') return str.replace(/(\s*$)/g, '');
	}	
	/*  清除前后的非字符 同trim
	    @str        要处理的字符集
	*/
	Utils.prototype.strip = function(str){
	    if (typeof str == 'string') return str.replace(/^\s+/, '').replace(/(^\s*)|(\s*$)/g, '');
	}	
	/*  过滤字符里面的HTML标签
	    @str        要处理的字符集
	*/
	Utils.prototype.stripTags = function(str){
		if (typeof str == 'string')return str.replace(/<\/?[^>]+>/gi, '').replace(/(^\s*)|(\s*$)/g, '');
	}

/*==============验证类函数=======================*/
	/**
	 * 判断当前对象是否为空
	 * @method isEmpty
	 * @param {Object} obj
	 * @return {Boolean} empty 当为 null,undefined,"" 将返回true
	 */
	Utils.prototype.isEmpty = function(obj){
		return (this.trim(obj)=='' || obj == null || typeof obj == "undefined" || obj.length == 0);
	}
	/**
	 * 判断当前对象是否非空
	 * @method isNotEmpty
	 * @param {Object} obj
	 * @return {Boolean}  
	 */
	Utils.prototype.isNotEmpty = function(obj){
		return !this.isEmpty(obj);
	}
	/**
	 * 判断是否为函数
	 * @method isFunc
	 * @param {Object} fun
	 * @return {Boolean}
	 */
	Utils.prototype.isFunc = function(fun){
		return (fun != null && typeof fun == "function");
	}
	/**
	 * 判断是否为数组
	 * @method isArray
	 * @param {Object} array
	 * @return {Boolean}
	 */
	Utils.prototype.isArray = function(array){
		return this.isNotEmpty(array) && className(array) == "Array";
	}
	/**
	 * 判断不是数组
	 * @method isNotArray
	 * @param {Object} arr
	 * @return {Boolean}
	 */
	Utils.prototype.isArray = function(arr){
		return !isArray(arr);;
	}
	/**
	 * 判断当前是否处在iframe中
	 * @method isIframe
	 * @return {Boolean}
	 */
	Utils.prototype.isIframe = function(){
		return top.location != self.location;
	} 
	/**
	 * 判断当前不处在iframe中
	 * @method isIframe
	 * @return {Boolean}
	 */
	Utils.prototype.isNotIframe = function(){
		return !isIframe();
	}
	/**
	 * 阻止浏览器默认事件
	 * @method stopDefault
	 * @param {Object} event 浏览器事件对象
	 */
	Utils.prototype.stopDefault = function(event) {
		event.preventDefault();
		event.returnvalue = false;
	}
	/**
	 * 判断浏览器是否支持html5本地存储
	 */
	Utils.prototype.isSupportLocalStorage = function(){
		return (('localStorage' in window) && window['localStorage'] !== null);
	}
	
/*==============验证类函数=======================*/
	/*  是否是数字型数据
	    @n        字符集
	*/
	Utils.prototype.isNumber = function(n){
		if (this.isNotEmpty(n) && typeof n == 'number'){return !isNaN(n);}return false;
	}
	/*  是否是自然数型数据
	    @n        字符集
	*/
	Utils.prototype.isInt = function(n){
		if (/^(\+|-)?\d+$/.test(n) && typeof n == 'number'){return true;}else{return false;}
	}
	/* 是否为英文字母（字符集）
	 * @str       字符集
	 */
	Utils.prototype.isLetter = function(str){
		if (/^[A-Za-z]+$/.test(str)){return true;}else{return false;}
	}
	/*是否为大写字母（字符集）*/
	Utils.prototype.isUpper = function(str){
		if (/^[A-Z]+$/.test(str)){return true;}else{return false;}
	}
	/*是否为小写字母（字符集）*/
	Utils.prototype.isLower = function(str){
		if(/^[a-z]+$/.test(str)){return true;}else{return false;}
	}
	/* 是否是中文字符
    @str        字符集
	*/
	Utils.prototype.isChina = function(str){
		if (/^[\一-\龥]+$/.test(str)){return true;}else{return false;}
	}
	/*  是否为正确的网址
	    @str        字符集
	*/
	Utils.prototype.isUrl = function(str){
		if(/^(\w+:\/\/)?\w+(\.\w+)+.*$/.test(str)){return true;}else{return false;}
	}
	/*  是否为正确的Email形式
    @str        字符集
	*/
	Utils.prototype.isEmail = function(str){
		var myReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	    if(myReg.test(str)){return true;}else{return false;}
	}
	/*  是否为正确的手机号码
	    @str        字符集
	*/
	Utils.prototype.isMobile = function(str){
		var regu =/^1[3|4|5|8]{1}[0-9]{9}$/;   
    		var re = new RegExp(regu);   
    		if (re.test(str)){return true;}else{return false;}
	}
	/*  是否为正确的电话号码
	    @str        字符集
	*/
	Utils.prototype.isTell = function(str){
		var regu =/(^(0\d{2})-?(\d{8})$)|(^(0\d{3})-?(\d{7,8})$)/;   
    		var re = new RegExp(regu);   
    		if (re.test(str)){return true;}else{return false;}
	}
	/*  是否为正确的电话号码
	    @str        字符集
	*/
	Utils.prototype.isPhone = function(str){
    		if (this.isMobile(str)){
    			return true;
    		}else if(this.isTell(str)){
    			return true;
    		}else{
    			return false;
    		}
	}
	/*  是否为图片文件
	    @filepath        文件路径 字符集
	*/
	Utils.prototype.isPicture = function(filepath){
		var filepath = filepath || null;
		if(this.isNotEmpty(filepath)) return false;
		//获得上传文件名
	    var fileArr=filepath.split("\\");
	    var fileTArr=fileArr[fileArr.length-1].toLowerCase().split(".");
	    var filetype=fileTArr[fileTArr.length-1];
	    //切割出文件后缀文件名
	    if(filetype != "jpg" && filetype != "jpeg" && filetype != "gif" && filetype != "png" && filetype != "bmp"){
	        return false;
	    }else{
	        return true;
	    }
	}

	return Utils;	
})();
	
module.exports = new Utils();
})
