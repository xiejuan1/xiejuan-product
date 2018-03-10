
		
require(["config"],function(){
	require(["jquery","template","cookie","load"],function($,template,cookie){
		
	// 加载省份
		function loadProvince() {
			var _url = "http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&level=1";
			$.ajax({
				type : "get",
				url : _url,
				dataType : "json",
				success : function(data){
					var html = "<option value='-1'>请选择省份</option>";
					$(data.showapi_res_body.data).each(function(province){
						html += `<option value="${province.id}">${province.areaName}</option>`;
					});
					_url = "http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&level=1&page=2";
					$.ajax({
						type : "get",
						url : _url,
						dataType : "json",
						success : function(data){
							$(data.showapi_res_body.data).each(function(province){
								html += `<option value="${province.id}">${province.areaName}</option>`;
							});
							$(".province").innerHTML = html;

							loadCity();
						}
					});
				}
			});
		}

		// Promise 对象

		// 加载城市
		function loadCity() {
			var _parentId = $(".province").value;
			if (_parentId == -1)
				return;
			var _url = "http://route.showapi.com/1149-2?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&parentId=" + _parentId;
			$.ajax({
				url : _url,
				dataType : "json",
				success : function(data){
					var html = "<option value='-1'>请选择城市</option>";
					$(data.showapi_res_body.data).each(function(city){
						html += `<option value="${city.id}">${city.areaName}</option>`;
					});
					$(".city").innerHTML = html;
				}
			});
		}

		loadProvince();
		// 省份选择发生改变时，加载城市
		$(".province").change = loadCity;
	})
})
