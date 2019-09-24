import React, { Component } from "react";
import {
  listarTiposEscolaPorFaixa,
  listarTiposEscolaPorFaixaPorDRE
} from "../../../services/escolas";
import {
  formatarEscolas,
  getKey,
  quantidadeAlunos,
  totalAlunosTipoEscola,
  totalPorFaixa,
  total
} from "./helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faBars } from "@fortawesome/free-solid-svg-icons";
import "../style.scss";

export class Escolas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiposEscolaPorFaixa: [],
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

  render() {
    const { diretoriasRegionais } = this.props;
    const { indice, tiposEscolaPorFaixa, totalPorFaixaLista } = this.state;
    return (
      <div className="mt-5 mb-5">
        <div className="estatisticas-cabecalho mb-5">
          <h1 className="border-bottom font-weight-light">Escolas</h1>
          <div className="referencia mt-1 mb-5">
            Data de referência: {this.state.referencia}
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
              <div className="checkboxes ml-auto">
                <span>
                  <input type="checkbox" />
                  Ciclo I
                </span>
                <span>
                  <input type="checkbox" />
                  Ciclo II
                </span>
                <span>
                  <input type="checkbox" />
                  Ciclo III
                </span>
                <span>
                  <input type="checkbox" />
                  Sem Ciclo
                </span>
                <span>
                  <input type="checkbox" />
                  Pré
                </span>
                <span>
                  <input type="checkbox" />
                  Creche
                </span>
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
                  <table className="table text-center table-hover table-bordered mb-0 fonte-14">
                    <thead>
                      <tr>
                        <th scope="col" rowSpan="2"></th>
                        <th
                          scope="col"
                          colSpan="7"
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
                      </tr>
                    </thead>
                    <tbody>
                      {tiposEscolaPorFaixa &&
                        tiposEscolaPorFaixa.length &&
                        tiposEscolaPorFaixa.map((tipoEscola, indice) => {
                          return (
                            <tr>
                              <td className="font-weight-bold">
                                {getKey(tipoEscola)}
                              </td>
                              <td>
                                {quantidadeAlunos(
                                  tipoEscola,
                                  "Sem estudantes cadastrados"
                                )}
                              </td>
                              <td>
                                {quantidadeAlunos(
                                  tipoEscola,
                                  "1 a 250 estudantes"
                                )}
                              </td>
                              <td>
                                {quantidadeAlunos(
                                  tipoEscola,
                                  "251 a 500 estudantes"
                                )}
                              </td>
                              <td>
                                {quantidadeAlunos(
                                  tipoEscola,
                                  "501 a 1000 estudantes"
                                )}
                              </td>
                              <td>
                                {quantidadeAlunos(
                                  tipoEscola,
                                  "1001 a 1500 estudantes"
                                )}
                              </td>
                              <td>
                                {quantidadeAlunos(
                                  tipoEscola,
                                  "1501 a 2000 estudantes"
                                )}
                              </td>
                              <td>
                                {quantidadeAlunos(
                                  tipoEscola,
                                  "2001 a 2500 estudantes"
                                )}
                              </td>
                              <td className="font-weight-bold bg-light">
                                {totalAlunosTipoEscola(tipoEscola)}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>
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
