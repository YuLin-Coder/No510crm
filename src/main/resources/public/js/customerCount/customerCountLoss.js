layui.use(['table','layer','form'],function() {
    var layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        table = layui.table,
        form = layui.form;

    /**
     * 客户流失信息列表展示
     */
    var  tableIns = table.render({
        elem: '#customerLossList',
        url: 'customerLoss/customerLossList?state=1',
        cellMinWidth : 95,
        page : true,
        height : "350",
        limits : [5,10,15,20],
        limit : 5,
        id : "customerLossTable",
        cols : [[
            {field: "id", title:'编号',fixed:"true", width:80},
            {field: 'cusNo', title: '客户编号', align:'center'},
            {field: 'cusName', title: '客户名称', align:'center'},
            {field: 'cusManager', title: '客户经理', align:'center'},
            {field: 'lastOrderTime', title: '最后下单时间', align:'center'
                ,templet: d => {
                    if (!d.lastOrderTime) {
                        return "<span style='color: orange'>没有下单记录</span>";
                    }
                    return d.lastOrderTime;
                }
            },
            {field: 'confirmLossTime', title: '确认流失时间', align:'center'},
            {field: 'state', title: '流失状态', align:'center', templet:
                function (d) {
                    if (d.state == 0) {
                        return '<span style="color: #00FF00">暂缓</span>';
                    } else {
                        return '<span style="color: #00FF00">已流失</span>';
                    }
                }
            },
            {field: 'lossReason', title: '流失原因', align:'center'},
            {field: 'createDate', title: '创建时间', align:'center'},
            {field: 'updateDate', title: '更新时间', align:'center'}
        ]]
    });

    // 点击搜索按钮事件
    $(".search_btn").click(function () {
        // 重新渲染表格
        table.reload('customerLossTable', {
            where: {
                customerNo: $("[name='customerNo']").val().trim(),
                customerName: $("[name='customerName']").val().trim(),
                state: $("[name='state']").val()
            }
            ,page: {
                curr: 1 //重新从第 1 页开始
            }
        });
        // 重新渲染图表
        getChartData();
    });

    // 获取折线图数据
    getChartData();
    function getChartData() {
        $.get("customerCount/countCustomerLoss",
            {
                customerNo: $("[name='customerNo']").val().trim(),
                customerName: $("[name='customerName']").val().trim()
            },
            function (data) {
                if (data.code == 200) {
                    let name = [];
                    let value = [];
                    let list = [];
                    for (let i = 0; i < data.result.length; i++) {
                        name.push(data.result[i].date.substring(0, 10));
                        value.push(data.result[i].total);
                        list.push({
                            "name": data.result[i].date.substring(0, 10),
                            "value": data.result[i].total
                        });
                    }
                    // 折柱图
                    makeCategory(name, value);
                    // 饼图
                    makePie(list);
                } else {
                    // 请求返回失败
                    layer.msg(data.msg,{icon: 5});
                }
            });
    }

    /**
     * 渲染折线图
     */
    function makeCategory(name, value) {
        let chartDom = document.getElementById('category');
        let myChart = echarts.init(chartDom);
        let option = {
            title: {
                text: '客户流失分析 - 折柱图',
                subtext: '数据不受表格分页影响',
                x: 'center',
                y: 'top',
                textStyle: {
                    top: 0,
                    fontSize: '24px',
                    color: 'orange'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            toolbox: {
                feature: {
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            legend: {
                left: 'right',
                data: ['柱状图', '折线图']
            },
            xAxis: [
                {
                    type: 'category',
                    data: name,
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '个数',
                    min: 0,
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                {
                    type: 'value',
                    name: '个数',
                    min: 0,
                    axisLabel: {
                        formatter: '{value}'
                    }
                }
            ],
            series: [
                {
                    name: '柱状图',
                    type: 'bar',
                    data: value
                },
                {
                    name: '折线图',
                    type: 'line',
                    yAxisIndex: 1,
                    data: value
                }
            ]
        };
        option && myChart.setOption(option);
    }

    /**
     * 渲染饼图
     * @param name
     * @param value
     */
    function makePie(list) {
        let chartDom = document.getElementById('pie');
        let myChart = echarts.init(chartDom);
        let option = {
            title: {
                text: '客户流失分析 - 饼图',
                subtext: '数据不受表格分页影响',
                x: '50px',
                y: 'top',
                textStyle: {
                    fontSize: '24px',
                    color: 'orange',
                }
            },

            legend: {
                orient: 'vertical',
                left: 'right'
            },

            tooltip: {
                trigger: 'item'
            },

            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series: [
                {
                    name: '个数',
                    type: 'pie',
                    radius: '70%',
                    center: ['50%', '50%'],
                    data: list.sort(function (a, b) { return a.value - b.value; }),
                    roseType: 'radius',
                    label: {
                        color: 'rgba(0, 0, 0, 0.5)'
                    },
                    labelLine: {
                        lineStyle: {
                            color: 'rgba(0, 0, 0, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    },
                    itemStyle: {
                        color: '#c23531'
                    },

                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        };
        option && myChart.setOption(option);
    }

});