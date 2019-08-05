import React, { Component } from "react";
import NullView from "../Estatisticas/NullView";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default class VagasMatriculasChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vagasMatriculas: [],
      vagasLabels: [],
      rContainerHeight: 250,
      vAlignLegenda: "top",
      alignLegenda: "right",
      marginLegenda: {
        marginTop: "65px",
        marginLeft: "0px"
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dados !== nextProps.dados) {
      let vagasMatriculas = [];
      let vagasLabels = [];
      nextProps.dados.forEach((vaga) => {
        let vagaMatricula = [];
        vagaMatricula.push({ nome: "Vagas Oferecidas", valor: vaga.vagas_oferecidas });
        vagaMatricula.push({ nome: "Matrículas", valor: vaga.atendimentos });
        vagaMatricula.push({ nome: "Vagas Remanescentes", valor: vaga.vagas_remanecentes });
        vagaMatricula.push({ nome: "Média Atendimentos/Turma", valor: vaga.media_atendimento });
        vagasMatriculas.push(vagaMatricula);
        vagasLabels.push(vaga.serie);
      });
      this.setState({
        vagasMatriculas: vagasMatriculas,
        vagasLabels: vagasLabels
      });
    }
  }

  componentDidMount() {
    if (this.isMobile()) {
      this.setState({
        rContainerHeight: 350,
        vAlignLegenda: "bottom",
        alignLegenda: "center",
        marginLegenda: { marginTop: "65px", marginLeft: "15px" }
      });
    }
  }

  isMobile() {
    try { document.createEvent("TouchEvent"); return true; }
    catch (e) { return false; }
  }

  renderizaLabelPorcentagem = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text x={x} y={y} fill="#FFFFFF" className="font-weight-bold" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.state.vagasMatriculas.length > 0 ? (
          this.state.vagasMatriculas.map((vaga, indice) => {
            return (
              <React.Fragment key={indice}>
                <div className="mx-3 my-5">
                  <h3 className="fonte-16 border-top border-bottom font-weight-light py-3">{this.state.vagasLabels[indice]}</h3>
                </div>
                <ResponsiveContainer className="mx-auto my-2" width="75%" height={this.state.rContainerHeight}>
                  <PieChart>
                    <Pie data={vaga} cx={150} innerRadius={40} outerRadius={100} nameKey="nome" dataKey="valor" labelLine={false} label={this.renderizaLabelPorcentagem}>
                      {
                        vaga.map((v, indice) =>
                          <Cell key={`cell-${indice}`} fill={'#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)} />
                        )
                      }
                    </Pie>
                    <Tooltip />
                    <Legend layout="vertical" verticalAlign={this.state.vAlignLegenda} iconSize={18}
                      wrapperStyle={this.state.marginLegenda} align={this.state.alignLegenda} />
                  </PieChart>
                </ResponsiveContainer>
              </React.Fragment>
            );
          })
        ) : (<NullView />)}
      </React.Fragment>
    );
  }
}
