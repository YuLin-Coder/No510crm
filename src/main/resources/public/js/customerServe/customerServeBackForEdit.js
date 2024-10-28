layui.use(['form', 'layer', 'rate'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        rate = layui.rate;

    // 评分
    // 获取满意度
    let myd = $("#myd").val();
    let rateValue = 5;
    // 满意度非空
    if (myd) {
        rateValue = myd.length;
    }
    rate.render({
        elem: '#rate'
        , value: rateValue
        , text: true
        , setText: function (value) { //自定义文本的回调
            var arrs = {
                '1': '极差'
                , '2': '差'
                , '3': '中等'
                , '4': '好'
                , '5': '极好'
            };
            this.span.text(arrs[value]);
            // 为满意度赋值
            let myd = "";
            for (let i = 0; i < value; i++) {
                myd += "☆";
            }
            $("#myd").val(myd);
        }
    });

    // 点击取消按钮时关闭当前弹出层
    $("#closeBtn").click(function () {
        // 获取当前iframe层的索引
        let index = parent.layer.getFrameIndex(window.name);
        // 关闭当前弹出层
        parent.layer.close(index);
    });

    // 表单提交监听事件
    form.on('submit(addOrUpdateCustomerServe)', function (data) {
        // 数据加载遮罩层
        let msg = layer.msg("数据提交中，请稍后", {
            // 图标
            icon: 16,
            // 关闭时间，不关闭
            time: false
        });
        // 参数校验
        if (!data.field.id) {
            layer.msg("服务id不能为空", {icon: 5});
            return false;
        }
        if (!data.field.state) {
            layer.msg("服务状态不能为空", {icon: 5});
            return false;
        }
        if (!data.field.serviceProceResult) {
            layer.msg("处理结果不能为空", {icon: 5});
            return false;
        }
        if (!data.field.myd) {
            layer.msg("满意度不能为空", {icon: 5});
            return false;
        }
        // 发送请求
        $.post(
            "customerServe/updateCustomerServe",
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
                    }, 800);
                } else {
                    // 请求返回失败
                    layer.msg(data.msg, {icon: 5});
                }
            }
        );
        // 阻止表单提交
        return false;
    });

    // 渲染客户类型下拉框
    let assigner = $("#assignerHidden").val();
    renderServeType(assigner);

    function renderServeType(assigner) {
        $.post(
            "saleChance/getAssignMan",
            {},
            function (data) {
                $("#assigner").append(new Option("指派人", ""));
                $.each(data.result, function (index, element) {
                    if (element.id == assigner) {
                        $("#assigner").append(new Option(element.userName, element.id, false, true));
                    } else {
                        $("#assigner").append(new Option(element.userName, element.id));
                    }
                });
                form.render("select");
            }
        );
    }

});