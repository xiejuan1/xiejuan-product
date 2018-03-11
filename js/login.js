require(["config"],function(){
	require(["jquery","cookie"],function($,cookie){
	/* 用户登录 */
	$(".login_form").click(function(){
		$.post("/project/php/login.php", $(this).serialize(), function(data){
			console.log(data);
			if (data.res_code === 0) {
				// 保存登录成功的用户信息到 cookie 中
				$.cookie.json = true; // 自动调用JSON.stringify()、JSON.parse()来转换JS值与JSON字符串
				$.cookie("loginUser", data.res_body, {path:"/"});
				location = "/project/index.html";
			} else {
				alert("用户名或密码有误");
			}
		}, "json");

		return false;
	});	

});
});
