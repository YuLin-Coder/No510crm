layui.use(['element', 'layer','jquery','layuimini'], function () {
    var $ = layui.jquery,
        layer = layui.layer;

    // 设置变量url,页面刷新时执行一次
    let url = $.cookie("url");
    if (url != null && url != "") {
        $('#tabIframe').html('<iframe width="100%" height="100%" frameborder="0"  src=' + decodeURIComponent(url) + '></iframe>');
    } else {
        // 菜单初始化
        $('#tabIframe').html('<iframe width="100%" height="100%" frameborder="0"  src="welcome"></iframe>');
    }

    // 为右侧的下拉框添加页面跳转事件
    $("a[data-iframe-tab]").click(function () {
        url = $(this).attr("data-iframe-tab");
        // 编码url
        $.cookie("url", encodeURIComponent(url));
        $('#tabIframe').html('<iframe width="100%" height="100%" frameborder="0"  src=' + url + '></iframe>');
    });

    // 为左侧的侧边款添加页面跳转事件
    $("a[data-tab]").click(function () {
        url = $(this).attr("data-tab");
        // 编码url
        $.cookie("url", encodeURIComponent(url));
        $('#tabIframe').html('<iframe width="100%" height="100%" frameborder="0"  src=' + url + '></iframe>');
    });

    // 打开当前用户的基本信息页面
    $("#personMessage").click(function (data) {
        openUserDialog("基本信息", "user/toUpdateCurrentPage");
    });
    function openUserDialog(title, url) {
        title = "<h2>" + title + "</h2>";
        layui.layer.open({
            type: 2,
            title: title,
            shadeClose: true,
            shade: 0.6,
            area: ['480px', '390px'],
            content: url,
            // 最大化最小化
            maxmin: true,
            // 不允许窗口拉伸
            resize: false
        });
    }

    // 点击登出按钮
    $(".login-out").click(function () {
        // 弹出提示
        layer.confirm("确定要退出系统？",
            {
                icon: 3,
                title: "登出操作"
            },function (tip) {
                // 清除cookie url
                $.removeCookie("url");
                // 关闭弹出层
                layer.close(tip);
                // 跳转到登录页
                window.parent.location.href = "user/logout";
            });
    });


});