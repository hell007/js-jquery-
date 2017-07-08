var requirejs = {
    //baseUrl: "js",
	paths: {
	    "jquery": "../lib/jquery-2.1.4",
	    "underscore": "../lib/underscore",
	    "app": "../lib/app",
	    "imagesLoaded": "../lib/imagesloaded.pkgd"
	},
	shim: {
	    'underscore':{
			exports: '_'
		}
	}
};