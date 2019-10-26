import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  listarEscolas,
  listarBairros,
  listarDistritos,
  listarSubpref
} from "../../services/escolas";
import {
  buscarLogradouroPorCep,
  buscarLatLngPorLogradouro,
  buscaLogradouroPorLatLng
} from "../../services/endereco";
import cookie from "react-cookies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faClock } from "@fortawesome/free-solid-svg-icons";

export default class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      escolasLista: [],
      bairrosLista: [],
      distritosLista: [],
      subprefsLista: [],
      logradourosLista: [],
      historicoLista: []
    };

    this.buscarPorTermo = this.buscarPorTermo.bind(this);
    this.retornaLocalizacao = this.retornaLocalizacao.bind(this);
    this.defineLatitudeLongitude = this.defineLatitudeLongitude.bind(this);
    this.trataErros = this.trataErros.bind(this);
    this.mostrarBusca = this.mostrarBusca.bind(this);
    this.salvarHistoricoBusca = this.salvarHistoricoBusca.bind(this);
  }

  componentDidMount() {
    this.carregarHistorico();
  }

  carregarHistorico() {
    const cookiesLista = Object.entries(cookie.loadAll());
    const historicoLista = [];
    cookiesLista.forEach(historico => {
      if (/\b(historico)\w+\b/g.test(historico[0])) {
        const [tipo, valor] = historico[1].split("_");
        if (
          historicoLista.filter(h => {
            return h.valor === valor;
          }).length === 0
        )
          historicoLista.push({ tipo, valor });
      }
    });

    this.setState({ historicoLista: historicoLista });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.focusBuscaAtributo === false &&
      this.props.focusBuscaAtributo
    ) {
      this.focusNoInput();
    }
  }

  buscarPorTermo = e => {
    let escolas = [];
    let bairros = [];
    let distritos = [];
    let subprefs = [];
    let ruas = [];
    if (e.target.value.length >= 3) {
      if (!isNaN(e.target.value)) {
        this.buscarLogradouroCep(e.target.value);
        this.setState({ escolasLista: [] });
        this.setState({ bairrosLista: [] });
        this.setState({ distritosLista: [] });
        this.setState({ subprefsLista: [] });
      } else {
        escolas = this.buscarEscolasPorNome(e.target.value);
        distritos = this.buscarDistritos(e.target.value);
        // bairros = this.buscarBairros(e.target.value);
        subprefs = this.buscarSubprefs(e.target.value);

        buscarLatLngPorLogradouro({ logradouro: e.target.value }).then(
          localizacoes => {
            localizacoes.results.forEach(function(local) {
              let nome = local.display_name.split(', ')[0] + ', ' + local.display_name.split(', ')[1];
                ruas.push({
                  value: { lat: local.lat, lon: local.lon },
                  label: nome
                });
            });
          }
        );

        setTimeout(
          function() {
            this.setState({ logradourosLista: ruas });
            this.setState({ escolasLista: escolas });
            this.setState({ bairrosLista: bairros });
            this.setState({ distritosLista: distritos });
            this.setState({ subprefsLista: subprefs });
          }.bind(this),
          1000
        );
      }
    }
  };

  removerAcentos = string_com_acentuacao => {
    return string_com_acentuacao
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // Remove acentos
  };

  buscarEscolasPorNome(e) {
    let escolas = [];
    const string_sem_acento = this.removerAcentos(e);

    listarEscolas({ escola: string_sem_acento }).then(lista => {
      lista.results.forEach(function(escola) {
        escolas.push({ value: escola.codesc, label: escola.nomesc });
      });
    });
    return escolas;
  }

  buscarBairros(e) {
    let bairros = [];
    listarBairros({ bairro: e }).then(lista => {
      lista.results.forEach(function(bairro) {
        bairros.push({ label: bairro.bairro });
      });
    });
    return bairros;
  }

  buscarDistritos(e) {
    let distritos = [];
    listarDistritos({ distrito: e }).then(lista => {
      lista.results.forEach(function(distrito) {
        distritos.push({ label: distrito.distrito });
      });
    });
    return distritos;
  }

  buscarSubprefs(e) {
    let subprefs = [];
    listarSubpref({ subpref: e }).then(lista => {
      lista.results.forEach(function(subpref) {
        subprefs.push({ label: subpref.subpref });
      });
    });
    return subprefs;
  }

  buscarLogradouroCep(e) {
    buscarLogradouroPorCep({ cep: e }).then(logradouro => {
      buscarLatLngPorLogradouro({ logradouro: logradouro.logradouro }).then(
        localizacoes => {
          let ruas = [];
          localizacoes.results.forEach(function(local) {
            if (local.type.indexOf("residential") !== -1 && ruas.length < 1) {
              ruas.push({
                value: { lat: local.lat, lon: local.lon },
                label: local.name
              });
            }
          });
          setTimeout(
            function() {
              this.setState({ logradourosLista: ruas });
            }.bind(this),
            1000
          );
        }
      );
    });
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
    this.setState({ escolasLista: [] });
    this.setState({ bairrosLista: [] });
    this.setState({ distritosLista: [] });
    this.setState({ logradourosLista: [] });
    buscaLogradouroPorLatLng({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }).then(logradouro => {
      ruas.push({
        value: { lat: logradouro.lat, lon: logradouro.lon },
        label: logradouro.address.road
      });
    });
    setTimeout(
      function() {
        this.setState({ logradourosLista: ruas });
      }.bind(this),
      1000
    );
  }

  trataErros(message) {
    console.log("Não foi possível determinar a localização", message);
  }

  mostrarBusca(event) {
    if (event.type === "focus") {
      this.carregarHistorico();
      document
        .querySelector(".form-control-lg")
        .classList.add("rounded-bottom-0", "border-bottom-0");
      document
        .querySelector(".resultados")
        .classList.remove("d-none", "borda-off");
      document.querySelector(".resultados").classList.add("borda-on");
    } else if (event.type === "blur") {
      setTimeout(
        function() {
          this.setState({ historicoLista: [] });
        }.bind(this),
        250
      );
    } else {
      document.querySelector(".resultados").classList.add("borda-off");
      document.querySelector(".resultados").classList.remove("borda-on");
    }
  }

  salvarHistoricoBusca(busca) {
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    cookie.save(
      `historico_${Date.now()}`,
      `${Object.keys(busca)[0]}_${Object.values(busca)[0]}`,
      {
        expires: expires
      }
    );
  }

  focusNoInput() {
    this.inputBusca.focus();
  }

  render() {
    return (
      <div>
        <div className="form-group mt-4 mb-0 busca">
          <input
            ref={input => {
              this.inputBusca = input;
            }}
            type="text"
            className="form-control form-control-lg rounded-pill shadow d-inline-block h-100 pt-3 pb-3"
            placeholder="Encontre uma escola pelo nome ou endereço"
            onKeyUp={this.buscarPorTermo}
            onFocus={this.mostrarBusca}
            onBlur={this.mostrarBusca}
          />
        </div>
        <div className="resultados container bg-white h-100 shadow rounded-0 border border-top-0 borda-on d-none mb-4">
          <div className="row">
            <div className="col-lg-12 col-sm-12 p-0">
              <div className="list-group">
                <li
                  className="list-group-item list-group-item-action border-0 cursor-link"
                  onClick={this.retornaLocalizacao}
                >
                  <FontAwesomeIcon icon={faLocationArrow} className="mr-2" />
                  Usar minha localização
                </li>
              </div>
            </div>
          </div>
          <div className="row">
            {this.state.historicoLista.length > 0 ? (
              <div className="col-lg col-sm-12 p-0">
                <div className="list-group">
                  <li className="list-group-item border-0 rounded-0 mb-0">
                    Pesquisas Recentes
                  </li>
                  {this.state.historicoLista.map((historico, indice) => {
                    return (
                      <Link
                        key={indice}
                        to={{
                          pathname: "/escolas",
                          state: {
                            [historico.tipo]: historico.valor
                          }
                        }}
                        className="list-group-item list-group-item-action border-0"
                      >
                        <FontAwesomeIcon icon={faClock} className="mr-2" />
                        {historico.valor}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
          <div className="row">
            {this.state.escolasLista.length > 0 ? (
              <div className="col-lg col-sm-12 p-0">
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
                        onClick={() =>
                          this.salvarHistoricoBusca({ escola: escola.label })
                        }
                        className="list-group-item list-group-item-action border-0"
                      >
                        {escola.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}
            {this.state.bairrosLista.length > 0 ? (
              <div className="col-lg col-sm-12 p-0">
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
                        onClick={() =>
                          this.salvarHistoricoBusca({ bairro: bairro.label })
                        }
                        className="list-group-item list-group-item-action border-0"
                      >
                        {bairro.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}
            {this.state.distritosLista.length > 0 ? (
              <div className="col-lg col-sm-12 p-0">
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
                        onClick={() =>
                          this.salvarHistoricoBusca({
                            distrito: distrito.label
                          })
                        }
                        className="list-group-item list-group-item-action border-0"
                      >
                        {distrito.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}
            {this.state.subprefsLista.length > 0 ? (
              <div className="col-lg col-sm-12 p-0">
                <div className="list-group">
                  <li className="list-group-item list-group-item-secondary border-0 rounded-0 mb-0">
                    Subprefeituras
                  </li>
                  {this.state.subprefsLista.map((subpref, indice) => {
                    return (
                      <Link
                        key={indice}
                        to={{
                          pathname: "/escolas",
                          state: {
                            subpref: subpref.label
                          }
                        }}
                        onClick={() =>
                          this.salvarHistoricoBusca({ subpref: subpref.label })
                        }
                        className="list-group-item list-group-item-action border-0"
                      >
                        {subpref.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}
            {this.state.logradourosLista.length > 0 ? (
              <div className="col-lg col-sm-12 p-0">
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
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
