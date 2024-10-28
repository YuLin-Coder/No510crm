<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>客户流失分析</title>
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
				<a class="layui-btn search_btn" data-type="reload"><i class="layui-icon">&#xe615;</i>搜索</a>
			</div>
		</form>
	</blockquote>

	<table id="customerLossList" class="layui-table" lay-filter="customerLoss"></table>

	<div id="category" style="width: 800px; height: 350px;float: left;margin-top: 100px;"></div>

	<div id="pie" style="width: 800px; height: 350px;float: left;margin-top: 100px;"></div>

</form>

<script type="text/javascript" src="js/customerCount/customerCountLoss.js"></script>

</body>
</html>