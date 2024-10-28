<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>客户流失息管理</title>
	<#include "../common.ftl">
</head>
<body class="childrenBody">

<form class="layui-form" >
	<blockquote class="layui-elem-quote quoteBox">
		<form class="layui-form">
			<div class="layui-inline">
				<div class="layui-input-inline">
					<input type="text" name="customerNo" class="layui-input searchVal" placeholder="客户编号" />
				</div>
				<div class="layui-input-inline">
					<input type="text" name="customerName" class="layui-input searchVal" placeholder="客户名" />
				</div>
				<div class="layui-input-inline">
					<select name="state" id="state">
						<option value="">请选择</option>
						<option value="0">暂缓流失</option>
						<option value="1">确认流失</option>
					</select>
				</div>
				<a class="layui-btn search_btn" data-type="reload"><i class="layui-icon">&#xe615;</i>搜索</a>
			</div>
		</form>
	</blockquote>

	<table id="customerLossList" class="layui-table" lay-filter="customerLoss"></table>

</form>

<script type="text/javascript" src="js/customerLoss/customerLoss.js"></script>

</body>
</html>