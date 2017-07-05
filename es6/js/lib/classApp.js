'use strict';
/**
 * App类
 */
class App {
	
	constructor(cfg) {
		this.config = {};	
		this.asynFlag = true;
		this.color = "red";
		this.config = $.extend(this.config, cfg);
	}
	
	init(res){    
    		console.log(res);
	};
	
	
}
