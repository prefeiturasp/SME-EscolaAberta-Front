import React, { Component } from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from "recharts";
import shortid from "shortid";

export default class SeriesEstudantesChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seriesMatriculas: [],
      turmas: []
    };
  }

  componentDidMount() {
    let turmas = [];
    let series = [];
    this.props.dados.forEach(item => {
      if (!turmas.includes(item.turma)) {
        turmas.push(item.turma);
      }
      if (!series.includes(item.descserie)) {
        series.push(item.descserie);
      }
    });

    this.setState({ turmas: turmas });

    let seriesMatriculas = [];
    series.forEach(serie => {
      seriesMatriculas.push({ descserie: serie });
    });

    seriesMatriculas.forEach((n, i) => {
      this.props.dados
        .filter(dado => {
          return dado.descserie === n.descserie;
        })
        .map(dado => {
          if (seriesMatriculas[i] !== undefined) {
            seriesMatriculas[i][dado.turma] = dado.matric;
          }
          return dado;
        });
    });

    this.setState({ seriesMatriculas: seriesMatriculas });
  }

  render() {
    return (
      <ResponsiveContainer width="85%" height={250}>
        <BarChart data={this.state.seriesMatriculas}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="descserie" interval={0} fontSize={10} />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" />
          {this.state.turmas.map(turma => {
            return (
              <Bar
                key={shortid.generate()}
                dataKey={turma}
                fill={
                  "#" +
                  (0x1000000 + Math.random() * 0xffffff)
                    .toString(16)
                    .substr(1, 6)
                }
              />
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
