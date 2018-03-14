require(["config"], function(){
	require(["jquery", "template", "load","cookie"], function($, template){
		
		
		//获取list.json中的数据，渲染页面
		$.getJSON("/project/mock/list.json", function(data){	
			data = {list : data.res_body.data};
			let html = template("list_template", data);
			$($(".connect ul li")[0].children[1].children[0]).html(html);
			
			
			
		});
		//获取list1.json中的数据，渲染页面
		
	$.getJSON("/project/mock/list1.json",function(data){
			data = {list : data.res_second.data};
			console.log(data);
			let htmls = template("list_template1", data);
			$($(".connect ul li")[1].children[1].children[0]).html(htmls);
	});
		//获取list2.json中的数据，渲染页面
		
	$.getJSON("/project/mock/list2.json", function(data){
			data = {list : data.res_body.data};
			let htmles = template("list_t", data);
			$($(".connect ul li")[2].children[1].children[0]).html(htmles);
		
		});
		
		//获取list.json中的数据，渲染页面
		
	$.getJSON("/project/mock/list.json", function(data){
			data = {list : data.res_body.data};
			let html = template("list_t", data);
			$($(".connect ul li")[3].children[1].children[0]).html(html);
		
		});	
		
		//通过事件委派 ，点击li更换数据
		
		$("ul").on("click","li",function(){
			if($(this)[0]){
			$(".flower").css("display","none");	
			$($(this)[0].children[1]).css("display","block");
			
			}
			
		});
		
		
		
		
	
		
	require(["jquery","template","cookie"],function($,template,cookie){
	
		//通过点击//加入购物车，保存到cookie里；
		
		$(".prod").on("click",".add_cart",function(){
			//当前选购商品对象
		if($.cookie("login")==null){
			alert("请先登录用户信息。。。。")
			location ="/project/html/login.html";
			return;
		}
		let product = {
			pid:$(this).siblings(".id").text(),
			title:$(this).siblings(".title").text(),
			price:$(this).siblings(".price").text(),
			img:$(this).siblings(".img").find("img").attr("src"),
			amount:1
		};

	
		//cookie
		$.cookie.json = true;
		//先查找cookie中是否已有保存购物车
		let _products = $.cookie("products")||[],
			index = exist(product.pid,_products);
		if(index === -1){
			//新添加商品
			_products.push(product);
		}else{
			_products[index].amount++;
		}
		
		//重新保存到cookie中
		$.cookie("products",_products,{expires:10,path:"/"});
		alert("加入成功");
		
		
		//显示选购的所有商品总价
		let sum = 0;
		$.each(_products, function(index,element) {
			sum += Number(this.price);
		});
		$(".head .cart a span").css("background","#e7e7e7");
		$(".head .cart a span").text("("+sum+")");
		
		return false;
		});
		
		//查找指定id商品在数组中的下标
		function exist(id,product){
			for(let i = 0,len=product.length;i < len;i++){
				if(product[i].pid ===id)
					return i;
			}
			return -1;
		}
	});
	
	
	});
});


