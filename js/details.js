require(["config"], function(){
	require(["jquery", "template", "load"], function($, template){
		//通过事件委派 ，点击li更换图片
		$(".small").on("click","li",function(){
			
		$(".top1").css("display","none");
		$($(this)[0].children[1]).css("display","block");
		$(".small li").css({
			"border":"1px solid #dfdfdf"
		});
		$(this).css({
			"border":"3px solid #dfdfdf"
			
		});
	
		});
		
	//点击+.-修改数量
	$(".amount").on("click",function(){
		
	})
		
		
	});
});