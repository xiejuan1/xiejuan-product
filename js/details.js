require(["config"], function(){
	require(["jquery", "template", "load"], function($, template){
		//通过事件委派 ，点击li更换图片
		$(".small").on("click","li",function(){
			
		$(".top1").css("display","none");
		$($(this)[0].children[1]).css("display","block");
		$(".small li").css({
			"border":"1px solid #dfdfdf"
		});
		$(this).css({
			"border":"3px solid #dfdfdf"
			
		});
	
		});
		
	//点击+.-修改数量
	$(".amount").on("click",".minus,.add",function(){
		let _amount = $(".amounts").val();
		if($(this).is(".add")){
			_amount++;
		}else{
			if(_amount <=1)
			return;
			_amount--;
		}
		
		$(this).siblings(".amounts").val(_amount);
		let a = $(".price span").text(); 
		console.log(a);
		$(".price span").text((a*_amount).toFixed(2));
		
		
	});
	
	//通过点击加入购物车，保存到cookie
	$(".flower").on("click",".add_cart",function(){
		//先确认是否有用户登录信息
	if($.cookie("login")==null){
				alert("请先登录用户信息。。。。")
				location ="/project/html/login.html";
				return;
			}		
		
		
		
		let product = {
			pid:$(".id").text(),
			title:$("h4").text(),
			price:$(".price span").text(),
			img:$(".top1 img").attr("src"),
			amount:$(".amount").find(".amounts").val()
		};
		
		//cookie
		$.cookie.json = true;
		//先查找cookie中是否已经保存到购物车
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
		
	})
		
		//查找指定id商品在数组中的下标
		function exist(id,product){
			for(let i = 0,len=product.length;i < len;i++){
				if(product[i].pid ===id)
					return i;
			}
			return -1;
		};
		
		
	});
});