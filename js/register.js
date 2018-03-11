require(["config"],function(){
	require(["jquery","cookie"],function($,cookie){
	/* 验证注册的邮箱是否被占用 */

		let isExist = true;
		// 标记邮箱是否被占用，true--占用 false--未被占用
		$(".email_info").blur(function(){
			$.getJSON("/project/php/check.php",{email:$(this).val()},function(data){
				console.log(data);
				if(data.res_body.status == 0){
					isExist = false;
					$(".infos").text("邮箱可用");
				}else{
					isExist = true;
					$("infos").text("邮箱已被注册，请重新输入");
				}
			});
		});
		

		
		$(".reg_form").click(function(){
			
		
	//提交用户注册表单
	let _username=$(".username").val(),
		_email=$(".email_info").val(),
		_password =$(".word").val();
	$.post("/project/php/register.php",
	{
		"email":_email,"password":_password,"firstname":_username
	},function(data){
		
		if(!isExist){
					
				if(data.res_code == 0){
					//保存注册成功的用户到cookie中
				$.cookie.json = true;
				$.cookie("loginUser",data.res_body,{path:"/",expires:10});

					location="/project/index.html";
				}else{
					alert("用户注册失败，请稍后重试...");
				}
				}
			},"json");
		
	
	});	
		
//产生随机数
function random(lower, upper) {
	return Math.floor(Math.random() * (upper - lower)) + lower;
}
		
	
	
	
	//验证码封装
	function generateValidateCode(length) {
	// 判断是否传递参数
	if (typeof length === "undefined")
		length = 4;
	// 定义变量保存生成后的验证码字符串
	let code = "";
	// 循环生成验证码
	while (code.length < length) {
		// 在字母数字编码范围内生成随机数
		let rand = random(48, 123);
		if (rand >= 48 && rand <= 57
			|| rand >= 65 && rand <= 90
			|| rand >= 97 && rand <= 122) {
			code += String.fromCharCode(rand)
		}
	}
	// 返回生成后的验证码字符串
	return code;
}
	$(".codes").text(generateValidateCode());
	
	$(".next").click(function(){

	$(".codes").text(generateValidateCode());
		
	})
	//验证验证码是否有误
	$(".usercode").blur(function(){
		if($(this).val().toUpperCase()!==$(".codes").text().toUpperCase()){
			$(".co").text("验证码有误") ;	
		}
	});
	
	
	
	
	
	
	})
})