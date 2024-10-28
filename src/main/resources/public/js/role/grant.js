layui.use(['form', 'layer'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery;

    // 加载树形结构，扩大作用域
    var zTreeObj;
    // 被选中的节点id，全局变量扩大作用域
    nodes = [];
    loadtree();

    /**
     * 确定按钮点击事件
     */
    $(".true").click(function (){
        layer.confirm('确认修改？', {
            btn: ['确定', '取消'], //按钮
            icon: 3,
            title: '角色授权'
        }, function () {
            // 拼参数
            let ids = '';
            $.each(nodes, function (index, node) {
                if (index == nodes.length - 1) {
                    ids += 'ids=' + node;
                } else {
                    ids += 'ids=' + node + '&';
                }
            });
            $.post(
                "permission/updatePermission?roleId=" + $("[name='roleId']").val() + '&' + ids,
                {},
                function (data) {
                    if (data.code == 200) {
                        layer.confirm(data.msg + '，授权的效果需要<span style="color: #00FF00">刷新页面</span>才能生效',
                            {
                                btn: ['立即刷新', '取消'], //按钮
                                icon: 3,
                                title: '刷新页面'
                            }, function () {
                                // 刷新页面
                                parent.parent.location.reload();
                            }
                        );
                    } else {
                        layer.msg(data.msg, {icon: 5});
                    }
                }
            );
        });
    });

    /**
     * 取消按钮点击事件
     */
    $(".false").click(function (){
        // 关闭当前窗口
        // 获取当前iframe层的索引
        let index = parent.layer.getFrameIndex(window.name);
        // 关闭当前弹出层
        parent.layer.close(index);
    });

    /**
     * 渲染zTree树
     */
    function loadtree() {
        let setting = {
            // 开启复选框
            check: {
                enable: true
            },
            // 数据来源使用简单json格式
            data: {
                simpleData: {
                    enable: true
                }
            },
            // 定义复选框被点击时触发的方法
            callback: {
                onCheck: zTreeOnCheck
            }
        };
        // zTree 的数据属性
        $.get(
            "module/moduleList",
            {
                roleId: $("[name='roleId']").val()
            },
            function (zNodes) {
                $(document).ready(function(){
                    zTreeObj = $.fn.zTree.init($("#zTree"), setting, zNodes);
                });
            }
        );
    }

    /**
     * 获取被选中的节点数据
     * @param event
     * @param treeId
     * @param treeNode
     */
    function zTreeOnCheck(event, treeId, treeNode) {
        // 防止之前的数据影响，先清空数组
        nodes=[];
        // 获取所有被选中的节点数据
        let checkedNodes = zTreeObj.getCheckedNodes(true);
        $.each(checkedNodes, function (index, node) {
            nodes.push(node.id);
        });
    }

});