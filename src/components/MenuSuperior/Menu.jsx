import React, { Component } from "react";
import { Link } from "react-router-dom";
import logoEscolaAberta from "../../img/escola_aberta.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

export default class Menu extends Component {
  render() {
    return (
      <div>
        <div className="bg-light pref-menu fonte-dez">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-xs-12 d-flex justify-content-start">
                <ul className="list-inline mt-3">
                  <li className="list-inline-item"><Link className="text-secondary" to="/">Acesso à informação</Link></li>
                  <li className="list-inline-item"><Link className="text-secondary" to="/">Ouvidoria</Link></li>
                  <li className="list-inline-item"><Link className="text-secondary" to="/">Portal da Transparência</Link></li>
                  <li className="list-inline-item"><Link className="text-secondary" to="/">SP 156</Link></li>
                </ul>
              </div>
              <div className="col-lg-6 col-xs-12 d-flex justify-content-end">
                <ul className="list-inline mt-3">
                  <li className="list-inline-item"><Link className="text-secondary" to="/">Ir ao Conteúdo</Link></li>
                  <li className="list-inline-item"><Link className="text-secondary" to="/">A+</Link></li>
                  <li className="list-inline-item"><Link className="text-secondary" to="/">A-</Link></li>
                  <li className="list-inline-item"><Link className="text-secondary" to="/">BR</Link></li>
                  <li className="list-inline-item"><Link className="text-secondary" to="/"><FontAwesomeIcon icon={faFacebookSquare} /></Link></li>
                  <li className="list-inline-item"><Link className="text-secondary" to="/"><FontAwesomeIcon icon={faInstagram} /></Link></li>
                  <li className="list-inline-item"><Link className="text-secondary" to="/"><FontAwesomeIcon icon={faTwitter} /></Link></li>
                  <li className="list-inline-item"><Link className="text-secondary" to="/"><FontAwesomeIcon icon={faYoutube} /></Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row mt-3 mb-4">
            <div className="col-lg-6 col-sm-12 d-flex justify-content-lg-start justify-content-center">
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
            <div className="col-lg-6 col-sm-12 d-flex justify-content-lg-end justify-content-center">
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
