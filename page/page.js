/*  
 * @分页组件
 * @method  Page
 * @cfg 默认配置参数   
 * @param {Number} total -总页数  
 * @param {Number} showSize -分页显示页数
 * @param {Number} current -当前页（默认是第一页）
 * @param {Object} itemType -分页dom  （a/span/...）
 * @param {String} href -分页锚点(默认null)，仅仅支持 itemType===a标签
 * @param {Object} container -分页父容器Dom id
 * @param {Function} action -回调函数
 * @example   
var page = new Page({
    container: 'page', //父容器id
    itemType: 'span', //分页dom类型
    href: '',//分页锚点
    total: 237,    //总页数
    pageSize:3,
    onChange: function(current) {
    	//上锁
    	page.disable();
    	//获取数据
  		//成功page.refresh()
    	page.refresh();
    	//异步等待的时候page.enable(),等刷新成功后，解锁
    	page.enable();
        console.log('page22:' + current);
    }
});
*
*/

//面向对象第二种写法 ！ ~  + - 
! function() {
	function Page(cfg) {
		//默认设置
		this.defaults = {
			container: 'paging', //父容器id
	        itemType: 'span', //分页dom类型
	        href: '',  // 分页锚点(默认'')  href="#comment"
	        total: 0,     //总页数
	        pageIndex: 1, //默认页
	        pageSize: 10, //默认分页大小
	        onChange: $.noop,//分页改变或分页大小改变时的回调
        	allowActivedClick: true,//控制当前页是否允许重复点击刷新
	        middlePageItems: 4,//中间连续部分显示的分页项
	        frontPageItems: 3,//分页起始部分最多显示3个分页项，否则就会出现省略分页项
	        backPageItems: 2,//分页结束部分最多显示2个分页项，否则就会出现省略分页项
	        ellipseText: '...',//中间省略部分的文本
	        prevText: '上一页',
	        nextText: '下一页',
	        prevDisplay: true,//是否显示上一页按钮
	        nextDisplay: true,//是否显示下一页按钮
	        firstText: '首页',
	        lastText: '尾页',
	        firstDisplay: false,//是否显示首页按钮
	        lastDisplay: false,//是否显示尾页按钮
	        redirectText:'确定',
	        redirectDisplay: true //是否显示跳转输入框
	    }; 
	    
	    defaults = $.extend(this.defaults,cfg);    
	    
	    //初始化 ,合并设置
	    defaults.$container = $('#' + defaults.container);
        
        this.render();
        
        this.enable();
        
        this.bindEvents();
        
		return this;
	}
    
    /**
     * 返回一个page渲染的信息对象
     * @param {String/int} total
     * @return {Object}
     */
    Page.prototype.init = function (total) {
        //分页信息对象，可用于渲染UI
        var data = this.data = {};
        //当前页
        var pageIndex = data.pageIndex = this.defaults.pageIndex;
        //分页大小
        var pageSize = data.pageSize = this.defaults.pageSize;
        //总记录数
        data.total = total;
        //总页数
        var pages = data.pages = parseInt(Math.floor(total == 0 ? 1 : ((total % pageSize) == 0 ? total / pageSize : (total / pageSize + 1))));
        //当前页的记录范围
        data.start = total == 0 ? 0 : ((pageIndex - 1) * pageSize + 1);
        data.end = total == 0 ? 0 : (pageIndex == pages) ? total : pageSize * pageIndex;
        //是否为第一页，是否为最后一页
        data.first = pageIndex == 1;
        data.last = pageIndex == pages;
        return data;
    }
	
	//启用
    Page.prototype.enable = function () {
        this.disabled = false;
        this.defaults.$container.removeClass('disabled');
    }
    
    
    //禁用
    Page.prototype.disable = function () {
        this.disabled = true;
        this.defaults.$container.addClass('disabled');
    }
    
    //刷新page UI
    Page.prototype.refresh = function () {
        this.render();
    }
            
	/**
	 * 根据信息对象数渲染page UI
	 */
    Page.prototype.render= function () {
    	var data = this.init(this.defaults.total), 
            opts = this.defaults,
            item = opts.itemType,
            href = opts.href,
        	html = [],
        	interval = getInterval(data, opts);
        
        //console.log(data)

        //首页
        opts.firstDisplay && html.push([
            '<' + item + href + ' class="first ',
            data.first ? 'disabled' : '',
            '">'+ opts.firstText,
            '</'+ item +'>'
        ].join(''));
        
        //上一页
        opts.prevDisplay && html.push([
            '<' + item + ' class="prev ',
            data.first ? 'disabled' : '',
            '">'+ opts.prevText,
            '</' + item + '>'
        ].join(''));

        // 产生起始点
        if (interval[0] > 0 && opts.frontPageItems > 0) {
            var end = Math.min(opts.frontPageItems, interval[0]);
            for (var i = 0; i < end; i++) {
                appendItem(i);
            }
            if (opts.frontPageItems < interval[0] && opts.ellipseText) {
                appendEllItem();
            }
        }

        // 产生内部的些链接
        for (var i = interval[0]; i < interval[1]; i++) {
            appendItem(i);
        }
		
        // 产生结束点
        if (interval[1] < data.pages && opts.backPageItems > 0) {
            if (data.pages - opts.backPageItems > interval[1] && opts.ellipseText) {
                appendEllItem();
            }
            var begin = Math.max(data.pages - opts.backPageItems, interval[1]);
            for (var i = begin; i < data.pages; i++) {
                appendItem(i);
            }
        }

        //下一页
        opts.nextDisplay && html.push([
            '<' + item + ' class="next ',
            data.last ? 'disabled' : '',
            '">'+ opts.nextText,
            '</' + item + '>'
        ].join(''));

        //尾页
        opts.lastDisplay && html.push([
            '<' + item + ' class="last ',
            data.last ? 'disabled' : '',
            '">'+ opts.lastText,
            '</' + item + '>'
        ].join(''));
        
        //跳转
        opts.redirectDisplay && html.push([
        	'<span class="redirect">共'+ data.pages +'页&nbsp;&nbsp;',
            '到第<input type="text" class="input" />页',
            '<em class="btn">'+ opts.redirectText +'</em></span>'
        ].join(''));

        this.defaults.$container.html(html.join(''));
        
        //内部方法,添加unit
        function appendItem(page) {
            page = page + 1;
            html.push([
                '<' + item + href + ' class="unit ',
                page == data.pageIndex ? 'actived' : '',
                '">'+ page,
                '</' + item + '>',
            ].join(''));
        }
		
		//内部方法，添加...
        function appendEllItem() {
            html.push([
                '<' + item + href + ' class="ell',
                '"><em>'+ opts.ellipseText,
                '</em></' + item + '>',
            ].join(''));
        }
    };
   
   	/**
   	 * 事件绑定
   	 */
    Page.prototype.bindEvents = function (){
        var self = this,
            opts = this.defaults,
            $element = defaults.$container;
            
        //回调  
        function pageIndexChange(pageIndex) {
            if (self.disabled) return;
            opts.pageIndex = pageIndex;
            if (opts.onChange && typeof opts.onChange === 'function') {
                //opts.onChange(pageIndex);
                $.proxy(opts.onChange(pageIndex), this)
            }
        }

        //首页
        opts.firstDisplay && $element.on('click', '.first:not(.disabled)', function (e) {
            e.preventDefault();
            pageIndexChange(1);
        });

        //末页
        opts.lastDisplay && $element.on('click', '.last:not(.disabled)', function (e) {	
            e.preventDefault();
            pageIndexChange(opts.data.pages);
        });

        //上一页
        opts.prevDisplay && $element.on('click', '.prev:not(.disabled)', function (e) {
            e.preventDefault();
            pageIndexChange(opts.pageIndex - 1);
        });

        //下一页
        opts.nextDisplay && $element.on('click', '.next:not(.disabled)', function (e) {
        	e.preventDefault();
        	pageIndexChange(opts.pageIndex + 1);
        });
        
        //跳转页
        opts.redirectDisplay && $element.on('click', '.btn', function (e) {
        	e.preventDefault();
        	var redirectPage = $.trim($element.find(".input").val()) ? parseInt($.trim($element.find(".input").val())) : null;
        	if(!redirectPage) return;
        	pageIndexChange(redirectPage);
        });

        //具体页
        $element.on('click', '.unit', function (e) {
            e.preventDefault();
            var $this = $(this),
                callback = true;
            if ($this.hasClass('actived') && !opts.allowActivedClick) {
                callback = false;
            } 
            callback && pageIndexChange(parseInt($.trim($this.text())), $this);
        });
    }
    
    
    /**
     * 获取连续部分的起止索引
     * @param {Object} data
     * @param {Object} opts
     */
    function getInterval(data, opts) {
        var ne_half = Math.ceil(opts.middlePageItems / 2);
        var np = data.pages;
        var upper_limit = np - opts.middlePageItems;
        var start = data.pageIndex > ne_half ? Math.max(Math.min(data.pageIndex - ne_half, upper_limit), 0) : 0;
        var end = data.pageIndex > ne_half ? Math.min(data.pageIndex + ne_half, np) : Math.min(opts.middlePageItems, np);
        return [start, end];
    }
    
	window.Page = Page;
}();
