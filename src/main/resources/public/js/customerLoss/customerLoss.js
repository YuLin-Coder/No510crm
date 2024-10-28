layui.use(['table','layer','form'],function() {
    var layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        table = layui.table,
        form = layui.form;

    /**
     * 客户流失信息列表展示
     */
    var  tableIns = table.render({
        elem: '#customerLossList',
        url : 'customerLoss/customerLossList',
        cellMinWidth : 95,
        page : true,
        height : "full-125",
        limits : [10,15,20,25],
        limit : 10,
        id : "customerLossTable",
        cols : [[
            {type: "checkbox", fixed:"left", width:50},
            {field: "id", title:'编号',fixed:"true", width:80},
            {field: 'cusNo', title: '客户编号', align:'center'},
            {field: 'cusName', title: '客户名称', align:'center'},
            {field: 'cusManager', title: '客户经理', align:'center'},
            {field: 'lastOrderTime', title: '最后下单时间', align:'center'},
            {field: 'confirmLossTime', title: '确认流失时间', align:'center'},
            {field: 'state', title: '流失状态', align:'center', templet:
                function (d) {
                    if (d.state == 0) {
                        return '<span style="color: #00FF00">暂缓</span>';
                    } else {
                        return '<span style="color: #00FF00">已流失</span>';
                    }
                }
            },
            {field: 'lossReason', title: '流失原因', align:'center'},
            {field: 'createDate', title: '创建时间', align:'center'},
            {field: 'updateDate', title: '更新时间', align:'center'},
            {title: '操作', minWidth:150, fixed:"right",align:"center", templet:
                function (d) {
                    if (d.state == 0) {
                        return '<a class="layui-btn layui-btn-xs" id="edit" lay-event="add">添加暂缓</a>';
                    } else {
                        return '<a class="layui-btn layui-btn-xs layui-btn-danger" lay-event="info">详情</a>';
                    }
                }
            }
        ]]
    });

    // 点击搜索按钮事件
    $(".search_btn").click(function () {
        // 重新渲染表格
        table.reload('customerLossTable', {
            where: {
                customerNo: $("[name='customerNo']").val().trim(),
                customerName: $("[name='customerName']").val().trim(),
                state: $("[name='state']").val()
            }
            ,page: {
                curr: 1 //重新从第 1 页开始
            }
        });
    });

    // 表单右侧工具栏
    table.on('tool(customerLoss)', function(obj){
        switch(obj.event){
            // 添加暂缓
            case 'add':
                openCustomerLossDialog("客户流失管理 - 添加暂缓客户", "customerLoss/customerLossData?id=" + obj.data.id);
                break;
            // 详情
            case 'info':
                openCustomerLossDialog("客户流失管理 - 暂缓客户详情", "customerLoss/customerLossData?id=" + obj.data.id);
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