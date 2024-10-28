layui.use(['table','layer'],function(){
    var layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        table = layui.table;

    /**
     * 计划项数据展示
     */
    // 获取开发状态
    let devResult = $("#devResult").val();
    // 隐藏操作工具栏
    let tableIns;
    if (devResult == 0 || devResult == 1) {
        tableIns = table.render({
            elem: '#cusDevPlanList',
            url : 'cusDevPlan/cusDevPlan?saleChanceId='+$("input[name='id']").val(),
            cellMinWidth : 95,
            page : true,
            height : "full-125",
            limits : [5,10,15,20],
            limit : 5,
            toolbar: "#toolbarDemo",
            id : "cusDevPlanListTable",
            cols : [[
                {type: "checkbox", fixed:"center"},
                {field: "id", title:'编号',fixed:"true"},
                {field: 'planItem', title: '计划项',align:"center"},
                {field: 'exeAffect', title: '执行效果',align:"center"},
                {field: 'planDate', title: '执行时间',align:"center"},
                {field: 'createDate', title: '创建时间',align:"center"},
                {field: 'updateDate', title: '更新时间',align:"center"},
                {title: '操作',fixed:"right",align:"center", minWidth:150,templet:"#cusDevPlanListBar"}
            ]]
        });
    } else {
        tableIns = table.render({
            elem: '#cusDevPlanList',
            url : 'cusDevPlan/cusDevPlan?saleChanceId='+$("input[name='id']").val(),
            cellMinWidth : 95,
            page : true,
            height : "full-125",
            limits : [5,10,15,20],
            limit : 5,
            id : "cusDevPlanListTable",
            cols : [[
                {field: "id", title:'编号',fixed:"true"},
                {field: 'planItem', title: '计划项',align:"center"},
                {field: 'exeAffect', title: '执行效果',align:"center"},
                {field: 'planDate', title: '执行时间',align:"center"},
                {field: 'createDate', title: '创建时间',align:"center"},
                {field: 'updateDate', title: '更新时间',align:"center"}
            ]]
        });
    }

    // 头部工具栏
    table.on('toolbar(cusDevPlans)', function(obj){
        switch(obj.event){
            // 添加
            case 'add':
                // 开启子窗口
                openCusDevPlanDialog("客户开发计划 - 添加计划项", "cusDevPlan/toAddAndUpdatePage?saleChanceId="+$("[name='id']").val());
                break;
            // 批量删除
            case 'del':
                // 获取被选中的数据
                let checkStatus = table.checkStatus(obj.config.id);
                if (checkStatus.data.length < 1) {
                    layer.msg("未选中任何数据", {icon: 5});
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
                        btn: ['确定', '取消'], //按钮
                        icon: 3,
                        title: '客户开发计划 - 批量删除'
                    }, function () {
                        $.post(
                            "cusDevPlan/deleteCusDevPlan?" + ids,
                            {},
                            function (data) {
                                if (data.code == 200) {
                                    layer.msg(data.msg);
                                    // 重载表格
                                    parent.location.reload("form");
                                } else {
                                    layer.msg(data.msg, {icon: 5});
                                }
                            }
                        );
                    });
                }
                break;
            // 标记成功
            case 'success':
                layer.confirm('确认将当前销售机会开发状态修改为<span style="color: orange">开发成功</span>', {
                    btn: ['确定', '取消'], //按钮
                    icon: 3,
                    title: '客户开发计划 - 修改开发状态'
                }, function () {
                    $.post(
                        "cusDevPlan/updateDevResult",
                        {
                            id: $("[name='id']").val(),
                            devResult: '2'  // 2：开发成功
                        },
                        function (data) {
                            if (data.code == 200) {
                                layer.msg(data.msg);
                                // 重载表格
                                parent.location.reload("form");
                            } else {
                                layer.msg(data.msg, {icon: 5});
                            }
                        }
                    );
                });
                break;
            // 标记失败
            case 'failed':
                layer.confirm('确认将当前销售机会开发状态修改为<span style="color: orange">开发失败</span>', {
                    btn: ['确定', '取消'], //按钮
                    icon: 3,
                    title: '客户开发计划 - 修改开发状态'
                }, function () {
                    $.post(
                        "cusDevPlan/updateDevResult",
                        {
                            id: $("[name='id']").val(),
                            devResult: '3'  // 3：开发失败
                        },
                        function (data) {
                            if (data.code == 200) {
                                layer.msg(data.msg);
                                // 重载表格
                                parent.location.reload("form");
                            } else {
                                layer.msg(data.msg, {icon: 5});
                            }
                        }
                    );
                });
                break;
        };
    });

    // 表单右侧工具栏
    table.on('tool(cusDevPlans)', function(obj){
        switch(obj.event){
            // 编辑
            case 'edit':
                // 开启修改编辑窗口
                openCusDevPlanDialog("客户开发计划 - 修改计划项", "cusDevPlan/toAddAndUpdatePage?saleChanceId=" + $("[name='id']").val() + "&id=" + obj.data.id);
                break;
            // 删除
            case 'del':
                layer.confirm('确认删除该行客户开发计划记录？', {
                    btn: ['确定','取消'], //按钮
                    icon: 3,
                    title: '客户开发计划 - 单行删除'
                }, function(){
                    $.post(
                        "cusDevPlan/deleteCusDevPlan",
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

    // 开启新窗口
    function openCusDevPlanDialog(title, url) {
        title = "<h2>" + title + "</h2>";
        layui.layer.open({
            type: 2,
            title: title,
            shadeClose: true,
            shade: 0.6,
            area: ['400px', '380px'],
            content: url,
            // 最大化最小化
            maxmin: true,
            // 不允许窗口拉伸
            resize: false
        });

    }

});
