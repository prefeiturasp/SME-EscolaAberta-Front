import React, { Component } from "react";
import { Link } from "react-router-dom";
import { listarEscolas, listarBairros, listarDistritos } from "../../services/escolas";
import { buscarLogradouroPorCep, buscarLatLngPorLogradouro, buscaLogradouroPorLatLng } from "../../services/endereco";

export default class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      escolasLista: [],
      bairrosLista: [],
      distritosLista: [],
      logradourosLista: []
    };

    this.buscarPorTermo = this.buscarPorTermo.bind(this);
    this.retornaLocalizacao = this.retornaLocalizacao.bind(this);
    this.defineLatitudeLongitude = this.defineLatitudeLongitude.bind(this);
    this.trataErros = this.trataErros.bind(this);
    this.mostrarBusca = this.mostrarBusca.bind(this);
  }

  buscarPorTermo = e => {
    let escolas = [];
    let bairros = [];
    let distritos = [];
    let ruas = [];
    if (e.target.value.length >= 3) {
      if (!isNaN(e.target.value)) {
        this.buscarLogradouroCep(e.target.value);
        this.setState({ escolasLista: [] });
        this.setState({ bairrosLista: [] });
        this.setState({ distritosLista: [] });
      } else {
        escolas = this.buscarEscolasPorNome(e.target.value);
        bairros = this.buscarBairros(e.target.value);
        distritos = this.buscarDistritos(e.target.value);

        buscarLatLngPorLogradouro({ logradouro: e.target.value }).then(localizacoes => {
          localizacoes.results.forEach(function (local) {
            if (local.type.indexOf("residential") !== -1) {
              ruas.push({ value: { lat: local.lat, lon: local.lon }, label: local.name });
            }
          });
        })

        setTimeout(
          function () {
            this.setState({ logradourosLista: ruas });
            this.setState({ escolasLista: escolas });
            this.setState({ bairrosLista: bairros });
            this.setState({ distritosLista: distritos });
          }.bind(this),
          1000
        );
      }
    }
  }

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
      buscarLatLngPorLogradouro({ logradouro: logradouro.logradouro }).then(localizacoes => {
        let ruas = [];
        localizacoes.results.forEach(function (local) {
          if (local.type.indexOf("residential") !== -1) {
            ruas.push({ value: { lat: local.lat, lon: local.lon }, label: local.name });
          }
        });
        setTimeout(
          function () {
            this.setState({ logradourosLista: ruas });
          }.bind(this), 1000
        );
      })
    })
  }

  retornaLocalizacao() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        this.defineLatitudeLongitude,
        this.trataErros
      );
    } else {
      this.trataErros("A geolocalização não está habilitada");
    }
  }

  defineLatitudeLongitude(position) {
    let ruas = [];
    buscaLogradouroPorLatLng({ lat: position.coords.latitude, lng: position.coords.longitude }).then(logradouro => {
      ruas.push({ value: { lat: logradouro.lat, lon: logradouro.lon }, label: logradouro.address.road });
    });
    setTimeout(
      function () {
        this.setState({ logradourosLista: ruas });
      }.bind(this), 1000
    );
  }

  trataErros(message) {
    console.log("Não foi possível determinar a localização", message);
  }

  mostrarBusca(event) {
    if (event.type === "focus") {
      document.querySelector(".form-control-lg").classList.add("rounded-bottom-0", "border-bottom-0");
      document.querySelector(".resultados").classList.remove("d-none");
      document.querySelector(".resultados").classList.add("borda-busca");
    } else {
      document.querySelector(".resultados").classList.add("borda-off");
      document.querySelector(".resultados").classList.remove("borda-busca");
    }
  }

  render() {
    return (
      <div>
        <div className="form-group mt-4 mb-0 busca">
          <input
            type="text"
            className="form-control form-control-lg rounded-pill shadow d-inline-block h-100 pt-3 pb-3"
            placeholder="Encontre sua escola pelo nome ou bairro"
            onKeyUp={this.buscarPorTermo}
            onFocus={this.mostrarBusca}
            onBlur={this.mostrarBusca}
          />
        </div>
        <div className="resultados container bg-white h-100 shadow rounded-0 border border-top-0 borda-busca d-none mb-4">
          <div className="row">
            <div className="col-lg-12 col-xs-12 p-0">
              <div className="list-group">
                <li className="list-group-item list-group-item-action border-0 cursor-link" onClick={this.retornaLocalizacao}>
                  <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M13.0771 6.52539C9.80146 6.52539 7.13647 9.08378 7.13647 12.2284C7.13647 15.3731 9.80146 17.9315 13.0771 17.9315C16.3528 17.9315 19.0178 15.3731 19.0178 12.2284C19.0178 9.08378 16.3528 6.52539 13.0771 6.52539ZM13.0771 16.5252C10.6092 16.5252 8.60132 14.5977 8.60132 12.2284C8.60132 9.85918 10.6092 7.93164 13.0771 7.93164C15.5451 7.93164 17.553 9.85918 17.553 12.2284C17.553 14.5977 15.5451 16.5252 13.0771 16.5252Z" fill="#939393" />
                    <path d="M13.077 9.10254C11.2815 9.10254 9.8208 10.5048 9.8208 12.2285C9.8208 13.9522 11.2815 15.3544 13.077 15.3544C14.8725 15.3544 16.3332 13.9522 16.3332 12.2285C16.3332 10.5048 14.8725 9.10254 13.077 9.10254Z" fill="#939393" />
                    <path d="M23.3335 11.5254C22.9737 6.64148 18.897 2.7278 13.8096 2.38238V0.228516H12.3447V2.38238C7.25732 2.7278 3.18057 6.64148 2.82075 11.5254H0.577148V12.9316H2.82075C3.18057 17.8155 7.25732 21.7292 12.3447 22.0747V24.2285H13.8096V22.0747C18.897 21.7292 22.9737 17.8155 23.3335 12.9316H25.5771V11.5254H23.3335ZM21.8644 12.9316C21.5108 17.0397 18.0888 20.3249 13.8096 20.6643V19.5308H12.3447V20.6643C8.06553 20.3249 4.64346 17.0397 4.28989 12.9316H5.47061V11.5254H4.28989C4.64346 7.41736 8.06553 4.13217 12.3447 3.79275V4.92623H13.8096V3.79275C18.0888 4.13217 21.5108 7.41736 21.8644 11.5254H20.6837V12.9316H21.8644Z" fill="#939393" />
                  </svg>
                  Usar minha localização
                </li>
              </div>
            </div>
          </div>
          <div className="row">
            {this.state.escolasLista.length > 0 ? (
              <div className="col-lg col-xs-12 p-0">
                <div className="list-group">
                  <li className="list-group-item list-group-item-secondary border-0 rounded-0 mb-0">
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
            ) : (null)}
            {this.state.bairrosLista.length > 0 ? (
              <div className="col-lg col-xs-12 p-0">
                <div className="list-group">
                  <li className="list-group-item list-group-item-secondary border-0 rounded-0 mb-0">
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
            ) : (null)}
            {this.state.distritosLista.length > 0 ? (
              <div className="col-lg col-xs-12 p-0">
                <div className="list-group">
                  <li className="list-group-item list-group-item-secondary border-0 rounded-0 mb-0">
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
            ) : (null)}
            {this.state.logradourosLista.length > 0 ? (
              <div className="col-lg col-xs-12 p-0">
                <div className="list-group">
                  <li className="list-group-item list-group-item-secondary border-0 rounded-0 mb-0">
                    Logradouros
                </li>
                  {this.state.logradourosLista.map((logradouro, indice) => {
                    return (
                      <Link
                        key={indice}
                        to={{
                          pathname: "/escolas",
                          state: {
                            logradouro: logradouro.label,
                            lat: logradouro.value.lat,
                            lon: logradouro.value.lon
                          }
                        }}
                        className="list-group-item list-group-item-action border-0"
                      >
                        {logradouro.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : (null)}
          </div>
        </div>
      </div>
    );
  }
}
