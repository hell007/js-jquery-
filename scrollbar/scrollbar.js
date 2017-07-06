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