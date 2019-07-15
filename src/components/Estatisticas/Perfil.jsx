import React, { Component } from 'react';
import { listarModalidades } from "../../services/estatisticas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faBars } from "@fortawesome/free-solid-svg-icons";

export default class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalidades: []
    }
  }

  componentDidMount() {
    listarModalidades({ codesc: '094145' }).then(lista => {
      console.log(lista);
      this.setState({ modalidades: lista.modalidade });
    });
  }

  render() {
    return (
      <div className="mt-5 mb-5">
        <div className="perfil-cabecalho mb-5">
          <h1 className="border-bottom">Perfil da Escola</h1>
          <p>Data de referência: 24/05/2019</p>
          <div className="d-inline-block mr-2">Informações sobre:</div>
          <div className="btn-group btn-group-sm" role="group" aria-label="">
            <button type="button" className="btn btn-secondary">Todas</button>
            <button type="button" className="btn btn-secondary">Modalidades</button>
            <button type="button" className="btn btn-secondary">Ambientes</button>
          </div>
        </div>
        <div className="modalidades">
          <h5 className="border-bottom">Modalidades</h5>
          {this.state.modalidades.length > 0 ? (
            this.state.modalidades.map((modalidade, indice) => {
              return (
                <div className="card shadow-sm mb-3">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <FontAwesomeIcon icon={faBook} className="cor-azul font-italic" />
                    {modalidade}
                    <FontAwesomeIcon icon={faBars} className="cor-cinza" />
                  </div>
                </div>
              );
            })
          ) : (null)}
        </div>
      </div>
    );
  }
}
