import React, { Component } from "react";
import { listarSeriesEstudantes } from "../../services/estatisticas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faBars } from "@fortawesome/free-solid-svg-icons";
import shortid from "shortid";
import SeriesEstudantesChart from "../Graficos/SeriesEstudantesChart";
import NullView from "./NullView";

export default class SeriesEstudantes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      turmas: [],
      turnos: [],
      modalidades: [],
      seriesEstudantes: [],
      referencia: ""
    }
  }

  componentDidMount() {
    listarSeriesEstudantes({ codesc: this.props.codesc }).then(lista => {
      let series = [];
      let turmas = [];
      let turnos = [];
      let modalidades = [];
      if (lista && lista.results.length > 0) {
        lista.results.forEach((item) => {
          if (!series.includes(item.descserie)) {
            series.push(item.descserie);
          }
          if (!turmas.includes(item.turma)) {
            turmas.push(item.turma);
          }
          if (!turnos.includes(item.desc_turno)) {
            turnos.push(item.desc_turno);
          }
          if (!modalidades.includes(item.modal)) {
            modalidades.push(item.modal);
          }
        });
        this.setState({series: series});
        this.setState({turmas: turmas.sort()});
        this.setState({turnos: turnos});
        this.setState({modalidades: modalidades});
        this.setState({seriesEstudantes: lista.results});
      }
    });
    this.setState({ referencia: new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString() });
  }

  render() {
    return (
      <div className="mt-5 mb-5">
        <div className="estatisticas-cabecalho mb-5">
          <h1 className="border-bottom font-weight-light">Séries e Estudantes</h1>
          <div className="referencia mt-1 mb-5">Data de referência: {this.state.referencia}</div>
        </div>
        {this.state.turnos.length > 0 ? (
          this.state.turnos.map((turno, indice) => {
            indice = shortid.generate().replace(/[0-9]/g, '');
            return (
              <div key={indice} className="card shadow-sm mb-3">
                <div className="card-header bg-white d-flex align-items-center">
                  <FontAwesomeIcon icon={faBook} className="cor-azul" />
                  <div className="ml-3 fonte-14 font-weight-bold">{turno}</div>
                  <a className="text-decoration-none cor-cinza ml-auto" data-toggle="collapse"
                    data-target={`#${indice}`} aria-expanded="false" aria-controls={`${indice}`} href={`#${indice}`}>
                    <FontAwesomeIcon icon={faBars} className="stretched-link" />
                  </a>
                </div>
                <div className="collapse fade" id={`${indice}`}>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover table-bordered mb-0 fonte-14">
                        <thead>
                          <tr>
                            <th scope="col" rowSpan="2"></th>
                            <th scope="col" colSpan={this.state.turmas.filter((turma) => {
                              return this.state.seriesEstudantes.filter((serieEstudante) => {
                                return serieEstudante.turma === turma && serieEstudante.desc_turno === turno;
                              }).length > 0
                            }).length} className="text-center font-weight-normal align-middle text-uppercase">Estudantes por série e turma</th>
                            <th scope="col" rowSpan="2" className="text-center font-weight-normal align-middle text-uppercase">TOTAL DE ESTUDANTES POR ANO</th>
                          </tr>
                          <tr>
                            {this.state.turmas.length > 0 ? (
                              this.state.turmas.filter((turma) => {
                                return this.state.seriesEstudantes.filter((serieEstudante) => {
                                  return serieEstudante.turma === turma && serieEstudante.desc_turno === turno;
                                }).length > 0
                              }).map((turma, indice) => {
                                return (
                                  <th key={shortid.generate()} scope="col" className="text-center">{turma}</th>
                                );
                              })
                            ) : (null)}
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.series.length > 0 ? (
                            this.state.series.filter((serie) => {
                              return this.state.seriesEstudantes.filter((serieEstudante) => {
                                return serieEstudante.descserie === serie && serieEstudante.desc_turno === turno;
                              }).length > 0
                            }).map((serie, indice) => {
                              let totalEstudantesAno = 0;
                              return (
                                <tr key={indice}>
                                  <td>{serie}</td>
                                  {this.state.turmas.length > 0 ? (
                                    this.state.turmas.filter((turma) => {
                                      return this.state.seriesEstudantes.filter((serieEstudante) => {
                                        return serieEstudante.turma === turma && serieEstudante.desc_turno === turno;
                                      }).length > 0
                                    }).map((turma, indice) => {
                                      return (
                                        <td key={shortid.generate()} className="text-center">
                                          {this.state.seriesEstudantes.length > 0 ? (
                                            this.state.seriesEstudantes.filter((serieEstudante) => {
                                              return serieEstudante.descserie === serie &&
                                                serieEstudante.desc_turno === turno && serieEstudante.turma === turma;
                                            }).map((serieEstudante) => {
                                              totalEstudantesAno += serieEstudante.matric;
                                              return serieEstudante.matric;
                                            })
                                          ) : (null)}
                                        </td>
                                      );
                                    })
                                  ) : (null)}
                                  <td className="text-center table-secondary font-weight-bold">{totalEstudantesAno}</td>
                                </tr>
                              );
                            })
                          ) : (null)}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th scope="col" className="font-weight-normal">TOTAL DE ESTUDANTES POR TURMA</th>
                            {this.state.turmas.length > 0 ? (
                              this.state.turmas.filter((turma) => {
                                return this.state.seriesEstudantes.filter((serieEstudante) => {
                                  return serieEstudante.turma === turma && serieEstudante.desc_turno === turno;
                                }).length > 0
                              }).map((turma, indice) => {
                                return (
                                  <th key={shortid.generate()} scope="col" className="text-center table-secondary">
                                    {
                                      this.state.seriesEstudantes.filter((serieEstudante) => {
                                        return serieEstudante.turma === turma && serieEstudante.desc_turno === turno;
                                      }).reduce((total, serieEstudante) => {
                                        return total + serieEstudante.matric;
                                      }, 0)
                                    }
                                  </th>
                                );
                              })
                            ) : (null)}
                            <th scope="col"></th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    <div className="my-5 d-flex justify-content-center">
                      <SeriesEstudantesChart
                        dados={this.state.seriesEstudantes.filter(serieEstudante => serieEstudante.desc_turno === turno)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (<NullView />)}
      </div>
    );
  }
}
