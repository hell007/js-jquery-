
/**
 * IndexModule
 */
!function(){
	//constructor
	function IndexModule(){
		App.apply(this, arguments);//子类继承父类的属性
	};
	
	//override
	IndexModule.prototype.init = function(req, res){    
    		console.log(req);
	};
	
	window.IndexModule = IndexModule;
}();

//子类继承父类的fn
extend(IndexModule,App);


//子类的使用
var Index = new IndexModule();

var app1 = new App();

console.log(app1.color);

app1.color = "green";

var app2 = new App();

console.log("app2=",app2.color);

console.log("app1==",app1.color);

console.log(Index.asynFlag);

Index.init("444","333");

console.log(Index.uber)
