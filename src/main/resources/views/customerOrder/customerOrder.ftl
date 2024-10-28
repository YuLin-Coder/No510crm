<!DOCTYPE html>
<html>
	<head>
		<title>客户管理 - 查看订单信息</title>
		<#include "../common.ftl">
	</head>
	<body class="childrenBody">
	<div class="layui-col-md12">
		<div class="layui-card">
			<div class="layui-card-body">
				<form class="layui-form" >
					<#-- 客户信息ID -->
					<input name="cusId" type="hidden" value="${(customer.id)!}"/>
					<div class="layui-form-item layui-row">
						<div class="layui-col-xs6">
							<label class="layui-form-label">客户名称</label>
							<div class="layui-input-block">
								<input type="text" class="layui-input"
									   name="name" id="name" value="${(customer.name)!}" readonly="readonly">
							</div>
						</div>
						<div class="layui-col-xs6">
							<label class="layui-form-label">法人</label>
							<div class="layui-input-block">
								<input type="text" class="layui-input"
									   name="fr" id="fr" value="${(customer.fr)!}" readonly="readonly">
							</div>
						</div>
					</div>

					<div class="layui-form-item layui-row">
						<div class="layui-col-xs6">
							<label class="layui-form-label">客户地址</label>
							<div class="layui-input-block">
								<input type="text" class="layui-input"
									   name="address" value="${(customer.address)!}" readonly="readonly">
							</div>
						</div>
						<div class="layui-col-xs6">
							<label class="layui-form-label">联系电话</label>
							<div class="layui-input-block">
								<input type="text" class="layui-input" name="phone" value="${(customer.phone)!}" id="phone" readonly="readonly">
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>

	<div class="layui-col-md12">
		<table id="customerOrderList" class="layui-table" lay-filter="customerOrders"></table>
	</div>

	<!--操作-->
	<script id="customerOrderListBar" type="text/html">
		<a class="layui-btn layui-btn-xs layui-bg-blue" lay-event="detail">订单详情</a>
	</script>

	<script type="text/javascript" src="js/customerOrder/customerOrder.js"></script>
	</body>
</html>