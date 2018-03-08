require.config({
	baseUrl : "/",
	paths : {
		jquery : "/project/lib/jquery/jquery-1.12.4.min",
		cookie : "/project/lib/jquery_plugins/jquery.cookie",
		zoom : "/project/lib/jquery_plugins/jquery.elevateZoom-3.0.8.min",
		carousel : "/project/lib/jquery_plugins/jquery.xmcarousel",
		template : "/project/lib/artTemplate/template",
		load : "/project/js/loadHeaderFooter"
	},
	shim : {
		carousel : {
			deps : ["jquery"]
		},
		zoom : {
			deps : ["jquery"]
		}
	}
});