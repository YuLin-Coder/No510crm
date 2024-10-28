layui.use(['table','layer'],function(){
    var layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        table = layui.table;
    /**
     * 用户列表展示
     */
    var  tableIns = table.render({
        elem: '#userList',
        url : 'user/userList',
        cellMinWidth : 95,
        page : true,
        height : "full-125",
        limits : [10,15,20,25],
        limit : 10,
        toolbar: "#toolbarDemo",
        id : "userListTable",
        cols : [[
            {type: "checkbox", fixed:"left", width:50},
            {field: "id", title:'编号',fixed:"true", width:80},
            {field: 'userName', title: '用户名', minWidth:50, align:"center"},
            {field: 'email', title: '用户邮箱', minWidth:100, align:'center'},
            {field: 'phone', title: '用户电话', minWidth:100, align:'center'},
            {title: '身份', align:'center',minWidth:200, templet:
                function (d) {
                    let roleNameBtn = '';
                    $.each(d.roleName, function (index, name) {
                        roleNameBtn += '<button type="button" class="layui-btn layui-btn-xs layui-btn-normal">' + name + '</button>';
                    });
                    return roleNameBtn;
                }
            },
            {field: 'trueName', title: '真实姓名', align:'center'},
            {field: 'createDate', title: '创建时间', align:'center',minWidth:100},
            {field: 'updateDate', title: '更新时间', align:'center',minWidth:100},
            {title: '操作', minWidth:150, templet:'#userListBar',fixed:"right",align:"center"}
        ]]
    });

    // 点击搜索按钮事件
    $(".search_btn").click(function () {
        // 重新渲染表格
        table.reload('userListTable', {
            where: {
                userName: $("[name='userName']").val().trim()
                ,email: $("[name='email']").val().trim()
                ,phone: $("[name='phone']").val().trim()
            }
            ,page: {
                curr: 1 //重新从第 1 页开始
            }
        });
    });

    // 为表格的新增和修改页面添加事件
    table.on('toolbar(users)', function(obj){
        switch(obj.event){
            // 添加事件
            case 'add':
                // 开启子窗口
                openUserDialog("用户管理 - 添加用户", "user/toAddUserPage");
                break;
            // 批量删除事件
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
                        title: '用户管理 - 批量删除'
                    }, function () {
                        $.post(
                            "user/deleteUsers?" + ids,
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

    // 表单右侧工具栏
    table.on('tool(users)', function(obj){
        switch(obj.event){
            // 编辑
            case 'edit':
                // 开启修改编辑窗口
                openUserDialog("用户管理 - 修改用户信息", "user/toAddUserPage?id=" + obj.data.id);
                break;
            // 删除
            case 'del':
                layer.confirm('确认删除该行用户记录？', {
                    btn: ['确定','取消'], //按钮
                    icon: 3,
                    title: '用户管理 - 单行删除'
                }, function(){
                    $.post(
                        "user/deleteUsers",
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
    function openUserDialog(title, url) {
        title = "<h2>" + title + "</h2>";
        layui.layer.open({
            type: 2,
            title: title,
            shadeClose: true,
            shade: 0.6,
            area: ['480px', '390px'],
            content: url,
            // 最大化最小化
            maxmin: true,
            // 不允许窗口拉伸
            resize: false
        });
    }

});