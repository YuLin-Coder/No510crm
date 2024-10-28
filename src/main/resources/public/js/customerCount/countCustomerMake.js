layui.use(['table','layer'],function() {
    var layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery;

    // 获取折线图数据
    $.get("customerCount/countCustomerMake", {}, function (data) {
        if (data.code == 200) {
            // 折柱图
            makeCategory(data.result.customerName, data.result.customerValue);
            // 饼图
            makePie(data.result.customerName, data.result.customerValue);
        } else {
            // 请求返回失败
            layer.msg(data.msg,{icon: 5});
        }
    });

    /**
     * 渲染折线图
     */
    function makeCategory(name, value) {
        let chartDom = document.getElementById('category');
        let myChart = echarts.init(chartDom);
        let option = {
            title: {
                text: '客户组成分析 - 折柱图',
                x: 'center',
                y: 'top',
                textStyle: {
                    top: 0,
                    fontSize: '32px',
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
    function makePie(name, value) {
        // 构造对象
        let list = [];
        for (let i = 0; i < name.length; i++) {
            list.push({
                name: name[i],
                value: value[i]
            });
        }
        let chartDom = document.getElementById('pie');
        let myChart = echarts.init(chartDom);
        let option = {
            title: {
                text: '客户组成分析 - 饼图',
                left: 'center',
                top: 0,
                textStyle: {
                    fontSize: '32px',
                    color: 'orange'
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
                    radius: '75%',
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