layui.use(['table','layer','form'],function() {
    var layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        table = layui.table,
        form = layui.form;

    var tableIns;
    // 已流失
    if ($("#state").val() == 1) {
        tableIns = table.render({
            elem: '#customerLossList',
            url: 'customerReprieve/customerReprieveList?lossId=' + $("#id").val(),
            cellMinWidth : 95,
            page : true,
            height : "full-125",
            limits : [5,10,15,20],
            limit : 5,
            cols : [[
                {field: "id", title:'编号',fixed:"true", width:80},
                {field: 'measure', title: '暂缓措施', align:'center', templet:
                        function (d) {
                            return '<span style="color: #00FF00">' + d.measure + '</span>';
                        }
                },
                {field: 'createDate', title: '创建时间', align:'center'},
                {field: 'updateDate', title: '更新时间', align:'center'},
            ]]
        });
    } else {
        // 暂缓
        tableIns = table.render({
            elem: '#customerLossList',
            url: 'customerReprieve/customerReprieveList?lossId=' + $("#id").val(),
            cellMinWidth : 95,
            page : true,
            height : "full-125",
            limits : [5,10,15,20],
            limit : 5,
            toolbar: "#toolBar",
            id : "customerLossTable",
            cols : [[
                {type: "checkbox", fixed:"left", width:50},
                {field: "id", title:'编号',fixed:"true", width:80},
                {field: 'measure', title: '暂缓措施', align:'center', templet:
                        function (d) {
                            return '<span style="color: #00FF00">' + d.measure + '</span>';
                        }
                },
                {field: 'createDate', title: '创建时间', align:'center'},
                {field: 'updateDate', title: '更新时间', align:'center'},
                {title: '操作', minWidth:150, fixed:"right",align:"center", templet:
                        function (d) {
                            return '<a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a><a class="layui-btn layui-btn-xs layui-btn-danger" lay-event="del">删除</a>';
                        }
                }
            ]]
        });
    }



    // 表单右侧工具栏
    table.on('tool(customerLoss)', function(obj){
        switch(obj.event){
            // 添加暂缓
            case 'edit':
                layer.prompt({
                    formType: 0,
                    value: '',
                    title: '<span style="color: #00FF00">请输入修改后的客户暂缓措施</span>',
                    area: ['800px', '350px']    //自定义文本域宽高
                }, function(value, index, elem){
                    // 发送请求
                    $.post(
                        "customerReprieve/updateCustomerReprieve",
                        {
                            id: obj.data.id,
                            measure: value,
                            lossId: $("#id").val()
                        }, function (data) {
                            if (data.code == 200) {
                                // 关闭输入框
                                layer.close(index);
                                // 重新渲染表单
                                tableIns.reload();
                                // 提示成功
                                layer.msg(data.msg);
                            } else {
                                // 提示失败
                                layer.msg(data.msg, {icon: 5});
                                return false;
                            }
                        }
                    );
                });
                break;
            // 删除
            case 'del':
                layer.confirm('确认删除该行客户流失信息？', {
                    btn: ['确定','取消'], //按钮
                    icon: 3,
                    title: '客户流失管理 - 单行删除'
                }, function(){
                    $.post(
                        "customerReprieve/deleteCustomerReprieve",
                        {
                            ids: obj.data.id
                        },
                        function (data) {
                            if (data.code == 200) {
                                layer.msg(data.msg);
                                // 重载表格
                                tableIns.reload();
                            }else{
                                layer.msg(data.msg,{icon: 5});
                            }
                        }
                    );
                });
                break;
        };
    });

    // 表单右侧工具栏
    table.on('toolbar(customerLoss)', function(obj){
        // 获取被选中的数据
        let checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            // 新增客户流失信息
            case 'add':
                layer.prompt({
                    formType: 0,
                    value: '',
                    title: '<span style="color: #00FF00">请输入新增的客户暂缓措施</span>',
                    area: ['800px', '350px']    //自定义文本域宽高
                }, function(value, index, elem){
                    // 发送请求
                    $.post(
                        "customerReprieve/addCustomerReprieve",
                        {
                            measure: value,
                            lossId: $("#id").val()
                        }, function (data) {
                            if (data.code == 200) {
                                // 关闭输入框
                                layer.close(index);
                                // 重新渲染表单
                                tableIns.reload();
                                // 提示成功
                                layer.msg(data.msg);
                            } else {
                                // 提示失败
                                layer.msg(data.msg, {icon: 5});
                                return false;
                            }
                        }
                    );
                });
                break;
            // 确认客户流失
            case 'ensure':
                layer.prompt({
                    formType: 0,
                    value: '',
                    title: '<span style="color: #00FF00">请输入客户流失原因</span>',
                    area: ['800px', '350px']    //自定义文本域宽高
                }, function(value, index, elem){
                    // 发送请求
                    $.post(
                        "customerReprieve/updateCustomerLossState",
                        {
                            id: $("#id").val(),
                            lossReason: value
                        }, function (data) {
                            if (data.code == 200) {
                                // 关闭输入框
                                layer.close(index);
                                // 重新渲染表单
                                let confirm = layer.confirm('<span style="color: orange">需要刷新页面才能展示效果</span><br/>', {
                                    btn: ['立即刷新', '取消'],  //按钮
                                    icon: 3,
                                    title: data.msg
                                }, function () {
                                    // 关闭当前提示框
                                    layer.close(confirm);
                                    // 刷新父页面
                                    parent.location.reload('form');
                                });
                            } else {
                                // 提示失败
                                layer.msg(data.msg, {icon: 5});
                                return false;
                            }
                        }
                    );
                });
                break;
            // 批量删除
            case 'del':
                if (checkStatus.data.length < 1) {
                    layer.msg("未选中任何客户流失信息", {icon: 5});
                } else {
                    // 将选中的数据的id封装
                    let ids = "";
                    $.each(checkStatus.data, function (index, id) {
                        if (index == checkStatus.data.length - 1) {
                            ids += "ids=" + id.id;
                        }else {
                            ids += "ids=" + id.id + "&";
                        }
                    });
                    layer.confirm('选中删除行数：<span style="color: orange">'+checkStatus.data.length+'</span><br/>', {
                        btn: ['确定', '取消'],  //按钮
                        icon: 3,
                        title: '客户流失管理 - 批量删除'
                    }, function () {
                        $.post(
                            "customerReprieve/deleteCustomerReprieve?" + ids,
                            {},
                            function (data) {
                                if (data.code == 200) {
                                    layer.msg(data.msg);
                                    // 重载表格
                                    tableIns.reload();
                                } else {
                                    layer.msg(data.msg, {icon: 5});
                                }
                            }
                        );
                    });
                }
                break;
        };
    });

    // 客户流失暂缓管理窗口
    function openCustomerLossDialog(title, url) {
        title = "<h2>" + title + "</h2>";
        layui.layer.open({
            type: 2,
            title: title,
            shadeClose: true,
            shade: 0.6,
            area: ['900px', '500px'],
            content: url,
            // 最大化最小化
            maxmin: true,
            // 不允许窗口拉伸
            resize: false
        });
    }

});