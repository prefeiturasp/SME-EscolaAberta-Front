import React, { Component } from "react";
import {
  listarTiposEscolaPorFaixa,
  listarTiposEscolaPorFaixaPorDRE
} from "../../../services/escolas";
import {
  formatarEscolas,
  getKey,
  totalPorFaixa,
  formatarEscolasPorGrupo,
  total,
  quantidadeAlunosGrupo,
  totalAlunosTipoEscolaGrupo
} from "./helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faBars } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import "../style.scss";
import ToggleExpandir from "components/ToggleExpandir";

export class Escolas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiposEscolaPorFaixa: [],
      tiposEscolaPorGrupo: [],
      indice: "abc",
      totalPorFaixaLista: null
    };
  }

  componentDidMount() {
    listarTiposEscolaPorFaixa().then(tiposEscolaPorFaixa => {
      this.setState({
        tiposEscolaPorFaixa: formatarEscolas(tiposEscolaPorFaixa.results),
        totalPorFaixaLista: totalPorFaixa(
          formatarEscolas(tiposEscolaPorFaixa.results)
        ),
        tiposEscolaPorGrupo: formatarEscolasPorGrupo(
          formatarEscolas(tiposEscolaPorFaixa.results)
        )
      });
    });
    this.setState({
      referencia: new Date(
        new Date().setDate(new Date().getDate() - 1)
      ).toLocaleDateString()
    });
  }

  onSelectChanged(value) {
    listarTiposEscolaPorFaixaPorDRE({ dre: value }).then(
      tiposEscolaPorFaixaPorDRE => {
        this.setState({
          tiposEscolaPorFaixa: formatarEscolas(
            tiposEscolaPorFaixaPorDRE.results
          ),
          totalPorFaixaLista: totalPorFaixa(
            formatarEscolas(tiposEscolaPorFaixaPorDRE.results)
          )
        });
      }
    );
    this.props.onDRESelected(value);
  }

  onGrupoEscolaClicked(grupo) {
    let tiposEscolaPorGrupo = this.state.tiposEscolaPorGrupo;
    tiposEscolaPorGrupo.forEach(grupoEscola => {
      if (getKey(grupoEscola) === getKey(grupo)) {
        grupoEscola[getKey(grupoEscola)].ativo = !grupoEscola[
          getKey(grupoEscola)
        ].ativo;
      }
    });
    this.setState({ tiposEscolaPorGrupo });
  }

  render() {
    const { diretoriasRegionais } = this.props;
    const {
      indice,
      tiposEscolaPorFaixa,
      totalPorFaixaLista,
      tiposEscolaPorGrupo
    } = this.state;
    return (
      <div className="mt-5 mb-5">
        <div className="estatisticas-cabecalho mb-5">
          <h1 className="border-bottom font-weight-light">Escolas</h1>
          <div className="referencia mt-1 mb-5">
            Data de referência: {this.props.dataReferencia}
          </div>
          <div className="row">
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
                  <table className="grupo-escolas table text-center table-hover table-bordered mb-0 fonte-14">
                    <thead>
                      <tr>
                        <th colSpan="2" scope="col" rowSpan="2"></th>
                        <th
                          scope="col"
                          colSpan="8"
                          className="fonte-16 text-center font-weight-normal align-middle"
                        >
                          Escolas por tipo e quantidade de alunos
                        </th>
                        <th
                          scope="col"
                          rowSpan="2"
                          className="text-center font-weight-normal align-middle text-uppercase"
                        >
                          Total de Unidades Escolares por tipo
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
                        <th>Mais de 2500 estudantes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tiposEscolaPorGrupo &&
                        tiposEscolaPorGrupo.length &&
                        tiposEscolaPorGrupo.map((grupoEscola, indice) => {
                          return [
                            <tr className="main" key={indice}>
                              <td colSpan="2" className="font-weight-bold">
                                {getKey(grupoEscola)}
                              </td>
                              <td className="font-weight-bold">
                                {
                                  grupoEscola[getKey(grupoEscola)][
                                    "Sem estudantes cadastrados"
                                  ]
                                }
                              </td>
                              <td className="font-weight-bold">
                                {
                                  grupoEscola[getKey(grupoEscola)][
                                    "1 a 250 estudantes"
                                  ]
                                }
                              </td>
                              <td className="font-weight-bold">
                                {
                                  grupoEscola[getKey(grupoEscola)][
                                    "251 a 500 estudantes"
                                  ]
                                }
                              </td>
                              <td className="font-weight-bold">
                                {
                                  grupoEscola[getKey(grupoEscola)][
                                    "501 a 1000 estudantes"
                                  ]
                                }
                              </td>
                              <td className="font-weight-bold">
                                {
                                  grupoEscola[getKey(grupoEscola)][
                                    "1001 a 1500 estudantes"
                                  ]
                                }
                              </td>
                              <td className="font-weight-bold">
                                {
                                  grupoEscola[getKey(grupoEscola)][
                                    "1501 a 2000 estudantes"
                                  ]
                                }
                              </td>
                              <td className="font-weight-bold">
                                {
                                  grupoEscola[getKey(grupoEscola)][
                                    "2001 a 2500 estudantes"
                                  ]
                                }
                              </td>
                              <td className="font-weight-bold">
                                {
                                  grupoEscola[getKey(grupoEscola)][
                                    "Mais que 2500 estudantes"
                                  ]
                                }
                              </td>
                              <td className="font-weight-bold">
                                {grupoEscola[getKey(grupoEscola)]["total"]}
                                <ToggleExpandir
                                  ativo={grupoEscola[getKey(grupoEscola)].ativo}
                                  onClick={() =>
                                    this.onGrupoEscolaClicked(grupoEscola)
                                  }
                                />
                              </td>
                            </tr>,
                            grupoEscola[getKey(grupoEscola)].ativo &&
                              grupoEscola[getKey(grupoEscola)].escolas.map(
                                (escola, indice_) => {
                                  return (
                                    <tr>
                                      <td className="font-weight-bold">{escola.sigla}</td>
                                      <td className="font-weight-bold">{escola.tipo_escola}</td>
                                      <td>
                                        {quantidadeAlunosGrupo(
                                          escola,
                                          "Sem estudantes cadastrados"
                                        )}
                                      </td>
                                      <td>
                                        {quantidadeAlunosGrupo(
                                          escola,
                                          "1 a 250 estudantes"
                                        )}
                                      </td>
                                      <td>
                                        {quantidadeAlunosGrupo(
                                          escola,
                                          "251 a 500 estudantes"
                                        )}
                                      </td>
                                      <td>
                                        {quantidadeAlunosGrupo(
                                          escola,
                                          "501 a 1000 estudantes"
                                        )}
                                      </td>
                                      <td>
                                        {quantidadeAlunosGrupo(
                                          escola,
                                          "1001 a 1500 estudantes"
                                        )}
                                      </td>
                                      <td>
                                        {quantidadeAlunosGrupo(
                                          escola,
                                          "1501 a 2000 estudantes"
                                        )}
                                      </td>
                                      <td>
                                        {quantidadeAlunosGrupo(
                                          escola,
                                          "2001 a 2500 estudantes"
                                        )}
                                      </td>
                                      <td>
                                        {quantidadeAlunosGrupo(
                                          escola,
                                          "Mais que 2500 estudantes"
                                        )}
                                      </td>
                                      <td>
                                        {totalAlunosTipoEscolaGrupo(escola)}
                                      </td>
                                    </tr>
                                  );
                                }
                              )
                          ];
                        })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="2">
                          TOTAL DE UNIDADES ESCOLARES POR NÚMERO DE ESTUDANTES
                        </td>
                        {totalPorFaixaLista &&
                          totalPorFaixaLista.map(faixaTotal => {
                            return (
                              <td className="font-weight-bold bg-light">
                                {faixaTotal.total}
                              </td>
                            );
                          })}
                        <td className="font-weight-bold bg-light">
                          {tiposEscolaPorFaixa && total(tiposEscolaPorFaixa)}
                        </td>
                      </tr>
                    </tfoot>
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

export default Escolas;
