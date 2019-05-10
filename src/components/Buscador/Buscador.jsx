import React, { Component } from "react";
import { Link } from "react-router-dom";
import { listarEscolas, listarBairros, listarDistritos } from "../../services/escolas";
import { buscarLogradouroPorCep, buscarLatLngPorLogradouro } from "../../services/endereco";

export default class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      escolasLista: [],
      bairrosLista: [],
      distritosLista: []
    };

    this.buscarPorTermo = this.buscarPorTermo.bind(this);
  }

  buscarPorTermo = e => {
    let { escolas, bairros, distritos, ruas } = [];
    if (e.target.value.length >= 3) {
      if (!isNaN(e.target.value)) {
        this.buscarLogradouroCep(e.target.value);
      } else {
        escolas = this.buscarEscolasPorNome(e.target.value);
        bairros = this.buscarBairros(e.target.value);
        distritos = this.buscarDistritos(e.target.value);
        buscarLatLngPorLogradouro({ logradouro: e.target.value }).then(local =>
          ruas = local
        );
        setTimeout(
          function () {
            console.log(ruas);
            this.setState({ escolasLista: escolas });
            this.setState({ bairrosLista: bairros });
            this.setState({ distritosLista: distritos });
            document.querySelector(".resultados").classList.remove("d-none");
          }.bind(this),
          1000
        );
      }
    }
  };

  buscarEscolasPorNome(e) {
    let escolas = [];
    listarEscolas({ escola: e }).then(lista => {
      lista.results.forEach(function (escola) {
        escolas.push({ value: escola.codesc, label: escola.nomesc });
      });
    });
    return escolas;
  }

  buscarBairros(e) {
    let bairros = [];
    listarBairros({ bairro: e }).then(lista => {
      lista.results.forEach(function (bairro) {
        bairros.push({ label: bairro.bairro });
      });
    });
    return bairros;
  }

  buscarDistritos(e) {
    let distritos = [];
    listarDistritos({ distrito: e }).then(lista => {
      lista.results.forEach(function (distrito) {
        distritos.push({ label: distrito.distrito });
      });
    });
    return distritos;
  }

  buscarLogradouroCep(e) {
    buscarLogradouroPorCep({ cep: e }).then(logradouro => {
      buscarLatLngPorLogradouro({ logradouro: logradouro.logradouro }).then(local => {
        console.log(local.results[0].lat, local.results[0].lon);
      })
    })
  }

  render() {
    return (
      <div>
        <div className="form-group mt-4 mb-0">
          <input
            type="text"
            className="form-control form-control-lg rounded-pill shadow d-inline-block h-100 pt-3 pb-3"
            onBlur={this.buscarPorTermo}
          />
        </div>
        <div className="resultados container bg-white h-100 shadow rounded d-none mb-4">
          <div className="row">
            <div className="col-lg-4 col-xs-12 p-0">
              <div className="list-group">
                <li className="list-group-item list-group-item-secondary border-0">
                  Escolas
                </li>
                {this.state.escolasLista.map((escola, indice) => {
                  return (
                    <Link
                      key={indice}
                      to={{
                        pathname: "/escolas",
                        state: {
                          escola: escola.label
                        }
                      }}
                      className="list-group-item list-group-item-action border-0"
                    >
                      {escola.label}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="col-lg-4 col-xs-12 p-0">
              <div className="list-group">
                <li className="list-group-item list-group-item-secondary border-0">
                  Bairros
                </li>
                {this.state.bairrosLista.map((bairro, indice) => {
                  return (
                    <Link
                      key={indice}
                      to={{
                        pathname: "/escolas",
                        state: {
                          bairro: bairro.label
                        }
                      }}
                      className="list-group-item list-group-item-action border-0"
                    >
                      {bairro.label}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="col-lg-4 col-xs-12 p-0">
              <div className="list-group">
                <li className="list-group-item list-group-item-secondary border-0">
                  Distritos
                </li>
                {this.state.distritosLista.map((distrito, indice) => {
                  return (
                    <Link
                      key={indice}
                      to={{
                        pathname: "/escolas",
                        state: {
                          distrito: distrito.label
                        }
                      }}
                      className="list-group-item list-group-item-action border-0"
                    >
                      {distrito.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
