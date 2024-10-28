<!DOCTYPE html>
<html>
    <head>
        <#include "../common.ftl">
    </head>
    <body class="childrenBody">
        <form class="layui-form" style="width:80%;">
            <#--客户服务id-->
            <input id="id" name="id" type="hidden" value="${(customerServe.id)!}"/>

            <#--服务类型-->
            <input id="serveTypeHidden" type="hidden" value="${(customerServe.serveType)!}"/>

            <#--服务状态默认为服务创建-->
            <input name="state" type="hidden" value="fw_001"/>

            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">服务类型</label>
                    <div class="layui-input-inline">
                        <select name="serveType" id="serveType"></select>
                    </div>

                    <label class="layui-form-label">客户名称</label>
                    <div class="layui-input-inline">
                        <input type="text" class="layui-input" lay-verify="required" name="customer" value="${(customerServe.customer)!}" placeholder="请输入客户名称">
                    </div>
                </div>
            </div>

            <div class="layui-form-item layui-row layui-col-xs12">
                <label class="layui-form-label">服务概要</label>
                <div class="layui-input-block">
                    <textarea placeholder="请输入服务概要" name="serviceRequest" class="layui-textarea">${(customerServe.serviceRequest)!}</textarea>
                </div>
            </div>

            <div class="layui-form-item layui-row layui-col-xs12">
                <label class="layui-form-label">服务内容</label>
                <div class="layui-input-block">
                    <textarea placeholder="请输入服务内容" name="overview" class="layui-textarea">${(customerServe.overview)!}</textarea>
                </div>
            </div>

            <br/>

            <div class="layui-form-item layui-row layui-col-xs12">
                <div class="layui-input-block">
                    <button class="layui-btn layui-btn-lg" lay-submit="" lay-filter="addOrUpdateCustomerServe">确认</button>
                    <button class="layui-btn layui-btn-lg layui-btn-normal" id="closeBtn">取消</button>
                </div>
            </div>
        </form>

        <script type="text/javascript" src="js/customerServe/addAndUpdate.js"></script>
    </body>
</html>