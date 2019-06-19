import React, { Component } from "react";
import { Link } from "react-router-dom";
import logoEducacaoSP from "../../img/educacao_sp.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faFacebookSquare, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

export default class Menu extends Component {
  render() {
    return (
      <div>
        <div className="pref-menu bg-light fonte-dez">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-xs-12 d-flex justify-content-lg-start justify-content-center">
                <ul className="list-inline mt-3">
                  <li className="list-inline-item"><Link className="text-secondary" to="/">Acesso à informação</Link></li>
                  <li className="list-inline-item"><Link className="text-secondary" to="/">Ouvidoria</Link></li>
                  <li className="list-inline-item"><Link className="text-secondary" to="/">Portal da Transparência</Link></li>
                  <li className="list-inline-item"><Link className="text-secondary" to="/">SP 156</Link></li>
                </ul>
              </div>
              <div className="col-lg-6 col-xs-12 d-flex justify-content-lg-end justify-content-center">
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
          <div className="row mt-4 mb-4">
            <div className="col-lg-3 col-sm-12 d-flex justify-content-lg-start justify-content-center align-items-end mb-4 mb-lg-0">
              <h1 className="m-0">
                <Link to="/">
                  <img
                    src={logoEducacaoSP}
                    alt="Escola Aberta"
                    className="img-fluid"
                  />
                </Link>
              </h1>
            </div>
            <div className="col-lg-9 col-sm-12 d-flex links-menu align-items-end justify-content-lg-end justify-content-center pr-lg-0 mb-xs-4">
              <ul className="nav nav-tabs border-0">
                <li className="nav-item">
                  <Link className="nav-link text-secondary mb-1 pb-0" to="/consulta">Consulte sua posição</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-secondary mb-1 pb-0" to="/">Incentivo a Leitura</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-secondary mb-1 pb-0" to="/">Imprensa</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-secondary mb-1 pb-0" to="/">Dúvidas</Link>
                </li>
                <li>
                  <Link className="nav-link text-secondary border-0 mb-1 pr-0 pb-0" to="/">
                    <FontAwesomeIcon icon={faSearch} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
