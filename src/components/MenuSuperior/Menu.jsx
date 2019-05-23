import React, { Component } from "react";
import { Link } from "react-router-dom";
import logoEscolaAberta from "../../img/escola_aberta.png";

export default class Menu extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="row mt-3 mb-4">
            <div className="col-lg-6 col-xs-12 d-flex justify-content-lg-start justify-content-center">
              <h1 className="m-0">
                <Link to="/">
                  <img
                    className="img-fluid"
                    src={logoEscolaAberta}
                    alt="Escola Aberta"
                  />
                </Link>
              </h1>
            </div>
            <div className="col-lg-6 col-xs-12 d-flex justify-content-lg-end justify-content-center">
              <span className="text-black-50 mt-4">
                <strong>Secretaria Municipal de Educação</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
