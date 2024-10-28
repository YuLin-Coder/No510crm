layui.use(['form', 'layer'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery;

    // 点击取消按钮时关闭当前弹出层
    $("#closeBtn").click(function () {
        // 获取当前iframe层的索引
        let index = parent.layer.getFrameIndex(window.name);
        // 关闭当前弹出层
        parent.layer.close(index);
    });

    // 表单提交监听事件
    form.on('submit(addOrUpdateCustomer)', function (data) {
        // 数据加载遮罩层
        let msg = layer.msg("数据提交中，请稍后", {
            // 图标
            icon: 16,
            // 关闭时间，不关闭
            time: false
        });
        let url = '';
        if ($("[name='id']").val() == null || $("[name='id']").val() == '') {
            // 新增
            url += "customer/addCustomer";
        } else {
            // 修改
            url += "customer/updateCustomer";
        }
        // 发送请求
        $.post(
            url,
            data.field,
            function (data) {
                // 关闭数据加载遮罩层
                layer.close(msg);
                // 请求返回成功
                if (data.code == 200) {
                    layer.msg(data.msg, {icon: 6});
                    // 延迟关闭子窗口
                    setTimeout(function () {
                        // 重新渲染父页面表单
                        parent.location.reload("form");
                        // 关闭当前弹出层
                        layer.close("iframe");
                    },800);
                } else {
                    // 请求返回失败
                    layer.msg(data.msg,{icon: 5});
                }
            }
        );
        // 阻止表单提交
        return false;
    });

    // 渲染客户级别下拉款
    let level = $("#level").val();
    // 选择修改页面时，默认选中原始数据的客户级别
    renderLevel(level);
    function renderLevel(level) {
        $.get(
            "customer/getLevels",
            {},
            function (data) {
                if (level == null || level == '') {
                    $("[name='level']").eq(0).append(new Option("客户级别", ""));
                }
                $.each(data, function (index, element) {
                    if (element == level) {
                        $("[name='level']").eq(0).append(new Option(element, element, false,true));
                    } else {
                        $("[name='level']").eq(0).append(new Option(element, element));
                    }
                });
                form.render("select");
            }
        );
    }

});