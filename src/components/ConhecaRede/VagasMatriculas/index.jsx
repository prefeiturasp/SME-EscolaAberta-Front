import React, { Component } from "react";
import {
  listarAmbientesSME,
  listarAmbientesSMEPorDRE
} from "../../../services/estatisticas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { ToggleExpandir } from "../../ToggleExpandir";
import { matriculas } from "./helper";
import { getKey } from "../helper";
import { DoisNiveisChart } from "../../Graficos/DoisNiveisChart";
import "./style.scss";

export class VagasMatriculas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ambientes: [],
      referencia: "",
      matriculas: matriculas,
      ativo: false
    };
  }

  componentDidMount() {
    listarAmbientesSME({ codesc: this.props.codesc }).then(lista => {
      this.setState({ ambientes: lista.results });
    });
    this.setState({
      referencia: new Date(
        new Date().setDate(new Date().getDate() - 1)
      ).toLocaleDateString()
    });
  }

  onSelectChanged(value) {
    listarAmbientesSMEPorDRE({ dre: value }).then(lista => {
      this.setState({ ambientes: lista.results });
    });
  }

  onMatriculaClicked(matricula) {
    let matriculas = this.state.matriculas;
    const indice = matriculas.findIndex(
      matricula_ => getKey(matricula_) === getKey(matricula)
    );
    matriculas[indice][getKey(matricula)].ativo = !matriculas[indice][
      getKey(matricula)
    ].ativo;
    this.setState({ matriculas, ativo: !this.state.ativo });
  }

  render() {
    const { diretoriasRegionais } = this.props;
    const { referencia, matriculas, ativo } = this.state;
    return (
      <div className="mt-5 mb-5">
        <div className="estatisticas-cabecalho mb-5">
          <h1 className="border-bottom font-weight-light">
            Vagas e Matrículas por Série
          </h1>
          <div className="referencia mt-1 mb-5">
            Data de referência: {referencia}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6">
            <select
              className="form-control"
              onChange={event => this.onSelectChanged(event.target.value)}
            >
              {diretoriasRegionais.length &&
                diretoriasRegionais.map((e, key) => {
                  return (
                    <option key={key} value={e.dre} disabled={e.disabled}>
                      {e.diretoria}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <div className="card shadow-sm mb-3">
          <div className="card-header bg-white d-flex align-items-center font-weight-bold">
            <FontAwesomeIcon icon={faIdCard} className="cor-azul" />
            <div className="ml-3 fonte-14">Vagas e Matrículas</div>
            <div className="checkboxes ml-auto">
              <span>
                <input type="checkbox" />
                Infantil
              </span>
              <span>
                <input type="checkbox" />
                Fundamental I
              </span>
              <span>
                <input type="checkbox" />
                Fundamental II
              </span>
              <span>
                <input type="checkbox" />
                Médio
              </span>
              <span>
                <input type="checkbox" />
                EJA
              </span>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table
                className={`table text-center table-hover table-bordered matricula mb-0 fonte-14 ${ativo &&
                  "ativo"}`}
              >
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Total de turmas</th>
                    <th scope="col">Vagas oferecidas</th>
                    <th scope="col">Matrículas</th>
                    <th scope="col">Matrículas em processo</th>
                    <th scope="col">Vagas remanescentes</th>
                    <th scope="col">Média Atendimentos/Turma</th>
                  </tr>
                </thead>
                <tbody>
                  {matriculas.map((matricula, indice) => {
                    return [
                      <tr className="main" key={indice}>
                        <td className="font-weight-bold">
                          {getKey(matricula)}
                        </td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>
                          0{" "}
                          <ToggleExpandir
                            ativo={matricula[getKey(matricula)].ativo}
                            onClick={() => this.onMatriculaClicked(matricula)}
                          />
                        </td>
                      </tr>,
                      matricula[getKey(matricula)].ativo &&
                        matricula[getKey(matricula)].idades &&
                        matricula[getKey(matricula)].idades.map(
                          (idade, indice_) => {
                            return (
                              <tr key={indice_}>
                                <td>{idade.idade}</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                              </tr>
                            );
                          }
                        )
                    ];
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <DoisNiveisChart />
          </div>
        </div>
      </div>
    );
  }
}

export default VagasMatriculas;

/*,
                      matricula[getKey(matricula)].ativo &&
                        matricula[getKey(matricula)].idades.map(
                          (idade, indice_) => {
                            return (
                              <tr key={indice_}>
                                <td>{idade.idade}</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                              </tr>
                            );
                          }
                        )*/
