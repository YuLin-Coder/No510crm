layui.use(['form', 'layer'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery;

    /**
     * 表单提交事件
     */
    form.on("submit(updateModule)", function (data) {
        let msg = layer.msg("数据提交中，请稍后", {
            // 图标
            icon: 16,
            // 关闭时间，不关闭
            time: false
        });
        //弹出loading
        $.post("module/updateModule", data.field, function (res) {
            layer.close(msg);
            if (res.code == 200) {
                layer.msg(res.msg, {icon: 6});
                // 延迟关闭子窗口
                setTimeout(function () {
                    // 重新渲染父页面表单
                    parent.location.reload();
                    // 关闭当前弹出层
                    layer.close("iframe");
                },800);
            } else {
                layer.msg(res.msg, {icon: 5});
            }
        });
        return false;
    });

    /**
     * 取消按钮点击事件
     */
    $("#closeBtn").click(function (){
        // 关闭当前窗口
        // 获取当前iframe层的索引
        let index = parent.layer.getFrameIndex(window.name);
        // 关闭当前弹出层
        parent.layer.close(index);
    });

});