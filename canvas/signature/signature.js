;(function(window) {
  'use strict'

  var $ = window.jQuery

  var ratio = (function(window, document) {
    var devicePixelRatio = window.devicePixelRatio || 1
    var context = document.createElement('canvas').getContext('2d')
    var backingStoreRatio =
        context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        1
      return devicePixelRatio / backingStoreRatio
  })(window, window.document)

  function Signature(options) {
    var width = this.width = options.width
    var height = this.height = options.height
    this.path = []
    this.el = {
      preview: $(options.preview),
      draw: $(options.draw)
    }

    var canvas = this.canvas = document.createElement('canvas')
    canvas.className = 'agreement-signature__canvas'

    var context = this.context = canvas.getContext('2d')

    canvas.width = width * ratio
    canvas.height = height * ratio

    context.scale(ratio, ratio)

    options.lineWidth = options.lineWidth || 8
    context.lineWidth = options.lineWidth
    context.lineCap = 'round'
    context.shadowColor = '#000'
    context.shadowBlur = options.lineWidth / 3

    this.bindEvent()
    this.preview()
  }

  Signature.prototype.bindEvent = function() {
    var container = this.el.draw
    var context = this.context

    var isMouseDown = false
    var sign = this

    function getPoint(e) {
      if (e.offsetX || e.offsetY) {
        return {
          x: e.offsetX,
          y: e.offsetY
        }
      }

      e = e.originalEvent || e

      e = (e.touches && e.touches[0]) || e
      var offset = sign.el.draw.offset()
      var scale = sign.el.draw.width() / sign.width
      return {
        x: (e.pageX - offset.left) / scale,
        y: (e.pageY - offset.top) / scale
      }
    }

    function onStart(e) {
      var point = getPoint(e)
      context.beginPath()
      context.moveTo(point.x, point.y)

      sign.path.push(['M', point.x, point.y])

      isMouseDown = true
      return false
    }

    function onMove(e) {
      if (!isMouseDown) {
        return false
      }
      var point = getPoint(e)
      context.lineTo(point.x, point.y)
      context.stroke()

      sign.path.push(['L', point.x, point.y])

      return false
    }

    function onEnd() {
      isMouseDown = false
      return false
    }

    container.on({
      'mousedown touchstart': onStart,
      'mousemove touchmove': onMove,
      'mouseup touchend': onEnd
    })
  }

  Signature.prototype.clear = function() {
    this.path.length = 0
    this.context.clearRect(0, 0, this.width, this.height)
  }

  Signature.prototype.preview = function() {
    this.el.preview.append(this.canvas)
  }

  Signature.prototype.draw = function() {
    this.el.draw.append(this.canvas)
  }


  function dataURLToBlob(data, type) {
    var bin = atob(data.split(',')[1])
    var length = bin.length
    var arr = new Uint8Array(length)

    $.each(function(i) {
      arr[i] = bin.charCodeAt(i)
    })

    return new Blob(
      [arr],
      {
        type: type
      }
    )
  }

  Signature.prototype.toBlob = function(callback) {
    var canvas = this.canvas
    if (canvas.toBlob) {
      return canvas.toBlob(callback, 'image/png')
    }

    var dataURL = canvas.toDataURL('image/png')
    return callback(dataURLToBlob(dataURL, 'image/png'))
  }

  Signature.prototype.toSvg = function() {
    var d = $.map(this.path, function(item) {
      return item[0] + (+item[1].toFixed(2)) + ' ' + (+item[2].toFixed(2))
    }).join('')
    return [
      '<svg width="' + this.width + '" height="' + this.height + '" xmlns="http://www.w3.org/2000/svg">',
      '<path d="' + d + '" stroke-width="' + this.context.lineWidth + '" stroke-linecap="' + this.context.lineCap + '" fill="none" stroke="#000"></path>',
      '</svg>'
    ].join('')
  }

  Signature.prototype.isEmpty = function() {
    return this.path.length === 0
  }

  window.Signature = Signature

})(this.self)
