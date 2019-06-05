import React, { Component } from "react";
import PubSub from "pubsub-js";
import SelectCustomizado from "../Inputs/SelectCustomizado";
import SelectAutocomplete from "../Inputs/SelectAutocomplete";
import { listarTiposEscola, listarDREs, listarEscolas, listarEscolasLocalizacao } from "../../services/escolas";
import InputCustomizado from "../Inputs/InputCustomizado";
import { Link } from "react-router-dom";
import BtnFiltro from "../../img/fechar_filtro.png";

export default class Filtros extends Component {
  constructor(props) {
    super(props);
    this.state = {
      escolasAutocomplete: [],
      tiposEscola: [],
      dres: [],
      escolaSelecionada: "",
      bairroSelecionado: "",
      distritoSelecionado: "",
      tipoEscolaSelecionado: "",
      dreSelecionada: "",
      logradouroSelecionado: ""
    };

    this.filtrarListagemEscolas = this.filtrarListagemEscolas.bind(this);
    this.filtrarListagemEscolasLocalizacao = this.filtrarListagemEscolasLocalizacao.bind(this);
    this.buscarEscolas = this.buscarEscolas.bind(this);
    this.setEscola = this.setEscola.bind(this);
    this.setBairro = this.setBairro.bind(this);
    this.setDistrito = this.setDistrito.bind(this);
    this.setTipoEscola = this.setTipoEscola.bind(this);
    this.setDRE = this.setDRE.bind(this);
  }

  componentDidMount() {
    listarTiposEscola().then(lista =>
      this.setState({ tiposEscola: lista.results })
    );

    listarDREs().then(lista => this.setState({ dres: lista.results }));

    PubSub.subscribe(
      "escola-filtro",
      function (topico, filtro) {
        this.setState({ escolaSelecionada: filtro }, () =>
          this.filtrarListagemEscolas()
        );
      }.bind(this)
    );

    PubSub.subscribe(
      "bairro-filtro",
      function (topico, filtro) {
        this.setState({ bairroSelecionado: filtro }, () =>
          this.filtrarListagemEscolas()
        );
      }.bind(this)
    );

    PubSub.subscribe(
      "distrito-filtro",
      function (topico, filtro) {
        this.setState({ distritoSelecionado: filtro }, () =>
          this.filtrarListagemEscolas()
        );
      }.bind(this)
    );

    PubSub.subscribe(
      "logradouro-filtro",
      function (topico, filtro) {
        this.setState({ logradouroSelecionado: filtro }, () =>
          this.filtrarListagemEscolasLocalizacao()
        );
      }.bind(this)
    );

    PubSub.subscribe("lista-escolas", () => { });
  }

  componentWillUnmount() {
    PubSub.clearAllSubscriptions();
  }

  filtrarListagemEscolas() {
    listarEscolas({
      escola: this.state.escolaSelecionada,
      bairro: this.state.bairroSelecionado,
      distrito: this.state.distritoSelecionado,
      tipo: this.state.tipoEscolaSelecionado,
      dre: this.state.dreSelecionada
    }).then(lista => {
      PubSub.publish("lista-escolas", lista.results);
      PubSub.publish("total-itens", Math.ceil(lista.count / 10));
      document.querySelector(".overflow-auto").scrollTop = 0;
    });
  }

  filtrarListagemEscolasLocalizacao() {
    listarEscolasLocalizacao({
      lat: this.state.logradouroSelecionado.lat,
      lon: this.state.logradouroSelecionado.lon
    }).then(lista => {
      PubSub.publish("lista-escolas", lista.results);
      // PubSub.publish("total-itens", Math.ceil(lista.count / 10));
      document.querySelector(".overflow-auto").scrollTop = 0;
    });
  }

  buscarEscolas = e => {
    if (e.target.value.length >= 3) {
      let escolas = [];
      listarEscolas({ escola: e.target.value }).then(lista => {
        lista.results.forEach(function (escola) {
          escolas.push({ value: escola.codesc, label: escola.nomesc });
        });
        this.setState({ escolasAutocomplete: escolas });
      });
    }
  };

  setEscola(event) {
    this.setState({ escolaSelecionada: event }, () => {
      this.filtrarListagemEscolas();
    });
    PubSub.publish("escola-filtro", event);
  }

  setBairro(event) {
    this.setState({ bairroSelecionado: event.target.value }, () => {
      this.filtrarListagemEscolas();
    });
    PubSub.publish("bairro-filtro", event.target.value);
  }

  setDistrito(event) {
    this.setState({ distritoSelecionado: event.target.value }, () => {
      this.filtrarListagemEscolas();
    });
    PubSub.publish("distrito-filtro", event.target.value);
  }

  setTipoEscola(event) {
    this.setState({ tipoEscolaSelecionado: event.target.value }, () => {
      this.filtrarListagemEscolas();
    });
    PubSub.publish("tipo-escola-filtro", event.target.value);
  }

  setDRE(event) {
    this.setState({ dreSelecionada: event.target.value }, () => {
      this.filtrarListagemEscolas();
    });
    PubSub.publish("dre-filtro", event.target.value);
  }

  setLogradouro(event) {
    this.setState({ logradouroSelecionado: { logradouro: event.target.value } }, () => {
      this.filtrarListagemEscolasLocalizacao();
    });
    PubSub.publish("logradouro-filtro", { logradouro: event.target.value });
  }

  render() {
    return (
      <div>
        <div className="filtro collapse shadow w-100 h-100" id="filtro-collapse">
          <div className="bg-white pt-2 pb-2">
            <div className="container">
              <div className="row">
                <div className="col-6 col-sm-6 d-flex justify-content-start align-items-center">
                  <Link to="/escolas" data-toggle="collapse" data-target="#filtro-collapse" aria-expanded="false" aria-controls="filtro-collapse">
                    <img src={BtnFiltro} alt="Fechar Filtros" />
                  </Link>
                </div>
                <div className="col-6 col-sm-6 d-flex justify-content-end align-items-center">
                  <Link to="/escolas" className="text-primary text-uppercase limpar">Limpar Filtros</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="container pt-4 pb-4">
            <div className="row">
              <div className="col-lg-12">
                <h4 className="border-bottom border-white pb-2 mb-4 text-uppercase text-white">Localidade</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="filtro-logradouro" className="text-white">Logradouro</label>
                  <InputCustomizado
                    name="filtro-logradouro"
                    id="filtro-logradouro"
                    className="form-control rounded-pill shadow"
                    placeholder="Digite o logradouro"
                    value=""
                    onChange={this.setLogradouro}
                  />
                </div>
              </div>
            </div>
            <div className="row">
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
            </div>
            <div className="row">
              <div className="col-lg-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="filtro-distrito" className="text-white">Distrito</label>
                  <InputCustomizado
                    name="filtro-distrito"
                    id="filtro-distrito"
                    className="custom-select form-control rounded-pill shadow"
                    placeholder="Selecione o distrito"
                    value={this.state.distritoSelecionado}
                    onChange={this.setDistrito}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <h4 className="border-bottom border-white pb-2 mt-4 mb-4 text-uppercase text-white">Unidades de Ensino</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="filtro-escola" className="text-white">Escola</label>
                  <SelectAutocomplete
                    id="filtro-escola"
                    name="filtro-escola"
                    value={this.state.escolaSelecionada}
                    collection={this.state.escolasAutocomplete}
                    className="custom-select rounded-pill shadow"
                    placeholder="Selecione a escola"
                    onChange={this.setEscola}
                    onKeyDown={this.buscarEscolas}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="filtro-tipo" className="text-white">Tipo de ensino</label>
                  <SelectCustomizado
                    name="filtro-tipo"
                    id="filtro-tipo"
                    className="custom-select rounded-pill shadow"
                    emptyLabel="Selecione o tipo"
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
                  <label htmlFor="filtro-dre" className="text-white">DRE</label>
                  <SelectCustomizado
                    name="filtro-dre"
                    id="filtro-dre"
                    className="custom-select rounded-pill shadow"
                    emptyLabel="Selecione a DRE"
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
                  <button className="btn btn-lg btn-outline-light pt-3 pr-5 pb-3 pl-5" data-toggle="collapse" data-target="#filtro-collapse" aria-expanded="false" aria-controls="filtro-collapse">Aplicar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
