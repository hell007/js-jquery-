// lArea城市选择控件 CMD规范

define(function(require, exports, module){
	
	var lArea = (function() {
	    var MobileArea = function() {
	        this.gearArea;
	        this.data;
	        this.index = 0;
	        this.value = [0, 0, 0];
	    }
	    MobileArea.prototype = {
	        init: function(params) {
	            this.params = params;
	            this.trigger = document.querySelector(params.trigger);
	            this.bindEvent(this.type);
	        },
	        getData: function(callback) {
	            var _self = this;
	            if (typeof _self.params.data == "object") {
	                _self.data = _self.params.data;
	                callback();
	            } else {
	                var xhr = new XMLHttpRequest();
	                xhr.open('get', _self.params.data);
	                xhr.onload = function(e) {
	                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 0) {
	                        var responseData = JSON.parse(xhr.responseText);
	                        _self.data = responseData.data;
	                        if (callback) {
	                            callback()
	                        };
	                    }
	                }
	                xhr.send();
	            }
	        },
	        bindEvent: function(type) {
	            var _self = this;
	            //呼出插件
	            function popupArea(e) {
	                _self.gearArea = document.createElement("div");
	                _self.gearArea.className = "gearArea";
	                _self.gearArea.innerHTML = '<div class="area_ctrl slideInUp">' +
	                    '<div class="area_btn_box">' +
	                    '<div class="area_btn larea_cancel">取消</div>' +
	                    '<div class="area_btn larea_finish">确定</div>' +
	                    '</div>' +
	                    '<div class="area_roll_mask">' +
	                    '<div class="area_roll">' +
	                    '<div>' +
	                    '<div class="gear area_province" data-areatype="area_province"></div>' +
	                    '<div class="area_grid">' +
	                    '</div>' +
	                    '</div>' +
	                    '<div>' +
	                    '<div class="gear area_city" data-areatype="area_city"></div>' +
	                    '<div class="area_grid">' +
	                    '</div>' +
	                    '</div>' +
	                    '<div>' +
	                    '<div class="gear area_county" data-areatype="area_county"></div>' +
	                    '<div class="area_grid">' +
	                    '</div>' +
	                    '</div>' +
	                    '</div>' +
	                    '</div>' +
	                    '</div>';
	                document.body.appendChild(_self.gearArea);
	                areaCtrlInit();
	                var larea_cancel = _self.gearArea.querySelector(".larea_cancel");
	                larea_cancel.addEventListener('touchstart', function(e) {
	                    _self.close(e);
	                });
	                var larea_finish = _self.gearArea.querySelector(".larea_finish");
	                larea_finish.addEventListener('touchstart', function(e) {
	                    _self.finish(e);
	                });
	                var area_province = _self.gearArea.querySelector(".area_province");
	                var area_city = _self.gearArea.querySelector(".area_city");
	                var area_county = _self.gearArea.querySelector(".area_county");
	                area_province.addEventListener('touchstart', gearTouchStart);
	                area_city.addEventListener('touchstart', gearTouchStart);
	                area_county.addEventListener('touchstart', gearTouchStart);
	                area_province.addEventListener('touchmove', gearTouchMove);
	                area_city.addEventListener('touchmove', gearTouchMove);
	                area_county.addEventListener('touchmove', gearTouchMove);
	                area_province.addEventListener('touchend', gearTouchEnd);
	                area_city.addEventListener('touchend', gearTouchEnd);
	                area_county.addEventListener('touchend', gearTouchEnd);
	            }
	            //初始化插件默认值
	            function areaCtrlInit() {
	                _self.gearArea.querySelector(".area_province").setAttribute("val", _self.value[0]);
	                _self.gearArea.querySelector(".area_city").setAttribute("val", _self.value[1]);
	                _self.gearArea.querySelector(".area_county").setAttribute("val", _self.value[2]);
	                _self.setGearTooth(_self.data);
	            }
	            //触摸开始
	            function gearTouchStart(e) {
	                e.preventDefault();
	                var target = e.target;
	                while (true) {
	                    if (!target.classList.contains("gear")) {
	                        target = target.parentElement;
	                    } else {
	                        break
	                    }
	                }
	                clearInterval(target["int_" + target.id]);
	                target["old_" + target.id] = e.targetTouches[0].screenY;
	                target["o_t_" + target.id] = (new Date()).getTime();
	                var top = target.getAttribute('top');
	                if (top) {
	                    target["o_d_" + target.id] = parseFloat(top.replace(/em/g, ""));
	                } else {
	                    target["o_d_" + target.id] = 0;
	                }
	            }
	            //手指移动
	            function gearTouchMove(e) {
	                e.preventDefault();
	                var target = e.target;
	                while (true) {
	                    if (!target.classList.contains("gear")) {
	                        target = target.parentElement;
	                    } else {
	                        break
	                    }
	                }
	                target["new_" + target.id] = e.targetTouches[0].screenY;
	                target["n_t_" + target.id] = (new Date()).getTime();
	                //var f = (target["new_" + target.id] - target["old_" + target.id]) * 18 / target.clientHeight;
	                var f = (target["new_" + target.id] - target["old_" + target.id]) * 18 / 370;
	                target["pos_" + target.id] = target["o_d_" + target.id] + f;
	                target.style["-webkit-transform"] = 'translate3d(0,' + target["pos_" + target.id] + 'em,0)';
	                target.setAttribute('top', target["pos_" + target.id] + 'em');
	            }
	            //离开屏幕
	            function gearTouchEnd(e) {
	                e.preventDefault();
	                var target = e.target;
	                while (true) {
	                    if (!target.classList.contains("gear")) {
	                        target = target.parentElement;
	                    } else {
	                        break;
	                    }
	                }
	                var flag = (target["new_" + target.id] - target["old_" + target.id]) / (target["n_t_" + target.id] - target["o_t_" + target.id]);
	                if (Math.abs(flag) <= 0.2) {
	                    target["spd_" + target.id] = (flag < 0 ? -0.08 : 0.08);
	                } else {
	                    if (Math.abs(flag) <= 0.5) {
	                        target["spd_" + target.id] = (flag < 0 ? -0.16 : 0.16);
	                    } else {
	                        target["spd_" + target.id] = flag / 2;
	                    }
	                }
	                if (!target["pos_" + target.id]) {
	                    target["pos_" + target.id] = 0;
	                }
	                rollGear(target);
	            }
	            //缓动效果
	            function rollGear(target) {
	                var d = 0;
	                var stopGear = false;
	                clearInterval(target["int_" + target.id]);
	                target["int_" + target.id] = setInterval(function() {
	                    var pos = target["pos_" + target.id];
	                    var speed = target["spd_" + target.id] * Math.exp(-0.03 * d);
	                    pos += speed;
	                    if (Math.abs(speed) > 0.1) {} else {
	                        speed = 0.1;
	                        var b = Math.round(pos / 2) * 2;
	                        if (Math.abs(pos - b) < 0.02) {
	                            stopGear = true;
	                        } else {
	                            if (pos > b) {
	                                pos -= speed
	                            } else {
	                                pos += speed
	                            }
	                        }
	                    }
	                    if (pos > 0) {
	                        pos = 0;
	                        stopGear = true;
	                    }
	                    var minTop = -(target.dataset.len - 1) * 2;
	                    if (pos < minTop) {
	                        pos = minTop;
	                        stopGear = true;
	                    }
	                    if (stopGear) {
	                        var gearVal = Math.abs(pos) / 2;
	                        setGear(target, gearVal);
	                        clearInterval(target["int_" + target.id]);
	                    }
	                    target["pos_" + target.id] = pos;
	                    target.style["-webkit-transform"] = 'translate3d(0,' + pos + 'em,0)';
	                    target.setAttribute('top', pos + 'em');
	                    d++;
	                }, 30);
	            }
	            //控制插件滚动后停留的值
	            function setGear(target, val) {
	                val = Math.round(val);
	                target.setAttribute("val", val);
	                _self.setGearTooth(_self.data);
	            }
	            _self.getData(function() {
	                _self.trigger.addEventListener('click', popupArea);
	            });
	        },
	        //重置节点个数
	        setGearTooth: function(data) {
	            var _self = this;
	            var item = data || [];
	            var l = item.length;
	            var gearChild = _self.gearArea.querySelectorAll(".gear");
	            var gearVal = gearChild[_self.index].getAttribute('val');
	            gearChild[_self.index].setAttribute('data-len', l);
	            if (l > 0) {
	                var id = item[gearVal].id;
	                var childData = item[gearVal].child;
	                var itemStr = "";
	                for (var i = 0; i < l; i++) {
	                    itemStr += "<div class='tooth'  ref='" + item[i].id + "'>" + item[i].name + "</div>";
	                }
	                gearChild[_self.index].innerHTML = itemStr;
	                gearChild[_self.index].style["-webkit-transform"] = 'translate3d(0,' + (-gearVal * 2) + 'em,0)';
	                gearChild[_self.index].setAttribute('top', -gearVal * 2 + 'em');
	                _self.index++;
	                if (_self.index > 2) {
	                    _self.index = 0;
	                    return;
	                }
	                _self.setGearTooth(childData);
	            } else {
	                gearChild[_self.index].innerHTML = "<div class='tooth'></div>";
	                _self.index = 0;
	            }
	        },
	        finish: function(e) {
	            var _self = this;
	            var area_province = _self.gearArea.querySelector(".area_province");
	            var area_city = _self.gearArea.querySelector(".area_city");
	            var area_county = _self.gearArea.querySelector(".area_county");
	            var provinceVal = parseInt(area_province.getAttribute("val"));
	            var provinceText = area_province.childNodes[provinceVal].textContent;
	            var cityVal = parseInt(area_city.getAttribute("val"));
	            var cityText = area_city.childNodes[cityVal].textContent;
	            var countyVal = parseInt(area_county.getAttribute("val"));
	            var countyText = area_county.childNodes[countyVal].textContent;
	            _self.trigger.value = provinceText + " " + cityText + " " + countyText;
	            _self.value = [provinceVal, cityVal, countyVal];
	            _self.close(e);
	        },
	        close: function(e) {
	            e.preventDefault();
	            var _self = this;
	            var evt = new CustomEvent('input');
	            _self.trigger.dispatchEvent(evt);
	            document.body.removeChild(_self.gearArea);
	        }
	    }
	    return MobileArea;
	})();

	module.exports = lArea;
})