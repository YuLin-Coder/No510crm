<!DOCTYPE html>
<html>
<head>
    <title>角色授权</title>
    <#--添加base标签-->
    <base href="${crm}/"/>
    <#include "../common.ftl">
    <link rel="stylesheet" href="css/zTreeStyle.css">
    <script src="lib/zTree/jquery.ztree.core.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="lib/zTree/jquery.ztree.excheck.min.js" type="text/javascript" charset="utf-8"></script>
    <style>
        .true {
            position: fixed;
            right: 20px;
            top: 200px;
        }
        .false {
            position: fixed;
            right: 20px;
            bottom: 200px;
        }
    </style>
</head>
<body>

    <input type="hidden" name="roleId" value="${roleId!}">

    <div id="zTree" class="ztree"></div>

    <div class="true">
        <button type="button" class="layui-btn layui-icon layui-icon-ok layui-bg-blue"></button>
    </div>
    <div class="false">
        <button type="button" class="layui-btn layui-icon layui-icon-close layui-bg-red"></button>
    </div>

<script type="text/javascript" src="js/role/grant.js"></script>
</body>
</html>