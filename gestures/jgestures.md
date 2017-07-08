# jGestures简介

jGestures插件允许你如同原生的jQuery事件一样监听以下事件：'pinch'(缩放手势), 'rotate'(旋转手势), 'swipe'(滑动手势), 'tap'(轻触) 以及 'orientationchange'(改变设备方向)。当然，部分事件在PC浏览器上可以通过转换实现。比如 "tapone" 事件可以被 "clicking"事件触发,鼠标手势也可以产生"swipe"事件。

使用示例
$('#swipe').bind('swipeone',function(){...});

事件列表

orientationchange
代表设备顺时针或者逆时针旋转.此事件可以被设备触发,可能使用的是重力传感器.

pinch
缩放手势(两个手指在屏幕上的相对运动)

rotate
旋转手势(两个手指顺时针或者逆时针旋转)

swipemove
在正在滑动时触发(在设备屏幕上移动手指,比如:拖动)

swipeone
单点滑动手势,滑动完成后触发(一个手指在屏幕上移动)

swipetwo
两点滑动(两个手指在屏幕上方向一致的滑动)

swipethree
三点滑动(三个手指在屏幕上方向一致的滑动)

swipefour
四点滑动(四个手指在屏幕上方向一致的滑动)

swipeup
向上滑动,在严格的向上滑动手势完成后触发

swiperightup
向右上角滑动,在向右且向上的滑动手势完成后触发

swiperight
向右滑动,在严格的向右滑动手势完成后触发

swiperightdown
向右下角滑动,在向右且向下的滑动手势完成后触发

swipedown
向下滑动,在严格的向下滑动手势完成后触发

swipeleftdown
向左下角滑动,在向左且向下的滑动手势完成后触发

swipeleft
向左滑动,在严格的向左滑动手势完成后触发

swipeleftup
向左上角滑动,在向左且向上的滑动手势完成后触发

tapone
在单个手指轻点的手势后触发

taptwo
在两个手指一起轻点的手势后触发

tapthree
在三个手指一起轻点的手势后触发

pinchopen
撑开手势,当两个手指撑大并离开设备时触发.

pinchclose
捏紧手势,当两个手指捏紧并离开设备时触发.

rotatecw
两个手指顺时针旋转并且离开屏幕时触发(two fingers rotating clockwise)

rotateccw
两个手指逆时针旋转并且离开屏幕时触发 (two fingers rotating counterclockwise)

shake
当检测到设备正在摇晃时触发

shakefrontback
当检测到摇晃动作，且可以被解读为前后移动之时触发.

shakeleftright
当检测到摇晃动作，且可以被解读为左右移动之时触发.

shakeupdown
当检测到摇晃动作，且可以被解读为上下移动之时触发
