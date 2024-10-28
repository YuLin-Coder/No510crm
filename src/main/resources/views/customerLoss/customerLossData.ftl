<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<#include "../common.ftl">
</head>
<body class="childrenBody">

<form class="layui-form" >
	<div class="layui-col-md12">
		<div class="layui-card">
			<div class="layui-card-body">
				<form class="layui-form" >
					<#-- 客户流失信息ID -->
					<input id="id" type="hidden" value="${(customerLoss.id)!}"/>
					<#--客户流失状态-->
					<input id="state" type="hidden" value="${(customerLoss.state)!}"/>
					<div class="layui-form-item layui-row">
						<div class="layui-col-xs6">
							<label class="layui-form-label">客户名称</label>
							<div class="layui-input-block">
								<input type="text" class="layui-input"
									   name="cusName" value="${(customerLoss.cusName)!}" readonly="readonly">
							</div>
						</div>
						<div class="layui-col-xs6">
							<label class="layui-form-label">客户编号</label>
							<div class="layui-input-block">
								<input type="text" class="layui-input"
									   name="cusNo" value="${(customerLoss.cusNo)!}" readonly="readonly">
							</div>
						</div>
					</div>

					<#if customerLoss.state==1>
						<div class="layui-form-item layui-row">
							<div class="layui-col-xs6">
								<label class="layui-form-label">流失时间</label>
								<div class="layui-input-block">
									<input type="text" class="layui-input"
										   name="confirmLossTime" value="${(customerLoss.confirmLossTime)?date}" readonly="readonly">
								</div>
							</div>
							<div class="layui-col-xs6">
								<label class="layui-form-label">流失原因</label>
								<div class="layui-input-block">
									<input type="text" class="layui-input" name="lossReason" value="${(customerLoss.lossReason)!}" readonly="readonly">
								</div>
							</div>
						</div>
					</#if>
				</form>
			</div>
		</div>
	</div>

	<script type="text/html" id="toolBar">
		<div class="layui-btn-container">
			<a class="layui-btn layui-btn-normal addNews_btn" lay-event="add">
				<i class="layui-icon">&#xe608;</i>
				添加暂缓
			</a>
			<a class="layui-btn layui-btn-normal addNews_btn layui-bg-red" lay-event="ensure">
				<i class="layui-icon">&#xe616;</i>
				确认流失
			</a>
			<a class="layui-btn layui-btn-normal addNews_btn layui-bg-red" lay-event="del">
				<i class="layui-icon">&#xe616;</i>
				删除
			</a>
		</div>
	</script>

	<table id="customerLossList" class="layui-table" lay-filter="customerLoss"></table>

</form>

<script type="text/javascript" src="js/customerLoss/customerLossData.js"></script>

</body>
</html>