import React, { Component } from "react";
import { listarSeriesEstudantes } from "../../services/estatisticas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faBars } from "@fortawesome/free-solid-svg-icons";
import shortid from "shortid";
import SeriesEstudantesChart from "../Graficos/SeriesEstudantesChart";
import NullView from "./NullView";
import "./style.scss";

export default class Escolas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opcoes: [
        {
          label: "SELECIONE UMA DRE",
          value: ""
        },
        {
          label: "DRE BUTANTA",
          value: "DRE BUTANTA"
        }
      ],
      series: [],
      turmas: [],
      turnos: [],
      modalidades: [],
      seriesEstudantes: [],
      referencia: "",
      indice: "abc"
    };
  }

  componentDidMount() {
    listarSeriesEstudantes({ codesc: this.props.codesc }).then(lista => {
      let series = [];
      let turmas = [];
      let turnos = [];
      let modalidades = [];
      lista.results.forEach(item => {
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
      this.setState({ series: series });
      this.setState({ turmas: turmas.sort() });
      this.setState({ turnos: turnos });
      this.setState({ modalidades: modalidades });
      this.setState({ seriesEstudantes: lista.results });
    });
    this.setState({
      referencia: new Date(
        new Date().setDate(new Date().getDate() - 1)
      ).toLocaleDateString()
    });
  }

  render() {
    const { opcoes, indice } = this.state;
    return (
      <div className="mt-5 mb-5">
        <div className="estatisticas-cabecalho mb-5">
          <h1 className="border-bottom font-weight-light">Escolas</h1>
          <div className="referencia mt-1 mb-5">
            Data de referência: {this.state.referencia}
          </div>
          <div className="row">
            <div className="col-6">
              <select className="form-control" required>
                {opcoes.map((e, key) => {
                  return (
                    <option key={key} value={e.value} disabled={e.disabled}>
                      {e.label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div key={indice} className="card shadow-sm mt-3 mb-3">
            <div className="card-header bg-white d-flex align-items-center">
              <FontAwesomeIcon icon={faBook} className="cor-azul" />
              <div className="ml-3 fonte-14 font-weight-bold">
                Escolas por tipo
              </div>
              <a
                className="text-decoration-none cor-cinza ml-auto"
                data-toggle="collapse"
                data-target={`#${indice}`}
                aria-expanded="false"
                aria-controls={`${indice}`}
                href={`#${indice}`}
              >
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
                        <th
                          scope="col"
                          colSpan="7"
                          className="text-center font-weight-normal align-middle"
                        >
                          Escolas por tipo e quantidade de alunos
                        </th>
                        <th
                          scope="col"
                          rowSpan="2"
                          className="text-center font-weight-normal align-middle text-uppercase"
                        >
                          Total de Estudantes por Ano
                        </th>
                      </tr>
                      <tr>
                        <th>Sem estudantes cadastrados</th>
                        <th>1 a 250 estudantes</th>
                        <th>251 a 500 estudantes</th>
                        <th>501 a 1000 estudantes</th>
                        <th>1001 a 1500 estudantes</th>
                        <th>1501 a 2000 estudantes</th>
                        <th>2001 a 2500 estudantes</th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
