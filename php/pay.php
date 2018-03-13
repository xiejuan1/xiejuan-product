<?php
	//获取保存的收货人姓名，电话，地址，省，城市
	$consignee = $_POST["consignee"];
	$phone = $_POST["phone"];
	$address = $_POST["address"];
	$postcode = $_POST["postcode"];
	$province = $_POST["province"];
	//连接服务器
	mysql_connect("localhost:3306","root","");
	
	//设置读取库编码
	mysql_query("set character set 'utf8' ");
	mysql_query("set names 'utf8'");
	
	//连接数据库
	mysql_select_db("h51710");
	
	//创建插入语句
	$sql = "INSERT INTO pay(consignee, postcode, address,phone,province) VALUES('$consignee', '$postcode', '$address', '$phone', '$province')";
	
	// 执行SQL语句，返回执行结果，true表示执行成功，false表示执行失败
	$result = mysql_query($sql);
	
	// 判断是否注册成功
	if($result){
		echo '{"res_code":0, "res_error":"", "res_body":'. json_encode($row) .'}';
		} else {
			echo '{"res_code":-1, "res_error":"保存失败", "res_body":{}}';
		     }
	//关闭数据库
	mysql_close();
?>