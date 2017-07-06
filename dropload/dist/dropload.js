/**
 * dropload
 */
;(function($, window, document, undefined){
    'use strict';
    var win = window;
    var doc = document;
    var $win = $(win);
    var $doc = $(doc);
    $.fn.dropload = function(options){
        return new MyDropLoad(this, options);
    };
    var MyDropLoad = function(element, options){
        var self = this;
        self.$element = element;
        // 上方是否插入DOM
        self.upInsertDOM = false;
        // loading状态
        self.loading = false;
        // 是否锁定
        self.isLockUp = false;
        self.isLockDown = false;
        // 是否有数据
        self.isData = true;
        self._scrollTop = 0;
        self._threshold = 0;
        self.init(options);
    };

    // 初始化
    MyDropLoad.prototype.init = function(options){
        var self = this;
        self.opts = $.extend(true, {}, {
            scrollArea : self.$element,                                            // 滑动区域
            domUp : {                                                            // 上方DOM
                domClass   : 'dropload-up',
                domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
                domUpdate  : '<div class="dropload-update">↑释放更新</div>',
                domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
            },
            domDown : {                                                          // 下方DOM
                domClass   : 'dropload-down',
                domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
                domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                domNoData  : '<div class="dropload-noData">暂无数据</div>'
            },
            autoLoad : true,                                                     // 自动加载
            distance : 50,                                                       // 拉动距离
            threshold : '',                                                      // 提前加载距离
            loadUpFn : '',                                                       // 上方function
            loadDownFn : ''                                                      // 下方function
        }, options);

        // 如果加载下方，事先在下方插入DOM
        if(self.opts.loadDownFn != ''){
            self.$element.append('<div class="'+self.opts.domDown.domClass+'">'+self.opts.domDown.domRefresh+'</div>');
            self.$domDown = $('.'+self.opts.domDown.domClass);
        }

        // 计算提前加载距离
        if(!!self.$domDown && self.opts.threshold === ''){
            // 默认滑到加载区2/3处时加载
            self._threshold = Math.floor(self.$domDown.height()*1/3);
        }else{
            self._threshold = self.opts.threshold;
        }

        // 判断滚动区域
        if(self.opts.scrollArea == win){
            self.$scrollArea = $win;
            // 获取文档高度
            self._scrollContentHeight = $doc.height();
            // 获取win显示区高度  —— 这里有坑
            self._scrollWindowHeight = doc.documentElement.clientHeight;
        }else{
            self.$scrollArea = self.opts.scrollArea;
            self._scrollContentHeight = self.$element[0].scrollHeight;
            self._scrollWindowHeight = self.$element.height();
        }
        fnAutoLoad(self);

        // 窗口调整
        $win.on('resize',function(){
            if(self.opts.scrollArea == win){
                // 重新获取win显示区高度
                self._scrollWindowHeight = win.innerHeight;
            }else{
                self._scrollWindowHeight = self.$element.height();
            }
        });

        // 绑定触摸
        self.$element.on('touchstart',function(e){
            if(!self.loading){
                fnTouches(e);
                fnTouchstart(e, self);
            }
        });
        self.$element.on('touchmove',function(e){
            if(!self.loading){
                fnTouches(e, self);
                fnTouchmove(e, self);
            }
        });
        self.$element.on('touchend',function(){
            if(!self.loading){
                fnTouchend(self);
            }
        });

        // 加载下方
        self.$scrollArea.on('scroll',function(){
            self._scrollTop = self.$scrollArea.scrollTop();

            // 滚动页面触发加载数据
            if(self.opts.loadDownFn != '' && !self.loading && !self.isLockDown && (self._scrollContentHeight - self._threshold) <= (self._scrollWindowHeight + self._scrollTop)){
                loadDown(self);
            }
        });
    };

    // touches
    function fnTouches(e){
        if(!e.touches){
            e.touches = e.originalEvent.touches;
        }
    }

    // touchstart
    function fnTouchstart(e, self){
        self._startY = e.touches[0].pageY;
        // 记住触摸时的scrolltop值
        self.touchScrollTop = self.$scrollArea.scrollTop();
    }

    // touchmove
    function fnTouchmove(e, self){
        self._curY = e.touches[0].pageY;
        self._moveY = self._curY - self._startY;

        if(self._moveY > 0){
            self.direction = 'down';
        }else if(self._moveY < 0){
            self.direction = 'up';
        }

        var _absMoveY = Math.abs(self._moveY);

        // 加载上方
        if(self.opts.loadUpFn != '' && self.touchScrollTop <= 0 && self.direction == 'down' && !self.isLockUp){
            e.preventDefault();

            self.$domUp = $('.'+self.opts.domUp.domClass);
            // 如果加载区没有DOM
            if(!self.upInsertDOM){
                self.$element.prepend('<div class="'+self.opts.domUp.domClass+'"></div>');
                self.upInsertDOM = true;
            }
            
            fnTransition(self.$domUp,0);

            // 下拉
            if(_absMoveY <= self.opts.distance){
                self._offsetY = _absMoveY;
                // todo：move时会不断清空、增加dom，有可能影响性能，下同
                self.$domUp.html(self.opts.domUp.domRefresh);
            // 指定距离 < 下拉距离 < 指定距离*2
            }else if(_absMoveY > self.opts.distance && _absMoveY <= self.opts.distance*2){
                self._offsetY = self.opts.distance+(_absMoveY-self.opts.distance)*0.5;
                self.$domUp.html(self.opts.domUp.domUpdate);
            // 下拉距离 > 指定距离*2
            }else{
                self._offsetY = self.opts.distance+self.opts.distance*0.5+(_absMoveY-self.opts.distance*2)*0.2;
            }

            self.$domUp.css({'height': self._offsetY});
        }
    }

    // touchend
    function fnTouchend(self){
        var _absMoveY = Math.abs(self._moveY);
        if(self.opts.loadUpFn != '' && self.touchScrollTop <= 0 && self.direction == 'down' && !self.isLockUp){
            fnTransition(self.$domUp,300);

            if(_absMoveY > self.opts.distance){
                self.$domUp.css({'height':self.$domUp.children().height()});
                self.$domUp.html(self.opts.domUp.domLoad);
                self.loading = true;
                self.opts.loadUpFn(self);
            }else{
                self.$domUp.css({'height':'0'}).on('webkitTransitionEnd mozTransitionEnd transitionend',function(){
                    self.upInsertDOM = false;
                    $(this).remove();
                });
            }
            self._moveY = 0;
        }
    }

    // 如果文档高度不大于窗口高度，数据较少，自动加载下方数据
    function fnAutoLoad(self){
        if(self.opts.autoLoad){
            if((self._scrollContentHeight - self._threshold) <= self._scrollWindowHeight){
                loadDown(self);
            }
        }
    }

    // 重新获取文档高度
    function fnRecoverContentHeight(self){
        if(self.opts.scrollArea == win){
            self._scrollContentHeight = $doc.height();
        }else{
            self._scrollContentHeight = self.$element[0].scrollHeight;
        }
    }

    // 加载下方
    function loadDown(self){
        self.direction = 'up';
        self.$domDown.html(self.opts.domDown.domLoad);
        self.loading = true;
        self.opts.loadDownFn(self);
    }

    // 锁定
    MyDropLoad.prototype.lock = function(direction){
        var self = this;
        // 如果不指定方向
        if(direction === undefined){
            // 如果操作方向向上
            if(self.direction == 'up'){
                self.isLockDown = true;
            // 如果操作方向向下
            }else if(self.direction == 'down'){
                self.isLockUp = true;
            }else{
                self.isLockUp = true;
                self.isLockDown = true;
            }
        // 如果指定锁上方
        }else if(direction == 'up'){
            self.isLockUp = true;
        // 如果指定锁下方
        }else if(direction == 'down'){
            self.isLockDown = true;
            // 为了解决DEMO5中tab效果bug，因为滑动到下面，再滑上去点tab，direction=down，所以有bug
            self.direction = 'up';
        }
    };

    // 解锁
    MyDropLoad.prototype.unlock = function(){
        var self = this;
        // 简单粗暴解锁
        self.isLockUp = false;
        self.isLockDown = false;
        // 为了解决DEMO5中tab效果bug，因为滑动到下面，再滑上去点tab，direction=down，所以有bug
        self.direction = 'up';
    };

    // 无数据
    MyDropLoad.prototype.noData = function(flag){
        var self = this;
        if(flag === undefined || flag == true){
            self.isData = false;
        }else if(flag == false){
            self.isData = true;
        }
    };

    // 重置
    MyDropLoad.prototype.resetload = function(){
        var self = this;
        if(self.direction == 'down' && self.upInsertDOM){
            self.$domUp.css({'height':'0'}).on('webkitTransitionEnd mozTransitionEnd transitionend',function(){
                self.loading = false;
                self.upInsertDOM = false;
                $(this).remove();
                fnRecoverContentHeight(self);
            });
        }else if(self.direction == 'up'){
            self.loading = false;
            // 如果有数据
            if(self.isData){
                // 加载区修改样式
                self.$domDown.html(self.opts.domDown.domRefresh);
                fnRecoverContentHeight(self);
                fnAutoLoad(self);
            }else{
                // 如果没数据
                self.$domDown.html(self.opts.domDown.domNoData);
            }
        }
    };

    // css过渡
    function fnTransition(dom,num){
        dom.css({
            '-webkit-transition':'all '+num+'ms',
            'transition':'all '+num+'ms'
        });
    }
})(window.Zepto || window.jQuery,  window, document);