<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>客户贡献统计</title>
	<#include "../common.ftl">
</head>
<body class="childrenBody">

<form class="layui-form" >
	<blockquote class="layui-elem-quote quoteBox">
		<form class="layui-form">
			<div class="layui-form-item">
				<div class="layui-inline">
					<input type="text" name="customer" class="layui-input searchVal" placeholder="客户名" />
				</div>
				<div class="layui-inline">
					<div class="layui-input-inline" style="width: 100px;">
						<input type="text" name="minMoney" placeholder="最小金额" autocomplete="off" class="layui-input">
					</div>
					<div class="layui-form-mid">-</div>
					<div class="layui-input-inline" style="width: 100px;">
						<input type="text" name="maxMoney" placeholder="最大金额" autocomplete="off" class="layui-input">
					</div>
				</div>
				<div class="layui-inline">
					<div class="layui-input-inline" style="width: 100px;">
						<input type="text" name="minDate" id="minDate" lay-verify="date" placeholder="最小下单时间" autocomplete="off" class="layui-input">
					</div>
					<div class="layui-form-mid">-</div>
					<div class="layui-input-inline" style="width: 100px;">
						<input type="text" name="maxDate" id="maxDate" lay-verify="date" placeholder="最大下单时间" autocomplete="off" class="layui-input">
					</div>
				</div>
				<a class="layui-btn search_btn" data-type="reload"><i class="layui-icon">&#xe615;</i> 搜索</a>
			</div>
		</form>
	</blockquote>

	<table id="customerCountList" class="layui-table" lay-filter="customerCount"></table>

	<div id="category" style="width: 800px; height: 350px;float: left;margin-top: 100px;"></div>

	<div id="pie" style="width: 800px; height: 350px;float: left;margin-top: 100px;"></div>

</form>

<script type="text/javascript" src="js/customerCount/customerCount.js"></script>

</body>
</html>