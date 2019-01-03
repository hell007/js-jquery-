/**
 * options
 canvasId：canvas的id。
 imageBackground：背景图片（刮开后呈现的图片）。
 pictureOver：前景图片。
 sceneWidth：canvas的宽度。
 sceneHeight：canvas的高度。
 radius：清除区域的半径。
 nPoints：清除区域的杂点数量。
 percent：在清除多少区域之后清空canvas。
 cursor：光标。
 png：png格式的光标。
 x：Move position x。
 y：Move position y。
 cur：cur格式的光标（IE使用）。
 */

var Scratch = (function() {

  /**
   * Merge properties between two objects
   * @param obj1
   * @param obj2
   * @returns {{}}
   */
  function mergeOptions(obj1, obj2) {
    var obj3 = {};
    for (var key in obj1) {
      obj3[key] = obj1[key];
    }
    for (var key in obj2) {
      obj3[key] = obj2[key];
    }
    return obj3;
  }

  /**
   * Generate a random number
   * @param min
   * @param max
   * @returns {Number}
   */
  function randomPoint(min, max) {
    var random = Math.abs(Math.random() * (max - min) + min);
    return random = parseInt(random.toFixed(0), 10);
  }

  var isCallbackCalled = false;

  /**
   * Scratch constructor
   * @param options
   * @constructor
   */
  var Scratch = function(options) {
    this.cursor = {
      png: '', // Modern browsers
      cur: '', // for IE
      x: 0,
      y: 0,
      default: 'auto'
    };
    this.pointSize = {
      x: 5,
      y: 5
    };
    this.defaults = {
      canvasId: '', // Canvas id
      imageBackground: '', // Path [src]
      pictureOver: '', // Path [src]
      cursor: this.cursor, // Custom pointer
      sceneWidth: 250, // Canvas width
      sceneHeight: 250, // Canvas height
      radius: 40, // Radius of scratch zone
      nPoints: 10, // n points for clear canvas
      pointSize: this.pointSize,
      percent: null,
      onCovered: null,
      callback: null
    };

    this.options = mergeOptions(this.defaults, options);
    this.options.cursor = mergeOptions(this.cursor, options.cursor);
    this.options.pointSize = mergeOptions(this.pointSize, options.pointSize);

    // init Scratch
    this.init();
  };

  Scratch.prototype.init = function() {
    var self = this; // Save the "this" :)
    this.canvas = document.getElementById(this.options.canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.options.sceneWidth;
    this.canvas.height = this.options.sceneHeight;
    this.image = new Image();
    this.image.src = this.options.pictureOver;
    this.percent = 0;
    this.zone = null;
    this.pixelRatio = window.devicePixelRatio;

    // Set background after draw the canvas
    this.setBackground();
    this.setCursor();

    var scratchMove = function(e) {
      e.preventDefault();
      self.scratch(e);
      var clear = self.clear();
      if (clear && !isCallbackCalled) {
        self.canvas.style.pointerEvents = 'none';
        self.callback(self.options.callback);
      }
    };

    window.addEventListener('resize', function() {
      self.update();
      // Resize the canvas
      self.redraw();
    });

    window.addEventListener('scroll', function() {
      self.update();
    });

    // Mouse & Touch events
    this.canvas.addEventListener('mousedown', function(e) {
      self.canvas.addEventListener('mousemove', scratchMove);

      document.body.addEventListener('mouseup', function _func() {
        self.canvas.removeEventListener('mousemove', scratchMove);
        this.removeEventListener('mouseup', _func);
      });
    });

    this.canvas.addEventListener('touchstart', function(e) {
      self.canvas.addEventListener('touchmove', scratchMove);

      document.body.addEventListener('touchend', function _func() {
        self.canvas.removeEventListener('touchmove', scratchMove);
        this.removeEventListener('touchend', _func);
      });
    });

  };

  Scratch.prototype.setCursor = function() {
    var string = '';

    if (document.documentElement.classList.contains('is-ie') || navigator.userAgent.indexOf('Trident') != -1 || navigator.userAgent.indexOf('Edge') != -1) {
      string += 'url(' + this.options.cursor.cur + '), auto';
    } else {
      string += 'url(' + this.options.cursor.png + ') ' + this.options.cursor.x + ' ' + this.options.cursor.y + ', pointer';
    }

    this.canvas.setAttribute('style', 'cursor:' + string + ';');
  };

  // Update positions etc
  Scratch.prototype.update = function() {
    this.zone = this.canvas.getBoundingClientRect();
  };

  Scratch.prototype.redraw = function() {
    if (this.options.pictureOver) {
      var oldWidth = this.options.sceneWidth;
      var newWidth = this.zone.width;
      if (newWidth < oldWidth) {
        this.ctx.clearRect(0, 0, this.zone.width, this.zone.height);
        this.canvas.width = this.zone.width;
        this.canvas.height = this.zone.height;
        this.ctx.drawImage(this.image, 0, 0, this.zone.width, this.zone.height);
      }
    } else {
      var fontEm = parseInt(window.getComputedStyle(document.documentElement, null)["font-size"]); //这是为了不同分辨率上配合@media自动调节刮的宽度
      //画出来是透明的
      this.ctx.beginPath();
      this.ctx.arc(x, y, fontEm * 1.6, 0, Math.PI * 2, true);
      drawFillOver(this);
    }
  };

  function drawFillOver(that) {
    that.ctx.globalCompositeOperation = "source-over";
    that.ctx.fillStyle = '#aaaaaa';
    that.ctx.fillRect(0, 0, that.options.sceneWidth, that.options.sceneHeight);
    that.ctx.fill();
    that.ctx.font = "Bold 20px Arial";
    that.ctx.textAlign = "center";
    that.ctx.fillStyle = "#ebebeb";
    that.ctx.fillText("惊喜在后头,快刮我", that.options.sceneWidth / 2, that.options.sceneHeight / 2);
    //把这个属性设为这个就可以做出圆形橡皮擦的效果
    //有些老的手机自带浏览器不支持destination-out,下面的代码中有修复的方法
    that.ctx.globalCompositeOperation = 'destination-out';
    that.ctx.fill();
    that.canvas.style.display = 'none';
    that.canvas.offsetHeight;
    that.canvas.style.display = 'inherit';
  }

  Scratch.prototype.setBackground = function() {
    var self = this;
    if (self.options.pictureOver) {
      this.image.onload = function() {
        self.zone = self.canvas.getBoundingClientRect();
        // Draw image
        self.ctx.drawImage(this, 0, 0);
        // When the canvas have been drawn
        if (self.options.imageBackground) {
          var IMG = document.createElement('img');
          IMG.classList.add('scratch_picture-under');
          IMG.src = self.options.imageBackground;
          self.canvas.parentElement.insertBefore(IMG, self.canvas);
        }
        if (typeof self.options.onCovered == "function") {
          self.options.onCovered.call();
        }
      };
    } else {
      self.zone = self.canvas.getBoundingClientRect();
      drawFillOver(self);
      if (typeof self.options.onCovered == "function") {
        self.options.onCovered.call();
      }
    }
  };

  Scratch.prototype.clearPoint = function(x1, y1) {
    var radius = this.options.radius;
    var x = Math.random() * 2 * radius - radius;
    var ylim = Math.sqrt(radius * radius - x * x);
    var y = Math.random() * 2 * ylim - ylim;

    x += radius;
    y += radius;

    x = parseInt(x, 10);
    y = parseInt(y, 10);

    return {
      x: x + x1,
      y: y + y1
    }

  };

  Scratch.prototype.getPosition = function(e) {
    var posX, posY;
    switch (e.type) {
      case 'touchmove':
        posX = e.touches[0].clientX - this.options.radius - window.pageXOffset;
        posY = e.touches[0].clientY - this.options.radius - window.pageYOffset;
        break;
      case 'mousemove':
        posX = e.clientX - this.options.radius - window.pageXOffset;
        posY = e.clientY - this.options.radius - window.pageYOffset;
        break;
    }

    return {
      x: posX,
      y: posY
    }
  };

  Scratch.prototype.scratch = function(e) {
    var position = this.getPosition(e);
    var x = position.x - this.zone.left;
    var y = position.y - this.zone.top + window.pageYOffset;
    var i = 0;
    var len = this.options.nPoints;

    for (i; i < len; i++) {
      var points = this.clearPoint(x, y);
      this.ctx.clearRect(points.x, points.y, this.options.pointSize.x, this.options.pointSize.y);
    }
    this.percent = this.getPercent();
  };

  Scratch.prototype.getPercent = function() {
    var percent;
    var counter = 0; // number of pixels clear
    var imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    var imageDataLength = imageData.data.length;

    for (var i = 0; i < imageDataLength; i += 4) {
      if (imageData.data[i] === 0 && imageData.data[i + 1] === 0 && imageData.data[i + 2] === 0 && imageData.data[i + 3] === 0) {
        counter++;
      }
    }

    if (counter >= 1) {
      percent = (counter / (this.canvas.width * this.canvas.height)) * 100;
    } else {
      percent = 0;
    }
    return percent;
  };

  Scratch.prototype.clear = function() {
    if (this.percent >= this.options.percent) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      return true;
    }
  };

  Scratch.prototype.callback = function(callback) {
    if (callback != null && this.percent >= this.options.percent) {
      isCallbackCalled = true;
      callback();
    }
  };

  return Scratch;
})();
