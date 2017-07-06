/**
 * App
 */
!function(){
	//constructor
	function App(cfg){
		this.config = {};	
		this.asynFlag = true;
		this.color = "red";
		this.config = $.extend(this.config, cfg);
		return this;
	}
	
	/**
	 * 
	 * @param {Object} res
	 */
	App.prototype.init = function(res){    
    		console.log(res);
	};  
	
	
	
	
	window.App = App;
}();


/**
 * 子类继承父类方法
 * 深度拷贝继承
 * @param {Object} Child
 * @param {Object} Parent
 */
function extend(Child, Parent) {
	if (!Child || typeof Child !== 'function') return false;
    var p = Parent.prototype;
    var c = Child.prototype;
    for (var i in p) {
        c[i] = p[i];
    }
    c.uber = p;
}

