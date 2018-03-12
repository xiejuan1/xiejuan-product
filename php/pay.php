<?php
	//获取保存的收货人姓名，电话，地址，省，城市
	$consignee = $_POST["consignee"];
	$phone = $POST["phone"];
	$address = $POST["address"];
	
	//连接服务器
	mysql_connect("localhost:3306","root","");
	
	//设置读取库编码
	mysql_query("set character set 'utf8' ");
	mysql_query("set names 'utf8'");
	
	//连接数据库
	mysql_select_db("h51710");
	
	//创建插入语句
	$sql = "INSERT INTO pay(consignee, phone, address) VALUES('$consignee', '$phone', '$address')";
	
	// 执行SQL语句，返回执行结果，true表示执行成功，false表示执行失败
			$result = mysql_query($sql);
	
	// 判断是否注册成功
	if ($result) {
		$sql = "SELECT  id,consignee, phone, address,province, postcode, createtime FROM pay WHERE consignee='$consignee'";
		$result = mysql_query($sql);
		if ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
			echo '{"res_code":0, "res_error":"", "res_body":'. json_encode($row) .'}';
		} else {
			echo '{"res_code":-1, "res_error":"注册收货人信息查询失败", "res_body":{}}';
		}
	} 

	//关闭数据库
	mysql_close();
?>