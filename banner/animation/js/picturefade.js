;(function(window) {
 'use strict'

  var _ = window.store || (window.store = {})
  var $ = window.jQuery

  // fade for picture
  function picturefade(id){
    var index = 0,picTimer,
			$picList = $(id).find('ul'),
			$bannerDot = $(id).find('.store-banner-dot');

		var length = $picList.find('li').length;

		for(var i=0; i < length; i++ ) {
      $bannerDot.append('<span></span>');
   	}

		$bannerDot.children('span').eq(0).addClass('on');
		
		$(id).hover(function() {
			clearInterval(picTimer);
		},function() {
			picTimer = setInterval(function() {
				index++;
        move();
			},5000); 
		}).trigger('mouseleave');

		$bannerDot.children().on('mouseenter',function(){
      var i=$(this).index();
      $picList.children().eq(i).fadeIn('slow').siblings().fadeOut('slow');
      $bannerDot.children().eq(i).addClass('on').siblings().removeClass('on');
  	});
		
		function move(){
      if (index == length){
        index = 0;
      }
      $picList.children().eq(index).fadeIn('slow').siblings().fadeOut('slow');
      $bannerDot.children().eq(index).addClass('on').siblings().removeClass('on');
  	}
  }

  // extend
  $.extend(_, {
    picturefade: picturefade
  })

})(this.self)

