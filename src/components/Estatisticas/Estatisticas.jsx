import React, {Component, lazy, Suspense} from "react";
import Menu from "../MenuSuperior/Menu";
import Auxiliar from "../MenuSuperior/Auxiliar";
import { Rodape } from "../Rodape";
import NullView from "./NullView";
import {DadosPtrf2020} from "./Ptrf/DadosPtrf2020";

import {
  dataReferencia,
  listarServidoresEscolarizacao,
  listarServidoresPorEscola
} from "../../services/estatisticas";
import { formatarData } from "components/ConhecaRede/helper";
import { loginIdep, dadosIdep } from "services/idep";

const SeriesEstudantes = lazy(() => import("./SeriesEstudantes"));
const Profissionais = lazy(() => import("./Profissionais"));
const VagasMatriculas = lazy(() => import("./VagasMatriculas"));
const Ambientes = lazy(() => import("./Ambientes"));
const Idep = lazy(() => import("./Idep/Idep"));
const Ptrf = lazy(() => import("./Ptrf/"));

export default class Estatisticas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentesLabels: [
        {
          nome: "SeriesEstudantes",
          label: "Séries e Estudantes"
        },
        {
          nome: "Profissionais",
          label: "Profissionais"
        },
        {
          nome: "VagasMatriculas",
          label: "Vagas e Matrículas"
        },
        {
          nome: "Ambientes",
          label: "Ambientes"
        },
        {
          nome: "Idep",
          label: "IDEP"
        },
      ],
      dadosDaEscolaPtrf: {},
      codesc: "",
      nomesc: "",
      dataReferencia: null,
      loading: true
    };
  }

  componentWillMount() {
    if (this.props.location.state !== undefined) {
      if (this.props.location.state.codesc !== undefined) {
        this.setState({ codesc: this.props.location.state.codesc });
        let escola = DadosPtrf2020.filter(item => String(item.EOL) === String(this.props.location.state.codesc));
        if (escola && escola.length > 0){
          this.setState({
            dadosDaEscolaPtrf:{
              EOL: escola[0].EOL,
              UNIDADE: escola[0].UNIDADE,
              DRE: escola[0].DRE,
              BAS_1PAR: escola[0].BAS_1PAR,
              BAS_2PAR: escola[0].BAS_2PAR,
              REC_EXTRA: escola[0].REC_EXTRA,
              BAS_3PAR: escola[0].BAS_3PAR,
              REC_EXTRA2: escola[0].REC_EXTRA2,
              EM: escola[0].EM,
              SALA_LEITURA: escola[0].SALA_LEITURA,
              MAT_PEDAG: escola[0].MAT_PEDAG,
              TOTAL: escola[0].TOTAL,
            }
          })
        }

      }
      if (this.props.location.state.nomesc !== undefined) {
        this.setState({ nomesc: this.props.location.state.nomesc });
      }
    }
  }

  componentDidMount() {
    listarServidoresEscolarizacao({ codesc: this.state.codesc })
    .then(lista1 => {
        listarServidoresPorEscola({ codesc: this.state.codesc })
        .then(lista2 => {
            loginIdep()
            .then(_ => {
              dadosIdep(this.state.codesc)
              .then(retorno => {
                if (lista1.results.length === 0 && lista2.length === 0 && retorno.result.ano_inicial && retorno.result.ano_final) {
                  this.setState({
                    componentesLabels: [
                      {
                        nome: "SeriesEstudantes",
                        label: "Séries e Estudantes"
                      },
                      {
                        nome: "VagasMatriculas",
                        label: "Vagas e Matrículas"
                      },
                      {
                        nome: "Ambientes",
                        label: "Ambientes"
                      },
                      {
                        nome: "Idep",
                        label: "IDEP"
                      },
                    ]
                  });
                } else if (lista1.results.length === 0 && lista2.length === 0 && !retorno.result.ano_inicial && !retorno.result.ano_final) {
                  this.setState({
                    componentesLabels: [
                      {
                        nome: "SeriesEstudantes",
                        label: "Séries e Estudantes"
                      },
                      {
                        nome: "VagasMatriculas",
                        label: "Vagas e Matrículas"
                      },
                      {
                        nome: "Ambientes",
                        label: "Ambientes"
                      }
                    ]
                  });
                }else if (lista1.results.length > 0 && lista2.length > 0 && !retorno.result.ano_inicial && !retorno.result.ano_final) {
                  this.setState({
                    componentesLabels: [
                      {
                        nome: "SeriesEstudantes",
                        label: "Séries e Estudantes"
                      },
                      {
                        nome: "Profissionais",
                        label: "Profissionais"
                      },
                      {
                        nome: "VagasMatriculas",
                        label: "Vagas e Matrículas"
                      },
                      {
                        nome: "Ambientes",
                        label: "Ambientes"
                      },
                    ]
                  });
                }
                if (this.state.dadosDaEscolaPtrf && this.state.dadosDaEscolaPtrf.EOL){
                  this.setState(prevState => ({
                    componentesLabels: [...prevState.componentesLabels,
                      {
                        nome: "Ptrf",
                        label: "PTRF"
                      }]
                  }))
                }
              });
            });
            this.setState({ loading: false });
          }
        );
      }
    );

    dataReferencia().then(response => {
      this.setState({
        dataReferencia: formatarData(response.results[0].dt_atualizacao)
      });
    });
    if (
      this.state.codesc &&
      document.querySelector(".nav .active:first-child")
    ) {
      document.querySelector(".nav .active:first-child").click();
    }
  }

  renderizaComponente(componente) {
    const { dataReferencia, codesc, dadosDaEscolaPtrf } = this.state;
    switch (componente) {
      case "SeriesEstudantes":
        return (
          <SeriesEstudantes codesc={codesc} dataReferencia={dataReferencia} />
        );
      case "Profissionais":
        return (
          <Profissionais codesc={codesc} dataReferencia={dataReferencia} />
        );
      case "VagasMatriculas":
        return (
          <VagasMatriculas codesc={codesc} dataReferencia={dataReferencia} />
        );
      case "Ambientes":
        return <Ambientes codesc={codesc} dataReferencia={dataReferencia} />;
      case "Idep":
        return <Idep codesc={codesc} dataReferencia={dataReferencia} />;
        case "Ptrf":
        return <Ptrf codesc={codesc} dataReferencia={dataReferencia} dadosDaEscolaPtrf={dadosDaEscolaPtrf} />;
      default:
        return <NullView />;
    }
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        <Menu {...this.props} />
        <Auxiliar texto={this.state.nomesc} estatisticas={true} />
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-sm-12 mt-5 mb-5 estatisticas">
              {loading ? (
                <div>Carregando...</div>
              ) : (
                <ul className="nav nav-tabs nav-fill" role="tablist">
                  {this.state.componentesLabels.length > 0 ? (
                    this.state.componentesLabels.map((componente, indice) => {
                      return (
                        <li key={indice} className="nav-item">
                          <a
                            className={
                              indice === 0 ? `nav-link active` : `nav-link`
                            }
                            id={`${componente.nome}-tab`}
                            data-toggle="tab"
                            href={`#${componente.nome}`}
                            role="tab"
                            aria-controls={componente.nome}
                            aria-selected={indice === 0 ? `true` : `false`}
                          >
                            {componente.label}
                          </a>
                        </li>
                      );
                    })
                  ) : (
                    <NullView />
                  )}
                </ul>
              )}
              <div className="tab-content mt-5" id="estatisticas-abas">
                {this.state.componentesLabels.length > 0 ? (
                  this.state.componentesLabels.map((componente, indice) => {
                    return (
                      <div
                        key={indice}
                        className={
                          indice === 0
                            ? `tab-pane fade show active`
                            : `tab-pane fade`
                        }
                        id={componente.nome}
                        role="tabpanel"
                        aria-labelledby={`${componente.nome}-tab`}
                      >
                        {
                          <Suspense fallback={<NullView />}>
                            <div id="conteudo">
                              {this.renderizaComponente(componente.nome)}
                            </div>
                          </Suspense>
                        }
                      </div>
                    );
                  })
                ) : (
                  <NullView />
                )}
              </div>
            </div>
          </div>
        </div>
        <Rodape />
      </div>
    );
  }
}
