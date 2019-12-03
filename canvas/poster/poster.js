;(function() {
  'use strict'

  var POSTER_WIDTH = 500
  var POSTER_HEIGHT = 900
  var BOTTOM_HEIGHT = 260
  var PADDING = 40
  var LINE_HEIGT = 1.5
  var QRCODE_SIZE = 140
  var QRCODE_TIP_COLOR = '#999'
  var QRCODE_TIP_SIZE = 22
  var QRCODE_TIP_MARGIN = 20
  var PRODUCT_IMG_SIZE = 360
  var PRODUCT_PRICE_COLOR = '#fd5656'
  var PRODUCT_PRICE_SIZE = 32
  var PRODUCT_IMG_BORDER = '#fff'
  var PRODUCT_MPRICE_COLOR = '#999'
  var PRODUCT_MPRICE_SIZE = 28
  var LOGO_SIZE = 30
  var SEPERATOR_DASH = [3, 8]
  var SEPERATOR_LINEWIDTH = 2
  var SEPERATOR_COLOR = '#fd5656'
  var PICTURE_FORMAT = 'jpg'
  var PICTURE_QUALITY = 1
  var PICTURE_MIME =
    PICTURE_FORMAT === 'jpg' ? 'image/jpeg' : 'image/' + PICTURE_FORMAT

  var window = Function('return this')() // eslint-disable-line
  var isWechat = /MicroMessenger/.test(window.navigator.userAgent)
  var URL = window.URL || window.webkitURL
  var File = window.File
  var $ = window.jQuery
  var getComputedStyle = window.getComputedStyle
  var Image = window.Image
  var body = $('body')
  var tempFiles = []

  function download(url, filename) {
    var link = $('<a>', {
      attr: {
        href: url,
        target: '_blank',
        download: filename || 'download'
      }
    })

    // link.text(filename)

    body.append(link)
    link[0].click()
    link.remove()
  }

  function degreeToAngle(deg) {
    return (deg / 180) * Math.PI
  }

  function isSameOrigin(url) {
    var match = /^(https?:)?\/\/(.*?)\//.exec(url)
    if (!match) {
      return true
    }
    return (
      match[2] === window.location.host &&
      (!match[1] || match[1] === window.location.protocol)
    )
  }

  var loadImg = (function(cache) {
    return function loadImg(src) {
      var dfd = new $.Deferred()
      if (cache[src]) {
        return dfd.resolve(cache[src])
      }

      var img = new Image()
      img.src = src
      if (!isSameOrigin(src)) {
        img.crossOrigin = 'anonymous'
      }

      img.onload = function() {
        dfd.resolve(img)
        cache[src] = img
      }
      return dfd.promise()
    }
  })({})

  function drawFrame(context) {
    context.save()
    context.fillStyle = '#eee'
    context.fillRect(0, 0, POSTER_WIDTH, POSTER_HEIGHT)
    context.restore()
  }

  // 分割线
  function drawSepetator(context) {
    context.save()
    context.strokeStyle = SEPERATOR_COLOR
    context.lineWidth = SEPERATOR_LINEWIDTH
    context.beginPath()
    var x1 = PADDING
    var x2 = POSTER_WIDTH - PADDING
    var y = POSTER_HEIGHT - BOTTOM_HEIGHT

    if (context.setLineDash) {
      context.setLineDash(SEPERATOR_DASH)
      context.moveTo(x1, y)
      context.lineTo(x2, y)
    } else {
      var x = x1
      while (x < x2) {
        context.moveTo(x, y)
        x += SEPERATOR_DASH[0]
        x = Math.min(x, x2)
        context.lineTo(x, y)
        x += SEPERATOR_DASH[1]
      }
    }
    context.stroke()

    context.restore()
  }

  var drawQRCode = (function(container) {
    return function drawQRCode(text) {
      container.qrcode({
        render: 'canvas',
        width: QRCODE_SIZE,
        height: QRCODE_SIZE,
        correctLevel: 1,
        foreground: '#333',
        text: text || window.loaction
      })

      var canvas = container.find('canvas')[0]
      container.empty()
      return canvas
    }
  })($('<div>'))

  function Poster(el, data, callback) {
    this.canvas = $(el).attr({
      width: POSTER_WIDTH,
      height: POSTER_HEIGHT
    })[0]
    this.data = data
    this.callback = callback || $.noop
    this.url = ''
    this.fileName = '海报-' + Date.now() + '.' + PICTURE_FORMAT

    this.fontFamily = getComputedStyle(this.canvas).fontFamily
  }

  Poster.prototype.setFontSize = function(fontSize) {
    this.context.font = fontSize + 'px/' + LINE_HEIGT + ' ' + this.fontFamily
  }

  Poster.prototype.render = function() {
    if (this.url) {
      return new $.Deferred().resolve()
    }

    var poster = this
    var canvas = this.canvas

    var context = (this.context = canvas.getContext('2d'))

    context.fillStyle = '#333'
    context.clearRect(0, 0, POSTER_WIDTH, POSTER_HEIGHT)
    //drawFrame(poster.context)
    //drawSepetator(poster.context)

    return $.when(poster.drawBg())
      .then(function() {
        poster.drawQrcode()
        poster.drawProduct()
      })
      .then(function() {
        return poster.toImage()
      })
      .then(function(img) {
        var canvas = $(poster.canvas)
        var el = $(img)
          .clone()
          .attr({
            class: canvas.attr('class')
          })
        canvas.replaceWith(el)
        return img
      })
  }

  // 背景
  Poster.prototype.drawBg = function() {
    if (!this.data.bg) {
      return
    }
    var context = this.context
    context.save()

    return loadImg(this.data.bg).then(function(bg) {
      var scale = Math.min(POSTER_WIDTH / bg.width, POSTER_HEIGHT / bg.height)

      scale = Math.min(scale, 1)
      var width = bg.width * scale
      var height = bg.height * scale

      context.drawImage(bg, 0, 0, width, height)
    })
  }

  // 二维码
  Poster.prototype.drawQrcode = function() {
    var x = 370
    var y = 760
    var qrcode = drawQRCode(this.data.app.qrcode)

    var context = this.context
    context.save()
    context.drawImage(qrcode, x, y, 90, 90)
    context.restore()

    var APP_NAME = {
      text: this.data.app.name,
      width: 180,
      lineHeight: LINE_HEIGT,
      size: 26,
      color: '#333',
      x: 150,
      y: 780
    }
    var NAME_Y = this.write(APP_NAME)

    var APP_TIP = {
      text: this.data.app.tip,
      width: 100,
      lineHeight: LINE_HEIGT,
      size: 24,
      color: '#999',
      x: 150,
      y: NAME_Y
    }
    this.write(APP_TIP)

    if (this.data.app.logo) {
      return loadImg(this.data.app.logo).then(function(logo) {
        context.drawImage(logo, 40, y, 90, 90)
      })
    }
  }

  // 产品信息
  Poster.prototype.drawProduct = function() {
    if (!this.data.product) {
      return
    }

    var context = this.context

    // 白色区域
    this.roundRect(PADDING, PADDING * 3 + 20, 420, 590, 10, '#fff')

    // 产品名称
    var COFIG_NAME = {
      text: this.data.product.name,
      width: POSTER_WIDTH - PADDING * 2 - 40,
      lineHeight: LINE_HEIGT,
      size: 30,
      color: '#333',
      x: PADDING + 20,
      y: PADDING * 3 + 60 + PRODUCT_IMG_SIZE
    }
    var NAME_Y = this.write(COFIG_NAME)

    // 产品描述
    var COFIG_DESC = {
      text: this.data.product.desc,
      width: POSTER_WIDTH - PADDING * 2 - 40,
      lineHeight: LINE_HEIGT,
      size: 24,
      color: '#666',
      x: PADDING + 20,
      y: NAME_Y
    }
    var DESC_Y = this.write(COFIG_DESC) + 20

    // 价格
    this.setFontSize(PRODUCT_PRICE_SIZE)
    var price = '¥' + this.data.product.price
    context.fillStyle = PRODUCT_PRICE_COLOR
    context.fillText(price, PADDING + 20, DESC_Y)
    context.restore()

    return loadImg(this.data.product.img).then(function(img) {
      var x = 250
      var y = 340
      var scale = Math.min(360 / img.width, 360 / img.height)
      scale = Math.min(scale, 1)
      var width = img.width * scale
      var height = img.height * scale

      context.drawImage(img, x - width / 2, y - height / 2, width, height)
    })
  }

  // 书写文字
  Poster.prototype.write = function(config) {
    var defaults = {
      text: '',
      width: 0,
      lineHeight: 1.5,
      size: 20,
      color: '#333',
      x: 0,
      y: 0
    }

    var options = $.extend(defaults, config)

    var context = this.context

    context.save()
    context.fillStyle = options.color
    this.setFontSize(options.size)
    context.textBaseline = 'top'

    var x = options.x
    var y = options.y
    var text = options.text
    var width = options.width
    var lines = []

    for (var i = 0; i < text.length && lines.length < 2; i++) {
      if (
        context.measureText(text.slice(0, i)).width > width ||
        i === text.length - 1
      ) {
        i = i === text.length - 1 ? text.length : i - 1
        lines.push(text.slice(0, i))
        text = text.slice(i)
        i = 0
      }
    }

    if (lines.join('').length < text.length) {
      lines[1] = lines[1].slice(0, -2) + '...'
    }

    $.each(lines, function(_, line) {
      context.fillText(line, x, y)
      y += options.size * options.lineHeight
    })
    context.restore()

    return y
  }

  Poster.prototype.toImage = function() {
    var dfd = new $.Deferred()
    var poster = this

    var canvas = this.canvas
    if (!isWechat && canvas.toBlob && URL) {
      canvas.toBlob(
        function(blob) {
          var file = new File([blob], poster.fileName, {
            type: PICTURE_MIME,
            lastModified: Date.now()
          })
          poster.url = URL.createObjectURL(file)
          tempFiles.push(poster.url)
          dfd.resolve(poster.url)
        },
        PICTURE_MIME,
        PICTURE_QUALITY
      )
    } else {
      poster.url = this.canvas.toDataURL(PICTURE_MIME, PICTURE_QUALITY)
      dfd.resolve(poster.url)
    }

    return dfd.promise().then(loadImg)
  }

  // 圆角
  Poster.prototype.roundRect = function(x, y, w, h, r, color) {
    var context = this.context

    context.save()
    context.beginPath()
    context.fillStyle = color
    //context.strokeStyle = 'red'
    // 左上角
    context.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

    // border-top
    context.moveTo(x + r, y)
    context.lineTo(x + w - r, y)
    context.lineTo(x + w, y + r)
    // 右上角
    context.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)

    // border-right
    context.lineTo(x + w, y + h - r)
    context.lineTo(x + w - r, y + h)
    // 右下角
    context.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)

    // border-bottom
    context.lineTo(x + r, y + h)
    context.lineTo(x, y + h - r)
    // 左下角
    context.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)

    // border-left
    context.lineTo(x, y + r)
    context.lineTo(x + r, y)

    // 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
    context.fill()
    // context.stroke()
    context.closePath()
    // 剪切
    context.clip()
    context.restore()
  }

  Poster.prototype.download = function() {
    var poster = this

    if (!this.url) {
      this.toImage(function() {
        download(poster.url, poster.fileName)
      })
    } else {
      download(poster.url, poster.fileName)
    }
  }

  if (URL) {
    $(window).on('beforeunload', function() {
      $.each(tempFiles, function(_, file) {
        URL.revokeObjectURL(file)
      })
    })
  }

  window.Poster = Poster
})()
