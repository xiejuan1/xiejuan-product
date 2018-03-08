require(["config"], function(){
	require(["jquery", "template", "load"], function($, template){
		$.getJSON("/project/mock/list.json", function(data){
			data = {list : data.res_body.data};
			let html = template("list_template", data);
			$($(".connect ul li")[0].children[1].children[0]).html(html);
			
			
			
		});
		
	$.getJSON("/project/mock/list1.json",function(data){
			data = {list : data.res_second.data};
			console.log(data);
			let htmls = template("list_template1", data);
			$($(".connect ul li")[1].children[1].children[0]).html(htmls);
	});
		
	$.getJSON("/project/mock/list2.json", function(data){
			data = {list : data.res_body.data};
			let html = template("list_t", data);
			$($(".connect ul li")[2].children[1].children[0]).html(html);
		
		});
		
		$("ul").on("click","li",function(){
			if($(this)[0]){
			$(".flower").css("display","none");	
			$($(this)[0].children[1]).css("display","block");
			
			}
			
		})
	});
});


