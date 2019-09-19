import React, { Component, lazy, Suspense } from "react";
import Menu from "../MenuSuperior/Menu";
import Auxiliar from "../MenuSuperior/Auxiliar";
import Rodape from "../Rodape/Rodape";
import NullView from "./NullView";

const SeriesEstudantes = lazy(() => import("./SeriesEstudantes"));
const Profissionais = lazy(() => import("./Profissionais"));
const VagasMatriculas = lazy(() => import("./VagasMatriculas"));
const Ambientes = lazy(() => import("./Ambientes"));
const Idep = lazy(() => import("./Idep/Idep"));

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
        }
      ],
      codesc: "",
      nomesc: ""
    }
  }

  componentWillMount() {
    if (this.props.location.state !== undefined) {
      if (this.props.location.state.codesc !== undefined) {
        this.setState({ codesc: this.props.location.state.codesc });
      }
      if (this.props.location.state.nomesc !== undefined) {
        this.setState({ nomesc: this.props.location.state.nomesc });
      }
    }
  }

  componentDidMount() {
    if (this.state.codesc) {
      document.querySelector(".nav .active:first-child").click();
    }
  }

  renderizaComponente(componente) {
    switch (componente) {
      case "SeriesEstudantes":
        return <SeriesEstudantes codesc={this.state.codesc} />;
      case "Profissionais":
        return <Profissionais codesc={this.state.codesc} />;
      case "VagasMatriculas":
        return <VagasMatriculas codesc={this.state.codesc} />;
      case "Ambientes":
        return <Ambientes codesc={this.state.codesc} />;
      case "Idep":
        return <Idep codesc={this.state.codesc} />;
      default:
        return <NullView />;
    }
  }

  render() {
    return (
      <div>
        <Menu />
        <Auxiliar texto={this.state.nomesc} estatisticas={true} />
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-sm-12 mt-5 mb-5 estatisticas">
              <ul className="nav nav-tabs nav-fill" role="tablist">
                {this.state.componentesLabels.length > 0 ? (
                  this.state.componentesLabels.map((componente, indice) => {
                    return (
                      <li key={indice} className="nav-item">
                        <a className={indice === 0 ? `nav-link active` : `nav-link`} id={`${componente.nome}-tab`}
                          data-toggle="tab" href={`#${componente.nome}`} role="tab" aria-controls={componente.nome}
                          aria-selected={indice === 0 ? `true` : `false`}>
                          {componente.label}
                        </a>
                      </li>
                    );
                  })
                ) : (<NullView />)}
              </ul>
              <div className="tab-content mt-5" id="estatisticas-abas">
                {this.state.componentesLabels.length > 0 ? (
                  this.state.componentesLabels.map((componente, indice) => {
                    return (
                      <div key={indice} className={(indice === 0 ? `tab-pane fade show active` : `tab-pane fade`)} id={componente.nome} role="tabpanel" aria-labelledby={`${componente.nome}-tab`}>
                        {
                          <Suspense fallback={<NullView />}>
                            {this.renderizaComponente(componente.nome)}
                          </Suspense>
                        }
                      </div>
                    );
                  })
                ) : (<NullView />)}
              </div>
            </div>
          </div>
        </div>
        <Rodape />
      </div>
    );
  }
}
