define(function(require,exports,module){
	
	var $ = require("library/jquery/jquery2");
	
	/* 
	 * @ 浏览器cookie的 增、删、改、查
	 * @auther kunyujie.com
	 * @method  cookie  
	 * @description 默认配置参数          
	 * @param {String} name - 
	 * @param {String} value -
	 * @param {Number} options -
	 * @example  
	 * cookie("test1", "hell world");
	 * cookie('test1', null);
	 * cookie('test1', "hi world");
	 * var test = cookie("test1");
	*/
	! function Cookie(){
		
		function Cookie(name, value, options) {
			if (typeof value != 'undefined') {
				options = options || {};
				if (value === null) {
					value = '';
					options = $.extend({}, options);
					options.expires = -1;
				}
				var expires = '';
				if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
					var date;
					if (typeof options.expires == 'number') {
						date = new Date();
						//以天为单位
						date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
					} else {
						date = options.expires;
					}
					expires = '; expires=' + date.toUTCString();
				}
				var path = options.path ? '; path=' + (options.path) : '';
				var domain = options.domain ? '; domain=' + (options.domain) : '';
				var secure = options.secure ? '; secure' : '';
				document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
			} else {
				var cookieValue = null;
				if (document.cookie && document.cookie != '') {
					var cookies = document.cookie.split(';');
					for (var i = 0; i < cookies.length; i++) {
						var cookie = $.trim(cookies[i]);
						if (cookie.substring(0, name.length + 1) == (name + '=')) {
							cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
							break;
						}
					}
				}
				return cookieValue;
			}
		};
		window.Cookie = Cookie;
	}();

	module.exports = Cookie;
})