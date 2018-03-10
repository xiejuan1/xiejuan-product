require(["config"], function(){
	require(["jquery", "template", "cookie","load"], function($,template,cookie){
	
	
	//显示数据库
	$.cookie.json = true;
	//读取cookie中保存的购物车数据
	let = _products = $.cookie("products")||[];
	console.log(_products);
	//判断是否有购物车商品
	if(_products.length ===0){
		$(".carts").hide();
		return;
	}else{
		$(".carts").show();
	}
	//渲染模板
	let rendData = { products : _products },
		html = template("cart_template", rendData);
	$(".cart_body").html(html);
	
	
	//将——products中的每个元素缓存到到行中
	$(".carts > .cart_body > div").each(function(index,element){
		//在当前遍历到的行中缓存到行中
		$(this).data("prod",_products[index]);
	});
	
	
	//删除商品，事件委派
	$(".carts").on("click",".del",function(){
		let _prod = $(this).parents(".box").data("prod");
		
		//查找其在——products数组中的索引
		
		let _index = $.inArray(_prod,_products);
		
		//从数组中删除元素
		_products.splice(_index,1);
		
		//从cookie中删除（覆盖保存——products到cookie中）
		$.cookie("products",_products,{expires:10,path:"/"});
		
		//从dom中删除
		$(this).parents(".box").remove();
		
		//计算合计
		calcTotal();
	});
	
	//数量+，-
	$(".carts").on("click",".add,.minus",function(){
		//找出所在行中的商品对象
		let _prod = $(this).parents(".box").data("prod");
		
			console.log($(this).parents(".box"));
		//数量+/-
		let _amount = Number(_prod.amount);
		if($(this).is(".add")){
			_amount++;
		}else{
			if(_amount <= 1)
			return;
			_amount--;
		}
		_prod.amount = _amount;
		
		//保存到cookie中
		$.cookie("products",_products,{expires:10,path:"/"});
		
		//页面渲染
		$(this).siblings(".amounts").val(_amount);
		$(this).parents(".box").children(".sub").text((_prod.price * _amount).toFixed(2));
		
		//计算合计
		calcTotal();
	});
	
	//输入数量修改
	$(".box").on("blur",".amounts",function(){
		console.log($(this).val());
	let _prod =$(this).parents(".box").data("prod");
	_prod.amount = $(this).val();
	
	//保存cookie
	$.cookie("products",_products,{expires:7,path:"/"});
		//页面渲染
		$(this).parents(".box").children(".sub").text((_prod.price * _prod.amount).toFixed(2));
		
		//计算合计
		calcTotal();
	});
	
	
	
	
	//全选
	$(".ck_all").click(function(){
		let status = $(this).prop("checked");
		
		//设置所有行前复选框选中状态与“全选一致”
		$(".ck_prod").prop("checked",status);
		
		//计算合计
		calcTotal();
	});
	
	//部分选中
	$(".carts").on("click", ".ck_prod", function(){
		$(".ck_all").prop("checked", $(".ck_prod:checked").length === _products.length)
		

		// 计算合计
		calcTotal();
		
	});
	
	
	$(".pay").click(function(){
		location = "/project/html/pay.html";
	})
	
	//计算合计金额
	function calcTotal(){
		let total = 0;
		$(".ck_prod:checked").each(function(){
			total += Number($(this).parents(".box").children(".sub").text())
		});
		
		$(".carts > .cart_foot > .total > .totalmoney").html(total +"￥");
	}
	
	
	});
});