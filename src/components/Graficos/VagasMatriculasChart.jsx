import React, { Component } from "react";
import Chart from "react-google-charts";

export default class VagasMatriculasChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dados: []
    }
  }

  componentDidMount() {
    let vagasGrafico = [];
    this.props.dados.forEach((vaga) => {
      let vagaGrafico = [];
      vagaGrafico.push(["Série", "Valor"]);
      vagaGrafico.push(["Total de Turmas", vaga.total_turmas]);
      vagaGrafico.push(["Vagas Oferecidas", vaga.vagas_oferecidas]);
      vagaGrafico.push(["Vagas Atendidas", vaga.atendimentos]);
      vagaGrafico.push(["Vagas Remanescentes", vaga.vagas_remanecentes]);
      vagaGrafico.push(["Média Atendimentos/Turma", vaga.media_atendimento]);
      vagasGrafico[vaga.serie] = vagaGrafico;
    });
  }

  render() {
    return (
      <div>
        {this.state.dados.length > 0 ? (
          this.state.dados.map((vaga, indice) => {
            return (
              <Chart
                key={indice}
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Carregando Gráfico</div>}
                data={vaga}
                options={{
                  title: { indice },
                }}
              />
            );
          })
        ) : (null)}
      </div>
    );
  }
}
