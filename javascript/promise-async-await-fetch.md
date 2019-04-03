##  promise  .  async await  .  fetch


### ES6 Promise

>解决了深层次异步嵌套的问题

	function flow(flag){
		//promise是一个构造函数，内部接收一个回调函数。
		//回调函数内部有两个参数,reslove是执行成功的时候调用的，reject是失败调用的
		var promise = new Promise(function(reslove,reject){
		  setTimeout(function(){//模拟异步操作
		       if(flag){
		         reslove(true);//处理成功
		       }else{
		         reject(false)处理失败
		       }
		  },5000)
		});
		return promise;
	}
	
	//flow返回的是一个Promise对象，这样我们就能通过下面的方式来的处理异步操作了
	
	//调用该函数
	flow().then(function(success){
	 	//处理成功返回
	}).catch(function(error){
			//处理失败返回
	});

>reslove代表处理成功，对应后面的then,reject代表处理失败，对应后面的catch，resolve和reject里面值可以是字符串，也可以是对象，这个值可以理解成Promise的返回值


##### all的用法

	Promise.all([runAsync1(), runAsync2(), runAsync3()])
	.then(function(results){
		console.log(results);
	});

>用Promise.all来执行，all接收一个数组参数，里面的值最终都算返回Promise对象。这样，三个异步操作的并行执行的，等到它们都执行完后才会进到then里面。all会把所有异步操作的结果放进一个数组中传给then，就是上面的results

有了all，你就可以并行执行多个异步操作，并且在一个回调中处理所有的返回数据


##### race的用法

	Promise.race([runAsync1(), runAsync2(), runAsync3()])
	.then(function(results){
	    console.log(results);
	});

>all方法的效果实际上是「谁跑的慢，以谁为准执行回调」，那么相对的就有另一个方法「谁跑的快，以谁为准执行回调」，这就是race方法



### ES7 async await
	
	var stop= function (time) {
	    return new Promise(function (resolve, reject) {
	        setTimeout(function () {
	            resolve();
	        }, time);
	    })
	};

	var start = async function () {
	    // 在这里使用起来就像同步代码那样直观
	    console.log('start');
		//var result = await stop(3000); or
	    try{
	      await stop(3000);
	    }catch(err){
	      console.log(err);
	    }
	    console.log('end');
	};

	start();

>要注意await只能在async中使用，不然是没有效果的

其实async 和await联合起来使用相当于替代了Promise的then和catch方法，将async低昂一的函数里面的代码由异步变成了同步阻塞式，只有当await定义的行数执行完了代码才会继续往下执行，同时await还有有返回值，他的返回值在上面这个例子中就是resolve，reject的值需要通过try {}catch(err){}来捕获


### ES2017 fetch

>日常的开发中，基本不会自己去写XMLHttpRequest，主要是太复杂了，都是使用已经封装好了的各种插，件常用的有jquery,npm包管理工具也提供了axios,request等模块,而有了fetch后我们就可以在不用这些插件的情况下快速简单的实现异步请求了

##### fetch的使用

	'use strict';
	
	let Request = {
	    /**
	     * http get 请求简单封装
	     * @param url 请求的URL
	     * @param successCallback 请求成功回调
	     * @param failCallback 请求失败回调
	     */
	    get: (url, successCallback, failCallback) => {
	
	        let fetchOptions = {
	            headers: {
	                'Accept': 'application/json',
	                'Content-Type': 'application/json',
	                "Origin": '*',
	                "Access-Control-Allow-Origin": '*'
	            },
	            'mode': 'cors'
	        };
	
	        fetch(url,fetchOptions)
	            .then((response) => response.text())
	            .then((responseText) => {
	                let result = JSON.parse(responseText);
	                successCallback(result.status, result.code, result.message, result.data, result.share);
	            })
	            .catch((err) => {
	                failCallback(err);
	            });
	    },
	
	    /**
	     * http post 请求简单封装
	     * @param url 请求的URL
	     * @param data post的数据
	     * @param successCallback 请求成功回调
	     * @param failCallback failCallback 请求失败回调
	     */
	    post: (url, data, successCallback, failCallback) => {
	        let formData = new FormData();
	        Object.keys(data).map(function(key) {
	            var value = data[key];
	            formData.append(key, value);
	        });
	
	        let fetchOptions = {
	            method: 'POST',
	            headers: {
	                'Accept': 'application/json',
	                // 'Content-Type': 'application/json'
	                'Content-Type': 'multipart/form-data',
	            },
	            body: formData
	            // body: JSON.stringify(data)
	        };
	
	        fetch(url, fetchOptions)
	            .then((response) => response.text())
	            .then((responseText) => {
	                let result = JSON.parse(responseText);
	                successCallback(result.status, result.code, result.message, result.data, result.share);
	            })
	            .catch((err) => {
	                failCallback(err);
	            });
	    }
	};
	
	export default Request;

>目前原生的fetch还不支持jsonp的请求方式


通过上面fetch的使用方式，可以看出他和Promise的使用方式非常相像，fetch其实返回的就是一个Promise对象，async，await也就和fetch是完美兼容了，我们可以使用async，await实现代码的同步

	(async()=>{
		let result = {
			success: false,
			data: null,
			message: ''
		};
		 try{
			result.data = await fetch(url, {mode: 'no-cors'});
			//等待fetch被resolve()后才能继续执行
			result.sucess = true;
			console.log(result);
		 }catch(ex){
		 	result.data = ex;
			console.log(ex);
		 }finally {
		 	console.log(result);
		 }
	})();


>总结：Primise是基础，async,await,fetch是基于Promise的
