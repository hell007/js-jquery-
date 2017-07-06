DEMO解析

直接看我在demo里，完成那个页面的核心代码：




从上面的代码也能看出，这个分页组件最核心的api也就是下面几个：

getParams（）：它是一个实例方法，返回组件的分页大小跟页码，至于这两个值的参数名字，可以通过option来修改；

refresh（total）：这也是一个实例方法，外部传给它一个最新的记录总数，分页组件再根据它重新渲染UI；

onChange：这是一个函数类型的回调，它可以作为一个option在创建实例的时候传入，所有分页操作都会反馈到这个回调里面来，通常只要把外部拉取内容的动作绑定它上面即可。

考虑到要控制分页的重复操作问题，还另外加了一个disable和enable的api，这个比较好理解了。当分页被disable的时候，会显示禁用的样式，cursor为not-allowed，所有分页操作都将无效。

实际上，我在最近的一个项目中， 写类似demo的一个简单分页功能，就是这么写的，业务代码很少，逻辑也比较清晰，虽然说列表管理，比如渲染那一块，还可以再封装一下，但是在这种简单场景中，不再去封装，也是可以的，因为它本身已经很简单，再想办法封装，也增加不了多少的灵活性。

现在还有不少的公司在采用没有封装的代码，分页的功能在不同的页面都写一遍，每个位置都定义五六个function，比如goFirst goPrev goLast goNext goPage这种，从结果上来说没啥不好，就是在做重复的事情的时候效率不高，不好维护。要是都能封装起来，相信能给团队带来不少好处。

概要说明

先从option说起，以下是pageView.js定义的所有option及默认值：

var DEFAULTS = {
    defaultIndex: 1,//默认页
    defaultSize: 10,//默认分页大小
    pageIndexName: 'page',//分页参数名称
    pageSizeName: 'page_size',//分页大小参数名称
    onChange: $.noop,//分页改变或分页大小改变时的回调
    onInit: $.noop,//初始化完毕的回调
    allowActiveClick: true,//控制当前页是否允许重复点击刷新
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
};

我把其中需要再详细解释下的说明清楚。

1）pageIndexName和pageSizeName

这两个用来定义分页参数的名字，还记得那个getParams方法吗，它是这样的：




getParams返回一个对象，这个对象包含两个键值对，键分别用pageIndexName和pageSizeName这两个option，值就用分页内部管理的分页大小和页码。当外部调用这个方法时，就能直接把它的返回值作为查询参数传递到后台接口了。

2） middlePageItems,frontPageItems，endPageItems

也许看了demo里面的分页部分的效果就能明白它们三个的作用：




middlePageItems代表中间连续部分的分页项的数量；

frontPageItems代表起始部分连续的分页项的数量；

endPageItems代表结尾部分连续的分页项的数量。

这三个option之所以要定义，是由当前这个分页组件要做的效果，以及它使用的分页算法决定的。

然后pageView定义的实例方法就不过多说明了，因为都比较简单，而且最核心的都已经在demo里面体现出来，感兴趣的话，照着用即可。如果对代码感兴趣，碰到有疑问的，欢迎私信一起交流。

最后说下分页算法。影响分页组件能不能通用的另外一个要素就是分页算法。有的可能不需要分页算法，直接从1到总页数显示出来就完了，但是这样肯定有问题，尤其当总页数很多的时候；有的分页跟我这个就不太一样，它可能只显示当前页在内的连续一部分页码，然后当切换不同的页的时候，这个连续部分也不相同；我这里用的是较为常见的一个算法，首尾以及中间都有连续部分。详细的渲染逻辑都在render方法里面，但是最核心的东西其实还是getInterval这个函数：

function getInterval(data, opts) {
    var ne_half = Math.ceil(opts.middlePageItems / 2);
    var np = data.pages;
    var upper_limit = np - opts.middlePageItems;
    var start = data.pageIndex > ne_half ? Math.max(Math.min(data.pageIndex - ne_half, upper_limit), 0) : 0;
    var end = data.pageIndex > ne_half ? Math.min(data.pageIndex + ne_half, np) : Math.min(opts.middlePageItems, np);
    return [start, end];
}

它的作用在于返回中间连续部分的起止索引。根据这个起止索引渲染中间部分的页码，然后把start和frontPagetItems比较，渲染起始部分的页码；把end与与backPageItems比较，绘制结尾部分的页码。

其它问题

以上就算是这个分页组件的全部核心内容了。但是最终来看，它还是有些问题的。一开始我就说过，这种东西要是能做到足够灵活，能够满足不同项目里面相同功能的话，这样就才算强大。基于这点来看目前的pageView，它的问题在于：

1）固化了分页算法，要是换一个项目，产品不想搞这个分成首尾中间连续三部分的效果，那么就必须改动源码才能适应需求了。要解决这个问题，可以考虑把pageView再抽象出一个父类，不同的子类去覆盖render方法，也就是在项目中提供多个pageView的实现，要用哪个，根据需求来定。

2）没有包括分页大小，页码跳转，记录总数和记录范围这些内容，有可能其他项目需要这些东西，作为分页的辅助功能。要解决这个问题，可以考虑在当前的版本上扩充，补充事件的监听，添加一些合适的option，控制这些内容是否显示即可。

我之所以没有去解决上面的这些问题，有两个原因：

1）就目前的所有场景来说，没有碰到要额外内容的场景，如分页大小等，所以先不处理，避免增加这个组件的复杂性；

2）对于分页算法，我认为在产品设计中没有必要做出太多的不同的设计出来，所以固化一种没有问题。因为不管从哪一方面，为不同的页面提供不同的分页算法都是一件很划不来的事情，如果当产品出现这种问题的时候，我会尽力去把他说服。

当然，每个人想法不同，坚持自己的思想最好。


http://qoofan.com/read/Mnwm0DYzGY.html