<!DOCTYPE html>
<html>
<head>
    <#include "../common.ftl">
</head>
<body class="childrenBody">
<form class="layui-form" style="width:80%;">
    <input name="id" type="hidden" value="${(dic.id)!}"/>
    <div class="layui-form-item layui-row layui-col-xs12">
        <label class="layui-form-label">字典名称</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input"
                   lay-verify="required" name="dataDicName" id="dataDicName"  value="${(dic.dataDicName)!}" placeholder="请输入字典名称">
        </div>
    </div>
    <div class="layui-form-item layui-row layui-col-xs12">
        <label class="layui-form-label">字典值</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input"
                   lay-verify="required" name="dataDicValue" id="dataDicValue" value="${(dic.dataDicValue)!}" placeholder="请输入字典值">
        </div>
    </div>

    <br/>
    <div class="layui-form-item layui-row layui-col-xs12">
        <div class="layui-input-block">
            <button class="layui-btn layui-btn-lg" lay-submit=""
                    lay-filter="addOrUpdateUser">确认
            </button>
            <button class="layui-btn layui-btn-lg layui-btn-normal" id="closeBtn">取消</button>
        </div>
    </div>
</form>

<script type="text/javascript" src="js/dic/addAndUpdate.js"></script>
</body>
</html>