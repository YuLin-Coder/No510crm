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
            <input id="assignerHidden" type="hidden" value="${(customerServe.assigner)!}"/>

            <#--服务状态默认为服务分配-->
            <input name="state" type="hidden" value="fw_002"/>

            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">指派人</label>
                    <div class="layui-input-inline">
                        <select name="assigner" id="assigner"></select>
                    </div>
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

        <script type="text/javascript" src="js/customerServe/customerServeAssignerForEdit.js"></script>
    </body>
</html>