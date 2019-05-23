import React, { Component } from "react";
import PubSub from "pubsub-js";
import SelectCustomizado from "../Inputs/SelectCustomizado";
import SelectAutocomplete from "../Inputs/SelectAutocomplete";
import { listarTiposEscola, listarDREs, listarEscolas, listarEscolasLocalizacao } from "../../services/escolas";
import InputCustomizado from "../Inputs/InputCustomizado";

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
        <div className="collapse bg-primary w-100 h-100 p-3 position-absolute" id="filtro-collapse">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-xs-12">
                <SelectAutocomplete
                  value={this.state.escolaSelecionada}
                  collection={this.state.escolasAutocomplete}
                  className="custom-select rounded-pill"
                  placeholder="Selecione a escola"
                  onChange={this.setEscola}
                  onKeyDown={this.buscarEscolas}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-xs-12">
                <SelectCustomizado
                  name="filtro-tipo"
                  id="filtro-tipo"
                  className="custom-select rounded-pill"
                  emptyLabel="Selecione o tipo"
                  lista={this.state.tiposEscola}
                  value="tipoesc"
                  label="tipoesc"
                  onChange={this.setTipoEscola}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-xs-12">
                <SelectCustomizado
                  name="filtro-dre"
                  id="filtro-dre"
                  className="custom-select rounded-pill"
                  emptyLabel="Selecione a DRE"
                  lista={this.state.dres}
                  value="dre"
                  label="diretoria"
                  onChange={this.setDRE}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-xs-12">
                <InputCustomizado
                  name="filtro-bairro"
                  id="filtro-bairro"
                  className="custom-select form-control rounded-pill"
                  placeholder="Selecione o bairro"
                  value={this.state.bairroSelecionado}
                  onChange={this.setBairro}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-xs-12">
                <InputCustomizado
                  name="filtro-distrito"
                  id="filtro-distrito"
                  className="custom-select form-control rounded-pill"
                  placeholder="Selecione o distrito"
                  value={this.state.distritoSelecionado}
                  onChange={this.setDistrito}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-xs-12">
                <InputCustomizado
                  name="filtro-logradouro"
                  id="filtro-logradouro"
                  className="custom-select form-control rounded-pill"
                  placeholder="Selecione o logradouro"
                  value={this.state.logradouroSelecionado.logradouro}
                  onChange={this.setLogradouro}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
