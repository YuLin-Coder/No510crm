layui.use(['table','layer'],function() {
    var $ = layui.jquery,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        table = layui.table;

    // 渲染表格
    layui.treetable.render({
        treeColIndex: 1,
        treeSpid: -1,
        treeIdName: 'id',
        treePidName: 'parentId',
        elem: '#modules',
        url: 'module/modules',
        toolbar: '#toolBar',
        treeDefaultClose: true,
        page: true,
        cols: [[
            {type: 'numbers'},
            {field: 'moduleName', minWidth: 220, title: '菜单名称'},
            {field: 'optValue', minWidth: 80, title: '权限码'},
            {field: 'url', title: '菜单url'},
            {field: 'createDate', minWidth: 100, title: '创建时间'},
            {field: 'updateDate', minWidth: 100, title: '更新时间'},
            {
                field: 'grade', title: '类别', width: 80 ,align: 'center', templet: function (d) {
                    if (d.grade == 0) {
                        return '<span class="layui-badge layui-bg-blue">目录</span>';
                    }else if (d.grade == 1) {
                        return '<span class="layui-badge-rim">菜单</span>';
                    }else if (d.grade == 2) {
                        return '<span class="layui-badge layui-bg-gray">按钮</span>';
                    }
                }
            },
            {templet: function (d) {
                if (d.grade != 2) {
                    return '<a class="layui-btn layui-btn-xs" id="add" lay-event="add">添加子项</a><a class="layui-btn layui-btn-xs layui-bg-orange" lay-event="update">修改</a><a class="layui-btn layui-btn-xs layui-btn-danger" lay-event="delete">删除</a>';
                } else {
                    return '<a class="layui-btn layui-btn-xs layui-btn-danger layui-bg-orange" lay-event="update">修改</a><a class="layui-btn layui-btn-xs layui-btn-danger" lay-event="delete">删除</a>';
                }
            },
            width: 200,fixed:"right", align: "center", title: '操作'}
        ]],
        done: function () {
            layer.closeAll('loading');
        }
    });

    // 表单右侧工具栏
    table.on('tool(modules)', function(obj){
        // 标题
        let title = '';
        switch(obj.event){
            // 添加子项
            case 'add':
                // 开启窗口
                if (obj.data.grade + 1 == 1) {
                    title = '资源管理 - 添加菜单';
                }else if (obj.data.grade + 1 == 2) {
                    title = '资源管理 - 添加按钮';
                }
                openModuleDialog(title, 'module/toAddModule?grade=' + (obj.data.grade + 1) + '&parentId=' + obj.data.id);
                break;
            // 修改菜单或按钮
            case 'update':
                // 开启窗口
                if (obj.data.grade + 1 == 1) {
                    title = '资源管理 - 修改菜单';
                }else if (obj.data.grade + 1 == 2) {
                    title = '资源管理 - 修改按钮';
                }
                openModuleDialog(title, 'module/toUpdateModule?id=' + obj.data.id);
                break;
            // 删除菜单或按钮
            case 'delete':
                layer.confirm('确认删除该资源 - <span style="color: #00FF00">' + obj.data.moduleName + '</span>?', {
                    btn: ['确定', '取消'], //按钮
                    icon: 3,
                    title: '资源管理 - 资源删除'
                }, function () {
                    $.post(
                        "module/deleteModule?ids=" + obj.data.id,
                        {
                            ids: obj.data.id
                        },
                        function (data) {
                            if (data.code == 200) {
                                layer.msg(data.msg);
                                // 重载表格
                                window.location.reload();
                            } else {
                                layer.msg(data.msg, {icon: 5});
                            }
                        }
                    );
                });
                break;
        };
    });

    // 为表头添加响应事件
    table.on('toolbar(modules)', function(obj){
        switch(obj.event){
            // 全部展开事件
            case 'expand':
                layui.treetable.expandAll("#modules");
                break;
            // 全部折叠事件
            case 'fold':
                layui.treetable.foldAll("#modules");
                break;
            case 'add':
                // 添加
                openModuleDialog("资源管理 - 添加目录", "module/toAddModule?grade=0&parentId=-1");
                break;
        };
    });

    // 资源添加新窗口
    function openModuleDialog(title, url) {
        title = "<h2>" + title + "</h2>";
        layui.layer.open({
            type: 2,
            title: title,
            shadeClose: true,
            shade: 0.6,
            area: ['400px', '500px'],
            content: url,
            // 最大化最小化
            maxmin: true,
            // 不允许窗口拉伸
            resize: false
        });
    }

});