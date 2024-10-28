layui.use(['table','layer','form'],function() {
    var layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        table = layui.table,
        form = layui.form;

    /**
     * 客户信息列表展示
     */
    var  tableIns = table.render({
        elem: '#customerList',
        url : 'customer/customerList',
        cellMinWidth : 95,
        page : true,
        height : "full-125",
        limits : [10,15,20,25],
        limit : 10,
        toolbar: "#toolbar",
        id : "customerTable",
        cols : [[
            {type: "checkbox", fixed:"left", width:50},
            {field: "id", title:'编号',fixed:"true", width:80},
            {field: 'name', title: '客户名', align:'center'},
            {field: 'fr', title: '法人', align:'center'},
            {field: 'khno', title: '客户编号', align:'center'},
            {field: 'area', title: '地区', align:'center'},
            {field: 'cusManager', title: '客户经理', align:'center'},
            {field: 'myd', title: '满意度', align:'center'},
            {field: 'level', title: '客户级别', align:'center'},
            {field: 'xyd', title: '信用度', align:'center'},
            {field: 'address', title: '详细地址', align:'center'},
            {field: 'postCode', title: '邮编', align:'center'},
            {field: 'phone', title: '电话', align:'center'},
            {field: 'webSite', title: '网站', align:'center'},
            {field: 'fax', title: '传真', align:'center'},
            {field: 'zczj', title: '注册资金', align:'center'},
            {field: 'yyzzzch', title: '营业执照', align:'center'},
            {field: 'khyh', title: '开户行', align:'center'},
            {field: 'khzh', title: '开户账号', align:'center'},
            {field: 'gsdjh', title: '国税', align:'center'},
            {field: 'dsdjh', title: '地税', align:'center'},
            {field: 'createDate', title: '创建时间', align:'center'},
            {field: 'updateDate', title: '更新时间', align:'center'},
            {title: '操作', minWidth:150, templet:'#customerListBar',fixed:"right",align:"center"}
        ]]
    });

    // 点击搜索按钮事件
    $(".search_btn").click(function () {
        // 重新渲染表格
        table.reload('customerTable', {
            where: {
                customerName: $("[name='customerName']").val().trim(),
                customerNo: $("[name='customerNo']").val().trim(),
                level: $("[name='level']").val()
            }
            ,page: {
                curr: 1 //重新从第 1 页开始
            }
        });
    });

    // 为表格的新增和修改页面添加事件
    table.on('toolbar(customers)', function(obj){
        // 获取被选中的数据
        let checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            // 添加事件
            case 'add':
                // 开启子窗口
                openCustomerDialog("客户信息管理 - 添加客户信息", "customer/toAddAndUpdatePage");
                break;
            // 批量删除事件
            case 'del':
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
                        title: '客户信息管理 - 批量删除'
                    }, function () {
                        $.post(
                            "customer/deleteCustomer?" + ids,
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
            // 联系人管理
            case 'link':
                layer.msg("<span style='color: #00FF00'>联系人管理：</span>只有表结构，暂时没有动力开发",{icon: 5});
                break;
            // 交往记录
            case 'record':
                layer.msg("<span style='color: #00FF00'>交往记录：</span>只有表结构，暂时没有动力开发",{icon: 5});
                break;
            // 订单
            case 'order':
                if (checkStatus.data.length == 0) {
                    layer.msg("未选中任何客户信息", {icon: 5});
                }else if (checkStatus.data.length > 1) {
                    layer.msg("无法同时查看多个客户信息", {icon: 5});
                } else {
                    // 开启客户订单窗口
                    openCustomerDialog("客户管理 - 查询订单信息", "customer/toCustomerOrderPage?customerId=" + checkStatus.data[0].id);
                    break;
                }
        };
    });

    // 表单右侧工具栏
    table.on('tool(customers)', function(obj){
        switch(obj.event){
            // 编辑
            case 'edit':
                // 开启修改编辑窗口
                openCustomerDialog("客户信息管理 - 添加客户信息", "customer/toAddAndUpdatePage?id=" + obj.data.id);
                break;
            // 删除
            case 'del':
                layer.confirm('确认删除该行客户记录？', {
                    btn: ['确定','取消'], //按钮
                    icon: 3,
                    title: '客户信息管理 - 单行删除'
                }, function(){
                    $.post(
                        "customer/deleteCustomer",
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
    function openCustomerDialog(title, url) {
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

    // 客户订单信息管理窗口
    function openCustomerDialog(title, url) {
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

    // 渲染客户级别下拉款
    renderLevel();
    function renderLevel() {
        $.get(
            "customer/getLevels",
            {},
            function (data) {
                $("#level").append(new Option("客户级别", ""));
                $.each(data, function (index, element) {
                    $("#level").append(new Option(element, element));
                });
                form.render("select");
            }
        );
    }

});