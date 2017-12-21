//type  warn error
function showError(type, text){
      console && console[type] && console[type]('fullPage: ' + text);
}

//匹配设备类型
var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/);
