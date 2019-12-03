import React, { Component } from "react";
import PubSub from "pubsub-js";
import SelectCustomizado from "../Inputs/SelectCustomizado";
import {
  listarTiposEscola,
  listarDREs,
  listarEscolas,
  listarEscolasLocalizacao
} from "../../services/escolas";
import { DISTRITOS, SUBPREFEITURAS } from "./constants";
import { Link } from "react-router-dom";
import BtnFiltro from "../../img/fechar_filtro.png";
import { listaParaSelect, formatarListaTiposescola } from "./helper";

export default class Filtros extends Component {
  constructor(props) {
    super(props);
    this.state = {
      escolasAutocomplete: [],
      tiposEscola: [],
      dres: [],
      distritos: listaParaSelect(DISTRITOS, "distrito"),
      subprefeituras: listaParaSelect(SUBPREFEITURAS, "subpref"),
      escolaSelecionada: "",
      bairroSelecionado: "",
      distritoSelecionado: this.props.distritoSelecionado || "",
      subprefSelecionada: "",
      tipoEscolaSelecionado: "",
      dreSelecionada: "",
      logradouroSelecionado: ""
    };

    this.filtrar = this.filtrar.bind(this);
    this.filtrarListagemEscolas = this.filtrarListagemEscolas.bind(this);
    this.filtrarListagemEscolasLocalizacao = this.filtrarListagemEscolasLocalizacao.bind(
      this
    );
    this.buscarEscolas = this.buscarEscolas.bind(this);
    this.setEscola = this.setEscola.bind(this);
    this.setBairro = this.setBairro.bind(this);
    this.setDistrito = this.setDistrito.bind(this);
    this.setSubpref = this.setSubpref.bind(this);
    this.setTipoEscola = this.setTipoEscola.bind(this);
    this.setDRE = this.setDRE.bind(this);
    this.setLogradouro = this.setLogradouro.bind(this);
  }

  componentDidMount() {
    listarTiposEscola().then(lista => {
      this.setState({
        tiposEscola: formatarListaTiposescola(
          lista.results.sort((a, b) => (a.tipoesc > b.tipoesc ? 1 : -1))
        )
      });
    });

    listarDREs().then(lista => {
      this.setState({
        dres: lista.results.sort((a, b) => (a.diretoria > b.diretoria ? 1 : -1))
      });
    });

    PubSub.subscribe(
      "escola-filtro",
      function(topico, filtro) {
        this.setState({ escolaSelecionada: filtro }, () =>
          this.filtrarListagemEscolas(filtro)
        );
      }.bind(this)
    );

    PubSub.subscribe(
      "bairro-filtro",
      function(topico, filtro) {
        this.setState({ bairroSelecionado: filtro }, () =>
          this.filtrarListagemEscolas(this.state.escolaSelecionada)
        );
      }.bind(this)
    );

    PubSub.subscribe(
      "distrito-filtro",
      function(topico, filtro) {
        this.setState({ distritoSelecionado: filtro }, () =>
          this.filtrarListagemEscolas(this.state.escolaSelecionada)
        );
      }.bind(this)
    );

    PubSub.subscribe(
      "subpref-filtro",
      function(topico, filtro) {
        this.setState({ subprefSelecionada: filtro }, () =>
          this.filtrarListagemEscolas(this.state.escolaSelecionada)
        );
      }.bind(this)
    );

    PubSub.subscribe(
      "logradouro-filtro",
      function(topico, filtro) {
        this.setState({ logradouroSelecionado: filtro }, () =>
          this.filtrarListagemEscolasLocalizacao()
        );
      }.bind(this)
    );

    PubSub.subscribe("lista-escolas", () => {});
  }

  componentWillUnmount() {
    PubSub.clearAllSubscriptions();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.distritoSelecionado === "" &&
      this.props.distritoSelecionado !== ""
    ) {
      this.setState({ distritoSelecionado: this.state.distritoSelecionado });
      this.distritoRef.value = this.props.distritoSelecionado;
    }
    if (
      prevProps.subprefSelecionada === "" &&
      this.props.subprefSelecionada !== ""
    ) {
      this.setState({ subprefSelecionada: this.state.subprefSelecionada });
      this.subprefRef.value = this.props.subprefSelecionada;
    }
  }

  filtrar() {
    this.filtrarListagemEscolas("");
  }

  resetarCampos() {
    this.setState({
      escolaSelecionada: "",
      bairroSelecionado: "",
      distritoSelecionado: "",
      subprefSelecionada: "",
      tipoEscolaSelecionado: "",
      dreSelecionada: "",
      logradouroSelecionado: ""
    });
    this.distritoRef.value = "";
    this.subprefRef.value = "";
    this.tipoEscolaRef.value = "";
    this.dreRef.value = "";
  }

  filtrarListagemEscolas(escolaSelecionada) {
    let listaResponse = {};
    let pagina = 1;
    if (
      this.state.escolaSelecionada === "" &&
      this.state.distritoSelecionado === "" &&
      this.state.subprefSelecionada === "" &&
      this.state.dreSelecionada === "" &&
      this.state.tipoEscolaSelecionado === ""
    ) {
      alert("Preencha ao menos uma opção da busca avançada");
    } else {
      listarEscolas({
        escola: escolaSelecionada,
        bairro: this.state.bairroSelecionado,
        distrito: this.state.distritoSelecionado,
        subpref: this.state.subprefSelecionada,
        tipo: this.state.tipoEscolaSelecionado,
        dre: this.state.dreSelecionada,
        pagina: pagina
      }).then(lista => {
        listaResponse.results = lista.results;
        listaResponse.count = lista.count;
        if (lista.next) {
          let paginas = Math.ceil(lista.count / 10);
          let i = 2;
          for (i; i <= paginas; i++) {
            listarEscolas({
              escola: escolaSelecionada,
              bairro: this.state.bairroSelecionado,
              distrito: this.state.distritoSelecionado,
              subpref: this.state.subprefSelecionada,
              tipo: this.state.tipoEscolaSelecionado,
              dre: this.state.dreSelecionada,
              pagina: i
            }).then(lista_inner => {
              listaResponse.results = listaResponse.results.concat(
                lista_inner.results
              );
              if (!lista_inner.next) {
                PubSub.publish("lista-escolas", listaResponse.results);
                PubSub.publish("total-itens", Math.ceil(20));
              }
            });
          }
        } else {
          PubSub.publish("lista-escolas", listaResponse.results);
          PubSub.publish("total-itens", Math.ceil(lista.count / 10));
        }
      });
    }
  }

  filtrarListagemEscolasLocalizacao() {
    listarEscolasLocalizacao({
      lat: this.state.logradouroSelecionado.lat,
      lon: this.state.logradouroSelecionado.lon
    }).then(lista => {
      PubSub.publish("lista-escolas", lista.results);
    });
  }

  buscarEscolas = e => {
    if (e.target.value.length >= 3) {
      let escolas = [];
      listarEscolas({ escola: e.target.value }).then(lista => {
        lista.results.forEach(function(escola) {
          escolas.push({ value: escola.codesc, label: escola.nomesc });
        });
        this.setState({ escolasAutocomplete: escolas });
      });
    }
  };

  setEscola(event) {
    this.setState({ escolaSelecionada: event });
  }

  setBairro(event) {
    this.setState({ bairroSelecionado: event.target.value });
  }

  setDistrito(event) {
    this.setState({ distritoSelecionado: event.target.value });
  }

  setSubpref(event) {
    this.setState({ subprefSelecionada: event.target.value });
  }

  setTipoEscola(event) {
    this.setState({ tipoEscolaSelecionado: event.target.value });
  }

  setDRE(event) {
    this.setState({ dreSelecionada: event.target.value });
  }

  setLogradouro(event) {
    this.setState({ logradouroSelecionado: event.target.value });
  }

  render() {
    const { buscaAvancada } = this.props;
    return (
      <div>
        <div
          className={`filtro collapse ${buscaAvancada && "show"} shadow w-100 h-100`}
          id="filtro-collapse"
        >
          <div className="bg-white pt-2 pb-2">
            <div className="container">
              <div className="row">
                <div className="col-6 col-sm-6 d-flex justify-content-start align-items-center">
                  <Link
                    to="/escolas"
                    data-toggle="collapse"
                    data-target="#filtro-collapse"
                    aria-expanded="false"
                    aria-controls="filtro-collapse"
                  >
                    <img src={BtnFiltro} alt="Fechar Filtros" />
                  </Link>
                </div>
                <div className="col-6 col-sm-6 d-flex justify-content-end align-items-center">
                  <button
                    type="button"
                    onClick={() => this.resetarCampos()}
                    className="btn btn-primary text-uppercase limpar"
                  >
                    Limpar Filtros
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="container pt-4 pb-4">
            <div className="row">
              <div className="col-lg-12">
                <h4 className="border-bottom border-white pb-2 mb-4 text-uppercase text-white">
                  Localidade
                </h4>
              </div>
            </div>
            {/*<div className="row">
              <div className="col-lg-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="filtro-logradouro" className="text-white">
                    Logradouro
                  </label>
                  <InputCustomizado
                    name="filtro-logradouro"
                    id="filtro-logradouro"
                    ref={el => (this.logradouroRef = el)}
                    className="form-control rounded-pill shadow"
                    placeholder="Digite o logradouro"
                    value={this.state.logradouroSelecionado}
                    onChange={this.setLogradouro}
                  />
                </div>
              </div>
            </div>*/}
            {/* <div className="row">
              <div className="col-lg-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="filtro-bairro" className="text-white">Bairro</label>
                  <InputCustomizado
                    name="filtro-bairro"
                    id="filtro-bairro"
                    className="custom-select form-control rounded-pill shadow"
                    placeholder="Selecione o bairro"
                    value={this.state.bairroSelecionado}
                    onChange={this.setBairro}
                  />
                </div>
              </div>
            </div> */}
            <div className="row">
              <div className="col-lg-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="filtro-distrito" className="text-white">
                    Distrito
                  </label>
                  <SelectCustomizado
                    name="filtro-distrito"
                    id="filtro-distrito"
                    className="custom-select form-control rounded-pill shadow"
                    emptyLabel="Selecione o distrito"
                    selectRef={el => (this.distritoRef = el)}
                    lista={this.state.distritos}
                    value="value"
                    label="label"
                    onChange={this.setDistrito}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="filtro-subpref" className="text-white">
                    Subprefeitura
                  </label>
                  <SelectCustomizado
                    name="filtro-subpref"
                    id="filtro-subpref"
                    className="custom-select form-control rounded-pill shadow"
                    emptyLabel="Selecione a subprefeitura"
                    lista={this.state.subprefeituras}
                    selectRef={el => (this.subprefRef = el)}
                    value="value"
                    label="label"
                    onChange={this.setSubpref}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <h4 className="border-bottom border-white pb-2 mt-4 mb-4 text-uppercase text-white">
                  Unidades de Ensino
                </h4>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="filtro-tipo" className="text-white">
                    Tipo de ensino
                  </label>
                  <SelectCustomizado
                    name="filtro-tipo"
                    id="filtro-tipo"
                    className="custom-select rounded-pill shadow"
                    emptyLabel="Selecione o tipo"
                    selectRef={el => (this.tipoEscolaRef = el)}
                    lista={this.state.tiposEscola}
                    value="tipoesc"
                    label="tipoesc"
                    onChange={this.setTipoEscola}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="filtro-dre" className="text-white">
                    Diretoria Regional de Educação (DRE)
                  </label>
                  <SelectCustomizado
                    name="filtro-dre"
                    id="filtro-dre"
                    className="custom-select rounded-pill shadow"
                    emptyLabel="Selecione a DRE"
                    selectRef={el => (this.dreRef = el)}
                    lista={this.state.dres}
                    value="dre"
                    label="diretoria"
                    onChange={this.setDRE}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="container">
                <div className="col-lg-12 d-flex justify-content-center align-items-center mt-4">
                  <button
                    onClick={() => this.filtrar()}
                    className="btn btn-lg btn-outline-light pt-3 pr-5 pb-3 pl-5"
                    data-toggle="collapse"
                    data-target="#filtro-collapse"
                    aria-expanded="false"
                    aria-controls="filtro-collapse"
                  >
                    Consultar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
