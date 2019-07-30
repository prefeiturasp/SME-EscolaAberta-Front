import React, { Component } from "react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import shortid from "shortid";

export default class SeriesEstudantesChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dados: [
        {
          "descserie": "1. ANO",
          "A": 24,
          "B": 28
        },
        {
          "descserie": "3. ANO",
          "A": 29,
          "B": 30,
          "C": 24
        }
      ],
      series: ["A", "B", "C"]
    }
  }

  componentDidMount() {
    let series = [];
    this.props.dados.forEach((item) => {
      if (!series.includes(item.descserie)) {
        series.push(item.descserie);
      }
    });
    let teste = {};
    series.forEach((serie) => {
      // teste[serie] =
      this.props.dados.filter((dado) => {
        return dado.descserie === serie;
      }).map((dado) => {
        // console.log(teste[serie]);
        teste[serie].push({ [dado.turma]: dado.matric });
        return dado;
      })
    })

    console.log(teste);
  }

  render() {
    return (
      <ResponsiveContainer width="80%" height={250}>
        <BarChart data={this.state.dados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="descserie" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" />
          {
            this.state.series.map((serie) => {
              return <Bar key={shortid.generate()} dataKey={serie} fill={'#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)} />
            })
          }
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
