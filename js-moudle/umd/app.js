/**
 * UMD ：兼容了AMD和CommonJS，同时还支持老式的“全局”变量规范：
 * App全局
 * @param {Object} root
 * @param {Object} factory
 */
(function(root, factory) {
	if(typeof module !== 'undefined' && typeof exports === 'object') {
		//Node, CommonJS之类的
		module.exports = factory(root.App);
	} else if(typeof define === "function" && define.amd) {
		//AMD
		define(["App"], function(App) {
			return(root.App = factory(App));
		});
	} else {
		// 浏览器全局变量(root 即 window)
		root.App = factory(root.App);
	}
}(this, function(App) {
	//方法
	App = {
        /**
         * 时间插件调用  依赖 mui.picker mui.dtpicker
         * @param {Object} selecter
         * @param {Object} settings
         */
        openDatePicker: function(selecter,settings){
			var optionsJson = $(selecter).attr('data-options') || settings;
			var dtpicker = new $.DtPicker(optionsJson);
			dtpicker.show(function(rs) {
				$(selecter).prev("span").text(rs.text);
				$(selecter).next("input").val(rs.text);
				dtpicker.dispose();
			});
		},
		/**
		 * 返回一个全年字符串 2017
		 */
		getFullYear: function(){
			var myDate = new Date();
			return myDate.getFullYear();
		},
		/**
		 * 返回一个当月字符串 1
		 */
		getMonth: function(){
			var myDate = new Date();
			return myDate.getMonth();
		},
		/**
		 * 返回一个当日字符串 5
		 */
		getDate: function(){
			var myDate = new Date();
			return myDate.getDate();
		},
		/**
		 * 搜索框
		 * @param {Object} form
		 * @param {Object} input
		 * @param {Object} fun
		 */
		search: function(form,input,fun){
			var self = this;
			$(form).off().on("submit",function(event){
				var keywords = $(this).find(input).val();
				if(fun && typeof fun === 'function') fun(keywords);
				event.preventDefault();
			})
		},
		/**
		 * 底部按钮点击打开二级菜单
		 */
		handleShowMenu: function(obj,target){
			$(obj).on("click",function(){
				var $target = $(this).children(target),
					_hide = $target.css("display");
				return _hide==='none' ? $target.show() : $target.hide(); 
			})
		}

	
	};
	//暴露公共方法
	return App;
}));

//暴露一个方法
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals (root is window)
        root.returnExports = factory(root.jQuery);
    }
}(this, function ($) {
    //    methods
    function myFunc(){};

    //    exposed public method
    return myFunc;
}));


// 暴露多个方法的写法
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery', 'underscore'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS之类的
        module.exports = factory(require('jquery'), require('underscore'));
    } else {
        // 浏览器全局变量(root 即 window)
        root.returnExports = factory(root.jQuery, root._);
    }
}(this, function ($, _) {
    // 方法
    function a(){};    //    私有方法，因为它没被返回 (见下面)
    function b(){};    //    公共方法，因为被返回了
    function c(){};    //    公共方法，因为被返回了
 
    //    暴露公共方法
    return {
        b: b,
        c: c
    }
}));
