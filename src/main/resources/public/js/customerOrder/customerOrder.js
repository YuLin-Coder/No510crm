layui.use(['table','layer'],function(){
    var layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        table = layui.table;

    // 渲染表格
    let tableIns = table.render({
            elem: '#customerOrderList',
            url : 'customerOrder/customerOrderList?cusId='+$("input[name='cusId']").val(),
            cellMinWidth : 95,
            page : true,
            height : "full-125",
            limits : [5,10,15,20],
            limit : 5,
            // toolbar: "#customerOrderListBar",
            id : "customerOrderTable",
            cols : [[
                {field: "id", title:'编号', minWidth:80, fixed:"true"},
                {field: 'orderNo', title: '订单编号', minWidth:100, align:"center"},
                {field: 'orderDate', title: '下单日期',align:"center"},
                {field: 'address', title: '收获地址',align:"center"},
                {field: 'state', title: '支付状态',align:"center", templet:
                    function (d) {
                        // 已支付
                        if (d.state == 1) {
                            return '已支付';
                        } else {
                            return '未支付';
                        }
                    }
                },
                {field: 'createDate', title: '创建时间',align:"center"},
                {field: 'updateDate', title: '更新时间',align:"center"},
                {title: '操作',fixed:"right",align:"center", minWidth:100,templet:"#customerOrderListBar"}
            ]]
        });

    // 监听表格右侧工具栏点击事件
    table.on('tool(customerOrders)', function(obj){
        switch(obj.event){
            // 进入订单详情窗口
            case 'detail':
                // 开启修改编辑窗口
                openCustomerOrderDetailDialog("客户信息管理 - 查询订单详情", "orderDetail/toOrderDetailPage?id=" + obj.data.id);
                break;
        };
    });

    // 开启新窗口
    function openCustomerOrderDetailDialog(title, url) {
        title = "<h2>" + title + "</h2>";
        layui.layer.open({
            type: 2,
            title: title,
            shadeClose: true,
            shade: 0.6,
            area: ['850px', '400px'],
            content: url,
            // 最大化最小化
            maxmin: true,
            // 不允许窗口拉伸
            resize: false
        });
    }

});
