import React, { Component } from "react";
import shortid from "shortid";
import Menu from "../MenuSuperior/Menu";
import Auxiliar from "../MenuSuperior/Auxiliar";
import Rodape from "../Rodape/Rodape";
import NullView from "./NullView";

export default class Estatisticas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentesLabels: [
        {
          nome: "SeriesEstudantes", label: "Séries e Estudantes"
        },
        {
          nome: "Profissionais", label: "Profissionais"
        },
        {
          nome: "VagasMatriculas", label: "Vagas e Matrículas"
        },
        {
          nome: "Ambientes", label: "Ambientes"
        }
      ],
      componentesCarregados: [],
      componentes: [],
      codesc: "",
      nomesc: ""
    }
  }

  componentDidMount() {
    if (this.props.location.state !== undefined) {
      if (this.props.location.state.codesc !== undefined) {
        this.setState({ codesc: this.props.location.state.codesc });
      }
      if (this.props.location.state.nomesc !== undefined) {
        this.setState({ nomesc: this.props.location.state.nomesc });
      }
    }
    document.querySelector(".nav .active:first-child").click();
  }

  selecionaComponente = async event => {
    event.persist();
    document.querySelectorAll(".nav .active").forEach((el) => {
      el.classList.remove("active");
    });
    event.target.classList.add("active");
    await this.buscaComponente(`${event.target.dataset.componente}`);
  }

  buscaComponente = async componente => {
    if (this.state.componentesCarregados.includes(componente)) return;

    import(`./${componente}.jsx`).then(Componente => {
      this.setState({
        componentesCarregados: this.state.componentesCarregados.concat(componente),
        componentes: this.state.componentes.concat(
          <Componente.default
            key={componente}
            codesc={this.state.codesc}
          />
        )
      });
    }).catch(error => {
      this.setState({
        componentesCarregados: this.state.componentesCarregados.concat(componente),
        componentes: this.state.componentes.concat(
          <NullView key={shortid.generate()} />
        )
      });
    });
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
                        <a onClick={this.selecionaComponente} data-componente={componente.nome}
                          className={indice === 0 ? `nav-link active` : `nav-link`} id={`${componente.nome}-tab`}
                          data-toggle="tab" href={`#${componente.nome}`} role="tab" aria-controls={componente.nome}
                          aria-selected={indice === 0 ? `true` : `false`}>
                          {componente.label}
                        </a>
                      </li>
                    );
                  })
                ) : (null)}
              </ul>
              <div className="tab-content mt-5" id="estatisticas-abas">
                {this.state.componentesLabels.map((componente, indice) => {
                  return (
                    <div key={indice} className={(indice === 0 ? `tab-pane fade show active` : `tab-pane fade`)} id={componente.nome} role="tabpanel" aria-labelledby={`${componente.nome}-tab`}>
                      {this.state.componentes.filter((c) => {
                        return c.type.name === componente.nome;
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <Rodape />
      </div>
    );
  }
}
