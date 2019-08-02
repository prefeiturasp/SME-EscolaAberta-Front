import React, { Component } from "react";
import NullView from "../Estatisticas/NullView";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default class VagasMatriculasChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vagasMatriculas: []
    }
  }

  componentDidMount() {
    let vagasMatriculas = [];
    this.props.dados.forEach((vaga) => {
      let vagaMatricula = [];
      vagaMatricula.push({ nome: "Total de Turmas", valor: vaga.total_turmas });
      vagaMatricula.push({ nome: "Vagas Oferecidas", valor: vaga.vagas_oferecidas });
      vagaMatricula.push({ nome: "Matrículas", valor: vaga.total_turmas });
      vagaMatricula.push({ nome: "Vagas Remanescentes", valor: vaga.total_turmas });
      vagaMatricula.push({ nome: "Média Atendimentos/Turma", valor: vaga.total_turmas });
      vagasMatriculas.push(vagaMatricula);
    });
    this.setState({ vagasMatriculas: vagasMatriculas });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.vagasMatriculas.length > 0 ? (
          this.state.vagasMatriculas.map((vaga, indice) => {
            return (
              <ResponsiveContainer key={indice} width="85%" height={250}>
                <PieChart width={400} height={400}>
                  <Pie
                    data={vaga}
                    cx={200}
                    cy={200}
                    outerRadius={80}
                    fill="#8884d8"
                    nameKey="nome"
                    dataKey="valor"
                  >
                    {vaga.map((entry, index) => {
                      return <Cell key={`cell-${index}`} fill={'#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)} />
                    })}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            );
          })
        ) : (<NullView />)}
      </React.Fragment>
    );
  }
}
