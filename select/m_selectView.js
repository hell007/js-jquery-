/*  
 * @SelectView下拉框组件
 * @auther kunyujie.com
 * @versin: 1.0
 * @method  Select  
 * @cfg 默认配置参数   
 * @param {Number} width -宽度      
 * @param {String} title -默认文字(默认为null)  
 * @param {Number} index -默认index (默认为null)
 * @param {Array} list -数组 
 * @param {Object} container -父容器
 * @param {Function} action -回调函数
 * @example   
 * new SelectView();   
 * new SelectView({width:'100px',title:'请选择'，index:null,list:[],container:'select-box',action:null}); 
*/   
var SelectView = (function(cfg) {
	/**
	 * @class Select
	 * @constructor
	 * @param {Object} cfg
	 */
	function SelectView(cfg) {
		//默认设置
		this.defaults = {
	        width: '100px',    //宽度
	        title: '请选择',      //下拉value (默认为请选择)
	        index: null,          //下拉index （默认为null）
	        list: [],          //数组
	        container: 'select-wrap',  //父容器	
	        action: null //回调函数
	   }; 
	    
	   $.extend(this.defaults,cfg);
		
	    //初始化    
	    this.defaults.$container = $('#' + this.defaults.container);
	    this.isOn = null;
	    this.init();
	    this.setValue();
	    this.bindClick();
	  
		return this;
	}
	
	/**
	 * selectView初始化
	 */
	SelectView.prototype.init = function(){
		var self = this,
			$container = self.defaults.$container,
			list = self.defaults.list,
			listTpl = '';
			for(var i=0,len=list.length; i<len; i++){
	            if(len==1 && list[0]=='') return;
	           listTpl+='<li value=' + list[i] + ' index='+ i +'><i class="iconfont">v</i>' + list[i] +'</li>';
	        }
			tpl = '<div class="select-box" style="width:'+ self.defaults.width +'">\
					<div class="select-text">\
						<span class="select-val" value="" index="null">'+ self.defaults.title +'</span>\
						<i class="select-arrow"></i>\
					</div>\
					<ul class="select-list">'+ listTpl +'</ul>\
			    </div>';		
		$container.html(tpl);
	};
	
	/**
	 * 获取初始值，绑定事件，回调
	 */
	SelectView.prototype.setValue = function(){
		var self = this,
			$container = self.defaults.$container,
			$selectVal = $container.find(".select-val"),
			$item = $container.find('.select-list').find("li");
		//说明有默认选中值
		if(self.defaults.title!=='' && self.defaults.index!==''){
			$item.each(function(){
				var _value = $(this).attr("value"),
					_index = $(this).attr("index");
				if(self.defaults.title!==_value && self.defaults.index != _index) return;
				$selectVal.text(_value).attr("value",_value).attr("index",_index);
				$(this).addClass("active").siblings("li").removeClass("active");
			})
		}else{
			$selectVal.text("请选择");
		}
		//click事件
		$item.off().on("click",$item,function(){
			var _text = $(this).attr("value") ? $(this).attr("value") : $(this).text(),
				_index = $(this).attr("index");
			$selectVal.text(_text).attr("value",_text).attr("index",_index);
			$(this).addClass("active").siblings("li").removeClass("active");
			self.hide();
			callback();
		});
		//外部回调
        function callback() {
            if (self.defaults.action && typeof self.defaults.action === 'function') {
                self.defaults.action(self.getAll());
            }
        }
    };
    SelectView.prototype.getIndex = function(){
        var self =this,
        		$container = self.defaults.$container,
        		$selectVal = $container.find(".select-val");
        return $selectVal.attr('index');
    };
    SelectView.prototype.getValue = function(){
        var self = this,
        		$container = self.defaults.$container,
        		$selectVal = $container.find(".select-val");
        return $selectVal.attr('value') ? $selectVal.attr('value') : $selectVal.text();
    };
    SelectView.prototype.getAll = function(){
        var self = this,
        		$container = self.defaults.$container,
        		$selectVal = $container.find(".select-val");
        var jsonVal = {
            value : $selectVal.attr('value') ? $selectVal.attr('value') : $selectVal.text(),
            index : $selectVal.attr('index')
        };
 		//value = JSON.stringify(value);
        return jsonVal;
    };
    /**
     *下拉框展开收起事件绑定 
     */
    SelectView.prototype.bindClick = function(){
        var self = this,
        		$container = self.defaults.$container,
        		$selectText = $container.find(".select-text");
        self.isOn = true;
        $selectText.off().on("click",$selectText,function(){
        		if(self.isOn){
        			self.show();
        		}else{
        			self.hide();
        		}
        })
    };
    /**
     *show fun 
     */
    SelectView.prototype.show = function(){
        var self = this,
    			$container = self.defaults.$container,
    			$selectList = $container.find(".select-list");
        $selectList.show();
        	self.isOn = !self.isOn;
    };
    /**
     * hide fun
     */
    SelectView.prototype.hide = function(){
        var self = this,
    			$container = self.defaults.$container,
    			$selectList = $container.find(".select-list");
    		$selectList.hide();
    		self.isOn = !self.isOn;
        self.isOn = true;
    };
	
	return SelectView;
})();