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
  buscaLogradouroPorLatLng,
  buscarLatLngPorLogradouroV2
} from "../../services/endereco";
import cookie from "react-cookies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faClock } from "@fortawesome/free-solid-svg-icons";
import { nomeEscolaFormatar } from "components/utils";

const MINIMO_CARACTERES_BUSCA = 4;
const ATRASO_BUSCA_MS = 500;

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
    this.buscaAtual = 0;
    this.termoAtual = "";
  }

  componentDidMount() {
    this.carregarHistorico();
  }

  componentWillUnmount() {
    this.cancelarBusca();
  }

  cancelarBusca = () => {
    clearTimeout(this.buscaTimeout);
    this.buscaAtual += 1;
    if (this.buscaController) {
      this.buscaController.abort();
    }
  };

  limparResultados = () => {
    this.setState({
      escolasLista: [],
      bairrosLista: [],
      distritosLista: [],
      subprefsLista: [],
      logradourosLista: []
    });
  };

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
    const termo = e.target.value.trim();
    if (termo === this.termoAtual) {
      return;
    }
    this.termoAtual = termo;
    this.cancelarBusca();
    this.limparResultados();
    if (termo.length < MINIMO_CARACTERES_BUSCA) {
      return;
    }
    const buscaAtual = this.buscaAtual;
    this.buscaTimeout = setTimeout(
      () => this.executarBusca(termo, buscaAtual),
      ATRASO_BUSCA_MS
    );
  };

  executarBusca = async (termo, buscaAtual) => {
    this.buscaController = new AbortController();
    const options = { signal: this.buscaController.signal };
    if (!isNaN(termo)) {
      const ruas = await this.buscarLogradouroCep(termo, options).catch(() => []);
      if (buscaAtual === this.buscaAtual) {
        this.setState({ logradourosLista: ruas });
      }
      return;
    }

    const consultas = [
      ["escolasLista", this.buscarEscolasPorNome(termo, options)],
      ["distritosLista", this.buscarDistritos(termo, options)],
      ["subprefsLista", this.buscarSubprefs(termo, options)],
      ["logradourosLista", buscarLatLngPorLogradouroV2({ logradouro: termo }, options).then(
        localizacoes => localizacoes.features
          .filter(local => local.properties.street !== undefined)
          .map(local => ({
            value: {
              lat: local.geometry.coordinates[1],
              lon: local.geometry.coordinates[0]
            },
            label: local.properties.street + ", " +
              (local.properties.neighbourhood || local.properties.localadmin)
          }))
      )]
    ];

    await Promise.all(consultas.map(([campo, consulta]) =>
      consulta.catch(() => []).then(resultados => {
        if (buscaAtual === this.buscaAtual) {
          this.setState({ [campo]: resultados });
        }
      })
    ));
  };

  removerAcentos = string_com_acentuacao => {
    return string_com_acentuacao
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // Remove acentos
  };

  buscarEscolasPorNome(e, options) {
    const string_sem_acento = this.removerAcentos(e);

    return listarEscolas({ escola: string_sem_acento }, options).then(lista =>
      lista.results.map(escola => ({
        value: escola.codesc,
        label_raw: escola.nomesc,
        label: nomeEscolaFormatar(escola)
      }))
    );
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

  buscarDistritos(e, options) {
    return listarDistritos({ distrito: e }, options).then(lista =>
      lista.results.map(distrito => ({ label: distrito.distrito }))
    );
  }

  buscarSubprefs(e, options) {
    return listarSubpref({ subpref: e }, options).then(lista =>
      lista.results.map(subpref => ({ label: subpref.subpref }))
    );
  }

  async buscarLogradouroCep(e, options) {
    const logradouro = await buscarLogradouroPorCep({ cep: e }, options);
    if (options.signal.aborted || !logradouro.logradouro) {
      return [];
    }
    const localizacoes = await buscarLatLngPorLogradouro(
      { logradouro: logradouro.logradouro }, options
    );
    return localizacoes.results
      .filter(local => local.type.indexOf("residential") !== -1)
      .slice(0, 1)
      .map(local => ({
        value: { lat: local.lat, lon: local.lon },
        label: local.name
      }));
  }

  retornaLocalizacao() {
    this.cancelarBusca();
    this.termoAtual = "";
    if (this.inputBusca) {
      this.inputBusca.value = "";
    }
    this.limparResultados();
    const buscaAtual = this.buscaAtual;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          if (buscaAtual === this.buscaAtual) {
            this.defineLatitudeLongitude(position);
          }
        },
        this.trataErros
      );
    } else {
      this.trataErros("A geolocalização não está habilitada");
    }
  }

  defineLatitudeLongitude(position) {
    const buscaAtual = this.buscaAtual;
    this.buscaController = new AbortController();
    buscaLogradouroPorLatLng({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }, { signal: this.buscaController.signal }).then(logradouro => {
      if (buscaAtual === this.buscaAtual) {
        this.setState({ logradourosLista: [{
          value: { lat: logradouro.lat, lon: logradouro.lon },
          label: logradouro.address.road
        }] });
      }
    }).catch(erro => {
      if (buscaAtual === this.buscaAtual && erro.name !== "AbortError") {
        this.trataErros(erro);
      }
    });
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
    this.cancelarBusca();
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
            onChange={this.buscarPorTermo}
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
                        onClick={this.cancelarBusca}
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
                            escola: escola.label_raw
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
                        onClick={this.cancelarBusca}
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
