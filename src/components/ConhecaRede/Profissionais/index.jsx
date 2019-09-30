import React, { Component } from "react";
import {
  listarCargosProfissionais,
  listarCargosProfissionaisPorDRE
} from "../../../services/estatisticas";
import {
  formatarCargosProfissionais,
  getKey,
  totalDoCargoPorEscolaridade,
  totalProfissionaisPorEscolaridade,
  totalPorFormacao,
  total
} from "./helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUsers } from "@fortawesome/free-solid-svg-icons";
import "../style.scss";

export class Profissionais extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cargosProfissionais: null,
      indice: "abc",
      totalPorFormacaoLista: null
    };
  }

  componentDidMount() {
    listarCargosProfissionais().then(cargosProfissionais => {
      this.setState({
        cargosProfissionais: formatarCargosProfissionais(
          cargosProfissionais.results
        ),
        totalPorFormacaoLista: totalPorFormacao(
          formatarCargosProfissionais(cargosProfissionais.results)
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
    listarCargosProfissionaisPorDRE({ dre: value }).then(
      tiposProfissionaisPorCargoPorDRE => {
        this.setState({
          cargosProfissionais: formatarCargosProfissionais(
            tiposProfissionaisPorCargoPorDRE.results
          ),
          totalPorFormacaoLista: totalPorFormacao(
            formatarCargosProfissionais(
              tiposProfissionaisPorCargoPorDRE.results
            )
          )
        });
      }
    );
    this.props.onDRESelected(value);
  }
  render() {
    const { diretoriasRegionais } = this.props;
    const { indice, cargosProfissionais, totalPorFormacaoLista } = this.state;
    return (
      <div className="mt-5 mb-5">
        <div className="estatisticas-cabecalho mb-5">
          <h1 className="border-bottom font-weight-light">Profissionais</h1>
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
              <FontAwesomeIcon icon={faUsers} className="cor-azul" />
              <div className="ml-3 fonte-14 font-weight-bold">
                Formação de Profissionais
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
                          colSpan="3"
                          className="fonte-16 text-center font-weight-normal align-middle"
                        >
                          Grau da Formação
                        </th>
                        <th
                          scope="col"
                          rowSpan="2"
                          className="text-center font-weight-normal align-middle text-uppercase"
                        >
                          TOTAL DE PROFISSIONAIS POR CARGO
                        </th>
                      </tr>
                      <tr>
                        <th>Ensino Médio/Normal</th>
                        <th>Licenciatura Curta</th>
                        <th>Licenciatura Plena</th>
                        {/*<th>Bacharelado</th>
                        <th>Pós Graduação - Lato Sensu</th>
                        <th>Outros</th>*/}
                      </tr>
                    </thead>
                    <tbody>
                      {cargosProfissionais &&
                        cargosProfissionais.map(cargoProfissional => {
                          return (
                            <tr>
                              <td className="font-weight-bold">
                                {getKey(cargoProfissional)}
                              </td>
                              <td>
                                {totalProfissionaisPorEscolaridade(
                                  cargoProfissional,
                                  "ENSINO MEDIO/NORMAL"
                                )}
                              </td>
                              <td>
                                {totalProfissionaisPorEscolaridade(
                                  cargoProfissional,
                                  "LICENCIATURA CURTA"
                                )}
                              </td>
                              <td>
                                {totalProfissionaisPorEscolaridade(
                                  cargoProfissional,
                                  "LICENCIATURA PLENA"
                                )}
                              </td>
                              {/*<td>
                                {totalProfissionaisPorEscolaridade(
                                  cargoProfissional,
                                  "BACHARELADO"
                                )}
                              </td>
                              <td>
                                {totalProfissionaisPorEscolaridade(
                                  cargoProfissional,
                                  "POS GRADUACAO LATO SENSU"
                                )}
                              </td>
                              <td>
                                {totalProfissionaisPorEscolaridade(
                                  cargoProfissional,
                                  "OUTROS"
                                )}
                                </td>*/}
                              <td className="font-weight-bold bg-light">
                                {totalDoCargoPorEscolaridade(cargoProfissional)}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>TOTAL DE PROFISSIONAIS POR ESCOLARIDADE</td>
                        {totalPorFormacaoLista &&
                          totalPorFormacaoLista.map(formacaoTotal => {
                            return (
                              <td className="font-weight-bold bg-light">
                                {formacaoTotal.total}
                              </td>
                            );
                          })}
                        <td className="font-weight-bold bg-light">
                          {cargosProfissionais && total(cargosProfissionais)}
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

export default Profissionais;
