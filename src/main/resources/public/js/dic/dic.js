layui.use(['table','layer'],function(){
    var layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        table = layui.table;

    var  tableIns = table.render({
        elem: '#dicList',
        url : 'dic/selectAllDic',
        cellMinWidth : 95,
        page : true,
        height : "full-125",
        limits : [10,15,20,25],
        limit : 10,
        toolbar: "#toolbarDemo",
        id : "dicListTable",
        cols : [[
            {field: "id", title:'编号',fixed:"true", width:80, sort: true},
            {field: 'dataDicName', title: '字典名称', minWidth:50, align:"center", sort: true},
            {field: 'dataDicValue', title: '字典值', minWidth:100, align:'center'},
            {field: 'createDate', title: '创建时间', align:'center',minWidth:100, sort: true},
            {field: 'updateDate', title: '更新时间', align:'center',minWidth:100, sort: true},
            {title: '操作', minWidth:150, templet:'#dicListBar',fixed:"right",align:"center"}
        ]]
    });

    // 点击搜索按钮事件
    $(".search_btn").click(function () {
        // 重新渲染表格
        table.reload('dicListTable', {
            where: {
                dicName: $("[name='dicName']").val().trim()
            }
            ,page: {
                curr: 1 //重新从第 1 页开始
            }
        });
    });

    // 为表格的新增和修改页面添加事件
    table.on('toolbar(dic)', function(obj){
        switch(obj.event){
            // 添加事件
            case 'add':
                // 开启子窗口
                openDicDialog("字典管理 - 添加字典", "dic/toAddAndUpdatePage");
                break;
        };
    });

    // 表单右侧工具栏
    table.on('tool(dic)', function(obj){
        switch(obj.event){
            // 编辑
            case 'edit':
                // 开启修改编辑窗口
                openDicDialog("字典管理 - 修改字典", "dic/toAddAndUpdatePage?id=" + obj.data.id);
                break;
            // 删除
            case 'del':
                layer.confirm('确认删除字典<span style="color: orange">'+ obj.data.dataDicName + ' - ' + obj.data.dataDicValue + '</span>？', {
                    btn: ['确定', '取消'], //按钮
                    icon: 3,
                    title: '用户管理 - 删除字典'
                }, function () {
                    $.post(
                        "dic/deleteDicById",
                        {
                            id: obj.data.id
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
    function openDicDialog(title, url) {
        title = "<h2>" + title + "</h2>";
        layui.layer.open({
            type: 2,
            title: title,
            shadeClose: true,
            shade: 0.6,
            area: ['480px', '250px'],
            content: url,
            // 最大化最小化
            maxmin: true,
            // 不允许窗口拉伸
            resize: false
        });
    }

});