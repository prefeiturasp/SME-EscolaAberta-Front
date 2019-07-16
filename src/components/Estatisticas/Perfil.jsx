import React, { Component } from 'react';
import { listarModalidades, listarAmbientes } from "../../services/estatisticas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faBars } from "@fortawesome/free-solid-svg-icons";

export default class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalidades: [],
      ambientes: [],
      referencia: ''
    }
  }

  componentDidMount() {
    listarModalidades({ codesc: '094145' }).then(lista => {
      this.setState({ modalidades: lista.modalidade });
    });
    listarAmbientes({ codesc: '094145' }).then(lista => {
      this.setState({ ambientes: lista.results });
    })
  }

  selecionaTab = event => {
    if (window.jQuery(event.target).attr("type") === "button") {
      window.jQuery(".btn-group[role=tablist]").find(".active").removeClass("active");
      window.jQuery(event.target).addClass("active");
      window.jQuery(".tab-pane").tab("show");
    } else {
      window.jQuery(".btn-group[role=tablist]").find(".active").removeClass("active");
      window.jQuery(event.target).addClass("active");
    }
  }

  render() {
    return (
      <div className="mt-5 mb-5">
        <div className="estatisticas-cabecalho mb-5">
          <h1 className="border-bottom font-weight-light">Perfil da Escola</h1>
          <div className="referencia mt-1 mb-5">Data de referência: {this.state.referencia}</div>
          <div className="d-inline-block mr-2">Informações sobre:</div>
          <div className="btn-group btn-group-sm" role="tablist">
            <button type="button" className="btn btn-outline-info active" onClick={this.selecionaTab}>Todas</button>
            <a className="btn btn-outline-info" id="Modalidades-tab" data-toggle="tab" href="#Modalidades"
              role="tab" aria-controls="Modalidades" aria-selected="false" onClick={this.selecionaTab}>
              Modalidades
            </a>
            <a className="btn btn-outline-info" id="Ambientes-tab" data-toggle="tab" href="#Ambientes"
              role="tab" aria-controls="Ambientes" aria-selected="false" onClick={this.selecionaTab}>
              Ambientes
            </a>
          </div>
        </div>
        <div className="tab-content">
          <div className="modalidades mb-5 tab-pane fade" id="Modalidades" role="tabpanel" aria-labelledby="Modalidades-tab">
            <h5 className="border-bottom pb-2">Modalidades</h5>
            {this.state.modalidades.length > 0 ? (
              this.state.modalidades.map((modalidade, indice) => {
                return (
                  <div key={indice} className="card shadow-sm mb-3">
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <FontAwesomeIcon icon={faBook} className="cor-azul" />
                      {modalidade}
                      <FontAwesomeIcon icon={faBars} className="cor-cinza" />
                    </div>
                  </div>
                );
              })
            ) : (null)}
          </div>
          <div className="ambientes mt-5 tab-pane fade" id="Ambientes" role="tabpanel" aria-labelledby="Ambientes-tab">
            <h5>Ambientes</h5>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Tipo</th>
                  <th scope="col" className="text-center">Quantidade</th>
                </tr>
              </thead>
              <tbody>
                {this.state.ambientes.length > 0 ? (
                  this.state.ambientes.map((ambiente, indice) => {
                    return (
                      <tr key={indice}>
                        <td>{ambiente.ambiente}</td>
                        <td className="text-center">{ambiente.total}</td>
                      </tr>
                    );
                  })
                ) : (null)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
