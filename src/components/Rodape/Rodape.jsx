import React, { Component } from "react";
import { Link } from "react-router-dom";
import logoNCSA from "../../img/by_nc_sa.png";
import logoPrefeitura from "../../img/logo_sp.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

export default class Rodape extends Component {
  render() {
    return (
      <div>
        <div className="area-rodape text-white p-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-2 col-xs-12 d-flex align-items-end mb-4 mb-lg-0">
                <img src={logoPrefeitura} alt="Prefeitura de SP" className="img-fluid" />
              </div>
              <div className="col-lg-2 col-xs-12 border-left mb-4 mb-lg-0">
                <ul className="list-unstyled mb-0">
                  <li className="text-uppercase font-weight-bold">Governo Municipal</li>
                  <li className="d-lg-block d-none">&nbsp;</li>
                  <li className="d-lg-block d-none">&nbsp;</li>
                  <li className="d-lg-block d-none">&nbsp;</li>
                </ul>
                <ul className="list-unstyled mb-0 mt-0 align-bottom">
                  <li>Prefeito Bruno Covas</li>
                  <li>Equipe de Governo</li>
                  <li>Agenda do Prefeito</li>
                  <li>Agenda do Secretário</li>
                </ul>
              </div>
              <div className="col-lg-3 col-xs-12 mb-4 mb-lg-0">
                <ul className="list-unstyled mb-1">
                  <li className="text-uppercase font-weight-bold">Mapa do Site</li>
                </ul>
                <ul className="list-unstyled mb-1">
                  <li className="text-uppercase font-weight-bold">Canais Oficiais</li>
                </ul>
                <ul className="list-inline">
                  <li className="list-inline-item"><Link className="text-white" to="/"><FontAwesomeIcon icon={faFacebookSquare} /></Link></li>
                  <li className="list-inline-item"><Link className="text-white" to="/"><FontAwesomeIcon icon={faInstagram} /></Link></li>
                  <li className="list-inline-item"><Link className="text-white" to="/"><FontAwesomeIcon icon={faTwitter} /></Link></li>
                  <li className="list-inline-item"><Link className="text-white" to="/"><FontAwesomeIcon icon={faYoutube} /></Link></li>
                </ul>
                <img src={logoNCSA} alt="Copyright" />
              </div>
              <div className="col-lg-1"></div>
              <div className="col-lg-4 col-xs-12">
                <div className="form-group mb-2">
                  <select
                    className="form-control fonte-doze rounded-pill text-secondary bg-transparent border border-secondary text-white">
                    <option>Secretarias</option>
                  </select>
                </div>
                <div className="form-group mb-2">
                  <select
                    className="form-control fonte-doze rounded-pill text-secondary bg-transparent border border-secondary text-white">
                    <option>Prefeituras Regionais</option>
                  </select>
                </div>
                <div className="form-group mb-0">
                  <select
                    className="form-control fonte-doze rounded-pill text-secondary bg-transparent border border-secondary text-white">
                    <option>Órgãos e Autarquias</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="endereco container">
          <div className="row">
            <div className="col-lg-12 col-xs-12 text-center fonte-doze mt-2 mb-2">
              SECRETARIA MUNICIPAL DE EDUCAÇÃO — Rua Borges Lagoa, 1230 — Vila Clementino — CEP: 04038-003
            </div>
          </div>
        </div>
      </div>
    );
  }
}
