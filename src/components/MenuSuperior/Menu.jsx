import React, { Component } from "react";
import { Link } from "react-router-dom";
import logoEducacaoSP from "../../img/educacao_sp.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdjust,
  faTextHeight
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookSquare,
  faInstagram,
  faTwitter,
  faYoutube
} from "@fortawesome/free-brands-svg-icons";
import "./style.scss";

export default class Menu extends Component {
  render() {
    const { alterarFonte, alterarContraste, focusBusca } = this.props;
    return (
      <div>
        <div className="header-acessibilidade">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <ul className="list-inline mt-3">
                  <li className="list-inline-item">
                    <a href="#conteudo">
                      Ir ao Conteúdo<span className="span-accesskey">1</span>{" "}
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#menu-principal">
                      Ir para menu principal
                      <span className="span-accesskey">2</span>{" "}
                    </a>
                  </li>
                  <li onClick={focusBusca} className="list-inline-item">
                    <a href="#busca">
                      Ir para a busca<span className="span-accesskey">3</span>{" "}
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#rodape">
                      Ir para o rodapé
                      <span className="span-accesskey">4</span>{" "}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-6 text-right">
                <ul className="list-inline mt-3">
                  <li className="list-inline-item">
                    <a href="http://portal.sme.prefeitura.sp.gov.br/acessibilidade/">
                      Acessibilidade<span className="span-accesskey">5</span>{" "}
                    </a>
                  </li>
                  <li onClick={alterarContraste} className="list-inline-item">
                    Alternar Alto Contraste
                    <FontAwesomeIcon icon={faAdjust} />
                  </li>
                  <li onClick={alterarFonte} className="list-inline-item">
                    Alternar Tamanho da Fonte
                    <FontAwesomeIcon icon={faTextHeight} />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="pref-menu bg-light fonte-dez">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-xs-12 d-flex justify-content-lg-start justify-content-center">
                <ul className="list-inline mt-3">
                  <li className="list-inline-item">
                    <Link className="text-secondary" to="/">
                      Acesso à informação
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link className="text-secondary" to="/">
                      Ouvidoria
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link className="text-secondary" to="/">
                      Portal da Transparência
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link className="text-secondary" to="/">
                      SP 156
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-6 col-xs-12 d-flex justify-content-lg-end justify-content-center">
                <ul className="list-inline mt-3">
                  <li className="list-inline-item">
                    <Link className="text-secondary" to="/">
                      Ir ao Conteúdo
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link className="text-secondary" to="/">
                      A+
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link className="text-secondary" to="/">
                      A-
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link className="text-secondary" to="/">
                      BR
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link className="text-secondary" to="/">
                      <FontAwesomeIcon icon={faFacebookSquare} />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link className="text-secondary" to="/">
                      <FontAwesomeIcon icon={faInstagram} />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link className="text-secondary" to="/">
                      <FontAwesomeIcon icon={faTwitter} />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link className="text-secondary" to="/">
                      <FontAwesomeIcon icon={faYoutube} />
                    </Link>
                  </li>
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
            <div
              id="menu-principal"
              className="col-lg-9 col-sm-12 d-flex links-menu align-items-end justify-content-lg-end justify-content-center pr-lg-0 mb-xs-4"
            >
              <ul className="nav nav-tabs border-0">
                <li className="nav-item">
                  <Link className="nav-link text-secondary mb-1 pb-0" to="/">
                    Busque uma escola
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-secondary mb-1 pb-0"
                    to="/conheca-a-rede"
                  >
                    Conheça a Rede
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-secondary mb-1 pb-0" to="/">
                    Portal da Transparência
                  </Link>
                </li>
                <li>
                  <Link
                    className="nav-link text-secondary border-0 mb-1 pr-0 pb-0"
                    to="/"
                  >
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
