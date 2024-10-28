layui.use(['table','layer'],function(){
    var layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        table = layui.table;

    /**
     * 营销机会列表展示
     */
    var  tableIns = table.render({
        elem: '#saleChanceList', // 表格绑定的ID
        url : 'saleChance/saleChanceList', // 访问数据的地址
        cellMinWidth : 95,
        page : true, // 开启分页
        height : "full-125",
        limits : [10,15,20,25],
        limit : 10,
        toolbar: "#toolbarDemo",
        id : "saleChanceListTable",
        cols : [[
            {type: "checkbox", fixed:"center"},
            {field: "id", title:'编号',fixed:"true"},
            {field: 'chanceSource', title: '机会来源',align:"center"},
            {field: 'customerName', title: '客户名称',  align:'center'},
            {field: 'cgjl', title: '成功几率', align:'center'},
            {field: 'overview', title: '概要', align:'center'},
            {field: 'linkMan', title: '联系人',  align:'center'},
            {field: 'linkPhone', title: '联系电话', align:'center'},
            {field: 'description', title: '描述', align:'center'},
            {field: 'createMan', title: '创建人', align:'center'},
            {field: 'createDate', title: '创建时间', align:'center'},
            {field: 'userName', title: '指派人', align:'center'},
            {field: 'assignTime', title: '分配时间', align:'center'},
            {field: 'state', title: '分配状态', fixed:'right',templet:function(d){
                    return formatterState(d.state);
            }},
            {field: 'devResult', title: '开发状态', fixed:'right',templet:function (d) {
                    return formatterDevResult(d.devResult);
            }},
            {title: '操作', templet:'#saleChanceListBar',fixed:"right",align:"center", minWidth:150}
        ]]
    });

    /**
     * 格式化分配状态
     *  0 - 未分配
     *  1 - 已分配
     *  其他 - 未知
     * @param state
     * @returns {string}
     */
    function formatterState(state){
        if(state==0) {
            return "<div style='color: orange'>未分配</div>";
        } else if(state==1) {
            return "<div style='color: green'>已分配</div>";
        } else {
            return "<div style='color: red'>未知</div>";
        }
    }

    /**
     * 格式化开发状态
     *  0 - 未开发
     *  1 - 开发中
     *  2 - 开发成功
     *  3 - 开发失败
     * @param value
     * @returns {string}
     */
    function formatterDevResult(value){
        if(value == 0) {
            return "<div style='color: orange'>未开发</div>";
        } else if(value==1) {
            return "<div style='color: #00FF00;'>开发中</div>";
        } else if(value==2) {
            return "<div style='color: #00B83F'>开发成功</div>";
        } else if(value==3) {
            return "<div style='color: red'>开发失败</div>";
        } else {
            return "<div style='color: #af0000'>未知</div>"
        }
    }

    // 点击搜索按钮事件
    $(".search_btn").click(function () {
        // 重新渲染表格
        table.reload('saleChanceListTable', {
            where: {
                customerName: $("[name='customerName']").val().trim()
                ,createMan: $("[name='createMan']").val().trim()
                ,state: $("#state").val()
            }
            ,page: {
                curr: 1 //重新从第 1 页开始
            }
        });
    });

    // 为表格的新增和修改页面添加事件
    table.on('toolbar(saleChances)', function(obj){
        switch(obj.event){
            // 添加事件
            case 'add':
                // 开启子窗口
                openSaleChanceDialog("销售机会管理 - 添加营销机会", "saleChance/toSaleChance");
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
                        title: '营销机会管理 - 批量删除'
                    }, function () {
                        $.post(
                            "saleChance/deleteSaleChance?" + ids,
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
    table.on('tool(saleChances)', function(obj){
        // console.log("obj", obj);
        switch(obj.event){
            // 修改事件
            case 'edit':
                openSaleChanceDialog("销售机会管理 - 修改营销机会", "saleChance/toSaleChance?id=" + obj.data.id);
                break;
            // 删除事件
            case 'del':
                layer.confirm('确认删除该行销售机会记录？', {
                    btn: ['确定','取消'], //按钮
                    icon: 3,
                    title: '营销机会管理 - 单行删除'
                }, function(){
                    $.post(
                        "saleChance/deleteSaleChance",
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
    function openSaleChanceDialog(title, url) {
        title = "<h2>" + title + "</h2>";
        layui.layer.open({
            type: 2,
            title: title,
            shadeClose: true,
            shade: 0.6,
            area: ['500px', '620px'],
            content: url,
            // 最大化最小化
            maxmin: true,
            // 不允许窗口拉伸
            resize: false
        });

    }


});
