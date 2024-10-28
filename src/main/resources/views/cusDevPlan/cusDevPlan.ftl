<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>客户开发计划</title>
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
					<input type="text" name="createMan" class="layui-input searchVal" placeholder="创建人" />
				</div>
				<div class="layui-input-inline">
					<select name="devResult" id="devResult">
						<option value="" >开发状态</option>
						<option value="0">未开发</option>
						<option value="1">开发中</option>
						<option value="2">开发成功</option>
						<option value="3">开发失败</option>
					</select>
				</div>
				<a class="layui-btn search_btn" data-type="reload"><i class="layui-icon">&#xe615;</i> 搜索</a>
			</div>
		</form>
	</blockquote>
	<table id="cusDevPlanList" class="layui-table"  lay-filter="cusDevPlans"></table>


	<script type="text/html" id="toolbarDemo">
		<div class="layui-btn-container">
			<a class="layui-btn layui-btn-normal addNews_btn" lay-event="add">
				<i class="layui-icon">&#xe608;</i>
				添加
			</a>
			<a class="layui-btn layui-btn-normal delNews_btn layui-bg-red" lay-event="del">
				<i class="layui-icon">&#xe616</i>
				删除
			</a>
		</div>
	</script>

	<script id="op" type="text/html" >
		{{# if (d.devResult=== 0 || d.devResult==1) { }}
			<a href="javascript:;" class="layui-btn layui-btn-warm layui-btn-xs" lay-event="dev">开发</a>
		{{# } else { }}
			<a href="javascript:;" class="layui-btn layui-btn-normal layui-btn-xs" lay-event="info">详情</a>
		{{# } }}
	</script>


	<!--操作-->
	<script id="cusDevPlanListBar" type="text/html">
		<a class="layui-btn layui-btn-xs" id="edit" lay-event="edit">编辑</a>
		<a class="layui-btn layui-btn-xs layui-btn-danger" lay-event="del">删除</a>
	</script>

</form>

<script type="text/javascript" src="js/cusDevPlan/cusDevPlan.js"></script>

</body>
</html>