<!DOCTYPE html>
<html>
    <head>
        <title>角色管理</title>
        <#include "../common.ftl">
    </head>
    <body class="childrenBody">
        <form class="layui-form" >
            <blockquote class="layui-elem-quote quoteBox">
                <form class="layui-form">
                    <#if permissions?seq_contains("602002")>
                        <div class="layui-inline">
                            <div class="layui-input-inline">
                                <input type="text" name="roleName" class="layui-input searchVal" placeholder="角色名" />
                            </div>
                            <a class="layui-btn search_btn" data-type="reload">
                                <i class="layui-icon">&#xe615;</i>
                                搜索
                            </a>
                        </div>
                    </#if>
                </form>
            </blockquote>

            <table id="roles" class="layui-table"  lay-filter="roles"></table>

            <script type="text/html" id="toolbarDemo">
                <div class="layui-btn-container">
                    <#if permissions?seq_contains("602001")>
                        <a class="layui-btn layui-btn-normal addNews_btn" lay-event="add">
                            <i class="layui-icon">&#xe608;</i>
                            添加角色
                        </a>
                    </#if>
                    <#if permissions?seq_contains("602004")>
                        <a class="layui-btn layui-btn-normal addNews_btn layui-bg-red" lay-event="del">
                            <i class="layui-icon">&#xe616;</i>
                            删除角色
                        </a>
                    </#if>
                    <#if permissions?seq_contains("602005")>
                        <a class="layui-btn layui-btn-normal addNews_btn layui-bg-blue" lay-event="grant">
                            <i class="layui-icon">&#xe672;</i>
                            授权
                        </a>
                    </#if>
                </div>
            </script>

            <!--操作-->
            <script id="roleBar" type="text/html">
                <#if permissions?seq_contains("602003")>
                    <a class="layui-btn layui-btn-xs" id="edit" lay-event="edit">编辑</a>
                </#if>
                <#if permissions?seq_contains("602004")>
                    <a class="layui-btn layui-btn-xs layui-btn-danger" lay-event="del">删除</a>
                </#if>
            </script>
        </form>

    <script type="text/javascript" src="js/role/role.js"></script>
    </body>
</html>