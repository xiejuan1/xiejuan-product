define(["jquery", "cookie"], function() {
	$("header").load("/project/html/include/header.html", function(){
		
		/* 查询是否有登录用户 */
		let user = $.cookie("login");
		if (user)
			$(".login_reg").html(`<a href="${user}"></a>`);
			
	
	});
	
	$("footer").load("/project/html/include/footer.html");
});