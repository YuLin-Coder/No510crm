layui.use(['form','jquery'], function () {
    var form = layui.form,
        layer = layui.layer,
        $ = layui.jquery;

    // 为密码文本框填充值
    if ($("#password").val() != null && $("#password").val() != '') {
        $("[name='password']").val(window.atob($("#password").val()));
    }

    // 表单提交
    form.on('submit(login)', function(data){
        // 防止多次点击，使得登录按钮暂时失效
        $("[lay-filter='login']").toggleClass("layui-btn-disabled");
        $("[lay-filter='login']").attr("disabled","disabled");
        // 由于密码比较特殊，提前保存到cookie中
        if ($("#rememberMe").prop("checked")) {
            $.cookie("password", window.btoa($("[name='password']").val()), {expires: 7});
        } else {
            $.cookie("password", window.btoa($("[name='password']").val()));
        }
        $.post(
            "user/login",
            {
                userName: data.field.userName,
                password: data.field.password
            },
            function (data) {
                if (data.code == 200) {
                    layer.msg(data.msg,function () {
                        // 登录成功
                        if ($("#rememberMe").prop("checked")) {
                            $.cookie("userId", data.result.userId,{expires: 7});
                            $.cookie("userName", data.result.userName, {expires: 7});
                            $.cookie("trueName", data.result.trueName, {expires: 7});
                        } else {
                            $.cookie("userId",data.result.userId);
                            $.cookie("userName",data.result.userName);
                            $.cookie("trueName",data.result.trueName);
                        }
                        // 执行跳转方法
                        window.location.href="main";
                    });
                } else {
                    // 登录失败
                    layer.msg(data.msg, {icon: 5}, function () {
                        // 登录失败，则恢复登录按钮点击事件
                        $("[lay-filter='login']").toggleClass("layui-btn-disabled");
                        $("[lay-filter='login']").removeAttr("disabled");
                    });
                }
            }
        );
        return false;
    });
});