;(function(window) {
  'use strict'

  var $ = window.jQuery || window.Zepto
  var fps = 1000 / 60

  var ratio = (function() {
    var devicePixelRatio = window.devicePixelRatio || 1
    var context = document.createElement('canvas').getContext('2d')
    var backingStoreRatio =
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio ||
      1

    return devicePixelRatio / backingStoreRatio
  })()

  var win = $(window)

  // not good but enough for internal use
  function throttle(fn, time) {
    var timer
    var lastRun = 0

    var wrapped = function() {
      lastRun = Date.now()
      return fn()
    }

    return function() {
      if (Date.now() - lastRun > time) {
        return wrapped()
      }

      timer = timer && window.clearTimeout(timer)
      timer = window.setTimeout(wrapped, time)
    }
  }

  function loadImg(src) {
    var img = new Image()

    return new Promise(function(resolve, reject) {
      img.onload = function() {
        resolve(img)
      }
      img.onerror = function() {
        reject()
      }
      img.src = src
    })
  }

  function randomInteger(low, high) {
    return low + Math.floor(Math.random() * (high - low))
  }

  var SCRATCH_MIN_PERCENTAGE = 0.4
  // var SCRATCH_COVER_IMG = __inline('../images/scratch/scratch-cover.png?__inline')
  var SCRATCH_CANVAS_CLASS = 'scratch-item-canvas'
  var SCRATCH_LINE_WIDTH = 15

  function scratch(el, onInited) {
    var container = $(el).empty()
    var SCRATCH_COVER_IMG = container.attr('data-cover')
    var canvas = $('<canvas>')
      .addClass(SCRATCH_CANVAS_CLASS)
      .appendTo(container)[0]
    var context = canvas.getContext('2d')
    var width = 0
    var height = 0
    var scratchCallback

    var isScratched = throttle(function() {
      var data = context.getImageData(0, 0, width, height).data
      var leftPoints = 0
      var totalPoints = data.length / 4

      for (var i = 0; i < data.length; i += 4) {
        if (data[i] && data[i + 1] && data[i + 2] && data[i + 3]) {
          leftPoints++
        }
      }

      return leftPoints / totalPoints < 1 - SCRATCH_MIN_PERCENTAGE
    }, 200)

    function initCanvas() {
      if (container.width() === width) {
        return
      }
      width = container.width()
      height = container.height()

      canvas.width = width * ratio
      canvas.height = height * ratio
      context.scale(ratio, ratio)

      return loadImg(SCRATCH_COVER_IMG).then(function(img) {
        context.drawImage(img, 0, 0, width, height)
        context.globalCompositeOperation = 'destination-out'
        context.shadowColor = '#000'
        context.shadowBlur = 5
        context.lineWidth = SCRATCH_LINE_WIDTH
        context.lineCap = 'round'
      })
    }



    var lastPostion
    var isMouseDown

    function touchStart(e) {
      lastPostion = null
      isMouseDown = true
      erasePoint(getPoint(e))
      return false
    }

    function erasePoint(point) {
      context.beginPath()
      context.arc(point.x, point.y, SCRATCH_LINE_WIDTH / 2, 0, Math.PI * 2)
      context.fill()
    }

    function erase(currentPoint, targetPoint) {
      if (!currentPoint) {
        return erasePoint(targetPoint)
      }
      context.beginPath()
      context.moveTo(currentPoint.x, currentPoint.y)
      context.lineTo(targetPoint.x, targetPoint.y)
      context.stroke()

      return

      var point = currentPoint
      var i =
        Math.abs(currentPoint.x - targetPoint.x) +
        Math.abs(currentPoint.y - targetPoint.y)

      while (i--) {
        erasePoint(point)

        var xIncrease = randomInteger(2, 5)
        var yIncrease = randomInteger(2, 5)

        if (targetPoint.x < currentPoint.x) {
          point.x = Math.max(targetPoint.x, point.x - xIncrease)
        } else {
          point.x = Math.min(targetPoint.x, point.x + xIncrease)
        }

        if (targetPoint.y < currentPoint.y) {
          point.y = Math.max(targetPoint.y, point.y - yIncrease)
        } else {
          point.y = Math.min(targetPoint.x, point.y + yIncrease)
        }

        if (point.x === targetPoint.x && point.y === targetPoint.y) {
          break
        }
      }
    }

    function getPoint(e) {
      e = e.originalEvent || e
      var touches = e.changedTouches || e.touches
      e = touches ? touches[0] : e

      var canvasPosition = canvas.getBoundingClientRect()

      return {
        x: e.clientX - canvasPosition.left || 0,
        y: e.clientY - canvasPosition.top || 0
      }
    }

    function touchMove(e) {
      if (!isMouseDown) {
        return false
      }

      var newPostion = getPoint(e)
      erase(lastPostion, newPostion)
      if (isScratched()) {
        scratchCallback()
      }
      lastPostion = newPostion
    }

    function touchEnd(e) {
      isMouseDown = false

      if (isScratched()) {
        scratchCallback()
      }

      return false
    }

    function bindEvents() {
      container.on({
        'touchstart mousedown': touchStart,
        'touchmove mousemove': touchMove,
        'touchend mouseup': touchEnd
      })

      win.on('resize', initCanvas)
    }

    function removeEvents() {
      container.off({
        'touchstart mousedown': touchStart,
        'touchmove mousemove': touchMove,
        'touchend mouseup': touchEnd
      })

      win.off('resize', initCanvas)
    }

    function triggerEvent() {
      return new Promise(function(resolve) {
        scratchCallback = resolve
      })
    }

    return Promise.resolve()
      .then(initCanvas)
      .then(onInited)
      .then(bindEvents)
      .then(triggerEvent)
      .then(function() {
        context.clearRect(0, 0, width, height)
        removeEvents()
      })
  }

  window.scratch = scratch
})(this)
