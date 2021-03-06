import React, { Component } from "react";
import ToggleExpandir from "components/ToggleExpandir";
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
  total,
  cargosPorGrupo
} from "./helper";
import { pontuarValor } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUsers } from "@fortawesome/free-solid-svg-icons";
import "../style.scss";
import "./style.scss";

export class Profissionais extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cargosProfissionais: null,
      cargosPorGrupo: null,
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
        cargosPorGrupo: cargosPorGrupo(
          formatarCargosProfissionais(cargosProfissionais.results)
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
          cargosPorGrupo: cargosPorGrupo(
            formatarCargosProfissionais(
              tiposProfissionaisPorCargoPorDRE.results
            )
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

  onGrupoCargoClicked(grupo) {
    let cargosPorGrupo = this.state.cargosPorGrupo;
    cargosPorGrupo.forEach(grupoCargo => {
      if (getKey(grupoCargo) === getKey(grupo)) {
        grupoCargo[getKey(grupoCargo)].ativo = !grupoCargo[getKey(grupoCargo)]
          .ativo;
      }
    });
    this.setState({ cargosPorGrupo });
  }

  render() {
    const { diretoriasRegionais } = this.props;
    const {
      indice,
      cargosPorGrupo,
      cargosProfissionais,
      totalPorFormacaoLista
    } = this.state;
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
                <option value="" disabled selected>Selecione uma DRE</option>
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
                  <table className="table grupo-profissionais text-center table-hover table-bordered mb-0 fonte-14">
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
                      </tr>
                    </thead>
                    <tbody>
                      {cargosPorGrupo &&
                        cargosPorGrupo.map(grupoCargo => {
                          return [
                            <tr className="main">
                              <td className="font-weight-bold">
                                {getKey(grupoCargo)}
                              </td>
                              <td className="font-weight-bold">0</td>
                              <td className="font-weight-bold">
                                {pontuarValor(
                                  grupoCargo[getKey(grupoCargo)]
                                    .licenciatura_curta
                                )}
                              </td>
                              <td className="font-weight-bold">
                                {pontuarValor(
                                  grupoCargo[getKey(grupoCargo)]
                                    .licenciatura_plena
                                )}
                              </td>
                              <td className="font-weight-bold">
                                {pontuarValor(
                                  grupoCargo[getKey(grupoCargo)].total
                                )}
                                <ToggleExpandir
                                  ativo={grupoCargo[getKey(grupoCargo)].ativo}
                                  onClick={() =>
                                    this.onGrupoCargoClicked(grupoCargo)
                                  }
                                />
                              </td>
                            </tr>,
                            grupoCargo[getKey(grupoCargo)].ativo &&
                              grupoCargo[getKey(grupoCargo)].cargos.map(
                                (cargo, indice_) => {
                                  return (
                                    <tr key={indice}>
                                      <td className="font-weight-bold">
                                        {cargo.tipo_cargo}
                                      </td>
                                      <td>
                                        {totalProfissionaisPorEscolaridade(
                                          cargo,
                                          "ENSINO MEDIO/NORMAL"
                                        )}
                                      </td>
                                      <td>
                                        {totalProfissionaisPorEscolaridade(
                                          cargo,
                                          "LICENCIATURA CURTA"
                                        )}
                                      </td>
                                      <td>
                                        {totalProfissionaisPorEscolaridade(
                                          cargo,
                                          "LICENCIATURA PLENA"
                                        )}
                                      </td>
                                      <td>
                                        {totalDoCargoPorEscolaridade(cargo)}
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
                        <td>TOTAL DE PROFISSIONAIS POR ESCOLARIDADE</td>
                        {totalPorFormacaoLista &&
                          totalPorFormacaoLista.map(formacaoTotal => {
                            return (
                              <td className="font-weight-bold bg-light">
                                {pontuarValor(formacaoTotal.total)}
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
