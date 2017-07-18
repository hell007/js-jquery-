var requirejs = {
    //baseUrl: "js",
	paths: {
	    "jquery": "../lib/jquery-2.1.4",
	    "art-template": "../lib/template-web",
	    "juicer": "../lib/juicer-min",
	    "underscore": "../lib/underscore",
	    "app": "../lib/app",
	    "utils": "../lib/utils",
	    "imagesLoaded": "../lib/imagesloaded.pkgd"
	},
	shim: {
	    'underscore':{
			exports: '_'
		},
		'juicer':{
			exports: 'juicer'
		}
	}
};
