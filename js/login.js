require(["config"],function(){
	require(["jquery","cookie"],function($,cookie){
	/* 用户登录 */
	$(".login_form").click(function(){
		//验证用户姓名和密码
		let _firstname = $(".text").val(),
			_password = $(".word").val();
$.post("/project/php/login.php",{"password":_password,"firstname":_firstname}, function(data){
			console.log(data.res_code);	
			if (data.res_code === 0) {
				// 保存登录成功的用户信息到 cookie 中
				$.cookie.json = true; // 自动调用JSON.stringify()、JSON.parse()来转换JS值与JSON字符串
				$.cookie("login", data.res_body, {path:"/"});
				alert("登录成功");
				location = "/project/index.html";
			} else {
				alert("用户名或密码有误");
			}
		}, "json");

		return false;
	});	

});
});
