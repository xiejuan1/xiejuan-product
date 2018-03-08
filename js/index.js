require(["config"], function(){
	require(["jquery", "template", "load"], function($, template){
		
		$(".content").on("click","div",function(){
			location="/project/html/list.html";
		})
		
	});
});