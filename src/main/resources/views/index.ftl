<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>后台管理-登录</title>
    <#include "common.ftl">
    <link rel="stylesheet" href="css/index.css" media="all">
    <style>
        body {
            background: url("images/login.jpg") no-repeat center;
        }
    </style>
</head>
<body>
<div class="layui-container">
    <div class="admin-login-background">
        <div class="layui-form login-form">
            <form class="layui-form" action="javascript:void(0);">
                <div class="layui-form-item logo-title">
                    <h1>CRM后端登录</h1>
                </div>
                <div class="layui-form-item">
                    <label class="layui-icon layui-icon-username" for="userName"></label>
                    <input type="text" name="userName" lay-verify="required|account" placeholder="用户名" value="${userName!}" autocomplete="off" class="layui-input" >
                </div>
                <div class="layui-form-item">
                    <label class="layui-icon layui-icon-password" for="password"></label>
                    <input type="hidden" id="password" value="${password!}">
                    <input type="password" name="password" lay-verify="required|password" placeholder="密码" autocomplete="off" class="layui-input" >
                </div>
                <#-- 记住我-->
                <div class="layui-form-item">
                    <input type="checkbox" name="rememberMe" id="rememberMe" value="true" layskin="primary" title="记住密码">
                </div>
                <div class="layui-form-item">
                    <button class="layui-btn layui-btn-fluid" lay-submit="" lay-filter="login">登 录</button>
                </div>
            </form>
        </div>
    </div>
</div>
<script src="js/index.js" charset="utf-8"></script>
</body>
</html>