/*  
 * @分页组件
 * @method  PageView  
 * @cfg 默认配置参数   
 * @param {Number} size -总页数  
 * @param {Number} showSize -分页显示页数
 * @param {Number} current -当前页（默认是第一页）
 * @param {Object} itemType -分页dom  （a/span/...）
 * @param {String} href -分页锚点(默认null)，仅仅支持 itemType===a标签
 * @param {Object} container -分页父容器Dom id
 * @param {Function} action -回调函数
 * @example   
 * new PageView();   
 * new PageView({size:10,showSize:5,current:1,container:'page',itemType:'a',href:'',action:null}); 
*/

//面向对象第一种写法
 var PageView = (function(cfg) {
 	
 	/**
 	 * @class PageView
 	 * @constructor
 	 */
 	function PageView(cfg) {
 		//默认设置
 		this.defaults = {
 	        size: 0,     //总页数
 	        showSize: 5, //显示页数
 	        current: 1,  //当前页
 	        container: 'paging', //父容器id
 	        itemType: 'span', //分页dom类型
 	        href: '',  // 分页锚点(默认'')  href="#comment"
 	        action: null //点击分页回调函数
 	    }; 
 	    defaults = $.extend(this.defaults,cfg);    
 	    
 	    //初始化  
 	    defaults.$container = $('#' + defaults.container);
         this.show();
         
 		return this;
 	}
 	
     //prototype
     PageView.prototype.show = function () {
         var indexs = getIndex(),
         prev = getPrev(),
         next = getNext(),
         first = getFirst(),
         last = getLast(),
         $container = defaults.$container;
         
         if (! $container) return;
         if(!indexs) return;
         $container.html(prev + first + indexs + last + next);
         this.bind();
     };
     PageView.prototype.bind = function () {
         var $container = defaults.$container,
         		$prev = $container.find('.prev'),
         		$next = $container.find('.next'),
         		$items = $container.find('.item'),
         		pages = defaults.size,
         		that = this;

         $prev.off().on('click', function() {
             if (defaults.current > 1) {
                 defaults.current -= 1; 
             }else{
             	return;
             }
             callback();
         });
         $next.off().on('click', function() {
             if (defaults.current < pages) {
                 defaults.current += 1;
             }else{
             	return;
             }
             callback();
         });
         $items.off().on('click', function(e) {
             var _index = $(e.currentTarget).data("num");
 	            defaults.current = +_index;
 	            callback();
         });

         //外部回调
         function callback() {
             that.show();
             if (defaults.action && typeof defaults.action === 'function') {
                 defaults.action(defaults.current);
             }
         }
     };
     
     //调用函数
     function getIndex() {
         var pages = defaults.size;
 	        showSize = defaults.showSize,
 	        item = defaults.itemType,
 	        current = defaults.current,
 	        href = defaults.href,
 	        items = '',
 	        half = Math.floor(showSize/2),
 	        startIndex = current > half ? (current - half - 1) : 0,
 	        endIndex = (current + half <= pages) ? (current + half) : pages;

         if (pages < 1) return;
         for (var i = startIndex; i < endIndex; i++) {
             if (current === i + 1) {
                 items  += '<' + item + ' ' + href + ' class="actived item" data-num="'+ (i + 1) +'">' + (i + 1) + '</' + item + '>';
             } else {
                 items  += '<' + item + ' ' + href + ' class="item" data-num="'+ (i + 1) +'">' + (i + 1) + '</' + item + '>';
             }
         }
         return items;
     }
     function getPrev() {
         var pages = defaults.size,
         		item = defaults.itemType,
         		prev = '';

         if (pages > 1 && defaults.current !== 1) {
             prev = '<' + item + ' ' + href + ' class="prev"><i class="iconfont">&#xe6ba;</i></' + item + '>';
         }
         return prev;
     }
     function getNext() {
         var pages = defaults.size,
 	        item = defaults.itemType,
 	        next = '';

         if (pages > 1 && defaults.current !== pages) {
             next = '<' + item + ' ' + href + ' class="next"><i class="iconfont">&#xe6b9;</i></' + item + '>';
         }
         return next;
     }
     function getFirst(){
     		var pages = defaults.size,
 	        item = defaults.itemType,
 	        first = '';
         if (pages > 1 && defaults.current !== 1) {
             first = '<' + item + ' ' + href + ' class="item" data-num="1">first</' + item + '>';
         }
         return first;
     }
     function getLast(){
     		var pages = defaults.size,
 	        item = defaults.itemType,
 	        last = '';
         if (pages > 1 && defaults.current !== pages) {
             last = '<' + item + ' ' + href + ' class="item" data-num='+ pages +'>last</' + item + '>';
         }
         return last;
     }
     
    return PageView;
 })();


//面向对象第二种写法 ！ ~  + - 
! function() {
	function Page(cfg) {
		//默认设置
		this.defaults = {
	        size: 0,     //总页数
	        showSize: 5, //显示页数
	        current: 1,  //当前页
	        container: 'paging', //父容器id
	        itemType: 'span', //分页dom类型
	        href: '',  // 分页锚点(默认'')  href="#comment"
	        action: null //点击分页回调函数
	    }; 
	    defaults = $.extend(this.defaults,cfg);    
	    
	    //初始化  
	    defaults.$container = $('#' + defaults.container);
        this.show();
        
		return this;
	}
	
    //prototype
    Page.prototype.show = function () {
        var indexs = getIndex(),
        prev = getPrev(),
        next = getNext(),
        first = getFirst(),
        last = getLast(),
        $container = defaults.$container;
        
        if (! $container) return;
        if(! indexs) return;
        $container.html(prev + first + indexs + last + next);
        this.bind();
    };
    Page.prototype.bind = function () {
        var $container = defaults.$container,
        		$prev = $container.find('.prev'),
        		$next = $container.find('.next'),
        		$items = $container.find('.item'),
        		pages = defaults.size,
        		that = this;

        $prev.off().on('click', function() {
             if (defaults.current > 1) {
                 defaults.current -= 1; 
             }else{return;}
             callback();
         });
         $next.off().on('click', function() {
             if (defaults.current < pages) {
                 defaults.current += 1;
             }else{return;}
             callback();
         });
        $items.off().on('click', function(e) {
            var _index = $(e.currentTarget).data("num");
	            defaults.current = +_index;
	            callback();
        });

        //外部回调
        function callback() {
            that.show();
            if (defaults.action && typeof defaults.action === 'function') {
                defaults.action(defaults.current);
            }
        }
    };
    
    //调用函数
    function getIndex() {
        var pages = defaults.size;
	        showSize = defaults.showSize,
	        item = defaults.itemType,
	        current = defaults.current,
	        href = defaults.href,
	        items = '',
	        half = Math.floor(showSize/2),
	        startIndex = current > half ? (current - half - 1) : 0,
	        endIndex = (current + half <= pages) ? (current + half) : pages;

        if (pages < 1) return;
        for (var i = startIndex; i < endIndex; i++) {
            if (current === i + 1) {
                items  += '<' + item + ' ' + href + ' class="actived item" data-num="'+ (i + 1) +'">' + (i + 1) + '</' + item + '>';
            } else {
                items  += '<' + item + ' ' + href + ' class="item" data-num="'+ (i + 1) +'">' + (i + 1) + '</' + item + '>';
            }
        }
        return items;
    }
    function getPrev() {
        var pages = defaults.size,
        		item = defaults.itemType,
        		prev = '';

        if (pages > 1 && defaults.current !== 1) {
            prev = '<' + item + ' ' + href + ' class="prev">上一页</' + item + '>';
        }
        return prev;
    }
    function getNext() {
        var pages = defaults.size,
	        item = defaults.itemType,
	        next = '';

        if (pages > 1 && defaults.current !== pages) {
            next = '<' + item + ' ' + href + ' class="next">下一页</' + item + '>';
        }
        return next;
    }
    function getFirst(){
    		var pages = defaults.size,
	        item = defaults.itemType,
	        first = '';
        if (pages > 1 && defaults.current !== 1) {
            first = '<' + item + ' ' + href + ' class="item" data-num="1">首页</' + item + '>';
        }
        return first;
    }
    function getLast(){
    		var pages = defaults.size,
	        item = defaults.itemType,
	        last = '';
        if (pages > 1 && defaults.current !== pages) {
            last = '<' + item + ' ' + href + ' class="item" data-num='+ pages +'>末页</' + item + '>';
        }
        return last;
    }
	window.Page = Page;
}();
    
    
    
    



