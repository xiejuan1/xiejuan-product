require(["config"],function(){
	require(["jquery","template","load","cookie"],function(){
	/* 验证注册的邮箱是否被占用 */
	console.log($(".infos").text());
		let isExist = true;
		// 标记邮箱是否被占用，true--占用 false--未被占用
		$(".email_info").blur(function(){
			$.getJSON("/project/php/check.php",{email:$(this).val()},function(data){
				if(data.res_body.status == 0){
					isExist = false;
					$(".infos").text("邮箱可用");
				}else{
					isExist = true;
					$("infos").text("邮箱已被注册，请重新输入");
				}
			});
		});
		
		
	//提交用户注册表单
	$(".reg_form").submit(function(){
		console.log("hahahha");
		if(!isExist){
			$.ajax({
				type:"post",
				url:"/project/php/register.php",
				data:$(this).serialize(),
				dataType:"json",
				success:function(data){
				if(data.res_code ===0){
					//保存注册成功的用户到cookie中
				$.cookie.json = true;
				$.cookie("loginUser",data.res_body,{path:"/",expires:10});
					location="/project/index.html";
				}else{
					alert("用户注册失败，请稍后重试...");
				}
				}
			})
		}
		
		return false;
	})
		
		
		
		

		
	
	
	
	
	
	})
})