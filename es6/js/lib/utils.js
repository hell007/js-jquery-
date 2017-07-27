/**
 * Utils
 */
! function() {

	function Utils(cfg) {
		this.config = {};
		this.config = $.extend(this.config, cfg);
		return this;
	}

	/*==================字符处理===================*/
	/*替换字符串 
    @str        要处理的字符集
    @oldStr     被替换的原字符
    @newStr     将替换的新字符
	*/
	Utils.prototype.repalce = function(str, oldStr, newStr) {
		var reg = eval("/" + oldStr + "/g");
		return str.replace(reg, newStr);
	};
	/*Trim:清除两边空格 
    @str  要处理的字符集
        请使用$.trim()
	*/
	Utils.prototype.trim = function(str) {
		if(typeof str == 'string') return str.replace(/(^\s*)|(\s*$)/g, '');
	}
	/*LTrim:清除左边的空格 
	@str 要处理的字符集
	*/
	Utils.prototype.ltrim = function(str) {
		if(typeof str == 'string') return str.replace(/(^\s*)/g, '');
	}
	/*RTrim: 清除右边的空格 
	@str 要处理的字符集
	*/
	Utils.prototype.rtrim = function(str) {
		if(typeof str == 'string') return str.replace(/(\s*$)/g, '');
	}
	/*清除前后的非字符 同trim
	@str 要处理的字符集
	*/
	Utils.prototype.strip = function(str) {
		if(typeof str == 'string') return str.replace(/^\s+/, '').replace(/(^\s*)|(\s*$)/g, '');
	}
	/*过滤字符里面的HTML标签
	@str 要处理的字符集
	*/
	Utils.prototype.stripTags = function(str) {
		if(typeof str == 'string') return str.replace(/<\/?[^>]+>/gi, '').replace(/(^\s*)|(\s*$)/g, '');
	}

	/*==============验证类函数=======================*/
	/**
	 * 判断当前对象是否为空
	 * @method isEmpty
	 * @param {Object} obj
	 * @return {Boolean} empty 当为 null,undefined,"" 将返回true
	 */
	Utils.prototype.isEmpty = function(obj) {
		return(this.trim(obj) == '' || obj == null || typeof obj == "undefined" || obj.length == 0);
	}
	/**
	 * 判断当前对象是否非空
	 * @method isNotEmpty
	 * @param {Object} obj
	 * @return {Boolean}  
	 */
	Utils.prototype.isNotEmpty = function(obj) {
		return !this.isEmpty(obj);
	}
	/**
	 * 判断是否含有特殊字符
	 * @param {Object} str
	 */
	Utils.prototype.isContainSpecial = function(str) {
//	    var wordsArray = new Array("％", "%", ".", ",", "。", "，", "’", "'", ";", "?", "=", ":", "：", "*", "●", "▲", "■", "@", "＠", "◎", "★", "※", "＃", "〓", "＼", "§", "☆", "○", "◇", "◆", "□", "△", "＆", "＾", "￣", "＿", "♂", "♀", "Ю", "┭", "①", "「", "」", "≮", "§", "￡", "∑", "『", "』", "⊙", "∷", "Θ", "の", "↓", "↑", "Ф", "~", "Ⅱ", "∈", "┣", " ┫", "╋", "﹉", "＃", "＠", "＆", "＊", "※", "§", "〃", "№", "〓", "○", "●", "△", "▲", "◎", "☆", "★", "◇", "◆", "■", "□", "▼", "▽", "㊣", "℅", "ˉ", "￣", "＿", "﹍", "﹊", "﹎", "﹋", "﹌", "﹟", "﹠", "﹡", "♀", "♂", "?", "⊙", "↑", "↓", "←", "→", "↖", "↗", "↙", "↘", "┄", "︴", "﹏", "（", "）", "︵", "︶", "｛", "｝", "︷", "︸", "〔", "〕", "︹", "︺", "【", "】", "︻", "︼", "《", "》", "︽", "︾", "〈", "〉", "︿", "﹀", "「", "」", "﹁", "﹂", "『", "』", "﹃", "﹄", "﹙", "﹚", "﹛", "﹜", "﹝", "﹞", "\"", "〝", "〞", "ˋ", "ˊ", "≈", "≡", "≠", "＝", "≤", "≥", "＜", "＞", "≮", "≯", "∷", "±", "＋", "×", "÷", "／", "∫", "∮", "∝", "∧", "∨", "∞", "∑", "∏", "∪", "∩", "∈", "∵", "∴", "⊥", "∥", "∠", "⌒", "⊙", "≌", "∽", "√", "≦", "≧", "≒", "≡", "﹢", "﹣", "﹤", "﹥", "﹦", "～", "∟", "⊿", "∥", "㏒", "㏑", "∣", "｜", "︱", "︳", "|", "／", "＼", "∕", "﹨", "¥", "€", "￥", "£", "®", "™", "©", "，", "、", "。", "．", "；", "：", "？", "！", "︰", "…", "‥", "′", "‵", "々", "～", "‖", "ˇ", "ˉ", "﹐", "﹑", "﹒", "·", "﹔", "﹕", "﹖", "﹗", "&", "*", "#", "`", "~", "=", "(", ")", "^", "%", "$", "@", ";", ",", ":", "'", "\\", "/", ".", ">", "<", "?", "!", "[", "]", "{", "}");
//  	var len = wordsArray.length;
//	    for (var i = 0; i < len; i++) {
//	        if (str.indexOf(wordsArray[i]) != -1) {
//	            return wordsArray[i];
//	        }
//	    }
//	    return "";
    	var reg = new RegExp("[`~!@#$^&*()%=|{}':;',\\[\\].<>/?~！@#￥……&*%（）|{}【】‘；：”“'。，、？]");
		return reg.test(str);
	}
	/**
	 * 判断是否为函数
	 * @method isFun
	 * @param {Object} fun
	 * @return {Boolean}
	 */
	Utils.prototype.isFun = function(fun) {
		return(fun != null && typeof fun == "function");
	}
	/**
	 * 判断是否为数组
	 * @method isArray
	 * @param {Object} arr
	 * @return {Boolean}
	 */
	Utils.prototype.isArray = function(arr) {
		return Object.prototype.toString.call(arr) == '[object Array]';
	}
	/**
	 * 判断浏览器是否支持html5本地存储
	 */
	Utils.prototype.isSupportLocalStorage = function() {
		return(('localStorage' in window) && window['localStorage'] !== null);
	}
	/**
	 * 是否是数字型数据
	 * @param {Object} n
	 */
	Utils.prototype.isNumber = function(n) {
		if(this.isNotEmpty(n) && typeof n == 'number') {
			return !isNaN(n);
		}
		return false;
	}
	/**
	 * 是否是自然数型数据
	 * @param {Object} n
	 */
	Utils.prototype.isInt = function(n) {
		if(/^(\+|-)?\d+$/.test(n) && typeof n == 'number') {
			return true;
		} else {
			return false;
		}
	}
	/**
	 * 是否为英文字母
	 * @param {String} str
	 */
	Utils.prototype.isLetter = function(str) {
		return /^[A-Za-z]+$/.test(str)
	}
	/**
	 * 是否为大写字母
	 * @param {String} str
	 */
	Utils.prototype.isUpper = function(str) {
		return /^[A-Z]+$/.test(str)
	}
	/**
	 * 是否为小写字母
	 * @param {String} str
	 */
	Utils.prototype.isLower = function(str) {
		return /^[a-z]+$/.test(str)
	}
	/**
	 * 是否是中文字符
	 * @param {String} str
	 */
	Utils.prototype.isChina = function(str) {
		return /^[\一-\龥]+$/.test(str)
	}
	/**
	 * 是否为正确的网址
	 * @param {String} str 字符集
	 */
	Utils.prototype.isUrl = function(str) {
		return /^(\w+:\/\/)?\w+(\.\w+)+.*$/.test(str)
	}
	/**
	 * 是否为正确的Email形式
	 * @param {String} str 字符集
	 */
	Utils.prototype.isEmail = function(str) {
		return /^([a-zA-Z0-9._-])+@([a-zA-Z0-9._-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(str);
	}
	/**
	 * 是否为正确的手机号码
	 * @param {String} str 字符集
	 */
	Utils.prototype.isMobile = function(str) {
		var reg = /^1[3|4|5|8]{1}[0-9]{9}$/;
		return new RegExp(reg).test(str)
	}
	/**
	 * 是否为正确的电话号码
	 * @param {String} str 字符集
	 */
	Utils.prototype.isTell = function(str) {
		var reg = /(^(0\d{2})-?(\d{8})$)|(^(0\d{3})-?(\d{7,8})$)/;
		return new RegExp(reg).test(str)
	}
	/**
	 * 是否为正确的电话号码
	 * @param {String} str 字符集
	 */
	Utils.prototype.isPhone = function(str) {
		if(this.isMobile(str)) {
			return true;
		} else if(this.isTell(str)) {
			return true;
		} else {
			return false;
		}
	}
	/**
	 * 是否为图片文件
	 * @param {Object} filepath 文件路径 字符集
	 */
	Utils.prototype.isPicture = function(filepath) {
		var filepath = filepath || null;
		if(this.isNotEmpty(filepath)) return false;
		//获得上传文件名
		var fileArr = filepath.split("\\");
		var fileTArr = fileArr[fileArr.length - 1].toLowerCase().split(".");
		var filetype = fileTArr[fileTArr.length - 1];
		//切割出文件后缀文件名
		if(filetype != "jpg" && filetype != "jpeg" && filetype != "gif" && filetype != "png" && filetype != "bmp") {
			return false;
		} else {
			return true;
		}
	}
	
	/*==============help类函数=======================*/
	
	/**
	 * 获取字符串长度 （一个中文字符长度为2）
	 * @param str
	 */
	Utils.prototype.getLength = function(str) {
	    if (this.isEmpty(str)) return 0;
	    var strlen = 0;
	    for (var i = 0; i < str.length; i++) {
	        if (str.charCodeAt(i) > 128) {
	            strlen += 2;
	        }
	        else {
	            strlen++;
	        }
	    }
	    return strlen;
	}
	/**
	 * 截取指定长度字符串 （包含中文字符）
	 * @param str
	 * @param len  28 ==14个中文字符，含符号
	 */
	Utils.prototype.subStrCharacter = function(str, len) {
	    var strlen = 0;
	    var s = "";
	    if (this.isEmpty(str)) return s;
	    var tmpLen = this.getLength(str);
	    for (var i = 0; i < str.length; i++) {
	        if (str.charCodeAt(i) > 128) {
	            strlen += 2;
	        }else {
	            strlen++;
	        }
	        s += str.charAt(i);
	        if (strlen >= len && strlen < tmpLen) {
	            return s + "...";
	        }
	    }
	    return s;
	}
	/**
	 * //将时间戳转换成时间格式
	 * @param {Number} ns
	 */
	Utils.prototype.formatDate = function(ns){
		var d = this.isNumber(ns) ? new Date(ns) : new Date(parseInt(ns)),
		  	m = d.getMonth() + 1,
		  	t = d.getDate(),
		  	h = d.getHours(), 
		  	min = d.getMinutes(),    
		  	s = d.getSeconds();  
		  	
		  if (m < 10) {
		    m = '0' + m.toString()
		  }
		  if (t < 10) {
		    t = '0' + t.toString()
		  }
		  var str = d.getFullYear().toString() + "-" + m + "-" + t + " " + h + ":" + min + ":" + s;
		  return str
	}
	/**
	 * 时间格式(2014-02-02 14:10:00)转换成时间戳
	 * @param {Object} date
	 */
	Utils.prototype.formatTimestamp = function(date){
	  var arr = date.replace(/:/g,"-").replace(/ /g,"-").split("-");
	  var timestamp = new Date(Date.UTC(arr[0],arr[1]-1,arr[2],arr[3]-8,arr[4],arr[5]));
	  return timestamp.getTime();
	}
	
	

	window.Utils = Utils;
}();

if (typeof define === 'function' && define.amd) {
	define('utils', ['jquery'], function(utils) {
      return Utils;
    });
}
