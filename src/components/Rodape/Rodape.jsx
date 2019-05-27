import React, { Component } from "react";
import { Link } from "react-router-dom";
import logoNCSA from "../../img/by_nc_sa.png";
import logoPrefeitura from "../../img/logo_sp.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

export default class Rodape extends Component {
  render() {
    return (
      <div className="p-5 text-white area-rodape fonte-doze">
        <div className="container">
          <div className="row">
            <div className="col -lg-2 col-xs-12 mb-xs-4 d-flex align-items-end">
              <img src={logoPrefeitura} alt="Prefeitura de SP" />
            </div>
            <div className="col-lg-3 col-xs-12 border-left mb-xs-4">
              <ul className="list-unstyled mb-5 pb-5">
                <li className="text-uppercase font-weight-bold">Governo Municipal</li>
              </ul>
              <ul className="list-unstyled mb-0 mt-5">
                <li>Prefeito Bruno Covas</li>
                <li>Equipe de Governo</li>
                <li>Agenda do Prefeito</li>
                <li>Agenda do Secretário</li>
              </ul>
            </div>
            <div className="col-lg-3 col-xs-12 mb-xs-4">
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
            <div className="col-lg-4 col-xs-12 ">
              <div className="form-group">
                <select className="form-control bg-secondary border-secondary text-white">
                  <option>Secretarias</option>
                </select>
              </div>
              <div className="form-group">
                <select className="form-control bg-secondary border-secondary text-white">
                  <option>Prefeituras Regionais</option>
                </select>
              </div>
              <div className="form-group">
                <select className="form-control bg-secondary border-secondary text-white">
                  <option>Órgãos e Autarquias</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
