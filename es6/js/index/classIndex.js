'use strict';
/**
 * 
 */
class IndexModule extends App {
	
	constructor(pros) {
		super(pros);
		this.color = "yellow";
	}
	
	init(req, res){    
    		console.log(req);
	};
	
	
}


//子类的使用
var Index = new IndexModule();

var app1 = new App();

console.log(app1.color);

app1.color = "green";

var app2 = new App();

console.log("app2=",app2.color);

console.log("app1==",app1.color);

console.log(Index.asynFlag);

console.log(Index.color);

Index.init("444","333");

