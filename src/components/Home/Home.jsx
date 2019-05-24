import React, { Component } from "react";
import Menu from "../MenuSuperior/Menu";
import Buscador from "../Buscador/Buscador";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Menu />
        <div className="w-100 bg-busca">
          <div className="container d-flex justify-content-center">
            <div className="position-absolute conteudo">
              <div className="col-lg-7 col-sm-12 text-center m-auto">
                <h2>Aqui você encontra todas as informações sobre sua escola</h2>
              </div>
              <div className="col-lg-12 col-sm-12">
                <Buscador />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
