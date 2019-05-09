import React, { Component } from "react";
import MenuHome from "../MenuSuperior/MenuHome";
import Buscador from "../Buscador/Buscador";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      escolaSelecionada: ""
    };

    this.setEscola = this.setEscola.bind(this);
  }

  setEscola(event) {
    this.setState({ escolaSelecionada: event });
  }

  render() {
    return (
      <div>
        <MenuHome />
        <div className="w-100 mapa-home">
          <div className="container d-flex justify-content-center">
            <div className="position-absolute conteudo">
              <div className="col-lg-7 col-xs-12 text-center m-auto">
                <h2>
                  Aqui você encontra todas as informações sobre sua escola
                </h2>
              </div>
              <div className="col-lg-12 col-xs-12">
                <Buscador />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
