import React, { PureComponent } from 'react';
//import EchartsReact from './helpers/ReactEcharts';
import EchartsReact from './helpers/ReactEcharts';

export default class ChartContainer extends PureComponent {
  constructor(propos){
    super(propos);

    this.state = {

      options: {

        color: ['#5793f3', '#d14a61', '#675bba'],

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
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          }
        ],
        yAxis: [
          {

            type: 'value',
            data: [120, 200, 150, 80, 70, 110, 130],
            name: 'Meta',
            min: 0,
            max: 250,
            //position: 'middle',
            nameLocation: 'middle',
            nameGap: 50,
            axisLine: {
              lineStyle: {
                //color: color[0]
              }
            },
            axisLabel: {
              //formatter: '{value} ml'
            }
          },

        ],
        series: [
          {
            name: 'Alcançado',
            type: 'bar',
            data: [120, 200, 150, 80, 70, 110, 130],
            color: '#75BCFC'
          },
          {
            name: 'Meta',
            type: 'line',
            yAxisIndex: 0,
            data: [125.5, 200.8, 150.9, 80.5, 78.3, 110.5, 130.2],
            color: '#B5D248'
          }
        ]


      }

    }
  }


  render() {
    return (
      <EchartsReact
        //option={this.props.options}
          theme={"light"}
        option={this.state.options}
        style={{ height: '25em', width: '100%' }}
        className="react_for_echarts"
      />
    );
  }
}
