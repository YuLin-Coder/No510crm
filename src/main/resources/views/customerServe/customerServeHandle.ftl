<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>服务分配</title>
	<#include "../common.ftl">
</head>
<body class="childrenBody">

<form class="layui-form" >
	<blockquote class="layui-elem-quote quoteBox">
		<form class="layui-form">
			<div class="layui-inline">
				<div class="layui-input-inline">
					<input type="text" name="customer" class="layui-input searchVal" placeholder="客户名" />
				</div>
				<div class="layui-input-inline">
					<select name="serveType" id="serveType"></select>
				</div>
				<div class="layui-input-inline">
					<select name="state" id="state">
						<option value="">服务状态</option>
						<option value="fw_001">服务创建</option>
						<option value="fw_002">服务分配</option>
						<option value="fw_003">服务处理</option>
						<option value="fw_004">服务反馈</option>
						<option value="fw_005">服务归档</option>
					</select>
				</div>
				<a class="layui-btn search_btn" data-type="reload"><i class="layui-icon">&#xe615;</i> 搜索</a>
			</div>
		</form>
	</blockquote>
	<table id="customerServeList" class="layui-table" lay-filter="customerServe"></table>

</form>

<script type="text/javascript" src="js/customerServe/customerServeHandle.js"></script>

</body>
</html>