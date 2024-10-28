<!DOCTYPE html>
<html>
	<head>
		<title>客户管理 - 查看订单详情</title>
		<#include "../common.ftl">
	</head>
	<body class="childrenBody">
	<div class="layui-col-md12">
		<div class="layui-card">
			<div class="layui-card-body">
				<form class="layui-form" >
					<div class="layui-form-item layui-row">
						<input type="hidden" id="orderId" value="${(customer.id)!}" />
						<div class="layui-col-xs6">
							<label class="layui-form-label">订单编号</label>
							<div class="layui-input-block">
								<input type="text" class="layui-input"
									   name="name" id="name" value="${(customer.orderNo)!}" readonly="readonly">
							</div>
						</div>
						<div class="layui-col-xs6">
							<label class="layui-form-label">总金额(￥)</label>
							<div class="layui-input-block">
								<input type="text" class="layui-input"
									   name="fr" id="fr" value="${(sum)!}" readonly="readonly">
							</div>
						</div>
					</div>

					<div class="layui-form-item layui-row">
						<div class="layui-col-xs6">
							<label class="layui-form-label">收货地址</label>
							<div class="layui-input-block">
								<input type="text" class="layui-input"
									   name="address" value="${(customer.address)!}" readonly="readonly">
							</div>
						</div>
						<div class="layui-col-xs6">
							<label class="layui-form-label">支付状态</label>
							<div class="layui-input-block">
								<#if (customer.state)==1>
									<input type="text" class="layui-input" name="phone" value="已支付" id="phone" readonly="readonly">
								</#if>
								<#if (customer.state)==0>
									<input type="text" class="layui-input" name="phone" value="未支付" id="phone" readonly="readonly">
								</#if>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>

	<div class="layui-col-md12">
		<table id="orderDetailList" class="layui-table" lay-filter="orderDetails"></table>
	</div>

	<script type="text/javascript" src="js/customerOrder/orderDetail.js"></script>
	</body>
</html>