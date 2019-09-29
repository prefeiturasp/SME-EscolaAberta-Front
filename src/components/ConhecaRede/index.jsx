import React, { Component, lazy, Suspense } from "react";
import Menu from "../MenuSuperior/Menu";
import { listarDREs } from "../../services/escolas";
import Auxiliar from "../MenuSuperior/Auxiliar";
import Rodape from "../Rodape/Rodape";
import NullView from "./NullView";
import {
  agregarDefaultDiretoriaRegional,
  dreLabel,
  formatarData
} from "./helper";
import { dataReferencia } from "services/estatisticas";

const Escolas = lazy(() => import("./Escolas/Container"));
const Profissionais = lazy(() => import("./Profissionais/Container"));
const VagasMatriculas = lazy(() => import("./VagasMatriculas/Container"));
const Ambientes = lazy(() => import("./Ambientes/Container"));

export default class ConhecaRede extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentesLabels: [
        {
          nome: "Escolas",
          label: "Escolas"
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
        }
      ],
      diretoriasRegionais: [],
      codesc: "",
      nomesc: "",
      dreSelecionada: "",
      tabAtual: "Escolas",
      dataReferencia: null
    };
    this.onDRESelected = this.onDRESelected.bind(this);
  }

  onDRESelected(dreSelecionada) {
    this.setState({ dreSelecionada });
  }

  componentDidMount() {
    dataReferencia().then(response => {
      this.setState({
        dataReferencia: formatarData(response.results[0].dt_atualizacao)
      });
    });
    listarDREs().then(diretoriasRegionais => {
      this.setState({
        diretoriasRegionais: agregarDefaultDiretoriaRegional(
          diretoriasRegionais.results
        )
      });
    });
    if (this.props.location && this.props.location.state !== undefined) {
      if (this.props.location.state.codesc !== undefined) {
        this.setState({ codesc: this.props.location.state.codesc }, () => {
          document.querySelector(".nav .active:first-child").click();
        });
      }
      if (this.props.location.state.nomesc !== undefined) {
        this.setState({ nomesc: this.props.location.state.nomesc });
      }
    }
  }

  trocarAba(componente) {
    if (componente.nome !== this.state.tabAtual) {
      this.setState({ dreSelecionada: "", tabAtual: componente.nome });
    }
  }

  renderizaComponente(componente) {
    switch (componente) {
      case "Escolas":
        return <Escolas onDRESelected={this.onDRESelected} {...this.state} />;
      case "Profissionais":
        return (
          <Profissionais onDRESelected={this.onDRESelected} {...this.state} />
        );
      case "VagasMatriculas":
        return (
          <VagasMatriculas onDRESelected={this.onDRESelected} {...this.state} />
        );
      case "Ambientes":
        return <Ambientes onDRESelected={this.onDRESelected} {...this.state} />;
      default:
        return <NullView />;
    }
  }

  render() {
    const { dreSelecionada, diretoriasRegionais } = this.state;
    return (
      <div>
        <Menu {...this.props} />
        <Auxiliar
          conhecaARede
          texto={
            dreSelecionada !== ""
              ? dreLabel(diretoriasRegionais, dreSelecionada)
              : "Secretaria Municipal de Educação"
          }
        />
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-sm-12 mt-5 mb-5 estatisticas">
              <ul className="nav nav-tabs nav-fill" role="tablist">
                {this.state.componentesLabels.length > 0 ? (
                  this.state.componentesLabels.map((componente, indice) => {
                    return (
                      <li
                        key={indice}
                        onClick={() => this.trocarAba(componente)}
                        className="nav-item"
                      >
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
