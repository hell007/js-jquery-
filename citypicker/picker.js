(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Picker"] = factory();
	else
		root["Picker"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _picker = __webpack_require__(1);

	var _picker2 = _interopRequireDefault(_picker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_picker2.default.version = ("1.1.3");

	exports.default = _picker2.default;
	module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _betterScroll = __webpack_require__(2);

	var _betterScroll2 = _interopRequireDefault(_betterScroll);

	var _eventEmitter = __webpack_require__(3);

	var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

	var _lang = __webpack_require__(4);

	var _dom = __webpack_require__(5);

	var _picker = __webpack_require__(6);

	var _picker2 = _interopRequireDefault(_picker);

	var _item = __webpack_require__(14);

	var _item2 = _interopRequireDefault(_item);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Picker = function (_EventEmitter) {
	  _inherits(Picker, _EventEmitter);

	  function Picker(options) {
	    _classCallCheck(this, Picker);

	    var _this = _possibleConstructorReturn(this, (Picker.__proto__ || Object.getPrototypeOf(Picker)).call(this));

	    _this.options = {
	      data: [],
	      title: '',
	      selectedIndex: null,
	      showCls: 'show'
	    };

	    (0, _lang.extend)(_this.options, options);

	    _this.data = _this.options.data;
	    _this.pickerEl = (0, _dom.createDom)((0, _picker2.default)({
	      data: _this.data,
	      title: _this.options.title
	    }));

	    document.body.appendChild(_this.pickerEl);

	    _this.maskEl = _this.pickerEl.getElementsByClassName('mask-hook')[0];
	    _this.wheelEl = _this.pickerEl.getElementsByClassName('wheel-hook');
	    _this.panelEl = _this.pickerEl.getElementsByClassName('panel-hook')[0];
	    _this.confirmEl = _this.pickerEl.getElementsByClassName('confirm-hook')[0];
	    _this.cancelEl = _this.pickerEl.getElementsByClassName('cancel-hook')[0];
	    _this.scrollEl = _this.pickerEl.getElementsByClassName('wheel-scroll-hook');

	    _this._init();
	    return _this;
	  }

	  _createClass(Picker, [{
	    key: '_init',
	    value: function _init() {
	      this.selectedIndex = [];
	      this.selectedVal = [];
	      if (this.options.selectedIndex) {
	        this.selectedIndex = this.options.selectedIndex;
	      } else {
	        for (var i = 0; i < this.data.length; i++) {
	          this.selectedIndex[i] = 0;
	        }
	      }

	      this._bindEvent();
	    }
	  }, {
	    key: '_bindEvent',
	    value: function _bindEvent() {
	      var _this2 = this;

	      (0, _dom.addEvent)(this.pickerEl, 'touchmove', function (e) {
	        e.preventDefault();
	      });

	      (0, _dom.addEvent)(this.confirmEl, 'click', function () {
	        _this2.hide();

	        var changed = false;
	        for (var i = 0; i < _this2.data.length; i++) {
	          var index = _this2.wheels[i].getSelectedIndex();
	          _this2.selectedIndex[i] = index;

	          var value = null;
	          if (_this2.data[i].length) {
	            value = _this2.data[i][index].value;
	          }
	          if (_this2.selectedVal[i] !== value) {
	            changed = true;
	          }
	          _this2.selectedVal[i] = value;
	        }

	        _this2.trigger('picker.select', _this2.selectedVal, _this2.selectedIndex);

	        if (changed) {
	          _this2.trigger('picker.valuechange', _this2.selectedVal, _this2.selectedIndex);
	        }
	      });

	      (0, _dom.addEvent)(this.cancelEl, 'click', function () {
	        _this2.hide();
	        _this2.trigger('picker.cancel');
	      });
	    }
	  }, {
	    key: '_createWheel',
	    value: function _createWheel(wheelEl, i) {
	      var _this3 = this;

	      this.wheels[i] = new _betterScroll2.default(wheelEl[i], {
	        wheel: true,
	        selectedIndex: this.selectedIndex[i]
	      });
	      (function (index) {
	        _this3.wheels[index].on('scrollEnd', function () {
	          var currentIndex = _this3.wheels[index].getSelectedIndex();
	          if (_this3.selectedIndex[i] !== currentIndex) {
	            _this3.selectedIndex[i] = currentIndex;
	            _this3.trigger('picker.change', index, currentIndex);
	          }
	        });
	      })(i);
	      return this.wheels[i];
	    }
	  }, {
	    key: 'show',
	    value: function show(next) {
	      var _this4 = this;

	      this.pickerEl.style.display = 'block';
	      var showCls = this.options.showCls;

	      window.setTimeout(function () {
	        (0, _dom.addClass)(_this4.maskEl, showCls);
	        (0, _dom.addClass)(_this4.panelEl, showCls);

	        if (!_this4.wheels) {
	          _this4.wheels = [];
	          for (var i = 0; i < _this4.data.length; i++) {
	            _this4._createWheel(_this4.wheelEl, i);
	          }
	        } else {
	          for (var _i = 0; _i < _this4.data.length; _i++) {
	            _this4.wheels[_i].enable();
	            _this4.wheels[_i].wheelTo(_this4.selectedIndex[_i]);
	          }
	        }
	        next && next();
	      }, 0);
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      var _this5 = this;

	      var showCls = this.options.showCls;
	      (0, _dom.removeClass)(this.maskEl, showCls);
	      (0, _dom.removeClass)(this.panelEl, showCls);

	      window.setTimeout(function () {
	        _this5.pickerEl.style.display = 'none';
	        for (var i = 0; i < _this5.data.length; i++) {
	          _this5.wheels[i].disable();
	        }
	      }, 500);
	    }
	  }, {
	    key: 'refillColumn',
	    value: function refillColumn(index, data) {
	      var scrollEl = this.scrollEl[index];
	      var wheel = this.wheels[index];
	      if (scrollEl && wheel) {
	        var oldData = this.data[index];
	        this.data[index] = data;
	        scrollEl.innerHTML = (0, _item2.default)(data);

	        var selectedIndex = wheel.getSelectedIndex();
	        var dist = 0;
	        if (oldData.length) {
	          var oldValue = oldData[selectedIndex].value;
	          for (var i = 0; i < data.length; i++) {
	            if (data[i].value === oldValue) {
	              dist = i;
	              break;
	            }
	          }
	        }
	        this.selectedIndex[index] = dist;
	        wheel.refresh();
	        wheel.wheelTo(dist);
	        return dist;
	      }
	    }
	  }, {
	    key: 'refill',
	    value: function refill(datas) {
	      var _this6 = this;

	      var ret = [];
	      if (!datas.length) {
	        return ret;
	      }
	      datas.forEach(function (data, index) {
	        ret[index] = _this6.refillColumn(index, data);
	      });
	      return ret;
	    }
	  }, {
	    key: 'scrollColumn',
	    value: function scrollColumn(index, dist) {
	      var wheel = this.wheels[index];
	      wheel.wheelTo(dist);
	    }
	  }]);

	  return Picker;
	}(_eventEmitter2.default);

	exports.default = Picker;
	module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["BScroll"] = factory();
		else
			root["BScroll"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;

	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};

	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;

	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "/assets/";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var _bscroll = __webpack_require__(1);

		_bscroll.BScroll.Version = ("0.1.15");

		module.exports = _bscroll.BScroll;

	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.BScroll = undefined;

		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

		var _util = __webpack_require__(2);

		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

		var TOUCH_EVENT = 1;

		var BScroll = exports.BScroll = function (_EventEmitter) {
		  _inherits(BScroll, _EventEmitter);

		  function BScroll(el, options) {
		    _classCallCheck(this, BScroll);

		    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BScroll).call(this));

		    _this.wrapper = typeof el === 'string' ? document.querySelector(el) : el;
		    _this.scroller = _this.wrapper.children[0];

		    _this.scrollerStyle = _this.scroller.style;

		    _this.options = {
		      startX: 0,
		      startY: 0,
		      scrollY: true,
		      directionLockThreshold: 5,
		      momentum: true,
		      bounce: true,
		      selectedIndex: 0,
		      rotate: 25,
		      wheel: false,
		      snap: false,
		      snapLoop: false,
		      snapThreshold: 0.1,
		      swipeTime: 2500,
		      bounceTime: 700,
		      adjustTime: 400,
		      swipeBounceTime: 1200,
		      deceleration: 0.001,
		      momentumLimitTime: 300,
		      momentumLimitDistance: 15,
		      resizePolling: 60,
		      preventDefault: true,
		      preventDefaultException: {
		        tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
		      },
		      HWCompositing: true,
		      useTransition: true,
		      useTransform: true
		    };

		    (0, _util.extend)(_this.options, options);

		    _this.translateZ = _this.options.HWCompositing && _util.hasPerspective ? ' translateZ(0)' : '';

		    _this.options.useTransition = _this.options.useTransition && _util.hasTransition;
		    _this.options.useTransform = _this.options.useTransform && _util.hasTransform;

		    _this.options.eventPassthrough = _this.options.eventPassthrough === true ? 'vertical' : _this.options.eventPassthrough;
		    _this.options.preventDefault = !_this.options.eventPassthrough && _this.options.preventDefault;

		    _this.options.scrollX = _this.options.eventPassthrough === 'horizontal' ? false : _this.options.scrollX;
		    _this.options.scrollY = _this.options.eventPassthrough === 'vertical' ? false : _this.options.scrollY;

		    _this.options.freeScroll = _this.options.freeScroll && !_this.options.eventPassthrough;
		    _this.options.directionLockThreshold = _this.options.eventPassthrough ? 0 : _this.options.directionLockThreshold;

		    if (_this.options.tap === true) {
		      _this.options.tap = 'tap';
		    }

		    _this._init();

		    if (_this.options.snap) {
		      _this._initSnap();
		    }

		    _this.refresh();

		    if (!_this.options.snap) {
		      _this.scrollTo(_this.options.startX, _this.options.startY);
		    }

		    _this.enable();
		    return _this;
		  }

		  _createClass(BScroll, [{
		    key: '_init',
		    value: function _init() {
		      this.x = 0;
		      this.y = 0;
		      this.directionX = 0;
		      this.directionY = 0;

		      this._addEvents();
		    }
		  }, {
		    key: '_initSnap',
		    value: function _initSnap() {
		      var _this2 = this;

		      this.currentPage = {};

		      if (this.options.snapLoop) {
		        var children = this.scroller.children;
		        if (children.length > 0) {
		          (0, _util.prepend)(children[children.length - 1].cloneNode(true), this.scroller);
		          this.scroller.appendChild(children[1].cloneNode(true));
		        }
		      }

		      if (typeof this.options.snap === 'string') {
		        this.options.snap = this.scroller.querySelectorAll(this.options.snap);
		      }

		      this.on('refresh', function () {
		        _this2.pages = [];

		        if (!_this2.wrapperWidth || !_this2.wrapperHeight || !_this2.scrollerWidth || !_this2.scrollerHeight) {
		          return;
		        }

		        var stepX = _this2.options.snapStepX || _this2.wrapperWidth;
		        var stepY = _this2.options.snapStepY || _this2.wrapperHeight;

		        var x = 0;
		        var y = void 0;
		        var cx = void 0;
		        var cy = void 0;
		        var i = 0;
		        var l = void 0;
		        var m = 0;
		        var n = void 0;
		        var el = void 0;
		        var rect = void 0;
		        if (_this2.options.snap === true) {
		          cx = Math.round(stepX / 2);
		          cy = Math.round(stepY / 2);

		          while (x > -_this2.scrollerWidth) {
		            _this2.pages[i] = [];
		            l = 0;
		            y = 0;

		            while (y > -_this2.scrollerHeight) {
		              _this2.pages[i][l] = {
		                x: Math.max(x, _this2.maxScrollX),
		                y: Math.max(y, _this2.maxScrollY),
		                width: stepX,
		                height: stepY,
		                cx: x - cx,
		                cy: y - cy
		              };

		              y -= stepY;
		              l++;
		            }

		            x -= stepX;
		            i++;
		          }
		        } else {
		          el = _this2.options.snap;
		          l = el.length;
		          n = -1;

		          for (; i < l; i++) {
		            rect = (0, _util.getRect)(el[i]);
		            if (i === 0 || rect.left <= (0, _util.getRect)(el[i - 1]).left) {
		              m = 0;
		              n++;
		            }

		            if (!_this2.pages[m]) {
		              _this2.pages[m] = [];
		            }

		            x = Math.max(-rect.left, _this2.maxScrollX);
		            y = Math.max(-rect.top, _this2.maxScrollY);
		            cx = x - Math.round(rect.width / 2);
		            cy = y - Math.round(rect.height / 2);

		            _this2.pages[m][n] = {
		              x: x,
		              y: y,
		              width: rect.width,
		              height: rect.height,
		              cx: cx,
		              cy: cy
		            };

		            if (x > _this2.maxScrollX) {
		              m++;
		            }
		          }
		        }

		        var initPage = _this2.options.snapLoop ? 1 : 0;
		        _this2.goToPage(_this2.currentPage.pageX || initPage, _this2.currentPage.pageY || 0, 0);

		        if (_this2.options.snapThreshold % 1 === 0) {
		          _this2.snapThresholdX = _this2.options.snapThreshold;
		          _this2.snapThresholdY = _this2.options.snapThreshold;
		        } else {
		          _this2.snapThresholdX = Math.round(_this2.pages[_this2.currentPage.pageX][_this2.currentPage.pageY].width * _this2.options.snapThreshold);
		          _this2.snapThresholdY = Math.round(_this2.pages[_this2.currentPage.pageX][_this2.currentPage.pageY].height * _this2.options.snapThreshold);
		        }
		      });

		      this.on('scrollEnd', function () {
		        if (_this2.options.snapLoop) {
		          if (_this2.currentPage.pageX === 0) {
		            _this2.goToPage(_this2.pages.length - 2, _this2.currentPage.pageY, 0);
		          }
		          if (_this2.currentPage.pageX === _this2.pages.length - 1) {
		            _this2.goToPage(1, _this2.currentPage.pageY, 0);
		          }
		        }
		      });

		      this.on('flick', function () {
		        var time = _this2.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(_this2.x - _this2.startX), 1000), Math.min(Math.abs(_this2.y - _this2.startY), 1000)), 300);

		        _this2.goToPage(_this2.currentPage.pageX + _this2.directionX, _this2.currentPage.pageY + _this2.directionY, time);
		      });
		    }
		  }, {
		    key: '_nearestSnap',
		    value: function _nearestSnap(x, y) {
		      if (!this.pages.length) {
		        return { x: 0, y: 0, pageX: 0, pageY: 0 };
		      }

		      var i = 0;

		      if (Math.abs(x - this.absStartX) < this.snapThresholdX && Math.abs(y - this.absStartY) < this.snapThresholdY) {
		        return this.currentPage;
		      }

		      if (x > 0) {
		        x = 0;
		      } else if (x < this.maxScrollX) {
		        x = this.maxScrollX;
		      }

		      if (y > 0) {
		        y = 0;
		      } else if (y < this.maxScrollY) {
		        y = this.maxScrollY;
		      }

		      var l = this.pages.length;
		      for (; i < l; i++) {
		        if (x >= this.pages[i][0].cx) {
		          x = this.pages[i][0].x;
		          break;
		        }
		      }

		      l = this.pages[i].length;

		      var m = 0;
		      for (; m < l; m++) {
		        if (y >= this.pages[0][m].cy) {
		          y = this.pages[0][m].y;
		          break;
		        }
		      }

		      if (i === this.currentPage.pageX) {
		        i += this.directionX;

		        if (i < 0) {
		          i = 0;
		        } else if (i >= this.pages.length) {
		          i = this.pages.length - 1;
		        }

		        x = this.pages[i][0].x;
		      }

		      if (m === this.currentPage.pageY) {
		        m += this.directionY;

		        if (m < 0) {
		          m = 0;
		        } else if (m >= this.pages[0].length) {
		          m = this.pages[0].length - 1;
		        }

		        y = this.pages[0][m].y;
		      }

		      return {
		        x: x,
		        y: y,
		        pageX: i,
		        pageY: m
		      };
		    }
		  }, {
		    key: '_addEvents',
		    value: function _addEvents() {
		      var eventOperation = _util.addEvent;
		      this._handleEvents(eventOperation);
		    }
		  }, {
		    key: '_removeEvents',
		    value: function _removeEvents() {
		      var eventOperation = _util.removeEvent;
		      this._handleEvents(eventOperation);
		    }
		  }, {
		    key: '_handleEvents',
		    value: function _handleEvents(eventOperation) {
		      var target = this.options.bindToWrapper ? this.wrapper : window;
		      eventOperation(window, 'orientationchange', this);
		      eventOperation(window, 'resize', this);

		      if (this.options.click) {
		        eventOperation(this.wrapper, 'click', this);
		      }

		      if (!this.options.disableMouse) {
		        eventOperation(this.wrapper, 'mousedown', this);
		        eventOperation(target, 'mousemove', this);
		        eventOperation(target, 'mousecancel', this);
		        eventOperation(target, 'mouseup', this);
		      }

		      if (_util.hasTouch && !this.options.disableTouch) {
		        eventOperation(this.wrapper, 'touchstart', this);
		        eventOperation(target, 'touchmove', this);
		        eventOperation(target, 'touchcancel', this);
		        eventOperation(target, 'touchend', this);
		      }

		      eventOperation(this.scroller, _util.style.transitionEnd, this);
		    }
		  }, {
		    key: '_start',
		    value: function _start(e) {
		      var _eventType = _util.eventType[e.type];
		      if (_eventType !== TOUCH_EVENT) {
		        if (e.button !== 0) {
		          return;
		        }
		      }
		      if (!this.enabled || this.destroyed || this.initiated && this.initiated !== _eventType) {
		        return;
		      }
		      this.initiated = _eventType;

		      if (this.options.preventDefault && !_util.isBadAndroid && !(0, _util.preventDefaultException)(e.target, this.options.preventDefaultException)) {
		        e.preventDefault();
		      }

		      this.moved = false;
		      this.distX = 0;
		      this.distY = 0;
		      this.directionX = 0;
		      this.directionY = 0;
		      this.directionLocked = 0;

		      this._transitionTime();
		      this.startTime = +new Date();

		      if (this.options.wheel) {
		        this.target = e.target;
		      }

		      if (this.options.useTransition && this.isInTransition) {
		        this.isInTransition = false;
		        var pos = this.getComputedPosition();
		        this._translate(pos.x, pos.y);
		        if (this.options.wheel) {
		          this.target = this.items[Math.round(-pos.y / this.itemHeight)];
		        } else {
		          this.trigger('scrollEnd');
		        }
		      }

		      var point = e.touches ? e.touches[0] : e;

		      this.startX = this.x;
		      this.startY = this.y;
		      this.absStartX = this.x;
		      this.absStartY = this.y;
		      this.pointX = point.pageX;
		      this.pointY = point.pageY;

		      this.trigger('beforeScrollStart');
		    }
		  }, {
		    key: '_move',
		    value: function _move(e) {
		      if (!this.enabled || this.destroyed || _util.eventType[e.type] !== this.initiated) {
		        return;
		      }

		      if (this.options.preventDefault) {
		        e.preventDefault();
		      }

		      var point = e.touches ? e.touches[0] : e;
		      var deltaX = point.pageX - this.pointX;
		      var deltaY = point.pageY - this.pointY;

		      this.pointX = point.pageX;
		      this.pointY = point.pageY;

		      this.distX += deltaX;
		      this.distY += deltaY;

		      var absDistX = Math.abs(this.distX);
		      var absDistY = Math.abs(this.distY);

		      var timestamp = +new Date();

		      if (timestamp - this.endTime > this.options.momentumLimitTime && absDistY < this.options.momentumLimitDistance && absDistX < this.options.momentumLimitDistance) {
		        return;
		      }

		      if (!this.directionLocked && !this.options.freeScroll) {
		        if (absDistX > absDistY + this.options.directionLockThreshold) {
		          this.directionLocked = 'h';
		        } else if (absDistY >= absDistX + this.options.directionLockThreshold) {
		          this.directionLocked = 'v';
		        } else {
		          this.directionLocked = 'n';
		        }
		      }

		      if (this.directionLocked === 'h') {
		        if (this.options.eventPassthrough === 'vertical') {
		          e.preventDefault();
		        } else if (this.options.eventPassthrough === 'horizontal') {
		          this.initiated = false;
		          return;
		        }
		        deltaY = 0;
		      } else if (this.directionLocked === 'v') {
		        if (this.options.eventPassthrough === 'horizontal') {
		          e.preventDefault();
		        } else if (this.options.eventPassthrough === 'vertical') {
		          this.initiated = false;
		          return;
		        }
		        deltaX = 0;
		      }

		      deltaX = this.hasHorizontalScroll ? deltaX : 0;
		      deltaY = this.hasVerticalScroll ? deltaY : 0;

		      var newX = this.x + deltaX;
		      var newY = this.y + deltaY;

		      if (newX > 0 || newX < this.maxScrollX) {
		        if (this.options.bounce) {
		          newX = this.x + deltaX / 3;
		        } else {
		          newX = newX > 0 ? 0 : this.maxScrollX;
		        }
		      }
		      if (newY > 0 || newY < this.maxScrollY) {
		        if (this.options.bounce) {
		          newY = this.y + deltaY / 3;
		        } else {
		          newY = newY > 0 ? 0 : this.maxScrollY;
		        }
		      }

		      this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
		      this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

		      if (!this.moved) {
		        this.moved = true;
		        this.trigger('scrollStart');
		      }

		      this._translate(newX, newY);

		      if (timestamp - this.startTime > this.options.momentumLimitTime) {
		        this.startTime = timestamp;
		        this.startX = this.x;
		        this.startY = this.y;

		        if (this.options.probeType === 1) {
		          this.trigger('scroll', {
		            x: this.x,
		            y: this.y
		          });
		        }
		      }

		      if (this.options.probeType > 1) {
		        this.trigger('scroll', {
		          x: this.x,
		          y: this.y
		        });
		      }

		      var scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;
		      var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

		      var pX = this.pointX - scrollLeft;
		      var pY = this.pointY - scrollTop;

		      if (pX > document.documentElement.clientWidth - this.options.momentumLimitDistance || pX < this.options.momentumLimitDistance || pY < this.options.momentumLimitDistance || pY > document.documentElement.clientHeight - this.options.momentumLimitDistance) {
		        this._end(e);
		      }
		    }
		  }, {
		    key: '_end',
		    value: function _end(e) {
		      if (!this.enabled || this.destroyed || _util.eventType[e.type] !== this.initiated) {
		        return;
		      }
		      this.initiated = false;

		      if (this.options.preventDefault && !(0, _util.preventDefaultException)(e.target, this.options.preventDefaultException)) {
		        e.preventDefault();
		      }

		      this.trigger('touchend', {
		        x: this.x,
		        y: this.y
		      });

		      if (this.resetPosition(this.options.bounceTime, _util.ease.bounce)) {
		        return;
		      }
		      this.isInTransition = false;

		      var newX = Math.round(this.x);
		      var newY = Math.round(this.y);

		      if (!this.moved) {
		        if (this.options.wheel) {
		          if (this.target && this.target.className === 'wheel-scroll') {
		            var index = Math.abs(Math.round(newY / this.itemHeight));
		            var _offset = Math.round((this.pointY + (0, _util.offset)(this.target).top - this.itemHeight / 2) / this.itemHeight);
		            this.target = this.items[index + _offset];
		          }
		          this.scrollToElement(this.target, this.options.adjustTime, true, true, _util.ease.swipe);
		        } else {
		          if (this.options.tap) {
		            (0, _util.tap)(e, this.options.tap);
		          }

		          if (this.options.click) {
		            (0, _util.click)(e);
		          }
		        }
		        this.trigger('scrollCancel');
		        return;
		      }

		      this.scrollTo(newX, newY);

		      this.endTime = +new Date();

		      var duration = this.endTime - this.startTime;
		      var absDistX = Math.abs(newX - this.startX);
		      var absDistY = Math.abs(newY - this.startY);

		      if (this._events.flick && duration < this.options.momentumLimitTime && absDistX < this.options.momentumLimitDistance && absDistY < this.options.momentumLimitDistance) {
		        this.trigger('flick');
		        return;
		      }

		      var time = 0;

		      if (this.options.momentum && duration < this.options.momentumLimitTime && (absDistY > this.options.momentumLimitDistance || absDistX > this.options.momentumLimitDistance)) {
		        var momentumX = this.hasHorizontalScroll ? (0, _util.momentum)(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options) : { destination: newX, duration: 0 };
		        var momentumY = this.hasVerticalScroll ? (0, _util.momentum)(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options) : { destination: newY, duration: 0 };
		        newX = momentumX.destination;
		        newY = momentumY.destination;
		        time = Math.max(momentumX.duration, momentumY.duration);
		        this.isInTransition = 1;
		      } else {
		        if (this.options.wheel) {
		          newY = Math.round(newY / this.itemHeight) * this.itemHeight;
		          time = this.options.adjustTime;
		        }
		      }

		      var easing = _util.ease.swipe;
		      if (this.options.snap) {
		        var snap = this._nearestSnap(newX, newY);
		        this.currentPage = snap;
		        time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(newX - snap.x), 1000), Math.min(Math.abs(newY - snap.y), 1000)), 300);
		        newX = snap.x;
		        newY = snap.y;

		        this.directionX = 0;
		        this.directionY = 0;
		        easing = _util.ease.bounce;
		      }

		      if (newX !== this.x || newY !== this.y) {
		        if (newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) {
		          easing = _util.ease.swipeBounce;
		        }
		        this.scrollTo(newX, newY, time, easing);
		        return;
		      }

		      if (this.options.wheel) {
		        this.selectedIndex = Math.abs(this.y / this.itemHeight) | 0;
		      }
		      this.trigger('scrollEnd');
		    }
		  }, {
		    key: '_resize',
		    value: function _resize() {
		      var _this3 = this;

		      if (!this.enabled) {
		        return;
		      }

		      clearTimeout(this.resizeTimeout);
		      this.resizeTimeout = setTimeout(function () {
		        _this3.refresh();
		      }, this.options.resizePolling);
		    }
		  }, {
		    key: '_startProbe',
		    value: function _startProbe() {
		      (0, _util.cancelAnimationFrame)(this.probeTimer);
		      this.probeTimer = (0, _util.requestAnimationFrame)(probe);

		      var me = this;

		      function probe() {
		        var pos = me.getComputedPosition();
		        me.trigger('scroll', pos);
		        if (me.isInTransition) {
		          me.probeTimer = (0, _util.requestAnimationFrame)(probe);
		        }
		      }
		    }
		  }, {
		    key: '_transitionTime',
		    value: function _transitionTime() {
		      var _this4 = this;

		      var time = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

		      this.scrollerStyle[_util.style.transitionDuration] = time + 'ms';

		      if (this.options.wheel && !_util.isBadAndroid) {
		        for (var i = 0; i < this.items.length; i++) {
		          this.items[i].style[_util.style.transitionDuration] = time + 'ms';
		        }
		      }

		      if (!time && _util.isBadAndroid) {
		        this.scrollerStyle[_util.style.transitionDuration] = '0.001s';

		        (0, _util.requestAnimationFrame)(function () {
		          if (_this4.scrollerStyle[_util.style.transitionDuration] === '0.0001ms') {
		            _this4.scrollerStyle[_util.style.transitionDuration] = '0s';
		          }
		        });
		      }
		    }
		  }, {
		    key: '_transitionTimingFunction',
		    value: function _transitionTimingFunction(easing) {
		      this.scrollerStyle[_util.style.transitionTimingFunction] = easing;

		      if (this.options.wheel && !_util.isBadAndroid) {
		        for (var i = 0; i < this.items.length; i++) {
		          this.items[i].style[_util.style.transitionTimingFunction] = easing;
		        }
		      }
		    }
		  }, {
		    key: '_transitionEnd',
		    value: function _transitionEnd(e) {
		      if (e.target !== this.scroller || !this.isInTransition) {
		        return;
		      }

		      this._transitionTime();
		      if (!this.resetPosition(this.options.bounceTime, _util.ease.bounce)) {
		        this.isInTransition = false;
		        this.trigger('scrollEnd');
		      }
		    }
		  }, {
		    key: '_translate',
		    value: function _translate(x, y) {
		      if (this.options.useTransform) {
		        this.scrollerStyle[_util.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;
		      } else {
		        x = Math.round(x);
		        y = Math.round(y);
		        this.scrollerStyle.left = x + 'px';
		        this.scrollerStyle.top = y + 'px';
		      }

		      if (this.options.wheel && !_util.isBadAndroid) {
		        for (var i = 0; i < this.items.length; i++) {
		          var deg = this.options.rotate * (y / this.itemHeight + i);
		          this.items[i].style[_util.style.transform] = 'rotateX(' + deg + 'deg)';
		        }
		      }

		      this.x = x;
		      this.y = y;
		    }
		  }, {
		    key: 'enable',
		    value: function enable() {
		      this.enabled = true;
		    }
		  }, {
		    key: 'disable',
		    value: function disable() {
		      this.enabled = false;
		    }
		  }, {
		    key: 'refresh',
		    value: function refresh() {
		      var rf = this.wrapper.offsetHeight;

		      this.wrapperWidth = parseInt(this.wrapper.style.width) || this.wrapper.clientWidth;
		      this.wrapperHeight = parseInt(this.wrapper.style.height) || this.wrapper.clientHeight;

		      this.scrollerWidth = parseInt(this.scroller.style.width) || this.scroller.clientWidth;
		      this.scrollerHeight = parseInt(this.scroller.style.height) || this.scroller.clientHeight;
		      if (this.options.wheel) {
		        this.items = this.scroller.children;
		        this.options.itemHeight = this.itemHeight = this.items.length ? this.items[0].clientHeight : 0;
		        if (this.selectedIndex === undefined) {
		          this.selectedIndex = this.options.selectedIndex;
		        }
		        this.options.startY = -this.selectedIndex * this.itemHeight;
		        this.maxScrollX = 0;
		        this.maxScrollY = -this.itemHeight * (this.items.length - 1);
		      } else {
		        this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
		        this.maxScrollY = this.wrapperHeight - this.scrollerHeight;
		      }

		      this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0;
		      this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0;

		      if (!this.hasHorizontalScroll) {
		        this.maxScrollX = 0;
		        this.scrollerWidth = this.wrapperWidth;
		      }

		      if (!this.hasVerticalScroll) {
		        this.maxScrollY = 0;
		        this.scrollerHeight = this.wrapperHeight;
		      }

		      this.endTime = 0;
		      this.directionX = 0;
		      this.directionY = 0;
		      this.wrapperOffset = (0, _util.offset)(this.wrapper);

		      this.trigger('refresh');

		      this.resetPosition();
		    }
		  }, {
		    key: 'resetPosition',
		    value: function resetPosition() {
		      var time = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
		      var easeing = arguments.length <= 1 || arguments[1] === undefined ? _util.ease.bounce : arguments[1];

		      var x = this.x;
		      if (!this.hasHorizontalScroll || x > 0) {
		        x = 0;
		      } else if (x < this.maxScrollX) {
		        x = this.maxScrollX;
		      }

		      var y = this.y;
		      if (!this.hasVerticalScroll || y > 0) {
		        y = 0;
		      } else if (y < this.maxScrollY) {
		        y = this.maxScrollY;
		      }

		      if (x === this.x && y === this.y) {
		        return false;
		      }

		      this.scrollTo(x, y, time, easeing);

		      return true;
		    }
		  }, {
		    key: 'wheelTo',
		    value: function wheelTo(selectIndex) {
		      if (this.options.wheel) {
		        this.y = -selectIndex * this.itemHeight;
		        this.scrollTo(0, this.y);
		      }
		    }
		  }, {
		    key: 'scrollBy',
		    value: function scrollBy(x, y) {
		      var time = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
		      var easing = arguments.length <= 3 || arguments[3] === undefined ? _util.ease.bounce : arguments[3];

		      x = this.x + x;
		      y = this.y + y;

		      this.scrollTo(x, y, time, easing);
		    }
		  }, {
		    key: 'scrollTo',
		    value: function scrollTo(x, y, time) {
		      var easing = arguments.length <= 3 || arguments[3] === undefined ? _util.ease.bounce : arguments[3];

		      this.isInTransition = this.options.useTransition && time > 0 && (x !== this.x || y !== this.y);

		      if (!time || this.options.useTransition) {
		        this._transitionTimingFunction(easing.style);
		        this._transitionTime(time);
		        this._translate(x, y);

		        if (time && this.options.probeType === 3) {
		          this._startProbe();
		        }

		        if (this.options.wheel) {
		          if (y > 0) {
		            this.selectedIndex = 0;
		          } else if (y < this.maxScrollY) {
		            this.selectedIndex = this.items.length - 1;
		          } else {
		            this.selectedIndex = Math.abs(y / this.itemHeight) | 0;
		          }
		        }
		      }
		    }
		  }, {
		    key: 'getSelectedIndex',
		    value: function getSelectedIndex() {
		      return this.options.wheel && this.selectedIndex;
		    }
		  }, {
		    key: 'getCurrentPage',
		    value: function getCurrentPage() {
		      return this.options.snap && this.currentPage;
		    }
		  }, {
		    key: 'scrollToElement',
		    value: function scrollToElement(el, time, offsetX, offsetY, easing) {
		      if (!el) {
		        return;
		      }
		      el = el.nodeType ? el : this.scroller.querySelector(el);

		      if (this.options.wheel && el.className !== 'wheel-item') {
		        return;
		      }

		      var pos = (0, _util.offset)(el);
		      pos.left -= this.wrapperOffset.left;
		      pos.top -= this.wrapperOffset.top;

		      if (offsetX === true) {
		        offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
		      }
		      if (offsetY === true) {
		        offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
		      }

		      pos.left -= offsetX || 0;
		      pos.top -= offsetY || 0;
		      pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
		      pos.top = pos.top > 0 ? 0 : pos.top < this.maxScrollY ? this.maxScrollY : pos.top;

		      if (this.options.wheel) {
		        pos.top = Math.round(pos.top / this.itemHeight) * this.itemHeight;
		      }

		      time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(this.x - pos.left), Math.abs(this.y - pos.top)) : time;

		      this.scrollTo(pos.left, pos.top, time, easing);
		    }
		  }, {
		    key: 'getComputedPosition',
		    value: function getComputedPosition() {
		      var matrix = window.getComputedStyle(this.scroller, null);
		      var x = void 0;
		      var y = void 0;

		      if (this.options.useTransform) {
		        matrix = matrix[_util.style.transform].split(')')[0].split(', ');
		        x = +(matrix[12] || matrix[4]);
		        y = +(matrix[13] || matrix[5]);
		      } else {
		        x = +matrix.left.replace(/[^-\d.]/g, '');
		        y = +matrix.top.replace(/[^-\d.]/g, '');
		      }

		      return {
		        x: x,
		        y: y
		      };
		    }
		  }, {
		    key: 'goToPage',
		    value: function goToPage(x, y, time) {
		      var easing = arguments.length <= 3 || arguments[3] === undefined ? _util.ease.bounce : arguments[3];

		      if (x >= this.pages.length) {
		        x = this.pages.length - 1;
		      } else if (x < 0) {
		        x = 0;
		      }

		      if (y >= this.pages[x].length) {
		        y = this.pages[x].length - 1;
		      } else if (y < 0) {
		        y = 0;
		      }

		      var posX = this.pages[x][y].x;
		      var posY = this.pages[x][y].y;

		      time = time === undefined ? this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(posX - this.x), 1000), Math.min(Math.abs(posY - this.y), 1000)), 300) : time;

		      this.currentPage = {
		        x: posX,
		        y: posY,
		        pageX: x,
		        pageY: y
		      };
		      this.scrollTo(posX, posY, time, easing);
		    }
		  }, {
		    key: 'next',
		    value: function next(time, easing) {
		      var x = this.currentPage.pageX;
		      var y = this.currentPage.pageY;

		      x++;
		      if (x >= this.pages.length && this.hasVerticalScroll) {
		        x = 0;
		        y++;
		      }

		      this.goToPage(x, y, time, easing);
		    }
		  }, {
		    key: 'prev',
		    value: function prev(time, easing) {
		      var x = this.currentPage.pageX;
		      var y = this.currentPage.pageY;

		      x--;
		      if (x < 0 && this.hasVerticalScroll) {
		        x = 0;
		        y--;
		      }

		      this.goToPage(x, y, time, easing);
		    }
		  }, {
		    key: 'destroy',
		    value: function destroy() {
		      this._removeEvents();

		      this.destroyed = true;
		      this.trigger('destroy');
		    }
		  }, {
		    key: 'handleEvent',
		    value: function handleEvent(e) {
		      switch (e.type) {
		        case 'touchstart':
		        case 'mousedown':
		          this._start(e);
		          break;
		        case 'touchmove':
		        case 'mousemove':
		          this._move(e);
		          break;
		        case 'touchend':
		        case 'mouseup':
		        case 'touchcancel':
		        case 'mousecancel':
		          this._end(e);
		          break;
		        case 'orientationchange':
		        case 'resize':
		          this._resize();
		          break;
		        case 'transitionend':
		        case 'webkitTransitionEnd':
		        case 'oTransitionEnd':
		        case 'MSTransitionEnd':
		          this._transitionEnd(e);
		          break;
		        case 'click':
		          if (this.enabled && !e._constructed && !/(SELECT|INPUT|TEXTAREA)/i.test(e.target.tagName)) {
		            e.preventDefault();
		            e.stopPropagation();
		          }
		          break;
		      }
		    }
		  }]);

		  return BScroll;
		}(_util.EventEmitter);

		;

	/***/ },
	/* 2 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});

		var _dom = __webpack_require__(3);

		Object.keys(_dom).forEach(function (key) {
		  if (key === "default" || key === "__esModule") return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _dom[key];
		    }
		  });
		});

		var _env = __webpack_require__(4);

		Object.keys(_env).forEach(function (key) {
		  if (key === "default" || key === "__esModule") return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _env[key];
		    }
		  });
		});

		var _ease = __webpack_require__(5);

		Object.keys(_ease).forEach(function (key) {
		  if (key === "default" || key === "__esModule") return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _ease[key];
		    }
		  });
		});

		var _eventEmitter = __webpack_require__(6);

		Object.keys(_eventEmitter).forEach(function (key) {
		  if (key === "default" || key === "__esModule") return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _eventEmitter[key];
		    }
		  });
		});

		var _momentum = __webpack_require__(7);

		Object.keys(_momentum).forEach(function (key) {
		  if (key === "default" || key === "__esModule") return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _momentum[key];
		    }
		  });
		});

		var _lang = __webpack_require__(8);

		Object.keys(_lang).forEach(function (key) {
		  if (key === "default" || key === "__esModule") return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _lang[key];
		    }
		  });
		});

	/***/ },
	/* 3 */
	/***/ function(module, exports) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.addEvent = addEvent;
		exports.removeEvent = removeEvent;
		exports.offset = offset;
		exports.getRect = getRect;
		exports.preventDefaultException = preventDefaultException;
		exports.tap = tap;
		exports.click = click;
		exports.prepend = prepend;
		exports.before = before;
		var elementStyle = document.createElement('div').style;

		var vendor = function () {
		  var transformNames = {
		    webkit: 'webkitTransform',
		    Moz: 'MozTransform',
		    O: 'OTransform',
		    ms: 'msTransform',
		    standard: 'transform'
		  };

		  for (var key in transformNames) {
		    if (elementStyle[transformNames[key]] !== undefined) {
		      return key;
		    }
		  }

		  return false;
		}();

		function prefixStyle(style) {
		  if (vendor === false) {
		    return false;
		  }

		  if (vendor === 'standard') {
		    return style;
		  }

		  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
		}

		function addEvent(el, type, fn, capture) {
		  el.addEventListener(type, fn, { passive: false, capture: !!capture });
		};

		function removeEvent(el, type, fn, capture) {
		  el.removeEventListener(type, fn, !!capture);
		};

		function offset(el) {
		  var left = 0;
		  var top = 0;

		  while (el) {
		    left -= el.offsetLeft;
		    top -= el.offsetTop;
		    el = el.offsetParent;
		  }

		  return {
		    left: left,
		    top: top
		  };
		};

		var transform = prefixStyle('transform');

		var hasPerspective = exports.hasPerspective = prefixStyle('perspective') in elementStyle;
		var hasTouch = exports.hasTouch = 'ontouchstart' in window;
		var hasTransform = exports.hasTransform = transform !== false;
		var hasTransition = exports.hasTransition = prefixStyle('transition') in elementStyle;

		var style = exports.style = {
		  transform: transform,
		  transitionTimingFunction: prefixStyle('transitionTimingFunction'),
		  transitionDuration: prefixStyle('transitionDuration'),
		  transitionDelay: prefixStyle('transitionDelay'),
		  transformOrigin: prefixStyle('transformOrigin'),
		  transitionEnd: prefixStyle('transitionEnd')
		};

		var TOUCH_EVENT = 1;
		var MOUSE_EVENT = 2;
		var eventType = exports.eventType = {
		  touchstart: TOUCH_EVENT,
		  touchmove: TOUCH_EVENT,
		  touchend: TOUCH_EVENT,

		  mousedown: MOUSE_EVENT,
		  mousemove: MOUSE_EVENT,
		  mouseup: MOUSE_EVENT
		};

		function getRect(el) {
		  if (el instanceof window.SVGElement) {
		    var rect = el.getBoundingClientRect();
		    return {
		      top: rect.top,
		      left: rect.left,
		      width: rect.width,
		      height: rect.height
		    };
		  } else {
		    return {
		      top: el.offsetTop,
		      left: el.offsetLeft,
		      width: el.offsetWidth,
		      height: el.offsetHeight
		    };
		  }
		};

		function preventDefaultException(el, exceptions) {
		  for (var i in exceptions) {
		    if (exceptions[i].test(el[i])) {
		      return true;
		    }
		  }
		  return false;
		}

		function tap(e, eventName) {
		  var ev = document.createEvent('Event');
		  ev.initEvent(eventName, true, true);
		  ev.pageX = e.pageX;
		  ev.pageY = e.pageY;
		  e.target.dispatchEvent(ev);
		};

		function click(e) {
		  var target = e.target;

		  if (!/(SELECT|INPUT|TEXTAREA)/i.test(target.tagName)) {
		    var ev = document.createEvent(window.MouseEvent ? 'MouseEvents' : 'Event');
		    ev.initEvent('click', true, true);
		    ev._constructed = true;
		    target.dispatchEvent(ev);
		  }
		};

		function prepend(el, target) {
		  if (target.firstChild) {
		    before(el, target.firstChild);
		  } else {
		    target.appendChild(el);
		  }
		}

		function before(el, target) {
		  target.parentNode.insertBefore(el, target);
		}

	/***/ },
	/* 4 */
	/***/ function(module, exports) {

		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		var isBadAndroid = exports.isBadAndroid = /Android /.test(window.navigator.appVersion) && !/Chrome\/\d/.test(window.navigator.appVersion);

	/***/ },
	/* 5 */
	/***/ function(module, exports) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		var ease = exports.ease = {
			swipe: {
				style: 'cubic-bezier(0.23, 1, 0.32, 1)',
				fn: function fn(t) {
					return 1 + --t * t * t * t * t;
				}
			},

			swipeBounce: {
				style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				fn: function fn(t) {
					return t * (2 - t);
				}
			},

			bounce: {
				style: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
				fn: function fn(t) {
					return 1 - --t * t * t * t;
				}
			}
		};

	/***/ },
	/* 6 */
	/***/ function(module, exports) {

		"use strict";

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

		function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

		var EventEmitter = exports.EventEmitter = function () {
			function EventEmitter() {
				_classCallCheck(this, EventEmitter);

				this._events = {};
			}

			_createClass(EventEmitter, [{
				key: "on",
				value: function on(type, fn) {
					var context = arguments.length <= 2 || arguments[2] === undefined ? this : arguments[2];

					if (!this._events[type]) {
						this._events[type] = [];
					}

					this._events[type].push([fn, context]);
				}
			}, {
				key: "once",
				value: function once(type, fn) {
					var context = arguments.length <= 2 || arguments[2] === undefined ? this : arguments[2];

					var fired = false;

					function magic() {
						this.off(type, magic);

						if (!fired) {
							fired = true;
							fn.apply(context, arguments);
						}
					}

					this.on(type, magic);
				}
			}, {
				key: "off",
				value: function off(type, fn) {
					var _events = this._events[type];
					if (!_events) {
						return;
					}

					var count = _events.length;
					while (count--) {
						if (_events[count][0] === fn) {
							_events[count][0] = undefined;
						}
					}
				}
			}, {
				key: "trigger",
				value: function trigger(type) {
					var events = this._events[type];
					if (!events) {
						return;
					}

					var len = events.length;
					var eventsCopy = [].concat(_toConsumableArray(events));
					for (var i = 0; i < len; i++) {
						var event = eventsCopy[i];

						var _event = _slicedToArray(event, 2);

						var fn = _event[0];
						var context = _event[1];

						if (fn) {
							fn.apply(context, [].slice.call(arguments, 1));
						}
					}
				}
			}]);

			return EventEmitter;
		}();

	/***/ },
	/* 7 */
	/***/ function(module, exports) {

		"use strict";

		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports.momentum = momentum;
		function momentum(current, start, time, lowerMargin, wrapperSize, options) {
			var distance = current - start;
			var speed = Math.abs(distance) / time;

			var deceleration = options.deceleration;
			var itemHeight = options.itemHeight;
			var swipeBounceTime = options.swipeBounceTime;
			var bounceTime = options.bounceTime;

			var duration = options.swipeTime;
			var rate = options.wheel ? 4 : 15;

			var destination = current + speed / deceleration * (distance < 0 ? -1 : 1);

			if (options.wheel && itemHeight) {
				destination = Math.round(destination / itemHeight) * itemHeight;
			}

			if (destination < lowerMargin) {
				destination = wrapperSize ? lowerMargin - wrapperSize / rate * speed : lowerMargin;
				duration = swipeBounceTime - bounceTime;
			} else if (destination > 0) {
				destination = wrapperSize ? wrapperSize / rate * speed : 0;
				duration = swipeBounceTime - bounceTime;
			}

			return {
				destination: Math.round(destination),
				duration: duration
			};
		};

	/***/ },
	/* 8 */
	/***/ function(module, exports) {

		"use strict";

		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports.extend = extend;
		function extend(target, source) {
			for (var key in source) {
				target[key] = source[key];
			}
		};

		var DEFAULT_INTERVAL = 100 / 60;

		var requestAnimationFrame = exports.requestAnimationFrame = function () {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
				return window.setTimeout(callback, (callback.interval || DEFAULT_INTERVAL) / 2);
			};
		}();

		var cancelAnimationFrame = exports.cancelAnimationFrame = function () {
			return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function (id) {
				window.clearTimeout(id);
			};
		}();

	/***/ }
	/******/ ])
	});
	;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EventEmitter = function () {
		function EventEmitter() {
			_classCallCheck(this, EventEmitter);

			this._events = {};
		}

		_createClass(EventEmitter, [{
			key: "on",
			value: function on(type, fn) {
				var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

				if (!this._events[type]) {
					this._events[type] = [];
				}

				this._events[type].push([fn, context]);
			}
		}, {
			key: "once",
			value: function once(type, fn) {
				var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

				var fired = false;

				function magic() {
					this.off(type, magic);

					if (!fired) {
						fired = true;
						fn.apply(context, arguments);
					}
				}

				this.on(type, magic);
			}
		}, {
			key: "off",
			value: function off(type, fn) {
				var _events = this._events[type];
				if (!_events) {
					return;
				}

				var count = _events.length;
				while (count--) {
					if (_events[count][0] === fn) {
						_events[count][0] = undefined;
					}
				}
			}
		}, {
			key: "trigger",
			value: function trigger(type) {
				var events = this._events[type];
				if (!events) {
					return;
				}

				var len = events.length;
				var eventsCopy = [].concat(_toConsumableArray(events));
				for (var i = 0; i < len; i++) {
					var event = eventsCopy[i];

					var _event = _slicedToArray(event, 2),
					    fn = _event[0],
					    context = _event[1];

					if (fn) {
						fn.apply(context, [].slice.call(arguments, 1));
					}
				}
			}
		}]);

		return EventEmitter;
	}();

	exports.default = EventEmitter;
	;
	module.exports = exports["default"];

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports.extend = extend;
	function extend(target, source) {
		for (var key in source) {
			target[key] = source[key];
		}
	};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.createDom = createDom;
	exports.addEvent = addEvent;
	exports.removeEvent = removeEvent;
	exports.hasClass = hasClass;
	exports.addClass = addClass;
	exports.removeClass = removeClass;
	function createDom(tpl) {
		var container = document.createElement('div');
		container.innerHTML = tpl;
		return container.childNodes[0];
	};

	function addEvent(el, type, fn, capture) {
		el.addEventListener(type, fn, !!capture);
	};

	function removeEvent(el, type, fn, capture) {
		el.removeEventListener(type, fn, !!capture);
	};

	function hasClass(el, className) {
		var reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
		return reg.test(el.className);
	};

	function addClass(el, className) {
		if (hasClass(el, className)) {
			return;
		}

		var newClass = el.className.split(' ');
		newClass.push(className);
		el.className = newClass.join(' ');
	};

	function removeClass(el, className) {
		if (!hasClass(el, className)) {
			return;
		}

		var reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g');
		el.className = el.className.replace(reg, ' ');
	};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(7);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template(function (Handlebars,depth0,helpers,partials,data) {
	  this.compilerInfo = [4,'>= 1.0.0'];
	helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
	  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

	function program1(depth0,data) {
	  
	  var buffer = "", stack1;
	  buffer += "\n          <div class=\"wheel wheel-hook\">\n            <ul class=\"wheel-scroll wheel-scroll-hook\">\n              ";
	  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
	  if(stack1 || stack1 === 0) { buffer += stack1; }
	  buffer += "\n            </ul>\n          </div>\n        ";
	  return buffer;
	  }
	function program2(depth0,data) {
	  
	  var buffer = "", stack1, helper;
	  buffer += "\n                <li class=\"wheel-item\" data-val=\"";
	  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
	  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
	  buffer += escapeExpression(stack1)
	    + "\">";
	  if (helper = helpers.text) { stack1 = helper.call(depth0, {hash:{},data:data}); }
	  else { helper = (depth0 && depth0.text); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
	  buffer += escapeExpression(stack1)
	    + "</li>\n              ";
	  return buffer;
	  }

	  buffer += "<div class=\"picker\">\n  <div class=\"picker-mask mask-hook\"></div>\n  <div class=\"picker-panel panel-hook\">\n    <div class=\"picker-choose choose-hook\">\n      <span class=\"cancel cancel-hook\">取消</span>\n      <span class=\"confirm confirm-hook\">确定</span>\n      <h1 class=\"picker-title\">";
	  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
	  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
	  buffer += escapeExpression(stack1)
	    + "</h1>\n    </div>\n    <div class=\"picker-content\">\n      <div class=\"mask-top border-1px\"></div>\n      <div class=\"mask-bottom border-1px\"></div>\n      <div class=\"wheel-wrapper wheel-wrapper-hook\">\n        ";
	  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
	  if(stack1 || stack1 === 0) { buffer += stack1; }
	  buffer += "\n      </div>\n    </div>\n    <div class=\"picker-footer footer-hook\"></div>\n  </div>\n</div>";
	  return buffer;
	  });

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	// Create a simple path alias to allow browserify to resolve
	// the runtime on a supported path.
	module.exports = __webpack_require__(8);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/*globals Handlebars: true */
	var base = __webpack_require__(9);

	// Each of these augment the Handlebars object. No need to setup here.
	// (This is done to easily share code between commonjs and browse envs)
	var SafeString = __webpack_require__(11)["default"];
	var Exception = __webpack_require__(12)["default"];
	var Utils = __webpack_require__(10);
	var runtime = __webpack_require__(13);

	// For compatibility and usage outside of module systems, make the Handlebars object a namespace
	var create = function() {
	  var hb = new base.HandlebarsEnvironment();

	  Utils.extend(hb, base);
	  hb.SafeString = SafeString;
	  hb.Exception = Exception;
	  hb.Utils = Utils;

	  hb.VM = runtime;
	  hb.template = function(spec) {
	    return runtime.template(spec, hb);
	  };

	  return hb;
	};

	var Handlebars = create();
	Handlebars.create = create;

	exports["default"] = Handlebars;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var Utils = __webpack_require__(10);
	var Exception = __webpack_require__(12)["default"];

	var VERSION = "1.3.0";
	exports.VERSION = VERSION;var COMPILER_REVISION = 4;
	exports.COMPILER_REVISION = COMPILER_REVISION;
	var REVISION_CHANGES = {
	  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
	  2: '== 1.0.0-rc.3',
	  3: '== 1.0.0-rc.4',
	  4: '>= 1.0.0'
	};
	exports.REVISION_CHANGES = REVISION_CHANGES;
	var isArray = Utils.isArray,
	    isFunction = Utils.isFunction,
	    toString = Utils.toString,
	    objectType = '[object Object]';

	function HandlebarsEnvironment(helpers, partials) {
	  this.helpers = helpers || {};
	  this.partials = partials || {};

	  registerDefaultHelpers(this);
	}

	exports.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
	  constructor: HandlebarsEnvironment,

	  logger: logger,
	  log: log,

	  registerHelper: function(name, fn, inverse) {
	    if (toString.call(name) === objectType) {
	      if (inverse || fn) { throw new Exception('Arg not supported with multiple helpers'); }
	      Utils.extend(this.helpers, name);
	    } else {
	      if (inverse) { fn.not = inverse; }
	      this.helpers[name] = fn;
	    }
	  },

	  registerPartial: function(name, str) {
	    if (toString.call(name) === objectType) {
	      Utils.extend(this.partials,  name);
	    } else {
	      this.partials[name] = str;
	    }
	  }
	};

	function registerDefaultHelpers(instance) {
	  instance.registerHelper('helperMissing', function(arg) {
	    if(arguments.length === 2) {
	      return undefined;
	    } else {
	      throw new Exception("Missing helper: '" + arg + "'");
	    }
	  });

	  instance.registerHelper('blockHelperMissing', function(context, options) {
	    var inverse = options.inverse || function() {}, fn = options.fn;

	    if (isFunction(context)) { context = context.call(this); }

	    if(context === true) {
	      return fn(this);
	    } else if(context === false || context == null) {
	      return inverse(this);
	    } else if (isArray(context)) {
	      if(context.length > 0) {
	        return instance.helpers.each(context, options);
	      } else {
	        return inverse(this);
	      }
	    } else {
	      return fn(context);
	    }
	  });

	  instance.registerHelper('each', function(context, options) {
	    var fn = options.fn, inverse = options.inverse;
	    var i = 0, ret = "", data;

	    if (isFunction(context)) { context = context.call(this); }

	    if (options.data) {
	      data = createFrame(options.data);
	    }

	    if(context && typeof context === 'object') {
	      if (isArray(context)) {
	        for(var j = context.length; i<j; i++) {
	          if (data) {
	            data.index = i;
	            data.first = (i === 0);
	            data.last  = (i === (context.length-1));
	          }
	          ret = ret + fn(context[i], { data: data });
	        }
	      } else {
	        for(var key in context) {
	          if(context.hasOwnProperty(key)) {
	            if(data) { 
	              data.key = key; 
	              data.index = i;
	              data.first = (i === 0);
	            }
	            ret = ret + fn(context[key], {data: data});
	            i++;
	          }
	        }
	      }
	    }

	    if(i === 0){
	      ret = inverse(this);
	    }

	    return ret;
	  });

	  instance.registerHelper('if', function(conditional, options) {
	    if (isFunction(conditional)) { conditional = conditional.call(this); }

	    // Default behavior is to render the positive path if the value is truthy and not empty.
	    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
	    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
	    if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
	      return options.inverse(this);
	    } else {
	      return options.fn(this);
	    }
	  });

	  instance.registerHelper('unless', function(conditional, options) {
	    return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
	  });

	  instance.registerHelper('with', function(context, options) {
	    if (isFunction(context)) { context = context.call(this); }

	    if (!Utils.isEmpty(context)) return options.fn(context);
	  });

	  instance.registerHelper('log', function(context, options) {
	    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
	    instance.log(level, context);
	  });
	}

	var logger = {
	  methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

	  // State enum
	  DEBUG: 0,
	  INFO: 1,
	  WARN: 2,
	  ERROR: 3,
	  level: 3,

	  // can be overridden in the host environment
	  log: function(level, obj) {
	    if (logger.level <= level) {
	      var method = logger.methodMap[level];
	      if (typeof console !== 'undefined' && console[method]) {
	        console[method].call(console, obj);
	      }
	    }
	  }
	};
	exports.logger = logger;
	function log(level, obj) { logger.log(level, obj); }

	exports.log = log;var createFrame = function(object) {
	  var obj = {};
	  Utils.extend(obj, object);
	  return obj;
	};
	exports.createFrame = createFrame;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/*jshint -W004 */
	var SafeString = __webpack_require__(11)["default"];

	var escape = {
	  "&": "&amp;",
	  "<": "&lt;",
	  ">": "&gt;",
	  '"': "&quot;",
	  "'": "&#x27;",
	  "`": "&#x60;"
	};

	var badChars = /[&<>"'`]/g;
	var possible = /[&<>"'`]/;

	function escapeChar(chr) {
	  return escape[chr] || "&amp;";
	}

	function extend(obj, value) {
	  for(var key in value) {
	    if(Object.prototype.hasOwnProperty.call(value, key)) {
	      obj[key] = value[key];
	    }
	  }
	}

	exports.extend = extend;var toString = Object.prototype.toString;
	exports.toString = toString;
	// Sourced from lodash
	// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
	var isFunction = function(value) {
	  return typeof value === 'function';
	};
	// fallback for older versions of Chrome and Safari
	if (isFunction(/x/)) {
	  isFunction = function(value) {
	    return typeof value === 'function' && toString.call(value) === '[object Function]';
	  };
	}
	var isFunction;
	exports.isFunction = isFunction;
	var isArray = Array.isArray || function(value) {
	  return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
	};
	exports.isArray = isArray;

	function escapeExpression(string) {
	  // don't escape SafeStrings, since they're already safe
	  if (string instanceof SafeString) {
	    return string.toString();
	  } else if (!string && string !== 0) {
	    return "";
	  }

	  // Force a string conversion as this will be done by the append regardless and
	  // the regex test will do this transparently behind the scenes, causing issues if
	  // an object's to string has escaped characters in it.
	  string = "" + string;

	  if(!possible.test(string)) { return string; }
	  return string.replace(badChars, escapeChar);
	}

	exports.escapeExpression = escapeExpression;function isEmpty(value) {
	  if (!value && value !== 0) {
	    return true;
	  } else if (isArray(value) && value.length === 0) {
	    return true;
	  } else {
	    return false;
	  }
	}

	exports.isEmpty = isEmpty;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	"use strict";
	// Build out our basic SafeString type
	function SafeString(string) {
	  this.string = string;
	}

	SafeString.prototype.toString = function() {
	  return "" + this.string;
	};

	exports["default"] = SafeString;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	"use strict";

	var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

	function Exception(message, node) {
	  var line;
	  if (node && node.firstLine) {
	    line = node.firstLine;

	    message += ' - ' + line + ':' + node.firstColumn;
	  }

	  var tmp = Error.prototype.constructor.call(this, message);

	  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
	  for (var idx = 0; idx < errorProps.length; idx++) {
	    this[errorProps[idx]] = tmp[errorProps[idx]];
	  }

	  if (line) {
	    this.lineNumber = line;
	    this.column = node.firstColumn;
	  }
	}

	Exception.prototype = new Error();

	exports["default"] = Exception;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var Utils = __webpack_require__(10);
	var Exception = __webpack_require__(12)["default"];
	var COMPILER_REVISION = __webpack_require__(9).COMPILER_REVISION;
	var REVISION_CHANGES = __webpack_require__(9).REVISION_CHANGES;

	function checkRevision(compilerInfo) {
	  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
	      currentRevision = COMPILER_REVISION;

	  if (compilerRevision !== currentRevision) {
	    if (compilerRevision < currentRevision) {
	      var runtimeVersions = REVISION_CHANGES[currentRevision],
	          compilerVersions = REVISION_CHANGES[compilerRevision];
	      throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. "+
	            "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
	    } else {
	      // Use the embedded version info since the runtime doesn't know about this revision yet
	      throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. "+
	            "Please update your runtime to a newer version ("+compilerInfo[1]+").");
	    }
	  }
	}

	exports.checkRevision = checkRevision;// TODO: Remove this line and break up compilePartial

	function template(templateSpec, env) {
	  if (!env) {
	    throw new Exception("No environment passed to template");
	  }

	  // Note: Using env.VM references rather than local var references throughout this section to allow
	  // for external users to override these as psuedo-supported APIs.
	  var invokePartialWrapper = function(partial, name, context, helpers, partials, data) {
	    var result = env.VM.invokePartial.apply(this, arguments);
	    if (result != null) { return result; }

	    if (env.compile) {
	      var options = { helpers: helpers, partials: partials, data: data };
	      partials[name] = env.compile(partial, { data: data !== undefined }, env);
	      return partials[name](context, options);
	    } else {
	      throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
	    }
	  };

	  // Just add water
	  var container = {
	    escapeExpression: Utils.escapeExpression,
	    invokePartial: invokePartialWrapper,
	    programs: [],
	    program: function(i, fn, data) {
	      var programWrapper = this.programs[i];
	      if(data) {
	        programWrapper = program(i, fn, data);
	      } else if (!programWrapper) {
	        programWrapper = this.programs[i] = program(i, fn);
	      }
	      return programWrapper;
	    },
	    merge: function(param, common) {
	      var ret = param || common;

	      if (param && common && (param !== common)) {
	        ret = {};
	        Utils.extend(ret, common);
	        Utils.extend(ret, param);
	      }
	      return ret;
	    },
	    programWithDepth: env.VM.programWithDepth,
	    noop: env.VM.noop,
	    compilerInfo: null
	  };

	  return function(context, options) {
	    options = options || {};
	    var namespace = options.partial ? options : env,
	        helpers,
	        partials;

	    if (!options.partial) {
	      helpers = options.helpers;
	      partials = options.partials;
	    }
	    var result = templateSpec.call(
	          container,
	          namespace, context,
	          helpers,
	          partials,
	          options.data);

	    if (!options.partial) {
	      env.VM.checkRevision(container.compilerInfo);
	    }

	    return result;
	  };
	}

	exports.template = template;function programWithDepth(i, fn, data /*, $depth */) {
	  var args = Array.prototype.slice.call(arguments, 3);

	  var prog = function(context, options) {
	    options = options || {};

	    return fn.apply(this, [context, options.data || data].concat(args));
	  };
	  prog.program = i;
	  prog.depth = args.length;
	  return prog;
	}

	exports.programWithDepth = programWithDepth;function program(i, fn, data) {
	  var prog = function(context, options) {
	    options = options || {};

	    return fn(context, options.data || data);
	  };
	  prog.program = i;
	  prog.depth = 0;
	  return prog;
	}

	exports.program = program;function invokePartial(partial, name, context, helpers, partials, data) {
	  var options = { partial: true, helpers: helpers, partials: partials, data: data };

	  if(partial === undefined) {
	    throw new Exception("The partial " + name + " could not be found");
	  } else if(partial instanceof Function) {
	    return partial(context, options);
	  }
	}

	exports.invokePartial = invokePartial;function noop() { return ""; }

	exports.noop = noop;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(7);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template(function (Handlebars,depth0,helpers,partials,data) {
	  this.compilerInfo = [4,'>= 1.0.0'];
	helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
	  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

	function program1(depth0,data) {
	  
	  var buffer = "", stack1, helper;
	  buffer += "\n  <li class=\"wheel-item\" data-val=\"";
	  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
	  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
	  buffer += escapeExpression(stack1)
	    + "\">";
	  if (helper = helpers.text) { stack1 = helper.call(depth0, {hash:{},data:data}); }
	  else { helper = (depth0 && depth0.text); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
	  buffer += escapeExpression(stack1)
	    + "</li>\n";
	  return buffer;
	  }

	  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
	  if(stack1 || stack1 === 0) { return stack1; }
	  else { return ''; }
	  });

/***/ })
/******/ ])
});
;
