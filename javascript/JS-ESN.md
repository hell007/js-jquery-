
## ES6 特效


1、let、const

let 定义的变量不会被变量提升，const 定义的常量不能被修改，let 和 const 都是块级作用域

ES6前，js 是没有块级作用域 {} 的概念的。（有函数作用域、全局作用域、eval作用域）

ES6后，let 和 const 的出现，js 也有了块级作用域的概念


    const str = "1111";
    str = "2222"; // Assignment to constant variable.
    console.log(str);

2、import、export

    import导入模块、export导出模块

    // 全部导入
    import people from './example'

    // 将整个模块当作单一对象进行导入，该模块的所有导出都会作为对象的属性存在
    import * as example from "./example.js"
    console.log(example.name)
    console.log(example.getName())

    // 导入部分，引入非 default 时，使用花括号
    import {name, age} from './example'


    // 导出默认, 有且只有一个默认
    export default App

    // 部分导出
    export class App extend Component {};

3、class、extends、super

ES5中最令人头疼的的几个部分：原型、构造函数，继承

ES6引入了Class（类）这个概念。

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

    console.log(Index.asynFlag);

    console.log(Index.color);

    Index.init("444","333");



可以看到里面有一个constructor方法，这就是构造方法，而this关键字则代表实例对象。
简单地说，constructor内定义的方法和属性是实例对象自己的，而constructor外定义的方法和属性则是所有实力对象可以共享的。

Class之间可以通过extends关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多。

super关键字，它指代父类的实例（即父类的this对象）。
子类必须在constructor方法中调用super方法，否则新建实例时会报错。
这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。


3、arrow functions （箭头函数）

函数的快捷写法。不需要 function 关键字来创建函数，省略 return 关键字，继承当前上下文的 this 关键字

**注意**： 当你的函数有且仅有一个参数的时候，是可以省略掉括号的；当你函数中有且仅有一个表达式的时候可以省略{}

    let arr = [1, 2, 3];
    let newArr = arr.map(x => x + 1);

JavaScript语言的this对象一直是一个令人头痛的问题

    class Animal {
        constructor() {
            this.type = 'animal';
        }
        says(say) {
            setTimeout(function() {
                console.log(this.type + ' says ' + say);
            }, 1000);
        }
    }
 
    var animal = new Animal();
    animal.says('hi'); //undefined says hi

解决方案

    // 传统方法1: 将this传给self,再用self来指代this
    says(say) {
        var self = this;
        setTimeout(function() {
            console.log(self.type + ' says ' + say);
        }, 1000);
    }

    // 传统方法2: 用bind(this),即
    says(say) {
        setTimeout(function() {
            console.log(this.type + ' says ' + say);
        }.bind(this), 1000);
    }

    // ES6: 箭头函数
    // 当我们使用箭头函数时，函数体内的this对象，就是定义时所在的对象
    says(say) {
        setTimeout(() => {
            console.log(this.type + ' says ' + say);
        }, 1000);
    }


4、template string （模板字符串）

解决了 ES5 在字符串功能上的痛点。

a：字符串拼接。将表达式嵌入字符串中进行拼接，用 反引号${} 来界定。

    // es5
    var name1 = "es5";
    console.log('hello' + name1);

    // es6
    const name2 = "es6";
    console.log(`hello${name2}`);

b.在ES5时我们通过反斜杠来做多行字符串拼接。ES6使用 反引号 直接搞定

    // es5
    var msg = "hello \
    world!";

    // es6
    const template = `<div>
    <span>hello world</span>
    </div>`;

c.includes repeat

    // includes：判断是否包含然后直接返回布尔值
    let str = 'hahah';
    console.log(str.includes('y')); // false

    // repeat: 获取字符串重复n次
    let s = 'he';
    console.log(s.repeat(3)); // 'hehehe'


5、destructuring （解构）

简化数组和对象中信息的提取。

ES6前，我们一个一个获取对象信息；

ES6后，解构能让我们从对象或者数组里取出数据存为变量

    // ES5
    var people1 = {
        name: 'bai',
        age: 20,
        color: ['red', 'blue']
    };

    var myName = people1.name;
    var myAge = people1.age;
    var myColor = people1.color[0];
    console.log(myName + '----' + myAge + '----' + myColor);

    // ES6
    let people2 = {
        name: 'ming',
        age: 20,
        color: ['red', 'blue']
    }

    let { name, age } = people2;
    let [first, second] = people2.color;
    console.log(`${name}----${age}----${first}`);


6、default 函数默认参数

    // ES5 给函数定义参数默认值
    function foo(num) {
        num = num || 200;
        return num;
    }

    // ES6
    function foo(num = 200) {
        return num;
    }

7、rest arguments （rest参数）

解决了 es5 复杂的 arguments 问题

    function foo(x, y, ...arg) {
        return ((x + y) * arg.length);
    }

    foo(1, 2, 'hello', true, 7); // 9


8、Spread Operator （扩展运算符）

理解对象的扩展运算符其实很简单，只要记住一句话就可以：

    对象中的扩展运算符(...)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中。


- 对象的扩展运算符

        let bar = { a: 1, b: 2 };
        let baz = { ...bar }; // { a: 1, b: 2 }

- 数组的扩展运算符

    a.组装数组

        let color = ['red', 'yellow'];
        let colorful = [...color, 'green', 'blue'];
        console.log(colorful); // ["red", "yellow", "green", "blue"]
    
    b.获取数组除了某几项的其他项

        let num = [1, 3, 5, 7, 9];
        let [first, second, ...arg] = num;
        console.log(arg); // [5, 7, 9]

9.对象

a.对象初始化简写

    // ES5
    function people(name, age) {
        return {
            name: name,
            age: age
        };
    }

    // ES6
    function people(name, age) {
        return {
            name,
            age
        };
    }

b.对象字面量简写（省略冒号与 function 关键字）

    // ES5
    var people1 = {
        name: 'test',
        getName: function () {
            console.log(this.name);
        }
    };

    // ES6
    let people2 = {
        name: 'test',
        getName() {
            console.log(this.name);
        }
    };

c.Object.assign(target, obj1, arg...)

ES6 对象提供了Object.assign()这个方法来实现浅复制。

Object.assign()可以把任意多个源对象自身可枚举的属性拷贝给目标对象，然后返回目标对象。
第一参数即为目标对象。在实际项目中，我们为了不改变源对象。一般会把目标对象传为{}，大部分属性以objB属性和新增属性组成。

    const obj = Object.assign({}, objA, objB)
    // 给对象添加属性
    this.seller = Object.assign({}, this.seller, response.data)


10、Promise

用同步的方式去写异步代码

    // 发起异步请求
    fetch('/api/todos')
    .then(res => res.json())
    .then(data => ({
        data
    }))
    .catch(err => ({
        err
    }));

11、Generators

生成器（generator）是能返回一个迭代器的函数

生成器函数也是一种函数，最直观的表现就是比普通的function多了个星号```*```，
在其函数体内可以使用yield关键字,有意思的是函数会在每个yield后暂停。

迭代器：当你调用一个generator时，它将返回一个迭代器对象。
这个迭代器对象拥有一个叫做next的方法来帮助你重启generator函数并得到下一个值。
next方法不仅返回值，它返回的对象具有两个属性：done和value。value是你获得的值，done用来表明你的generator是否已经停止提供值。


    // 生成器
    function *createIterator() {
        yield 1;
        yield 2;
        yield 3;
    }
 
    // 生成器能像正规函数那样被调用，但会返回一个迭代器
    let iterator = createIterator();

    console.log(iterator.next().value); // 1
    console.log(iterator.next().value); // 2
    console.log(iterator.next().value); // 3
    
迭代器对异步编程作用很大，异步调用对于我们来说是很困难的事，我们的函数并不会等待异步调用完再执行，你可能会想到用回调函数，
（当然还有其他方案比如Promise比如Async/await）

生成器可以让我们的代码进行等待。就不用嵌套的回调函数。
使用generator可以确保当异步调用在我们的generator函数运行一下行代码之前完成时暂停函数的执行。

那么问题来了，咱们也不能手动一直调用next()方法，你需要一个能够调用生成器并启动迭代器的方法。就像这样子的：

    function run(taskDef) {
        // taskDef 即一个生成器函数
        // 创建迭代器，让它在别处可用
        let task = taskDef();

        // 启动任务
        let result = task.next();

        // 递归使用函数来保持对 next() 的调用
        function step() {
            // 如果还有更多要做的
            if (!result.done) {
                result = task.next();
                step();
            }
        }

        // 开始处理过程
        step();
    }



## ES7 特性

1、Array.prototype.includes

a.基本用法

    let arr = ['react', 'angular', 'vue']

    // Correct
    if (arr.includes('vue')) { // true
      console.log('this is vue demo')
    }

    let str = 'React Quickly'

    // Correct
    if (str.toLowerCase().includes('react')) {  // true
      console.log('Found "react"')  
    }

相当于

    jQuery: $.inArray
    Underscore.js: _.contains
    
b.接收俩个参数：要搜索的值和搜索的开始索引

    ['a', 'b', 'c', 'd'].includes('b')         // true
    ['a', 'b', 'c', 'd'].includes('b', 1)      // true
    ['a', 'b', 'c', 'd'].includes('b', 2)      // false


c.与ES6中的indexOf()比较

includes()返回的是布尔值，能直接判断数组中存不存在这个值，而indexOf()返回的是索引

    let demo = [1, NaN, 2, 3]

    demo.indexOf(NaN)        //-1
    demo.includes(NaN)       //true


**总结：** 由于它对NaN的处理方式与indexOf不同，假如你只想知道某个值是否在数组中而并不关心它的索引位置，建议使用includes()。
如果你想获取一个值在数组中的位置，那么你只能使用indexOf方法


2、求幂运算

    3 ** 2  //9
    效果同
    Math.pow(3, 2) //9
   
    
    
 
## ES8 特性

1、![async await](https://github.com/hell007/front-end-developer/blob/master/promise-async-await-fetch.md)


2、Object.entries()

将一个对象中可枚举属性的键名和键值按照二维数组的方式返回。

若对象是数组，则会将数组的下标作为键值返回

    Object.entries({ one: 1, two: 2 })    //[['one', 1], ['two', 2]]
    Object.entries([1, 2])                //[['0', 1], ['1', 2]]

- 注意

a.若是键名是Symbol，编译时会被自动忽略

    Object.entries({[Symbol()]:1, two: 2})  //[['two', 2]]

b.entries()返回的数组顺序和for循环一样，即如果对象的key值是数字，则返回值会对key值进行排序，返回的是排序后的结果

    Object.entries({ 2: 'a', 3: 'b', 1: 'c' })    //[['1', 'c'], ['2', 'a'], ['3', 'b']]

c.利用Object.entries()创建一个真正的Map

    var obj = { foo: 'bar', baz: 42 };
    
    var map1 = new Map([['foo', 'bar'], ['baz', 42]]); //原本的创建方式
    var map2 = new Map(Object.entries(obj));    //等同于map1

    console.log(map1);// Map { foo: "bar", baz: 42 }
    console.log(map2);// Map { foo: "bar", baz: 42 }

- 自定义Object.entries()

Object.entries的原理其实就是将对象中的键名和值分别取出来然后推进同一个数组中

    //自定义entries()
    var obj = { foo: 'bar', baz: 42 };
    
    function myEntries(obj) {
        var arr = []
        for (var key of Object.keys(obj)) {
            arr.push([key, obj[key]])
        }
        return arr
    }
    console.log(myEntries(obj))
    
    //Generator版本
    function* genEntryies(obj) {
        for (let key of Object.keys(obj)) {
            yield [key, obj[key]]
        }
    }
    var entryArr = genEntryies(obj);
    console.log(entryArr.next().value) //["foo", "bar"]
    console.log(entryArr.next().value) //["baz", 42]


3.Object.values() 

只返回自己的键值对中属性的值。它返回的数组顺序，也跟Object.entries()保持一致

    Object.values({ one: 1, two: 2 })            //[1, 2]
    Object.values({ 3: 'a', 4: 'b', 1: 'c' })    //['c', 'a', 'b']


vs 与Object.keys() ES6中的Object.keys()返回的是键名

    var obj = { foo: 'bar', baz: 42 };
    console.log(Object.keys(obj)) //["foo", "baz"]
    console.log(Object.values(obj)) //["bar", 42]
    
    //Object.keys()的作用就类似于for...in
    function myKeys() {
        let keyArr = []
        for (let key in obj1) {
            keyArr.push(key)
            console.log(key)
        }
        return keyArr
    }
    console.log(myKeys(obj1)) //["foo", "baz"]

entries()、values()总结

    var obj = { foo: 'bar', baz: 42 };
    console.log(Object.keys(obj)) //["foo", "baz"]
    console.log(Object.values(obj)) //["bar", 42]
    console.log(Object.entries(obj)) //[["foo", "bar"], ["baz", 42]]


4、字符串填充

padStart()和padEnd()

String.padStart(targetLength, padding)

参数：字符串目标长度和填充字段


    'Vue'.padStart(10)           //'       Vue'
    'React'.padStart(10)         //'     React'
    'JavaScript'.padStart(10)    //'JavaScript'

- 注意：

填充函数只有在字符长度小于目标长度时才有效,而且目标长度如果小于字符串本身长度时，字符串也不会做截断处理，只会原样输出

    'Vue'.padEnd(10, '_*')           //'Vue_*_*_*_'
    'React'.padEnd(10, 'Hello')      //'ReactHello'
    'JavaScript'.padEnd(10, 'Hi')    //'JavaScript'
    'JavaScript'.padEnd(8, 'Hi')     //'JavaScript'

5、Object.getOwnPropertyDescriptors()

该方法会返回目标对象中所有属性的属性描述符，该属性必须是对象自己定义的，不能是从原型链继承来的。

    var obj = {
            id:  1,
            name: 'demo',
            get gender() {
                console.log('gender')
            },
            set grad(d) {
                console.log(d)
            }
        }
        
     console.log(Object.getOwnPropertyDescriptors(obj))
      
      
6、函数参数支持尾部逗号

该特性允许我们在定义或者调用函数时添加尾部逗号而不报错

    let foo = function (
        a,
        b,
        c,) {
        console.log('a:', a)
        console.log('b:', b)
        console.log('c:', c)
    }
    
    foo(1, 3, 4, )

    //输出结果为：
    a: 1
    b: 3
    c: 4

7、修饰器Decorator






## 参考地址

[ECMAScript 6 入门](http://es6.ruanyifeng.com/#docs/proposals)



































