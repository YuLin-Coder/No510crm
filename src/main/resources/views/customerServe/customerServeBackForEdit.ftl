<!DOCTYPE html>
<html>
    <head>
        <#include "../common.ftl">
    </head>
    <body class="childrenBody">
        <form class="layui-form" style="width:80%;">
            <#--客户服务id-->
            <input id="id" name="id" type="hidden" value="${(customerServe.id)!}"/>

            <#--服务状态默认为服务分配-->
            <input name="state" type="hidden" value="fw_004"/>

            <#--满意度-->
            <#if customerServe.myd??>
                <input type="hidden" name="myd" id="myd" value="${customerServe.myd}" >
            <#else>
                <input type="hidden" name="myd" id="myd" value="☆☆☆☆☆">
            </#if>

            <div class="layui-form-item">
                <label class="layui-form-label">处理结果</label>
                <div class="layui-input-block">
                    <textarea placeholder="请输入处理结果" name="serviceProceResult" class="layui-textarea">${(customerServe.serviceProceResult)!}</textarea>
                </div>
            </div>

            <div class="layui-form-item">
                <label class="layui-form-label">满意度</label>
                <div class="layui-input-block">
                    <div id="rate"></div>
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

        <script type="text/javascript" src="js/customerServe/customerServeBackForEdit.js"></script>
    </body>
</html>