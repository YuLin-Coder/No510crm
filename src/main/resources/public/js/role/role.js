layui.use(['table','layer'],function() {
    var layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        table = layui.table;

    /**
     * 角色列表展示
     */
    var  tableIns = table.render({
        elem: '#roles',
        url : 'role/roleList',
        cellMinWidth : 95,
        page : true,
        height : "full-125",
        limits : [10,15,20,25],
        limit : 10,
        toolbar: "#toolbarDemo",
        id : "roleTable",
        cols : [[
            {type: "checkbox", fixed:"left", width:50},
            {field: "id", title:'编号',fixed:"true", width:80},
            {
                // 为角色名着色
                field: 'roleName', title: '角色名', minWidth:150, align:"center", templet: function (d) {
                    return '<span style="color: #FFB800;">' + d.roleName + '</span>';
                }
            },
            {field: 'roleRemark', title: '角色备注', minWidth:100, align:'center'},
            {field: 'createDate', title: '创建时间', align:'center',minWidth:150},
            {field: 'updateDate', title: '更新时间', align:'center',minWidth:150},
            {title: '操作', minWidth:150, templet:'#roleBar',fixed:"right",align:"center"}
        ]]
    });

    // 点击搜索按钮事件
    $(".search_btn").click(function () {
        // 重新渲染表格
        table.reload('roleTable', {
            where: {
                roleName: $("[name='roleName']").val().trim()
            }
            ,page: {
                curr: 1 //重新从第 1 页开始
            }
        });
    });

    // 为表格的新增和修改页面添加事件
    table.on('toolbar(roles)', function(obj){
        // 获取被选中的数据
        let checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            // 添加事件
            case 'add':
                // 开启子窗口
                openRoleDialog("角色管理 - 添加角色", "role/toAddAndUpdatePage");
                break;
            // 批量删除事件
            case 'del':
                if (checkStatus.data.length < 1) {
                    layer.msg("未选中任何角色", {icon: 5});
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
                        title: '角色管理 - 批量删除'
                    }, function () {
                        $.post(
                            "role/deleteRole?" + ids,
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
            // 授权事件
            case 'grant':
                if (checkStatus.data.length == 0) {
                    layer.msg("未选中任何角色", {icon: 5});
                }else if (checkStatus.data.length > 1) {
                    layer.msg("不能同时授权给多个角色", {icon: 5});
                } else {
                    // 开启子窗口
                    openModuleDialog("授权管理 - 角色授权", "module/toModulePage?roleId=" + checkStatus.data[0].id);
                }
                break;
        };
    });

    // 表单右侧工具栏
    table.on('tool(roles)', function(obj){
        switch(obj.event){
            // 编辑
            case 'edit':
                // 开启修改编辑窗口
                openRoleDialog("角色管理 - 修改角色", "role/toAddAndUpdatePage?roleId=" + obj.data.id);
                break;
            // 删除
            case 'del':
                layer.confirm('确认删除该行用户记录？', {
                    btn: ['确定','取消'], //按钮
                    icon: 3,
                    title: '角色管理 - 单行删除'
                }, function(){
                    $.post(
                        "role/deleteRole",
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
    function openRoleDialog(title, url) {
        title = "<h2>" + title + "</h2>";
        layui.layer.open({
            type: 2,
            title: title,
            shadeClose: true,
            shade: 0.6,
            area: ['420px', '250px'],
            content: url,
            // 最大化最小化
            maxmin: true,
            // 不允许窗口拉伸
            resize: false
        });
    }

    // 为授权管理开启新窗口
    function openModuleDialog(title, url) {
        title = "<h2>" + title + "</h2>";
        layui.layer.open({
            type: 2,
            title: title,
            shadeClose: true,
            shade: 0.6,
            area: ['400px', '600px'],
            content: url,
            // 最大化最小化
            maxmin: true,
            // 不允许窗口拉伸
            resize: false
        });
    }

});