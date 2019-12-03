;(function() {
  'use strict'

  var POSTER_WIDTH = 500
  var POSTER_HEIGHT = 900
  var BOTTOM_HEIGHT = 260
  var PADDING = 50
  var LINE_HEIGT = 1.5
  var QRCODE_SIZE = 140
  var QRCODE_TIP_COLOR = '#999'
  var QRCODE_TIP_SIZE = 22
  var QRCODE_TIP_MARGIN = 20
  var PRODUCT_IMG_SIZE = 400
  var PRODUCT_PRICE_COLOR = '#fd5656'
  var PRODUCT_PRICE_SIZE = 36
  var PRODUCT_IMG_BORDER = '#ddd'
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
    context.fillStyle = '#fff'
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
    drawFrame(poster.context)
    drawSepetator(poster.context)

    return $.when(
      poster.drawQrcode(),
      poster.drawProduct(),
      poster.drawCustomImg()
    )
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

  Poster.prototype.drawQrcode = function() {
    var x = POSTER_WIDTH / 2
    var y = POSTER_HEIGHT - BOTTOM_HEIGHT + PADDING + QRCODE_SIZE / 2
    var qrcode = drawQRCode(this.data.app.qrcode)

    var context = this.context
    context.save()

    context.drawImage(
      qrcode,
      x - QRCODE_SIZE / 2,
      y - QRCODE_SIZE / 2,
      QRCODE_SIZE,
      QRCODE_SIZE
    )

    this.setFontSize(QRCODE_TIP_SIZE)
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillStyle = QRCODE_TIP_COLOR
    context.fillText(
      this.data.app.tip,
      x,
      y +
        QRCODE_SIZE / 2 +
        QRCODE_TIP_MARGIN +
        (QRCODE_TIP_SIZE * LINE_HEIGT) / 2
    )
    context.restore()

    if (this.data.app.logo) {
      return loadImg(this.data.app.logo).then(function(logo) {
        context.drawImage(
          logo,
          x - LOGO_SIZE / 2,
          y - LOGO_SIZE / 2,
          LOGO_SIZE,
          LOGO_SIZE
        )
      })
    }
  }

  Poster.prototype.drawCustomImg = function() {
    if (!this.data.img) {
      return
    }
    var context = this.context

    return loadImg(this.data.img).then(function(img) {
      var x = POSTER_WIDTH / 2
      var y = (POSTER_HEIGHT - BOTTOM_HEIGHT) / 2
      var maxWidth = POSTER_WIDTH - PADDING * 2
      var maxHeight = POSTER_HEIGHT - BOTTOM_HEIGHT - PADDING * 2
      var scale = Math.min(maxWidth / img.width, maxHeight / img.height)

      scale = Math.min(scale, 1)
      var width = img.width * scale
      var height = img.height * scale

      context.drawImage(img, x - width / 2, y - height / 2, width, height)
    })
  }

  Poster.prototype.drawProduct = function() {
    if (!this.data.product) {
      return
    }

    var context = this.context
    context.save()
    context.fillStyle = '#333'
    this.setFontSize(24)
    context.textBaseline = 'top'

    var x
    var y

    y = PADDING + 20 + PRODUCT_IMG_SIZE

    var text = this.data.product.name
    var width = POSTER_WIDTH - PADDING * 2
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

    if (lines.join('').length < this.data.product.name.length) {
      lines[1] = lines[1].slice(0, -2) + '...'
    }

    $.each(lines, function(_, line) {
      context.fillText(line, PADDING, y)
      y += 24 * LINE_HEIGT
    })

    this.setFontSize(PRODUCT_PRICE_SIZE)
    y =
      PADDING +
      20 +
      PRODUCT_IMG_SIZE +
      24 * LINE_HEIGT * 2 +
      PRODUCT_PRICE_SIZE * LINE_HEIGT
    context.textBaseline = 'bottom'
    var price = '¥' + this.data.product.price
    context.fillStyle = PRODUCT_PRICE_COLOR
    context.fillText(price, PADDING, y)

    x = context.measureText(price).width + PADDING + 20
    this.setFontSize(PRODUCT_MPRICE_SIZE)
    var mPrice = '¥' + this.data.product.marketPrice
    context.fillStyle = context.strokeStyle = PRODUCT_MPRICE_COLOR
    context.fillText(mPrice, x, y)

    y -= PRODUCT_MPRICE_SIZE / 2 + 4
    context.beginPath()
    context.moveTo(x - 5, y)
    context.lineTo(x + context.measureText(mPrice).width + 5, y)
    context.stroke()

    context.restore()

    context.save()
    context.strokeStyle = PRODUCT_IMG_BORDER
    context.strokeRect(PADDING, PADDING, PRODUCT_IMG_SIZE, PRODUCT_IMG_SIZE)
    context.restore()

    return loadImg(this.data.product.img).then(function(img) {
      var x = PADDING + PRODUCT_IMG_SIZE / 2
      var y = PADDING + PRODUCT_IMG_SIZE / 2
      var scale = Math.min(
        PRODUCT_IMG_SIZE / img.width,
        PRODUCT_IMG_SIZE / img.height
      )
      scale = Math.min(scale, 1)
      var width = img.width * scale
      var height = img.height * scale

      context.drawImage(img, x - width / 2, y - height / 2, width, height)
    })
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
