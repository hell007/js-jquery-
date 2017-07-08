/**
 *jquery插件的使用 
 */
define( [
  'jquery',
  'imagesLoaded'
  //'path/to/imagesloaded.pkgd.js',
], function( $, imagesLoaded ) {
  // provide jQuery argument
	return {
  		init: function(){
			imagesLoaded.makeJQueryPlugin( $ );
		  	// now use .imagesLoaded() jQuery plugin
		  	$('#container').imagesLoaded()
			  .always( function( instance ) {
			    console.log('all images loaded');
			  })
			  .done( function( instance ) {
			    console.log('all images successfully loaded');
			  })
			  .fail( function() {
			    console.log('all images loaded, at least one is broken');
			  })
			  .progress( function( instance, image ) {
			    var result = image.isLoaded ? 'loaded' : 'broken';
			    console.log( 'image is ' + result + ' for ' + image.img.src );
			  });
		}
	}
});