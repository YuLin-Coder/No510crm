layui.use(['table','layer','form','laydate'],function() {
    var layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        table = layui.table,
        form = layui.form,
        laydate = layui.laydate;

    // 日期
    laydate.render({
        elem: '#minDate'
    });
    laydate.render({
        elem: '#maxDate'
    });

    /**
     * 渲染客户开发计划表格数据
     */
    var tableIns = table.render({
        elem: '#customerCountList', // 表格绑定的ID
        url: 'customerCount/countCustomerContribution', // 访问数据的地址
        cellMinWidth : 95,
        page : true, // 开启分页
        height : "300",
        limits : [5,10,15,20],
        limit : 5,
        id : "customerCountTable",
        cols : [[
            {field: "name", title:'客户名称',align:"center", sort: true},
            {field: "total", title:'贡献金额/￥',align:"center", sort: true}
        ]]
    });

    // 点击搜索按钮事件
    $(".search_btn").click(function () {
        // 判断最小金额和最大金额是否为一个数字或null或空字符串
        let minMoney = $("[name='minMoney']").val();
        let maxMoney = $("[name='maxMoney']").val();
        if (!(/^\d+$/.test(minMoney) || minMoney == null || minMoney == '')) {
            layer.msg("最小金额必须为数字类型", {icon: 5});
            return false;
        }
        if (!(/^\d+$/.test(maxMoney) || maxMoney == null || maxMoney == '')) {
            layer.msg("最大金额必须为数字类型", {icon: 5});
            return false;
        }
        // 重新渲染表格
        table.reload('customerCountTable', {
            where: {
                customer: $("[name='customer']").val().trim(),
                minMoney: minMoney,
                maxMoney: maxMoney,
                minDate: $("[name='minDate']").val(),
                maxDate: $("[name='maxDate']").val()
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
        $.get("customerCount/countCustomerContribution",
            {
                customer: $("[name='customer']").val().trim(),
                minMoney: $("[name='minMoney']").val(),
                maxMoney: $("[name='maxMoney']").val(),
                minDate: $("[name='minDate']").val(),
                maxDate: $("[name='maxDate']").val(),
                page: 1,
                limit: 1000
            },
            function (data) {
                if (data.code == 0) {
                    let name = [];
                    let value = [];
                    let list = [];
                    for (let i = 0; i < data.data.length; i++) {
                        name.push(data.data[i].name);
                        value.push(data.data[i].total);
                        list.push({
                            "name": data.data[i].name,
                            "value": data.data[i].total
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
                text: '客户贡献分析 - 折柱图',
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
                    name: '贡献金额/￥',
                    min: 0,
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                {
                    type: 'value',
                    name: '贡献金额/￥',
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
                text: '客户贡献分析 - 饼图',
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