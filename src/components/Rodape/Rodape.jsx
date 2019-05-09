import React, { Component } from "react";
import logoUnesco from "../../img/unesco.png";
import logoPrefeitura from "../../img/prefeitura.png";

export default class Rodape extends Component {
  render() {
    return (
      <div className="rodape">
        <div className="container">
          <div className="row pt-4 pb-3">
            <div className="d-flex col-lg-6 col-xs-12 justify-content-lg-start justify-content-center mt-2">
              <p>
                Simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries.
              </p>
            </div>
            <div className="d-flex col-lg-6 col-xs-12 justify-content-lg-end justify-content-center">
              <img className="img-fluid" src={logoUnesco} alt="UNESCO" />
              <img
                className="img-fluid"
                src={logoPrefeitura}
                alt="Prefeitura Municipal de São Paulo"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
