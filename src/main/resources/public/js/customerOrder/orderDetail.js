layui.use(['table','layer'],function(){
    var layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        table = layui.table;

    // 渲染表格
    let tableIns = table.render({
            elem: '#orderDetailList',
            url : 'orderDetail/orderDetailList?orderId='+$("#orderId").val(),
            cellMinWidth : 95,
            page : true,
            height : "full-125",
            limits : [5,10,15,20],
            limit : 5,
            // toolbar: "#customerOrderListBar",
            // id : "orderDetailList",
            cols : [[
                {field: "id", title:'编号', minWidth:80, fixed:"true"},
                {field: 'goodsName', title: '商品名称', minWidth:100, align:"center"},
                {field: 'goodsNum', title: '商品数量',align:"center"},
                {field: 'unit', title: '单位',align:"center"},
                {field: 'price', title: '单价(￥)',align:"center"},
                {field: 'sum', title: '总价(￥)',align:"center"},
                {field: 'createDate', title: '创建时间',align:"center"},
                {field: 'updateDate', title: '更新时间',align:"center"}
            ]]
        });
});
