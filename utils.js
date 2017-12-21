//type  warn error
function showError(type, text){
      console && console[type] && console[type]('fullPage: ' + text);
}

//匹配设备类型
var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/);

showError('info',isTouchDevice);

console.log('isTouchDevice==',isTouchDevice)

console.log('0==',JSON.parse(JSON.stringify(isTouchDevice))[0])

console.log('1==',JSON.parse(JSON.stringify(isTouchDevice))[1])

console.log('index==',isTouchDevice.index)

console.log('input==',isTouchDevice.input)


function support3d() {
      var el = document.createElement('p'),
          has3d,
          transforms = {
              'webkitTransform':'-webkit-transform',
              'OTransform':'-o-transform',
              'msTransform':'-ms-transform',
              'MozTransform':'-moz-transform',
              'transform':'transform'
          };

      // Add it to the body to get the computed style.
      document.body.insertBefore(el, null);

      for (var t in transforms) {
          if (el.style[t] !== undefined) {
              el.style[t] = 'translate3d(1px,1px,1px)';
              has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
          }
      }

      document.body.removeChild(el);

      return (has3d !== undefined && has3d.length > 0 && has3d !== 'none');
  }
