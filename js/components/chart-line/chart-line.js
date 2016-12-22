/**
 * Created by ping on 16/6/30.
 */

require('chart-line.scss');
const util = require('util');
const React = require('react');
const render = require('react-dom').render;


export class ChartLine extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            chartLine: null
        }
    }

    render () {
        let {chartId} = this.props;
        return (
            <div className="module-chart-line">
                <div id={chartId} className="chart-line" ref="chartBody"></div>
            </div>
        );
    }

    componentDidMount () {
        let {chartId} = this.props;
        this.state.chartLine = echarts.init(document.getElementById(chartId));
        this.state.chartLine.setOption({
            tooltip: {},
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: [],
                axisLine: {
                    lineStyle: {
                        color: '#f0f0f0',
                        type: 'dashed'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    margin: 20,
                    textStyle: {
                        color: '#b5b5b5'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#f0f0f0'
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#f0f0f0'
                    }
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    margin: 20,
                    textStyle: {
                        color: '#b5b5b5'
                    }
                },
                splitNumber: 5,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#f0f0f0'
                    }
                }
            },
            series: [
                {
                    name:'风控',
                    type:'line',
                    symbol: 'emptyCircle',
                    symbolSize: 10,
                    itemStyle: {
                        normal: {
                            color: "#29c7ca"
                        }
                    },
                    data: [],
                    connectNulls: true
                }
            ]
        });
    }

    componentWillReceiveProps (nextProps) {
        let {lineData} = nextProps;
        if (this.refs.chartBody && lineData) {
            this.state.chartLine.setOption({
                xAxis: {
                    data: lineData.xAxis
                },
                series: [{
                    data: lineData.yAxis
                }]
            });
        }
    }
}