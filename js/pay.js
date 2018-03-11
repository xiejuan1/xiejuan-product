	
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
			let _parentId = $(".province").value;
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
					
	});
})
