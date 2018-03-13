	
require(["config"],function(){
	require(["jquery","template","cookie","load"],function($,template,cookie,load){
		
		//加载省份
		function loadProvince() {	
		_url = "http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&level=1&page=2";
	$.ajax({
		type:"get",
		url:_url,
		dataType:"json",
		success:function(data){
		let html = "<option value='-1'>请选择省份</option>";
			
			$(data.showapi_res_body.data).each(function(curr){
		html += `<option value="${this.id}">${this.areaName}</option>`;
			
			});
			
		 let url = "http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&level=1&page=2";
		$.ajax({
			type:"get",
			url:url,
			success:function(data){
			$(data.showapi_res_body.data).each(function(){
		     html += `<option value="${this.id}">${this.areaName}</option>`;
				
			});
			$(".province").html(html);
				//loadCity();
			
			}
		});
		
		}
	});
	
	}
	
	
	// 加载城市
		function loadCity() {
			let _parentId = $(".province").val();
			console.log(_parentId);
			if (_parentId == -1)
				return;
	let _url = "http://route.showapi.com/1149-2?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&parentId=" + _parentId;
		$.ajax({
			type:"get",
			url:_url,
			dataType:"json",
			success:function(data){
			var html = "<option value='-1'>请选择城市</option>";
			$(data.showapi_res_body.data).each(function(){
			html += `<option value="${this.id}">${this.areaName}</option>`;
				
			});
			$(".city").html(html);
			
			}
		});
		
		}

		loadProvince();
	
	// 省份选择发生改变时，加载城市
		$(".province").change(loadCity);
	
	
	//配送方式
	$(".ziqu").on("click","#checked",function(){
		$(".top").css("display","none");
		$(".bottom").css("display","block");
	})
	
	$(".h30").on("click","#check",function(){
		$(".top").css("display","block");
		$(".bottom").css("display","none");
	})
	$(".p").click(function(){
		$(".top").css("display","block");
		$(".bottom").css("display","none");
	});
	
	let isExist = true;
	//验证收货人信息
	$(".user").blur(function(){
		let reg = /^[\u4e00-\u9fa5]{0,}$/;
		if(!reg.test($(".user").val())){
			isExist = false;
			$(".userinfo").text("请输入正确的用户信息");
		}else{
			$(".userinfo").text(" ");
			isExist = true;
		}
	});
	//验证电话号码
	$(".userphone").blur(function(){
		console.log($(".phoneinfo")[0]);
		let reg =/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
		if(!reg.test($(".userphone").val())){
			isExist = false;
			$(".phoneinfo").text("请输入正确的电话格式");
		}else{
			$(".phoneinfo").text(" ");
			isExist = true;
		}
	});
	
	console.log($(".user").val());
	//保存收货人信息
	$(".save").click(function(){
		if($(".user").val()==""){
			alert("请填写完整信息");
			isExist = false;
		}
		if(isExist){
		let _consignee = $(".user").val(),
			_phone = $(".userphone").val(),
			_postcode = $(".postcoded").val(),
			_province = $(".province").val(),
			_address = $(".add").val();
		
	$.post("/project/php/pay.php",{"consignee":_consignee,"province":_province,"postcode":_postcode,"phone":_phone,"address":_address},function(data){
			
			let queryString =[{"consignee":_consignee,"province":_province,"postcode":_postcode,"phone":_phone,"address":_address}];
			//保存登录成功的信息到cookie中
			$.cookie.json = true;
			$.cookie("consignee",queryString,{path:"/"}); 
			alert("保存成功");
		
	},"json");
	}else{
			
			alert("收货人信息保存失败，请稍后重试...");
		}
	
	});
	
	let isit = true;
	//验证电话号码
	$(".tel").blur(function(){
	
		let reg =/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
		if(!reg.test($(".tel").val())){
			isit = false;
			$(".info").text("请输入正确的电话格式");
		}else{
			$(".info").text(" ");
			
		}
	});
	//select改变对应的地址改变
	$("#select").change(function(){
	let value = $("#select :selected").val();
	console.log(value);
	if(value == "北京"){
		$(".box").css("display","block");
		$(".box1").css("display","none");
		$(".box2").css("display","none");
		$(".box3").css("display","none");
		$(".box4").css("display","none");
		$(".box5").css("display","none");
		$(".box6").css("display","none");
		$(".box7").css("display","none");
		$(".box8").css("display","none");
		$(".box9").css("display","none");
		$(".box10").css("display","none");	
	}
	if(value == "天津"){
		$(".box").css("display","none");
		$(".box1").css("display","block");
		$(".box2").css("display","none");
		$(".box3").css("display","none");
		$(".box4").css("display","none");
		$(".box5").css("display","none");
		$(".box6").css("display","none");
		$(".box7").css("display","none");
		$(".box8").css("display","none");
		$(".box9").css("display","none");
		$(".box10").css("display","none");	
	}
	if(value == "上海"){
		$(".box").css("display","none");
		$(".box1").css("display","none");
		$(".box2").css("display","block");
		$(".box3").css("display","none");
		$(".box4").css("display","none");
		$(".box5").css("display","none");
		$(".box6").css("display","none");
		$(".box7").css("display","none");
		$(".box8").css("display","none");
		$(".box9").css("display","none");
		$(".box10").css("display","none");	
	}
	if(value == "重庆"){
		$(".box").css("display","none");
		$(".box1").css("display","none");
		$(".box2").css("display","none");
		$(".box3").css("display","block");
		$(".box4").css("display","none");
		$(".box5").css("display","none");
		$(".box6").css("display","none");
		$(".box7").css("display","none");
		$(".box8").css("display","none");
		$(".box9").css("display","none");
		$(".box10").css("display","none");	
	}
	if(value == "河北省"){
		$(".box").css("display","none");
		$(".box1").css("display","none");
		$(".box2").css("display","none");
		$(".box3").css("display","none");
		$(".box4").css("display","block");
		$(".box5").css("display","none");
		$(".box6").css("display","none");
		$(".box7").css("display","none");
		$(".box8").css("display","none");
		$(".box9").css("display","none");
		$(".box10").css("display","none");	
	}
	if(value == "山西省"){
		$(".box").css("display","none");
		$(".box1").css("display","none");
		$(".box2").css("display","none");
		$(".box3").css("display","none");
		$(".box4").css("display","none");
		$(".box5").css("display","block");
		$(".box6").css("display","none");
		$(".box7").css("display","none");
		$(".box8").css("display","none");
		$(".box9").css("display","none");
		$(".box10").css("display","none");	
	}
	if(value == "辽宁省"){
		$(".box").css("display","none");
		$(".box1").css("display","none");
		$(".box2").css("display","none");
		$(".box3").css("display","none");
		$(".box4").css("display","none");
		$(".box5").css("display","none");
		$(".box6").css("display","block");
		$(".box7").css("display","none");
		$(".box8").css("display","none");
		$(".box9").css("display","none");
		$(".box10").css("display","none");	
	}
	if(value == "江苏省"){
		$(".box").css("display","none");
		$(".box1").css("display","none");
		$(".box2").css("display","none");
		$(".box3").css("display","none");
		$(".box4").css("display","none");
		$(".box5").css("display","none");
		$(".box6").css("display","none");
		$(".box7").css("display","block");
		$(".box8").css("display","none");
		$(".box9").css("display","none");
		$(".box10").css("display","none");	
	}
	if(value == "浙江省"){
		$(".box").css("display","none");
		$(".box1").css("display","none");
		$(".box2").css("display","none");
		$(".box3").css("display","none");
		$(".box4").css("display","none");
		$(".box5").css("display","none");
		$(".box6").css("display","none");
		$(".box7").css("display","none");
		$(".box8").css("display","block");
		$(".box9").css("display","none");
		$(".box10").css("display","none");	
	}
	if(value == "安徽省"){
		$(".box").css("display","none");
		$(".box1").css("display","none");
		$(".box2").css("display","none");
		$(".box3").css("display","none");
		$(".box4").css("display","none");
		$(".box5").css("display","none");
		$(".box6").css("display","none");
		$(".box7").css("display","none");
		$(".box8").css("display","none");
		$(".box9").css("display","block");
		$(".box10").css("display","none");	
	}
	if(value == "福建省"){
		$(".box").css("display","none");
		$(".box1").css("display","none");
		$(".box2").css("display","none");
		$(".box3").css("display","none");
		$(".box4").css("display","none");
		$(".box5").css("display","none");
		$(".box6").css("display","none");
		$(".box7").css("display","none");
		$(".box8").css("display","none");
		$(".box9").css("display","none");
		$(".box10").css("display","block");	
	}
	
	
	
	});
	
	
	$(".ti").on("click","button",function(){
		if(!isExist){
			alert("请补充完整信息");
		}else{
			alert("提交成功");
		}
	})
	
	
	
	});
})
