<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>客户信息管理</title>
	<#include "../common.ftl">
</head>
<body class="childrenBody">

<form class="layui-form" >
	<blockquote class="layui-elem-quote quoteBox">
		<form class="layui-form">
			<div class="layui-inline">
				<div class="layui-input-inline">
					<input type="text" name="customerName" class="layui-input searchVal" placeholder="客户名" />
				</div>
				<div class="layui-input-inline">
					<input type="text" name="customerNo" class="layui-input searchVal" placeholder="客户编号" />
				</div>
				<div class="layui-input-inline">
					<select name="level" id="level"></select>
				</div>
				<a class="layui-btn search_btn" data-type="reload"><i class="layui-icon">&#xe615;</i>搜索</a>
			</div>
		</form>
	</blockquote>

	<table id="customerList" class="layui-table"  lay-filter="customers"></table>

	<script type="text/html" id="toolbar">
		<div class="layui-btn-container">
			<a class="layui-btn layui-btn-normal addNews_btn" lay-event="add">
				<i class="layui-icon">&#xe608;</i>
				添加
			</a>
			<a class="layui-btn layui-btn-normal delNews_btn layui-bg-green" lay-event="link">
				<i class="layui-icon">&#xe613;</i>
				联系人管理
			</a>
			<a class="layui-btn layui-btn-normal delNews_btn layui-bg-green" lay-event="record">
				<i class="layui-icon">&#xe60e;</i>
				交往记录
			</a>
			<a class="layui-btn layui-btn-normal delNews_btn layui-bg-orange" lay-event="order">
				<i class="layui-icon">&#xe63c;</i>
				订单查看
			</a>
			<a class="layui-btn layui-btn-normal delNews_btn layui-bg-red" lay-event="del">
				<i class="layui-icon">&#xe616;</i>
				删除客户
			</a>
		</div>
	</script>

	<!--操作-->
	<script id="customerListBar" type="text/html">
		<a class="layui-btn layui-btn-xs" id="edit" lay-event="edit">编辑</a>
		<a class="layui-btn layui-btn-xs layui-btn-danger" lay-event="del">删除</a>
	</script>

</form>

<script type="text/javascript" src="js/customer/customer.js"></script>

</body>
</html>