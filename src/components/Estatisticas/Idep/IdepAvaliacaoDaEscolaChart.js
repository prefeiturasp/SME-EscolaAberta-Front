import React, {PureComponent} from "react";
import ReactEcharts from 'echarts-for-react';

export default class IdepAvaliacaoDaEscolaChart extends PureComponent {

    getOption() {
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                data: ['Alcançado', 'Meta']
            },
            xAxis: [
                {
                    type: 'category',
                    name: 'Anos',
                    nameLocation: 'middle',
                    nameGap: 50,
                    axisTick: {
                        alignWithLabel: true
                    },
                    data: this.props.todos_anos_exibicao,
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: 'Meta',
                    min: 0,
                    max: 10,
                    nameLocation: 'middle',
                    nameGap: 50,
                },
            ],
            series: [
                {
                    name: 'Alcançado',
                    type: 'bar',
                    data: [this.props.indice_atual_exibicao],
                    color: '#75BCFC'
                },
                {
                    name: 'Meta',
                    type: 'line',
                    yAxisIndex: 0,
                    data: this.props.todos_indices_exibicao,
                    color: '#B5D248'
                }
            ]
        };
        return option;
    }

    render() {
        return (
            <div>
                <ReactEcharts
                    option={this.getOption()}
                    style={{height: '25em', width: '100%'}}
                    theme={"light"}
                    className="react_for_echarts"
                />
            </div>
        );
    }
}