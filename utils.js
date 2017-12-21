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
