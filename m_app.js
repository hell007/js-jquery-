// JavaScript Document

var App = (function(){
	
	/*
	 * 跨域请求 S
	 * url:请求地址
	 * param:提交参数
	 * fun:数据处理
	 * App.handleJSONP("http://www.kunyujie.com/jie/test/getJsonp.action",{id:1000},function(data){...})
	 */
	var setJOSNP = function(url, param, fun){		    	
	    	//jsonp方式
	    $.ajax({  
	        type : "get",  
	        async:false, 
	        data: param,
	        url : url,  
	        dataType : "jsonp",//数据类型为jsonp  
	        jsonp:"callback",
		    jsonpCallback:'jsonp_success',
	        success:function(data){  
	        		if(fun && typeof fun === 'function') fun(data);
	        },  
	        error:function(){  
	           new TipBox({type:'error',str:'提交出错了!',hasBtn:true});
	        }  
	    }); 
	}
	//E
	
	
	/*
	 * 异步提交任务 S
	 * url:请求地址
	 * param:提交参数
	 * fun:数据处理
	 */
	var setAsyncTask = function(url, param, fun) {
	    $.ajax({
	        type: "post",
	        url: url,
	        async: false,
	        data: param,
	        cache: false,
	        dataType: "json",
	        success: function(data) {   	
	            if (data != null) {
	               if(fun && typeof fun === 'function') fun(data);
	            }
	        },
	        error: function() {
	            new TipBox({type:'error',str:'提交出错了!',hasBtn:true});
	        }
	    });
	};
	//E

	
	/*
	 * tab选项卡 S
	 */
	var setSwitchDoor = function(navItem,tabBd,events,clazz){
		var _navItem = $(navItem), _tabBd = $(tabBd);
		$.each(_navItem, function(_i, _obj){
			$(_obj).off().on(events, function(){
			  	$(_navItem).removeClass(clazz);
				$(_navItem[_i]).addClass(clazz)
				$(_tabBd).hide();
				$(tabBd[_i]).show();
			});
		});
	}
	// E
	
		
	//全选 反选  S
	var clickCheckbox = function(){
	    $(".chooseAll").click(function(){
	        var status=$(this).prop('checked');
	        $("tbody input[type='checkbox']").prop("checked",status);
	        $(".chooseAll").prop("checked",status);
	        $(".unsetAll").prop("checked",false);
	    });
	    $(".unsetAll").click(function(){
	        var status=$(this).prop('checked');
	        $("tbody input[type='checkbox']").each(function(){
	            $(this).prop("checked",! $(this).prop("checked"));
	        });
	        $(".unsetAll").prop("checked",status);
	        $(".chooseAll").prop("checked",false);
	    });
	}
	//全选 E
	
	
	/**
	 * 和PHP一样的时间戳格式化函数
	 * @param  {string} format    格式
	 * @param  {int}    timestamp 要格式化的时间 默认为当前时间
	 * @return {string}           格式化的时间字符串
	 * @use  var timer = 1355023942;  var t = date("Y-m-d h:i:s", timer)
	 */
	var date = function(format, timestamp){
	    var a, jsdate=((timestamp) ? new Date(timestamp*1000) : new Date());
	    var pad = function(n, c){
	        if((n = n + "").length < c){
	            return new Array(++c - n.length).join("0") + n;
	        } else {
	            return n;
	        }
	    };
	    var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	    var txt_ordin = {
	        1:"st",
	        2:"nd",
	        3:"rd",
	        21:"st",
	        22:"nd",
	        23:"rd",
	        31:"st"
	    };
	    var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	    var f = {
	        // Day
	        d: function(){
	            return pad(f.j(), 2)
	        },
	        D: function(){
	            return f.l().substr(0,3)
	        },
	        j: function(){
	            return jsdate.getDate()
	        },
	        l: function(){
	            return txt_weekdays[f.w()]
	        },
	        N: function(){
	            return f.w() + 1
	        },
	        S: function(){
	            return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'
	        },
	        w: function(){
	            return jsdate.getDay()
	        },
	        z: function(){
	            return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0
	        },

	        // Week
	        W: function(){
	            var a = f.z(), b = 364 + f.L() - a;
	            var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
	            if(b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b){
	                return 1;
	            } else{
	                if(a <= 2 && nd >= 4 && a >= (6 - nd)){
	                    nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
	                    return date("W", Math.round(nd2.getTime()/1000));
	                } else{
	                    return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
	                }
	            }
	        },

	        // Month
	        F: function(){
	            return txt_months[f.n()]
	        },
	        m: function(){
	            return pad(f.n(), 2)
	        },
	        M: function(){
	            return f.F().substr(0,3)
	        },
	        n: function(){
	            return jsdate.getMonth() + 1
	        },
	        t: function(){
	            var n;
	            if( (n = jsdate.getMonth() + 1) == 2 ){
	                return 28 + f.L();
	            } else{
	                if( n & 1 && n < 8 || !(n & 1) && n > 7 ){
	                    return 31;
	                } else{
	                    return 30;
	                }
	            }
	        },

	        // Year
	        L: function(){
	            var y = f.Y();
	            return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0
	        },
	        //o not supported yet
	        Y: function(){
	            return jsdate.getFullYear()
	        },
	        y: function(){
	            return (jsdate.getFullYear() + "").slice(2)
	        },

	        // Time
	        a: function(){
	            return jsdate.getHours() > 11 ? "pm" : "am"
	        },
	        A: function(){
	            return f.a().toUpperCase()
	        },
	        B: function(){
	            // peter paul koch:
	            var off = (jsdate.getTimezoneOffset() + 60)*60;
	            var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
	            var beat = Math.floor(theSeconds/86.4);
	            if (beat > 1000) beat -= 1000;
	            if (beat < 0) beat += 1000;
	            if ((String(beat)).length == 1) beat = "00"+beat;
	            if ((String(beat)).length == 2) beat = "0"+beat;
	            return beat;
	        },
	        g: function(){
	            return jsdate.getHours() % 12 || 12
	        },
	        G: function(){
	            return jsdate.getHours()
	        },
	        h: function(){
	            return pad(f.g(), 2)
	        },
	        H: function(){
	            return pad(jsdate.getHours(), 2)
	        },
	        i: function(){
	            return pad(jsdate.getMinutes(), 2)
	        },
	        s: function(){
	            return pad(jsdate.getSeconds(), 2)
	        },
	        //u not supported yet

	        // Timezone
	        //e not supported yet
	        //I not supported yet
	        O: function(){
	            var t = pad(Math.abs(jsdate.getTimezoneOffset()/60*100), 4);
	            if (jsdate.getTimezoneOffset() > 0) t = "-" + t; else t = "+" + t;
	            return t;
	        },
	        P: function(){
	            var O = f.O();
	            return (O.substr(0, 3) + ":" + O.substr(3, 2))
	        },
	        //T not supported yet
	        //Z not supported yet

	        // Full Date/Time
	        c: function(){
	            return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()
	        },
	        //r not supported yet
	        U: function(){
	            return Math.round(jsdate.getTime()/1000)
	        }
	    };

	    return format.replace(/[\\]?([a-zA-Z])/g, function(t, s){
	        if( t!=s ){
	            // escaped
	            ret = s;
	        } else if( f[s] ){
	            // a date function exists
	            ret = f[s]();
	        } else{
	            // nothing special
	            ret = s;
	        }
	        return ret;
	    });
	}
	//use
	//var time = 1804050505;
	//var t = date("Y-m-d h:i:s",time);
	
	
	//初始化窗口尺寸 S
	var autoSize = function(){
	    //alert($(".commonBtnArea").length);
	    var webBodyWidth=$(window).width();
	    var webBodyHight=$(window).height()
	    var h=(webBodyHight-80);
	    h=h<300?300:h;
	    $('#control').css('height',h+'px');
	    //$('#Left').css('height',(h+12)+'px');
	    var btns=$(".commonBtnArea").length;
	    var rh=btns>0?h-50:h;
	    $('#Right').css({
	        height:rh+'px',
	        width:(webBodyWidth-230)+'px'
	    });
	    if(btns>0){
	        $(".commonBtnArea").css({
	            width:(webBodyWidth-210-40-16)+'px'
	        });
	    }
	    var c_s=0;
	    $('#control').click(function(){
	        if(c_s==1){
	            if(btns>0){
	                $(".commonBtnArea").animate({
	                    width:(webBodyWidth-210-40-16)+'px'
	                }, "fast");
	            }
	            $("#Right").animate({
	                width: (webBodyWidth-230)+'px'
	            }, "fast");
	            $("#Left").animate({
	                marginLeft:"0px"
	            }, "fast");
	            $(this).removeClass("close");
	            c_s=0;
	        }else{
	            if(btns>0){
	                $(".commonBtnArea").animate({
	                    width: (webBodyWidth-66)+'px'
	                }, "fast");
	            }
	            $("#Right").animate({
	                width: (webBodyWidth-26)+'px'
	            }, "fast");
	            $("#Left").animate({
	                marginLeft:"-197px"
	            }, "fast");
	            $(this).addClass("close");
	            c_s=1;
	        }
	    });
	}
	// E
	
	//导航滑动 S
	var setMenuListSlide = function(){
		var crumbs = $(".jsSubMenu").find("li.current").children("a").text();
		$("#crumbs").text(crumbs);
	}
	//导航滑动 E
	
	//placeholder模拟 S
	/*var setPlaceholder = function(obj){
		var temval=$(obj).val();
		$(obj).focus(function(){
		    if($(this).val()==temval){
				$(this).val("");
			}
	   })
	   .blur(function(){ 
		   if($(this).val()=="") $(this).val(temval); 
	   })
	}*/
	var setPlaceholder = function(){
		if(!placeholderSupport()){   // 判断浏览器是否支持 placeholder
		    $('[placeholder]').focus(function() {
		        var input = $(this);
		        if (input.val() == input.attr('placeholder')) {
		            input.val('');
		            input.removeClass('placeholder');
		        }
		    }).blur(function() {
		        var input = $(this);
		        if (input.val() == '' || input.val() == input.attr('placeholder')) {
		            input.addClass('placeholder');
		            input.val(input.attr('placeholder'));
		        }
		    }).blur();
		};
		
		function placeholderSupport() {
		    return 'placeholder' in document.createElement('input');
		}
	}	
	//placeholder模拟 E
	
	

	
	//单选按钮模拟 S
	//数据初始化,回显数据option
	var setRadioDfaut = function(option,radioID){
		if(option.checked){
			$(radioID).children(".radio-li-w").eq(option.no).addClass("checked");	
			$(radioID).children(".radio-li-w").eq(option.no).children("input").attr("checked",true);	
		}
	};
	//点击操作选择状态
	var setRadioChecked = function(radioLiObj,fn){
		$(radioLiObj).off().on("click",function(){
			//alert($(this).index());
			$(this).addClass("checked").siblings("div.radio-li-w").removeClass("checked");
			if(fn){fn ? fn() : null;}
		})
	};
	//单选按钮模拟 E
	
	//退出 S
	var setLoginOut = function(){
		$(".loginOut").off().on("click",function(){
			new TipBox({type:'tip',str:'确定要退出？',setTime:10000500,hasBtn:true,callBack:function(){    
				$.post("login/logout",{},
				function(data){
					if(data.success){
						window.location.href="login/login";
					}
				},'json');
		    }});
		});
	};
	//退出 E
	

	//单条数据删除 S
	/*
	*url: 执行删除操作的Action=> method
	*json: Action=>method里面需要接收的name对象
	*tr:要删除的条目所在的html结构
	*/
	var deleteOne = function(url,json,tr){
		new TipBox({type:'tip',str:'确定要删除吗？',setTime:10000500,hasBtn:true,callBack:function(){    
			$.post(url,json,
			function(data){
				if(data.success){
					tr.remove();
				}else{
					new TipBox({type:'error',str:data.message,hasBtn:true});
				}
			},'json');
	    }});
	};
	//单条数据删除 E
	
	//批量删除 S
	//用户批量删除时,得到所选所有ID,用,逗号连接发送到控制器
	//url: 执行删除操作的Action=> method
	//json: Action=>method里面需要接收的name对象
	//nums:要删除的数据总数
	//targetUrl:跳转地址
	var deleteMore = function(delUrl,json,number,ids){
		new TipBox({type:'tip',str:'确定要删除'+ number +'条数据吗？',setTime:10000500,hasBtn:true,callBack:function(){    
			$.post(delUrl,json,
			function(data){
				if(data.success){
					for(var i=0;i<ids.length;i++){
						$("#tr-"+ids[i]).remove();
					}
					//window.location.reload(true);
				}else{
					new TipBox({type:'error',str:data.message,hasBtn:true});
				}
			},'json');
	    }});
	};
	//批量删除 E
	
	return{
		init: function(){
			//setTipsForBrowser();//浏览器进行提示
			clickCheckbox();//全选
			autoSize();//
			setMenuListSlide();//导航菜单滑动
			$(window).resize(autoSize);
			setLoginOut();//退出
			var time=self.setInterval(function(){$("#today").html(date("Y-m-d H:i:s"));},1000);
		},
		switchModel: function(swLi,swDiv,evt,currClazz){
			setSwitchDoor(swLi,swDiv,evt,currClazz); //选项卡
		},
		placeholder: function(obj){
			setPlaceholder(obj);
		},
		radioModel:function(option,radioID,radioLiObj,fn){
			setRadioDfaut(option,radioID);//初始化设置
			setRadioChecked(radioLiObj,fn);//点击选择
		},
		dateFormat: function(format, timestamp){
			return date(format, timestamp);
		},
		delMore: function(url,json,number,ids){
			deleteMore(url,json,number,ids); //批量删除
		},
		delOne: function(url,id,tr){
			deleteOne(url,id,tr); //单条删除
		},
	};
})();


////加载init
$(function(){
	
	App.init();
})

/*
 *jquery.zoom
 */
(function($){$.fn.jcarousel=function(o){return this.each(function(){new $jc(this,o)})};var defaults={vertical:false,start:1,offset:1,size:null,scroll:3,visible:null,animation:'normal',easing:'swing',auto:0,wrap:null,initCallback:null,reloadCallback:null,itemLoadCallback:null,itemFirstInCallback:null,itemFirstOutCallback:null,itemLastInCallback:null,itemLastOutCallback:null,itemVisibleInCallback:null,itemVisibleOutCallback:null,buttonNextHTML:'<div><i class="iconfont">&#xe6b9;</i></div>',buttonPrevHTML:'<div><i class="iconfont">&#xe6ba;</i></div>',buttonNextEvent:'click',buttonPrevEvent:'click',buttonNextCallback:null,buttonPrevCallback:null};$.jcarousel=function(e,o){this.options=$.extend({},defaults,o||{});this.locked=false;this.container=null;this.clip=null;this.list=null;this.buttonNext=null;this.buttonPrev=null;this.wh=!this.options.vertical?'width':'height';this.lt=!this.options.vertical?'left':'top';var skin='',split=e.className.split(' ');for(var i=0;i<split.length;i++){if(split[i].indexOf('jcarousel-skin')!=-1){$(e).removeClass(split[i]);var skin=split[i];break}}if(e.nodeName=='UL'||e.nodeName=='OL'){this.list=$(e);this.container=this.list.parent();if(this.container.hasClass('jcarousel-clip')){if(!this.container.parent().hasClass('jcarousel-container'))this.container=this.container.wrap('<div></div>');this.container=this.container.parent()}else if(!this.container.hasClass('jcarousel-container'))this.container=this.list.wrap('<div></div>').parent()}else{this.container=$(e);this.list=$(e).find('>ul,>ol,div>ul,div>ol')}if(skin!=''&&this.container.parent()[0].className.indexOf('jcarousel-skin')==-1)this.container.wrap('<div class=" '+skin+'"></div>');this.clip=this.list.parent();if(!this.clip.length||!this.clip.hasClass('jcarousel-clip'))this.clip=this.list.wrap('<div></div>').parent();this.buttonPrev=$('.jcarousel-prev',this.container);if(this.buttonPrev.size()==0&&this.options.buttonPrevHTML!=null)this.buttonPrev=this.clip.before(this.options.buttonPrevHTML).prev();this.buttonPrev.addClass(this.className('jcarousel-prev'));this.buttonNext=$('.jcarousel-next',this.container);if(this.buttonNext.size()==0&&this.options.buttonNextHTML!=null)this.buttonNext=this.clip.before(this.options.buttonNextHTML).prev();this.buttonNext.addClass(this.className('jcarousel-next'));this.clip.addClass(this.className('jcarousel-clip'));this.list.addClass(this.className('jcarousel-list'));this.container.addClass(this.className('jcarousel-container'));var di=this.options.visible!=null?Math.ceil(this.clipping()/this.options.visible):null;var li=this.list.children('li');var self=this;if(li.size()>0){var wh=0,i=this.options.offset;li.each(function(){self.format(this,i++);wh+=self.dimension(this,di)});this.list.css(this.wh,wh+'px');if(!o||o.size===undefined)this.options.size=li.size()}this.container.css('display','block');this.buttonNext.css('display','block');this.buttonPrev.css('display','block');this.funcNext=function(){self.next()};this.funcPrev=function(){self.prev()};this.funcResize=function(){self.reload()};if(this.options.initCallback!=null)this.options.initCallback(this,'init');if($.support.safari){this.buttons(false,false);$(window).bind('load',function(){self.setup()})}else this.setup()};var $jc=$.jcarousel;$jc.fn=$jc.prototype={jcarousel:'0.2.3'};$jc.fn.extend=$jc.extend=$.extend;$jc.fn.extend({setup:function(){this.first=null;this.last=null;this.prevFirst=null;this.prevLast=null;this.animating=false;this.timer=null;this.tail=null;this.inTail=false;if(this.locked)return;this.list.css(this.lt,this.pos(this.options.offset)+'px');var p=this.pos(this.options.start);this.prevFirst=this.prevLast=null;this.animate(p,false);$(window).unbind('resize',this.funcResize).bind('resize',this.funcResize)},reset:function(){this.list.empty();this.list.css(this.lt,'0px');this.list.css(this.wh,'10px');if(this.options.initCallback!=null)this.options.initCallback(this,'reset');this.setup()},reload:function(){if(this.tail!=null&&this.inTail)this.list.css(this.lt,$jc.intval(this.list.css(this.lt))+this.tail);this.tail=null;this.inTail=false;if(this.options.reloadCallback!=null)this.options.reloadCallback(this);if(this.options.visible!=null){var self=this;var di=Math.ceil(this.clipping()/this.options.visible),wh=0,lt=0;$('li',this.list).each(function(i){wh+=self.dimension(this,di);if(i+1<self.first)lt=wh});this.list.css(this.wh,wh+'px');this.list.css(this.lt,-lt+'px')}this.scroll(this.first,false)},lock:function(){this.locked=true;this.buttons()},unlock:function(){this.locked=false;this.buttons()},size:function(s){if(s!=undefined){this.options.size=s;if(!this.locked)this.buttons()}return this.options.size},has:function(i,i2){if(i2==undefined||!i2)i2=i;if(this.options.size!==null&&i2>this.options.size)i2=this.options.size;for(var j=i;j<=i2;j++){var e=this.get(j);if(!e.length||e.hasClass('jcarousel-item-placeholder'))return false}return true},get:function(i){return $('.jcarousel-item-'+i,this.list)},add:function(i,s){var e=this.get(i),old=0,add=0;if(e.length==0){var c,e=this.create(i),j=$jc.intval(i);while(c=this.get(--j)){if(j<=0||c.length){j<=0?this.list.prepend(e):c.after(e);break}}}else old=this.dimension(e);e.removeClass(this.className('jcarousel-item-placeholder'));typeof s=='string'?e.html(s):e.empty().append(s);var di=this.options.visible!=null?Math.ceil(this.clipping()/this.options.visible):null;var wh=this.dimension(e,di)-old;if(i>0&&i<this.first)this.list.css(this.lt,$jc.intval(this.list.css(this.lt))-wh+'px');this.list.css(this.wh,$jc.intval(this.list.css(this.wh))+wh+'px');return e},remove:function(i){var e=this.get(i);if(!e.length||(i>=this.first&&i<=this.last))return;var d=this.dimension(e);if(i<this.first)this.list.css(this.lt,$jc.intval(this.list.css(this.lt))+d+'px');e.remove();this.list.css(this.wh,$jc.intval(this.list.css(this.wh))-d+'px')},next:function(){this.stopAuto();if(this.tail!=null&&!this.inTail)this.scrollTail(false);else this.scroll(((this.options.wrap=='both'||this.options.wrap=='last')&&this.options.size!=null&&this.last==this.options.size)?1:this.first+this.options.scroll)},prev:function(){this.stopAuto();if(this.tail!=null&&this.inTail)this.scrollTail(true);else this.scroll(((this.options.wrap=='both'||this.options.wrap=='first')&&this.options.size!=null&&this.first==1)?this.options.size:this.first-this.options.scroll)},scrollTail:function(b){if(this.locked||this.animating||!this.tail)return;var pos=$jc.intval(this.list.css(this.lt));!b?pos-=this.tail:pos+=this.tail;this.inTail=!b;this.prevFirst=this.first;this.prevLast=this.last;this.animate(pos)},scroll:function(i,a){if(this.locked||this.animating)return;this.animate(this.pos(i),a)},pos:function(i){if(this.locked||this.animating)return;i=$jc.intval(i);if(this.options.wrap!='circular')i=i<1?1:(this.options.size&&i>this.options.size?this.options.size:i);var back=this.first>i;var pos=$jc.intval(this.list.css(this.lt));var f=this.options.wrap!='circular'&&this.first<=1?1:this.first;var c=back?this.get(f):this.get(this.last);var j=back?f:f-1;var e=null,l=0,p=false,d=0;while(back?--j>=i:++j<i){e=this.get(j);p=!e.length;if(e.length==0){e=this.create(j).addClass(this.className('jcarousel-item-placeholder'));c[back?'before':'after'](e)}c=e;d=this.dimension(e);if(p)l+=d;if(this.first!=null&&(this.options.wrap=='circular'||(j>=1&&(this.options.size==null||j<=this.options.size))))pos=back?pos+d:pos-d}var clipping=this.clipping();var cache=[];var visible=0,j=i,v=0;var c=this.get(i-1);while(++visible){e=this.get(j);p=!e.length;if(e.length==0){e=this.create(j).addClass(this.className('jcarousel-item-placeholder'));c.length==0?this.list.prepend(e):c[back?'before':'after'](e)}c=e;var d=this.dimension(e);if(d==0){alert('jCarousel: No width/height set for items. This will cause an infinite loop. Aborting...');return 0}if(this.options.wrap!='circular'&&this.options.size!==null&&j>this.options.size)cache.push(e);else if(p)l+=d;v+=d;if(v>=clipping)break;j++}for(var x=0;x<cache.length;x++)cache[x].remove();if(l>0){this.list.css(this.wh,this.dimension(this.list)+l+'px');if(back){pos-=l;this.list.css(this.lt,$jc.intval(this.list.css(this.lt))-l+'px')}}var last=i+visible-1;if(this.options.wrap!='circular'&&this.options.size&&last>this.options.size)last=this.options.size;if(j>last){visible=0,j=last,v=0;while(++visible){var e=this.get(j--);if(!e.length)break;v+=this.dimension(e);if(v>=clipping)break}}var first=last-visible+1;if(this.options.wrap!='circular'&&first<1)first=1;if(this.inTail&&back){pos+=this.tail;this.inTail=false}this.tail=null;if(this.options.wrap!='circular'&&last==this.options.size&&(last-visible+1)>=1){var m=$jc.margin(this.get(last),!this.options.vertical?'marginRight':'marginBottom');if((v-m)>clipping)this.tail=v-clipping-m}while(i-->first)pos+=this.dimension(this.get(i));this.prevFirst=this.first;this.prevLast=this.last;this.first=first;this.last=last;return pos},animate:function(p,a){if(this.locked||this.animating)return;this.animating=true;var self=this;var scrolled=function(){self.animating=false;if(p==0)self.list.css(self.lt,0);if(self.options.wrap=='both'||self.options.wrap=='last'||self.options.size==null||self.last<self.options.size)self.startAuto();self.buttons();self.notify('onAfterAnimation')};this.notify('onBeforeAnimation');if(!this.options.animation||a==false){this.list.css(this.lt,p+'px');scrolled()}else{var o=!this.options.vertical?{'left':p}:{'top':p};this.list.animate(o,this.options.animation,this.options.easing,scrolled)}},startAuto:function(s){if(s!=undefined)this.options.auto=s;if(this.options.auto==0)return this.stopAuto();if(this.timer!=null)return;var self=this;this.timer=setTimeout(function(){self.next()},this.options.auto*1000)},stopAuto:function(){if(this.timer==null)return;clearTimeout(this.timer);this.timer=null},buttons:function(n,p){if(n==undefined||n==null){var n=!this.locked&&this.options.size!==0&&((this.options.wrap&&this.options.wrap!='first')||this.options.size==null||this.last<this.options.size);if(!this.locked&&(!this.options.wrap||this.options.wrap=='first')&&this.options.size!=null&&this.last>=this.options.size)n=this.tail!=null&&!this.inTail}if(p==undefined||p==null){var p=!this.locked&&this.options.size!==0&&((this.options.wrap&&this.options.wrap!='last')||this.first>1);if(!this.locked&&(!this.options.wrap||this.options.wrap=='last')&&this.options.size!=null&&this.first==1)p=this.tail!=null&&this.inTail}var self=this;this.buttonNext[n?'bind':'unbind'](this.options.buttonNextEvent,this.funcNext)[n?'removeClass':'addClass'](this.className('jcarousel-next-disabled')).attr('disabled',n?false:true);this.buttonPrev[p?'bind':'unbind'](this.options.buttonPrevEvent,this.funcPrev)[p?'removeClass':'addClass'](this.className('jcarousel-prev-disabled')).attr('disabled',p?false:true);if(this.buttonNext.length>0&&(this.buttonNext[0].jcarouselstate==undefined||this.buttonNext[0].jcarouselstate!=n)&&this.options.buttonNextCallback!=null){this.buttonNext.each(function(){self.options.buttonNextCallback(self,this,n)});this.buttonNext[0].jcarouselstate=n}if(this.buttonPrev.length>0&&(this.buttonPrev[0].jcarouselstate==undefined||this.buttonPrev[0].jcarouselstate!=p)&&this.options.buttonPrevCallback!=null){this.buttonPrev.each(function(){self.options.buttonPrevCallback(self,this,p)});this.buttonPrev[0].jcarouselstate=p}},notify:function(evt){var state=this.prevFirst==null?'init':(this.prevFirst<this.first?'next':'prev');this.callback('itemLoadCallback',evt,state);if(this.prevFirst!==this.first){this.callback('itemFirstInCallback',evt,state,this.first);this.callback('itemFirstOutCallback',evt,state,this.prevFirst)}if(this.prevLast!==this.last){this.callback('itemLastInCallback',evt,state,this.last);this.callback('itemLastOutCallback',evt,state,this.prevLast)}this.callback('itemVisibleInCallback',evt,state,this.first,this.last,this.prevFirst,this.prevLast);this.callback('itemVisibleOutCallback',evt,state,this.prevFirst,this.prevLast,this.first,this.last)},callback:function(cb,evt,state,i1,i2,i3,i4){if(this.options[cb]==undefined||(typeof this.options[cb]!='object'&&evt!='onAfterAnimation'))return;var callback=typeof this.options[cb]=='object'?this.options[cb][evt]:this.options[cb];if(!$.isFunction(callback))return;var self=this;if(i1===undefined)callback(self,state,evt);else if(i2===undefined)this.get(i1).each(function(){callback(self,this,i1,state,evt)});else{for(var i=i1;i<=i2;i++)if(i!==null&&!(i>=i3&&i<=i4))this.get(i).each(function(){callback(self,this,i,state,evt)})}},create:function(i){return this.format('<li></li>',i)},format:function(e,i){var $e=$(e).addClass(this.className('jcarousel-item')).addClass(this.className('jcarousel-item-'+i));$e.attr('jcarouselindex',i);return $e},className:function(c){return c+' '+c+(!this.options.vertical?'-horizontal':'-vertical')},dimension:function(e,d){var el=e.jquery!=undefined?e[0]:e;var old=!this.options.vertical?el.offsetWidth+$jc.margin(el,'marginLeft')+$jc.margin(el,'marginRight'):el.offsetHeight+$jc.margin(el,'marginTop')+$jc.margin(el,'marginBottom');if(d==undefined||old==d)return old;var w=!this.options.vertical?d-$jc.margin(el,'marginLeft')-$jc.margin(el,'marginRight'):d-$jc.margin(el,'marginTop')-$jc.margin(el,'marginBottom');$(el).css(this.wh,w+'px');return this.dimension(el)},clipping:function(){return!this.options.vertical?this.clip[0].offsetWidth-$jc.intval(this.clip.css('borderLeftWidth'))-$jc.intval(this.clip.css('borderRightWidth')):this.clip[0].offsetHeight-$jc.intval(this.clip.css('borderTopWidth'))-$jc.intval(this.clip.css('borderBottomWidth'))},index:function(i,s){if(s==undefined)s=this.options.size;return Math.round((((i-1)/s)-Math.floor((i-1)/s))*s)+1}});$jc.extend({defaults:function(d){return $.extend(defaults,d||{})},margin:function(e,p){if(!e)return 0;var el=e.jquery!=undefined?e[0]:e;if(p=='marginRight'&&$.support.safari){var old={'display':'block','float':'none','width':'auto'},oWidth,oWidth2;$.swap(el,old,function(){oWidth=el.offsetWidth});old['marginRight']=0;$.swap(el,old,function(){oWidth2=el.offsetWidth});return oWidth2-oWidth}return $jc.intval($.css(el,p))},intval:function(v){v=parseInt(v);return isNaN(v)?0:v}})})(jQuery);(function($){$.fn.jqueryzoom=function(options){var settings={xzoom:200,yzoom:200,offset:10,position:"right",lens:1,preload:1};if(options){$.extend(settings,options)}var noalt='';$(this).hover(function(){var imageLeft=$(this).offset().left;var imageTop=$(this).offset().top;var imageWidth=$(this).children('img').get(0).offsetWidth;var imageHeight=$(this).children('img').get(0).offsetHeight;noalt=$(this).children("img").attr("alt");var bigimage=$(this).children("img").attr("longdesc");$(this).children("img").attr("alt",'');if($("div.zoomdiv").get().length==0){$(this).after("<div class='zoomdiv'><img class='bigimg' src='"+bigimage+"'/></div>");$(this).append("<div class='jqZoomPup'>&nbsp;</div>")}if(settings.position=="right"){if(imageLeft+imageWidth+settings.offset+settings.xzoom>screen.width){leftpos=imageLeft-settings.offset-settings.xzoom}else{leftpos=imageLeft+imageWidth+settings.offset}}else{leftpos=imageLeft-settings.xzoom-settings.offset;if(leftpos<0){leftpos=imageLeft+imageWidth+settings.offset}}$("div.zoomdiv").css({top:imageTop,left:leftpos});$("div.zoomdiv").width(settings.xzoom);$("div.zoomdiv").height(settings.yzoom);$("div.zoomdiv").show();if(!settings.lens){$(this).css('cursor','crosshair')}$(document.body).mousemove(function(e){mouse=new MouseEvent(e);var bigwidth=$(".bigimg").get(0).offsetWidth;var bigheight=$(".bigimg").get(0).offsetHeight;var scaley='x';var scalex='y';if(isNaN(scalex)|isNaN(scaley)){var scalex=(bigwidth/imageWidth);var scaley=(bigheight/imageHeight);$("div.jqZoomPup").width((settings.xzoom)/(scalex*1));$("div.jqZoomPup").height((settings.yzoom)/(scaley*1));if(settings.lens){$("div.jqZoomPup").css('visibility','visible')}}xpos=mouse.x-$("div.jqZoomPup").width()/2-imageLeft;ypos=mouse.y-$("div.jqZoomPup").height()/2-imageTop;if(settings.lens){xpos=(mouse.x-$("div.jqZoomPup").width()/2<imageLeft)?0:(mouse.x+$("div.jqZoomPup").width()/2>imageWidth+imageLeft)?(imageWidth-$("div.jqZoomPup").width()-2):xpos;ypos=(mouse.y-$("div.jqZoomPup").height()/2<imageTop)?0:(mouse.y+$("div.jqZoomPup").height()/2>imageHeight+imageTop)?(imageHeight-$("div.jqZoomPup").height()-2):ypos}if(settings.lens){$("div.jqZoomPup").css({top:ypos,left:xpos})}scrolly=ypos;$("div.zoomdiv").get(0).scrollTop=scrolly*scaley;scrollx=xpos;$("div.zoomdiv").get(0).scrollLeft=(scrollx)*scalex})},function(){$(this).children("img").attr("alt",noalt);$(document.body).unbind("mousemove");if(settings.lens){$("div.jqZoomPup").remove()}$("div.zoomdiv").remove()});count=0;if(settings.preload){$('body').append("<div style='display:none;' class='jqPreload"+count+"'>authur:kunyujie.com</div>");$(this).each(function(){var imagetopreload=$(this).children("img").attr("longdesc");var content=jQuery('div.jqPreload'+count+'').html();jQuery('div.jqPreload'+count+'').html(content+'<img src=\"'+imagetopreload+'\">')})}}})(jQuery);function MouseEvent(e){this.x=e.pageX;this.y=e.pageY};


     
/*  
 * @弹出提示层 ( 加载动画(load), 提示动画(tip), 成功(success), 错误(error), )  
 * @method  tipBox  
 * @description 默认配置参数   
 * @param {Number} width -宽度  
 * @param {Number} height -高度         
 * @param {String} str -默认文字  
 * @param {Object} windowDom -载入窗口 默认当前窗口  
 * @param {Number} setTime -定时消失(毫秒) 默认为0 不消失  
 * @param {Boolean} hasMask -是否显示遮罩  
 * @param {Boolean} hasMaskWhite -显示白色遮罩   
 * @param {Boolean} clickDomCancel -点击空白取消  
 * @param {Function} callBack -回调函数 (只在开启定时消失时才生效)  
 * @param {Function} hasBtn -显示按钮  
 * @param {String} type -动画类型 (加载,成功,失败,提示)  
 * @example   
 * new TipBox();   
 * new TipBox({type:'load',setTime:1000,callBack:function(){ alert(..) }});   
*/  
 
 var TipBox = (function(cfg) {
	
	/**
	 * @class TipBox
	 * @constructor
	 */
	function TipBox(cfg) {
		var instance = this;
		
		this.config = {   
	        width          : 250,
	        height         : 170,                 
	        str            : '正在处理',       
	        windowDom      : window,   
	        setTime        : 0,     
	        hasMask        : true,    
	        hasMaskWhite   : false,   
	        clickDomCancel : false,    
	        callBack       : null, 
	        hasBtn         : false, 
	        type           : 'success'  
	    };
	    $.extend(this.config,cfg);    
	      
	    //存在就retrun  
	    if(TipBox.prototype.boundingBox) return;  
	      
	    //初始化  
	    this.render(this.config.type);
		return this;
	}
  
  
  
	//外层box  
	TipBox.prototype.boundingBox = null;  
	  
	//渲染  
	TipBox.prototype.render = function(tipType,container){    
	    this.renderUI(tipType);   
	      
	    //绑定事件  
	    this.bindUI();   
	      
	    //初始化UI  
	    this.syncUI();   
	    $(container || this.config.windowDom.document.body).append(TipBox.prototype.boundingBox);     
	};  
	  
	//渲染UI  
	TipBox.prototype.renderUI = function(tipType){   
	    TipBox.prototype.boundingBox = $("<div id='animationTipBox'></div>");         
	    tipType == 'success' && this.successRenderUI();   
	    tipType == 'error'   && this.errorRenderUI();  
	    tipType == 'tip'     && this.tipRenderUI();  
	    TipBox.prototype.boundingBox.appendTo(this.config.windowDom.document.body);  
	                  
	    //是否显示遮罩  
	    if(this.config.hasMask){  
	        this.config.hasMaskWhite ? this._mask = $("<div class='mask-white'></div>") : this._mask = $("<div class='mask-default'></div>");  
	        this._mask.appendTo(this.config.windowDom.document.body);  
	    }     
	    // 是否显示按钮
	    if(this.config.hasBtn){
	        this.config.height = 206;
	        $('#animationTipBox').css("margin-top","103px");
	        switch(this.config.type){
	            case 'success':$(".success").after("<button class='o-button closeButton'>关闭</button>");
	                break;
	            case 'error':$(".lose").after("<button class='o-button red-button closeButton'>关闭</button>");
	                break;
	            case 'tip':$(".tip").after("<button class='o-button r-button okButton'>确定</button><button class='o-button g-button closeButton'>取消</button>");
	                break;
	            default: break;
	        }
	        //关闭  or  取消
	        $('button.closeButton').on('click',function(){_this.close();});
	        //确定
	        $('button.okButton').on('click',function(){_this.confirm();});
	    }
	    //定时消失  
	    _this = this;  
	    !this.config.setTime && typeof this.config.callBack === "function" && (this.config.setTime = 1);      
	    this.config.setTime && setTimeout( function(){ _this.close(); }, _this.config.setTime );  
	};  
	  
	TipBox.prototype.bindUI = function(){  
	    _this = this;             
	      
	    //点击空白立即取消  
	    this.config.clickDomCancel && this._mask && this._mask.click(function(){_this.close();});                        
	};  
	TipBox.prototype.syncUI = function(){             
	    TipBox.prototype.boundingBox.css({  
	        width       : this.config.width+'px',  
	        height      : this.config.height+'px',  
	        marginLeft  : "-"+(this.config.width/2)+'px',  
	        marginTop   : "-"+(this.config.height/2)+'px'  
	    });   
	};  
	  
	//提示效果UI  
	TipBox.prototype.tipRenderUI = function(){  
	    var tip = "<div class='tip'>";  
	        tip +="     <div class='icon'>i</div>";  
	        tip +="     <div class='dec-txt'>"+this.config.str+"</div>";  
	        tip += "</div>";  
	    TipBox.prototype.boundingBox.append(tip);  
	};  
	  
	//成功效果UI  
	TipBox.prototype.successRenderUI = function(){  
	    var suc = "<div class='success'>";  
	        suc +=" <div class='icon'>";  
	        suc +=      "<div class='line-short'></div>";  
	        suc +=      "<div class='line-long'></div>  ";        
	        suc +=  "</div>";  
	        suc +=" <div class='dec-txt'>"+this.config.str+"</div>";  
	        suc += "</div>";  
	    TipBox.prototype.boundingBox.append(suc);  
	};  
	  
	//错误效果UI  
	TipBox.prototype.errorRenderUI = function(){  
	    var err  = "<div class='lose'>";  
	        err +=  "   <div class='icon'>";  
	        err +=  "       <div class='icon-box'>";  
	        err +=  "           <div class='line-left'></div>";  
	        err +=  "           <div class='line-right'></div>";  
	        err +=  "       </div>";  
	        err +=  "   </div>";  
	        err +=  "<div class='dec-txt'>"+this.config.str+"</div>";  
	        err +=  "</div>";  
	    TipBox.prototype.boundingBox.append(err);  
	};   
	  
	//关闭 or 取消 =>都不进行回调函数 
	TipBox.prototype.close = function(){      
	    TipBox.prototype.destroy();  
	    this.destroy(); 
	    this.config.setTime;
	    //this.config.setTime && typeof this.config.callBack === "function" && this.config.callBack();                  
	};  
	
	//确定 
	TipBox.prototype.confirm = function(){      
	    TipBox.prototype.destroy();  
	    this.destroy();  
	    this.config.setTime && typeof this.config.callBack === "function" && this.config.callBack();                  
	}; 
	  
	//销毁  
	TipBox.prototype.destroy = function(){  
	    this._mask && this._mask.remove();  
	    TipBox.prototype.boundingBox && TipBox.prototype.boundingBox.remove();   
	    TipBox.prototype.boundingBox = null;  
	};  
	
	return TipBox;	

})();
 
 
 
 /*  
  * @滚动条组件
  * @method  ScrollBar  
  *
 */
 ! function() {
 	var EventUtil = {
 		addHandler: function(obj, type, handler) {
 			if(obj.addEventListener) {
 				obj.addEventListener(type, handler, false);
 			} else if(obj.attachEvent) {
 				obj.attachEvent("on" + type, handler);
 			} else {
 				obj["on" + type] = handler;
 			}
 		},
 		removeHandler: function(obj, type, handler) {
 			if(obj.removeEventListener) {
 				obj.removeEventListener(type, handler, false);
 			} else if(obj.detachEvent) {
 				obj.detachEvent("on" + type, handler);
 			} else {
 				obj["on" + type] = null;
 			}
 		},
 		getEvent: function(event) {
 			return event ? event : window.event;
 		},
 		getTarget: function(event) {
 			return event.target || event.srcElement;
 		},
 		preventDefault: function(event) {
 			if(event.preventDefault) {
 				event.preventDefault();
 			} else {
 				event.returnValue = false;
 			}
 		},
 		stopPropagation: function(event) {
 			if(event.stopPropagation) {
 				event.stopPropagation();
 			} else {
 				event.cancelBubble = true;
 			}
 		},
 		getWheelDelta: function(event) {
 			if(event.wheelDelta) {
 				return event.wheelDelta;
 			} else {
 				return -event.detail * 0;
 			}
 		}
 	};
 	
 	//box：内容父级
 	//bd：内容
 	//hd：滚动条
 	//btn:滚动条上面的长度可变的按钮
 	function ScrollBar(box,bd,hd,btn) {
 		var self = this;
 		this.box = document.getElementById(box)
 		this.bd = document.getElementById(bd);
 		this.hd = document.getElementById(hd);
 		this.btn = document.getElementById(btn);
 		
 		this.init();
 		this.btn.onmousedown = function(ev) {
 			self.Down(ev);
 			return false;
 		};
 		//给需要加滚动事件的元素加滚动事件
 		EventUtil.addHandler(this.box, 'mousewheel', function(ev) {
 			self.onMouseWheel(ev);
 		}); //ie,chrome
 		EventUtil.addHandler(this.box, 'DOMMouseScroll', function(ev) {
 			self.onMouseWheel(ev);
 		}); //ff
 		EventUtil.addHandler(this.hd, 'mousewheel', function(ev) {
 			self.onMouseWheel(ev);
 		}); //ie,chrome
 		EventUtil.addHandler(this.hd, 'DOMMouseScroll', function(ev) {
 			self.onMouseWheel(ev);
 		}); //ff
 	};
 	//初始化滚动条，内容不够时隐藏滚动条，滚动条按钮长度由内容长度决定
 	ScrollBar.prototype.init = function() {
 		if(this.box.offsetHeight >= this.bd.offsetHeight) {
 			this.hd.style.display = 'none';
 		} else {
 			this.btn.style.height = 100 * this.hd.offsetHeight / (this.bd.offsetHeight - this.box.offsetHeight) + 'px';
 		}
 	};
 	ScrollBar.prototype.Down = function(ev) {
 		var oEvent = EventUtil.getEvent(ev);
 		var self = this;
 		this.maxH = this.hd.offsetHeight - this.btn.offsetHeight;
 		this.disY = oEvent.clientY - this.btn.offsetTop;
 		document.onmousemove = function(ev) {
 			self.fnMove(ev);
 			return false;
 		}
 		document.onmouseup = function(ev) {
 			self.Up(ev);
 		}
 	};
 	ScrollBar.prototype.fnMove = function(ev) {
 		var oEvent = EventUtil.getEvent(ev);
 		var t = oEvent.clientY - this.disY;
 		this.Move(t);
 	};
 	ScrollBar.prototype.onMouseWheel = function(ev) {
 		var oEvent = EventUtil.getEvent(ev);
 		this.maxH = this.hd.offsetHeight - this.btn.offsetHeight;
 		this.disY = oEvent.clientY - this.btn.offsetTop;
 		if(EventUtil.getWheelDelta(oEvent) > 0) {
 			var t = this.btn.offsetTop - 10;
 			this.Move(t);
 		} else {
 			var t = this.btn.offsetTop + 10;
 			this.Move(t);
 		}
 		EventUtil.preventDefault(oEvent);
 	};
 	ScrollBar.prototype.Move = function(t) {
 		if(t < 0) {
 			t = 0;
 		} else if(t > this.maxH) {
 			t = this.maxH;
 		}
 		this.btn.style.top = t + 'px';
 		this.contentH = this.bd.offsetHeight - this.box.offsetHeight;
 		this.bd.style.top = -this.contentH * this.btn.offsetTop / this.maxH + 'px';
 	};
 	ScrollBar.prototype.Up = function(ev) {
 		document.onmousemove = document.onmouseup = null;
 	};
 	window.ScrollBar = ScrollBar;
 }();


 /*  
  * @分页组件
  * @method  PageView  
  * @author kunyujie.com
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
  * new Select({size:10,showSize:5,current:1,container:'page',itemType:'a',href:'',action:null}); 
 */
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
            prev = '<' + item + ' ' + href + ' class="prev"><i class="iconfont">&#xe6be;</i></' + item + '>';
        }
        return prev;
    }
    function getNext() {
        var pages = defaults.size,
	        item = defaults.itemType,
	        next = '';

        if (pages > 1 && defaults.current !== pages) {
            next = '<' + item + ' ' + href + ' class="next"><i class="iconfont">&#xe6bf;</i></' + item + '>';
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
            last = '<' + item + ' ' + href + ' class="item" data-num='+ pages +'>Last</' + item + '>';
        }
        return last;
    }
	window.Page = Page;
}();
     
 
 /*  
  * @SelectView下拉框组件
  * @auther kunyujie.com
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
 ! function(){
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
 	
 	//protptype
 	SelectView.prototype.init = function(){
 		var self = this,
 			$container = self.defaults.$container,
 			list = self.defaults.list,
 			listTpl = '';
 			for(var i=0,len=list.length; i<len; i++){
 	            if(len==1 && list[0]=='') return;
 	           listTpl+='<li value=' + list[i] + ' index='+ i +'><i class="iconfont">&#xe609;</i>' + list[i] +'</li>';
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
     SelectView.prototype.show = function(){
         var self = this,
     			$container = self.defaults.$container,
     			$selectList = $container.find(".select-list");
         $selectList.show();
         	self.isOn = !self.isOn;
     };
     SelectView.prototype.hide = function(){
         var self = this,
     			$container = self.defaults.$container,
     			$selectList = $container.find(".select-list");
     		$selectList.hide();
     		self.isOn = !self.isOn;
         self.isOn = true;
     };
     
    window.SelectView = SelectView;
 }();
 
 /*
  * @瀑布流组件
  * @auther kunyujie.com
  * @method  WaterFall  
  * @description 默认配置参数   
  * @param {Number} minBoxWidth -最小宽度  
  * @param {Object} containerSelector -父容器
  * @param {String} columClass -分栏div attribute class
  * @param {Object} boxSelector -item dom
  * @param {Object} lastDom -分栏最后一个item   
  * @param {Function} callBack -回调函数 
  * @example  
  *new WaterFall({
 		minBoxWidth : (parseInt($(window).width())-16)/2,
 		containerSelector : ".container",
 		columClass : "column",
 		lastDom: "a:last",
 		boxSelector : ".item",
 		action:function(){
 			if(isLoading) return;
 		     $.post("url", {},function(data){ 
     				if(data.success){
     					console.log("请求成功！");
     					
 					for(var i=0,len = data.list.length; i<len; i++){
 						var tpl = "<a class='item' href='"+ data.list[i].url +"'><img src='"+ data.list[i].img + "'><span>"+ data.list[i].title+"</span><p>"+ data.list[i].desc +"</p></a>";
 						wf.addBox(tpl);
 					}
 				}else{
 					isLoading = true;
 					$(".tips").show();
 				}
 			},"json");
 		}
 	});
 *
 */  
 ! function WaterFall(){
 	function WaterFall(cfg){
 		this.config = {
 			minBoxWidth : 200,
 			containerSelector : ".container",
 			columClass : "column",
 			boxSelector : ".item",
 			action: null
 		};
 		this.config = $.extend(this.config,cfg);
 		this.isLoading = false;
 		this.columns = [];
 		this.container = $(this.config.containerSelector);
 		this.boxes = this.container ? Array.prototype.slice.call($(this.config.boxSelector)) : [];
 		this.init();
 		return this;
 	}
 	
 	/**
 	 *init 
 	 */
 	WaterFall.prototype.init = function(){
 		var self = this;
 		//预先分栏
 		self.compose();
 		$(window).off().on("resize",function(){
 			self.compose();
 		})
 		$(window).off().on("scroll",function(){
 			self.scrollEvent()
 		});
 	}
     /**
      * ajax数据调用
      */
    WaterFall.prototype.scrollEvent = function() {
    		var self = this;
         var i = self.maxheightIndex();
         if(i > -1) {
             //获取分栏的最后一个div
 			var lastBox = $("."+self.config.columClass).find(self.config.boxSelector+":last");
             if(self.isSlide(lastBox)){
 	           callback(); 
             }
         }
         	//外部回调
         function callback() {
             if (self.config.action && typeof self.config.action === 'function') {
                 self.config.action();
             }
         }
    };	
 	/**
 	 *设置每个分栏的最小高度 
 	 */
     WaterFall.prototype.minHeightIndex = function() {
     		var self = this;
         if(self.columns && self.columns.length > 0) {
             var min = $(self.columns[0]).height(), index = 0;
             for (var i = 1; i < self.columns.length; i++) {
                 var columnElem = self.columns[i];
                 if($(columnElem).height() < min) {
                     min = $(columnElem).height();
                     index = i;
                 }
             }
             return index;
         }
         else return -1;
     };
     /**
      *设置每个分栏的最大高度 
      */
     WaterFall.prototype.maxheightIndex = function() {
     		var self = this;
         if(self.columns && self.columns.length > 0) {
             var max = $(self.columns[0]).height(), index = 0;
             for (var i = 1; i < self.columns.length; i++) {
                 var columnElem = self.columns[i];
                 if($(columnElem).height() > max) {
                     max = $(columnElem).height();
                     index = i;
                 }
             }
             return index;
         }
         else return -1;
     };
 	/**
 	 * 当前窗体下分栏数量
 	 */
     WaterFall.prototype.computeNumberOfColumns = function() {
     		var self = this;
         var num = Math.floor(self.container.width() / self.config.minBoxWidth);
         num = num || 1; // at least one column
         return num;
     };
 	/**
 	 * 给每个栏目添加div和设置div的宽度（%）
 	 * @param {Object} num
 	 */
     WaterFall.prototype.initColumns = function(num) {
     		var self = this;
         if(num > 0) {
             // create column div
             self.columns = [];
             var width = (100 / num) + '%';
             while(num--) {
                 var column = document.createElement('div');
                 column.className = self.config.columClass;
                 column.style.width = width;
                 self.columns.push(column);
                 self.container.append(column);
             }
         }
     };
 	/**
 	 *瀑布流栏目生成 
 	 * @param {Object} force
 	 */
     WaterFall.prototype.compose = function(force) {
     		var self = this,
         		num = self.computeNumberOfColumns(),
         		cols = self.columns.length;
         if(force || num != cols) {
             //移除先前的分栏
             for (var i = 0; i < self.columns.length; i++) {
                 var columnElem = self.columns[i];
                 columnElem.remove();
             }
             //新分栏数操作 
             self.initColumns(num);
             //分栏生成
             for (var i = 0, l = self.boxes.length; i < l; i++) {
                 var box = self.boxes[i];
                 self.addBox(box);
             }
         }
     };
     /**
      * 给分栏添加box
      * @param {Object} elem
      */
     WaterFall.prototype.addBox = function(elem) {
     		var self = this;
         // push if new box
         if(self.boxes.indexOf(elem) < 0) self.boxes.push(elem);
         var columnIndex = self.minHeightIndex();
         if(columnIndex > -1) {
             var column = self.columns[columnIndex];
             $(column).append(elem);
         }
     };
     /**
      * 元素与屏幕高度判断  
      * 返回值为boolean类型
      * @param {Object} elem
      */
      WaterFall.prototype.isSlide = function(elem) {
         if(elem) {
             var documentHeight = (document.documentElement.scrollTop || document.body.scrollTop) +(document.documentElement.clientHeight || document.body.clientHeight);
 			var elemHeight = $(elem).offset().top + $(elem).height()/2;
             return elemHeight < documentHeight; //返回true or false
         }
     };
 	
 	window.WaterFall = WaterFall;
 }();

 
 /**
  * 和PHP一样的时间戳格式化函数
  * java data需要/1000
  * @param  {string} format    格式
  * @param  {int}    timestamp 要格式化的时间 默认为当前时间
  * @return {string}           格式化的时间字符串
  * @use  var timer = 1355023942;  var t = dateFormat("Y-m-d h:i:s", timer)
  */
 var dateFormat = function(format, timestamp){
     var a, jsdate=((timestamp) ? new Date(timestamp*1000) : new Date());
     var pad = function(n, c){
         if((n = n + "").length < c){
             return new Array(++c - n.length).join("0") + n;
         } else {
             return n;
         }
     };
     var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
     var txt_ordin = {
         1:"st",
         2:"nd",
         3:"rd",
         21:"st",
         22:"nd",
         23:"rd",
         31:"st"
     };
     var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
     var f = {
         // Day
         d: function(){
             return pad(f.j(), 2)
         },
         D: function(){
             return f.l().substr(0,3)
         },
         j: function(){
             return jsdate.getDate()
         },
         l: function(){
             return txt_weekdays[f.w()]
         },
         N: function(){
             return f.w() + 1
         },
         S: function(){
             return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'
         },
         w: function(){
             return jsdate.getDay()
         },
         z: function(){
             return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0
         },

         // Week
         W: function(){
             var a = f.z(), b = 364 + f.L() - a;
             var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
             if(b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b){
                 return 1;
             } else{
                 if(a <= 2 && nd >= 4 && a >= (6 - nd)){
                     nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
                     return date("W", Math.round(nd2.getTime()/1000));
                 } else{
                     return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
                 }
             }
         },

         // Month
         F: function(){
             return txt_months[f.n()]
         },
         m: function(){
             return pad(f.n(), 2)
         },
         M: function(){
             return f.F().substr(0,3)
         },
         n: function(){
             return jsdate.getMonth() + 1
         },
         t: function(){
             var n;
             if( (n = jsdate.getMonth() + 1) == 2 ){
                 return 28 + f.L();
             } else{
                 if( n & 1 && n < 8 || !(n & 1) && n > 7 ){
                     return 31;
                 } else{
                     return 30;
                 }
             }
         },

         // Year
         L: function(){
             var y = f.Y();
             return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0
         },
         //o not supported yet
         Y: function(){
             return jsdate.getFullYear()
         },
         y: function(){
             return (jsdate.getFullYear() + "").slice(2)
         },

         // Time
         a: function(){
             return jsdate.getHours() > 11 ? "pm" : "am"
         },
         A: function(){
             return f.a().toUpperCase()
         },
         B: function(){
             // peter paul koch:
             var off = (jsdate.getTimezoneOffset() + 60)*60;
             var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
             var beat = Math.floor(theSeconds/86.4);
             if (beat > 1000) beat -= 1000;
             if (beat < 0) beat += 1000;
             if ((String(beat)).length == 1) beat = "00"+beat;
             if ((String(beat)).length == 2) beat = "0"+beat;
             return beat;
         },
         g: function(){
             return jsdate.getHours() % 12 || 12
         },
         G: function(){
             return jsdate.getHours()
         },
         h: function(){
             return pad(f.g(), 2)
         },
         H: function(){
             return pad(jsdate.getHours(), 2)
         },
         i: function(){
             return pad(jsdate.getMinutes(), 2)
         },
         s: function(){
             return pad(jsdate.getSeconds(), 2)
         },
         //u not supported yet

         // Timezone
         //e not supported yet
         //I not supported yet
         O: function(){
             var t = pad(Math.abs(jsdate.getTimezoneOffset()/60*100), 4);
             if (jsdate.getTimezoneOffset() > 0) t = "-" + t; else t = "+" + t;
             return t;
         },
         P: function(){
             var O = f.O();
             return (O.substr(0, 3) + ":" + O.substr(3, 2))
         },
         //T not supported yet
         //Z not supported yet

         // Full Date/Time
         c: function(){
             return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()
         },
         //r not supported yet
         U: function(){
             return Math.round(jsdate.getTime()/1000)
         }
     };

     return format.replace(/[\\]?([a-zA-Z])/g, function(t, s){
         if( t!=s ){
             // escaped
             ret = s;
         } else if( f[s] ){
             // a date function exists
             ret = f[s]();
         } else{
             // nothing special
             ret = s;
         }
         return ret;
     });
 }
 //use
 //var time = 1476797092
 //var t = date("Y-m-d h:i:s",time);
 //console.log(t);
