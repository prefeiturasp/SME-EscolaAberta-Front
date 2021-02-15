import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faBars } from "@fortawesome/free-solid-svg-icons";
import {
  listarServidoresEscolarizacao,
  listarServidoresPorEscola
} from "../../services/estatisticas";
import {
  cargosPorGrupo,
  formatarCargosProfissionais,
  totalProfissionaisPorEscolaridade,
  totalDoCargoPorEscolaridade,
  totalPorFormacao,
  total
} from "components/ConhecaRede/Profissionais/helper";
import ToggleExpandir from "components/ToggleExpandir";
import { getKey } from "components/ConhecaRede/Escolas/helper";
import { pontuarValor } from "components/utils";
import { formatarConhecaservidores } from "./helper";

export default class Profissionais extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cargos: [],
      servidoresCargos: [],
      referencia: "",
      cargosPorGrupo: null,
      totalPorFormacaoLista: null
    };
  }

  componentDidMount() {
    listarServidoresEscolarizacao({ codesc: this.props.codesc }).then(lista => {
      this.setState({
        cargosPorGrupo: cargosPorGrupo(
          formatarCargosProfissionais(lista.results)
        ),
        totalPorFormacaoLista: totalPorFormacao(
          formatarCargosProfissionais(lista.results)
        ),
        cargosProfissionais: formatarCargosProfissionais(lista.results)
      });
    });
    listarServidoresPorEscola({ codesc: this.props.codesc }).then(lista => {
      let cargos = [];
      if (lista && lista.length > 0) {
        lista.forEach(item => {
          if (!cargos.includes(item.dc_cargo_atual)) {
            cargos.push(item.dc_cargo_atual);
          }
        });
        this.setState({ cargos: cargos });
        this.setState({ servidoresCargos: formatarConhecaservidores(lista) });
      }
    });
    this.setState({
      referencia: new Date(
        new Date().setDate(new Date().getDate() - 1)
      ).toLocaleDateString()
    });
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

  onGrupoServidoresClicked(grupo) {
    let servidoresCargos = this.state.servidoresCargos;
    servidoresCargos.forEach(grupoServidores => {
      if (getKey(grupoServidores) === getKey(grupo)) {
        grupoServidores[getKey(grupoServidores)].ativo = !grupoServidores[
          getKey(grupoServidores)
        ].ativo;
      }
    });
    this.setState({ servidoresCargos });
  }

  render() {
    const indice = "abc";
    const {
      cargosPorGrupo,
      totalPorFormacaoLista,
      cargosProfissionais,
      servidoresCargos
    } = this.state;
    return (
      <div className="mt-5 mb-5">
        <div className="estatisticas-cabecalho mb-5">
          <h1 className="border-bottom font-weight-light">Profissionais</h1>
          <div className="referencia mt-1 mb-5">
            Data de referência: {this.props.dataReferencia}
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
                      cargosPorGrupo.map((grupoCargo, key) => {
                        return [
                          grupoCargo[getKey(grupoCargo)].total > 0 && (
                            <tr key={key} className="main">
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
                            </tr>
                          ),
                          grupoCargo[getKey(grupoCargo)].ativo &&
                            grupoCargo[getKey(grupoCargo)].cargos.map(
                              (cargo, indice_) => {
                                return (
                                  cargo.formacoes.length > 0 &&
                                  grupoCargo[getKey(grupoCargo)].total > 0 && (
                                    <tr key={indice_}>
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
                                  )
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
                        totalPorFormacaoLista.map((formacaoTotal, key) => {
                          return (
                            <td key={key} className="font-weight-bold bg-light">
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
        <div className="card shadow-sm mb-3">
          <div className="card-header bg-white d-flex align-items-center font-weight-bold">
            <FontAwesomeIcon icon={faUsers} className="cor-azul" />
            <div className="ml-3 fonte-14">Conheça a Equipe</div>
            <a
              className="text-decoration-none cor-cinza ml-auto"
              data-toggle="collapse"
              data-target={`#conheca-a-equipe`}
              aria-expanded="false"
              aria-controls={`conheca-a-equipe`}
              href={`#conheca-a-equipe`}
            >
              <FontAwesomeIcon icon={faBars} className="stretched-link" />
            </a>
          </div>
          <div className="collapse fade" id={`conheca-a-equipe`}>
            <div className="card-body p-0">
              <table className="table grupo-profissionais table-hover table-bordered mb-0 fonte-14">
                <tbody>
                  {servidoresCargos &&
                    servidoresCargos.map((grupo, key) => {
                      return [
                        grupo[getKey(grupo)].total > 0 && (
                          <tr key={key} className="main">
                            <td className="font-weight-bold">
                              {getKey(grupo)}
                              <ToggleExpandir
                                ativo={grupo[getKey(grupo)].ativo}
                                onClick={() =>
                                  this.onGrupoServidoresClicked(grupo)
                                }
                              />
                            </td>
                          </tr>
                        ),
                        grupo[getKey(grupo)].ativo &&
                          grupo[getKey(grupo)].cargos.map((cargo, indice_) => {
                            return (
                              cargo.servidores.length > 0 &&
                              grupo[getKey(grupo)].total > 0 && [
                                <tr className="titulo" key={indice}>
                                  <td className="font-weight-bold">
                                    {cargo.tipo_cargo}
                                  </td>
                                </tr>,
                                cargo.servidores.map((servidor, key) => {
                                  return (
                                    <tr>
                                      <td>{servidor.nm_nome}</td>
                                    </tr>
                                  );
                                })
                              ]
                            );
                          })
                      ];
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
