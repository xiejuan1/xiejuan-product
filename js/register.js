require(["config"],function(){
	require(["jquery","cookie"],function($,cookie){
	/* 验证注册的邮箱是否被占用 */

		let isExist = true;
		
		// 标记邮箱是否被占用，true--占用 false--未被占用
		$(".email_info").blur(function(){
				var reg =/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
			
			$.getJSON("/project/php/check.php",{"email":$(this).val()},function(data){

				if(data.res_body.status == 0 && reg.test($(".email_info").val())){
					isExist = false;
					$(".infos").text("邮箱可用");
				}else if(data.res_body.status == 1){
					isExist = true;
					$("infos").text("邮箱已被注册，请重新输入");
				}
			});
		});
		


//验证密码格式

$(".word").blur(function(){
	let _reg=/^.{6,16}$/;
let _word = $(".word").val();

if(!_reg.test(_word)){
	console.log($(".pa").val());
	$(".pa").text("密码至少为6位至多为16位");
	isExist = true;
}else{
	$(".pa").text("密码格式正确");
	
	isExist = false;
	
}
	
})




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
		if($(this).val().toUpperCase()==$(".codes").text().toUpperCase()){
			isExist = false;
			$(".co").text("验证成功") ;	
		}else{
			isExist = true;
			
			$(".co").text("验证码有误") ;	
			
		}
	});
	


		$(".reg_form").click(function(){
	
	//提交用户注册表单
	let _username=$(".username").val(),
		_email=$(".email_info").val(),
		_password =$(".word").val();
		
	if(!isExist){	
	$.post("/project/php/register.php",
	{
		"email":_email,"password":_password,"firstname":_username
	},function(data){
		console.log(data);
				$.cookie.json = true; // 自动调用JSON.stringify()、JSON.parse()来转换JS值与JSON字符串
				$.cookie("login", data.res_body, {path:"/"});
				alert("注册成功")
				location="/project/index.html";
				
			},"json");
		}else{
			
			alert("用户注册失败，请稍后重试...");
		}
	
	});	





	
	})
})