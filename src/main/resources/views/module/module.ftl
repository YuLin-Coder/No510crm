<!DOCTYPE html>
<html>
    <head>
        <title>资源管理</title>
        <#include "../common.ftl">
        <script type="text/javascript" src="js/lay-module/treetable-lay/treetable.js"></script>
    </head>
    <body class="childrenBody">

        <table id="modules" class="layui-table" lay-filter="modules"></table>

        <script type="text/html" id="toolBar">
            <div class="layui-btn-container">
                <a class="layui-btn layui-btn-normal addNews_btn" lay-event="expand">
                    <i class="layui-icon">&#xe608;</i>
                    全部展开
                </a>
                <a class="layui-btn layui-btn-normal addNews_btn layui-bg-red" lay-event="fold">
                    <i class="layui-icon">&#xe616;</i>
                    全部折叠
                </a>
                <a class="layui-btn layui-btn-normal addNews_btn layui-bg-blue" lay-event="add">
                    <i class="layui-icon">&#xe672;</i>
                    添加目录
                </a>
            </div>
        </script>

    <script type="text/javascript" src="js/module/module.js"></script>
    </body>
</html>