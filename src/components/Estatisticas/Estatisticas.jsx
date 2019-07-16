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
          nome: "Perfil", label: "Perfil da Escola"
        },
        {
          nome: "Alunos", label: "Alunos"
        },
        {
          nome: "Turmas", label: "Turmas"
        },
        {
          nome: "EducadoresServidores", label: "Educadores e Servidores"
        },
        {
          nome: "Consultas", label: "Consultas"
        },
      ],
      componentesCarregados: [],
      componentes: []
    }
  }

  selecionaComponente = async event => {
    event.persist();
    window.jQuery(".nav").find(".active").removeClass("active");
    window.jQuery(event.target).addClass("active");
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
            data={this.props.data}
          />
        )
      });
    }).catch(error => {
      this.setState({
        loadedComponents: this.state.loadedComponents.concat(componente),
        components: this.state.components.concat(
          <NullView key={shortid.generate()} />
        )
      });
    });
  }

  render() {
    return (
      <div>
        <Menu />
        <Auxiliar texto={this.props.escola} />
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
              <div className="tab-content mt-5">
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
