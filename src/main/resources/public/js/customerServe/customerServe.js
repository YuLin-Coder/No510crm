layui.use(['table','layer','form'],function() {
    var layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        table = layui.table,
        form = layui.form;

    /**
     * 渲染客户开发计划表格数据
     */
    var tableIns = table.render({
        elem: '#customerServeList', // 表格绑定的ID
        url : 'customerServe/selectCustomerServes', // 访问数据的地址
        cellMinWidth : 95,
        page : true, // 开启分页
        height : "full-125",
        limits : [10,15,20,25],
        limit : 10,
        toolbar: "#toolbarDemo",
        id : "customerServeTable",
        cols : [[
            {field: "id", title:'编号',align:"center", sort: true},
            {field: "customer", title:'客户名称',align:"center"},
            {title: '服务状态', align: "center", templet: function (d) {
                if (d.state=='fw_001') {
                    return '<span style="color: orchid">服务创建</span>';
                } else if (d.state == 'fw_002') {
                    return '<span style="color: orangered">服务分配</span>';
                } else if (d.state == 'fw_003') {
                    return '<span style="color: olive">服务处理</span>';
                } else if (d.state == 'fw_004') {
                    return '<span style="color: orange">服务反馈</span>';
                } else if (d.state == 'fw_005') {
                    return '<span style="color: olive">服务归档</span>';
                }
            }},
            {field: 'serveType', title: '服务类型',align:"center"},
            {field: 'serviceRequest', title: '概要信息',  align:'center'},
            {field: 'overview', title: '服务内容',  align:'center'},
            {field: 'createPeople', title: '创建人', align:'center'},
            {field: 'createDate', title: '创建时间', align:'center', sort: true},
            {field: 'updateDate', title: '修改时间', align:'center', sort: true},
            {title: '操作', minWidth: 200, fixed:"right",align:"center", templet: function (d) {
                    return formatterBtn(d);
            }}
        ]]
    });

    // 对删除按钮进行处理
    function formatterBtn(customerServe) {
        // 服务状态为fw_001
        if (customerServe.state == 'fw_001') {
            // 删除按钮可用
            return "<a class='layui-btn layui-btn-xs layui-btn-warm' lay-event='pass'>审核通过</a>" +
                "<a class='layui-btn layui-btn-xs layui-btn-success' lay-event='edit'>编辑</a>" +
                "<a class='layui-btn layui-btn-xs layui-btn-danger' lay-event='del'>删除</a>";
        } else {
            // 删除按钮不可用
            return "<a class='layui-btn layui-btn-xs layui-btn-warm layui-btn-disabled'>审核通过</a>" +
                "<a class='layui-btn layui-btn-xs layui-btn-success layui-btn-disabled'>编辑</a>" +
                "<a class='layui-btn layui-btn-xs layui-btn-danger layui-btn-disabled'>删除</a>";
        }
    }

    // 点击搜索按钮事件
    $(".search_btn").click(function () {
        // 重新渲染表格
        table.reload('customerServeTable', {
            where: {
                customer: $("[name='customer']").val().trim(),
                serveType: $("[name='serveType']").val(),
                state: $("[name='state']").val()
            }
            ,page: {
                curr: 1 //重新从第 1 页开始
            }
        });
    });

    // 渲染客户类型下拉框
    renderServeType();
    function renderServeType() {
        $.get(
            "customerServe/selectDicByName",
            {
                "dicName": "服务类型"
            },
            function (data) {
                $("#serveType").append(new Option("服务类型", ""));
                $.each(data, function (index, element) {
                    $("#serveType").append(new Option(element.dicName, element.id));
                });
                form.render("select");
            }
        );
    }

    // 为表格的新增和修改页面添加事件
    table.on('toolbar(customerServe)', function(obj){
        // 获取被选中的数据
        let checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            // 添加事件
            case 'add':
                // 开启子窗口
                openCustomerServeDialog("服务管理 - 服务创建", "customerServe/toAddAndUpdatePage");
                break;
        };
    });

    // 表单右侧工具栏
    table.on('tool(customerServe)', function(obj){
        switch(obj.event){
            case 'edit':
                // 修改
                openCustomerServeDialog("服务管理 - 服务创建修改", "customerServe/toAddAndUpdatePage?id=" + obj.data.id);
                break;
            // 删除
            case 'del':
                layer.confirm('确认删除该行服务记录？', {
                    btn: ['确定','取消'], //按钮
                    icon: 3,
                    title: '客户创建管理删除'
                }, function(){
                    $.post(
                        "customerServe/deleteCustomerServe",
                        {
                            state: "fw_001",
                            id: obj.data.id
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
            // 服务通过
            case 'pass':
                layer.confirm('确认通过该服务：<span style="color: orange">' + obj.data.serviceRequest + '</span>？', {
                    btn: ['确定', '取消'], //按钮
                    icon: 3,
                    title: '服务管理创建审核通过'
                }, function () {
                    $.post(
                        "customerServe/updateState",
                        {
                            state: "fw_001",
                            id: obj.data.id,
                            // 1: 表示打回 0: 表示通过
                            flag: "0"
                        },
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
                break;
        };
    });

    // 开启新窗口
    function openCustomerServeDialog(title, url) {
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