import React, { Component } from "react";
import PubSub from "pubsub-js";
import Filtros from "./Filtros";
import Mapa from "../Mapa/Mapa";
import TabelaEscolas from "./Tabela";
import Rodape from "../Rodape/Rodape";
import { listarEscolas } from "../../services/escolas";
import Menu from "../MenuSuperior/Menu";
import Auxiliar from "../MenuSuperior/Auxiliar";
import "./style.scss";

export default class Escolas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      escolas: [],
      totalItens: 0,
      pagina: 2,
      escolaSelecionada: "",
      bairroSelecionado: "",
      distritoSelecionado: "",
      subprefSelecionada: "",
      tipoEscolaSelecionado: "",
      dreSelecionada: "",
      loading: true,
      buscaAvancada: false
    };
    this.conteudo = React.createRef();
    this.atualizarMapa = this.atualizarMapa.bind(this);
    this.carregarMaisEscolas = this.carregarMaisEscolas.bind(this);
    this.limparCheckboxes = this.limparCheckboxes.bind(this);
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const buscaAvancada = urlParams.get("buscaAvancada") === "true";
    this.setState({ buscaAvancada });
    if (this.props.location && this.props.location.state !== undefined) {
      if (this.props.location.state.escola !== undefined) {
        PubSub.publish("escola-filtro", this.props.location.state.escola);
      } else if (this.props.location.state.bairro !== undefined) {
        PubSub.publish("bairro-filtro", this.props.location.state.bairro);
      } else if (this.props.location.state.distrito !== undefined) {
        this.setState({
          distritoSelecionado: this.props.location.state.distrito
        });
        PubSub.publish("distrito-filtro", this.props.location.state.distrito);
      } else if (this.props.location.state.subpref !== undefined) {
        this.setState({
          subprefSelecionada: this.props.location.state.subpref
        });
        PubSub.publish("subpref-filtro", this.props.location.state.subpref);
      } else if (this.props.location.state.logradouro !== undefined) {
        PubSub.publish("logradouro-filtro", {
          logradouro: this.props.location.state.logradouro,
          lat: this.props.location.state.lat,
          lon: this.props.location.state.lon
        });
      }
      window.scrollTo(0, this.conteudo.current.offsetTop + 350);
    }

    PubSub.subscribe(
      "lista-escolas",
      function(topico, listaEscolas) {
        this.setState({ escolas: listaEscolas, loading: false });
      }.bind(this)
    );

    PubSub.subscribe(
      "escola-filtro",
      function(topico, filtro) {
        this.setState({ escolaSelecionada: filtro });
      }.bind(this)
    );

    PubSub.subscribe(
      "bairro-filtro",
      function(topico, filtro) {
        this.setState({ bairroSelecionado: filtro });
      }.bind(this)
    );

    PubSub.subscribe(
      "distrito-filtro",
      function(topico, filtro) {
        this.setState({ distritoSelecionado: filtro });
      }.bind(this)
    );

    PubSub.subscribe(
      "subpref-filtro",
      function(topico, filtro) {
        this.setState({ subprefSelecionada: filtro });
      }.bind(this)
    );

    PubSub.subscribe(
      "tipo-escola-filtro",
      function(topico, filtro) {
        this.setState({ tipoEscolaSelecionado: filtro });
      }.bind(this)
    );

    PubSub.subscribe(
      "dre-filtro",
      function(topico, filtro) {
        this.setState({ dreSelecionada: filtro });
      }.bind(this)
    );

    PubSub.subscribe(
      "total-itens",
      function(topico, total) {
        this.setState({ pagina: 2 });
        this.setState({ totalItens: total });
      }.bind(this)
    );

    window.jQuery(".overflow-auto").on(
      "scroll",
      function() {
        if (
          window.jQuery(".overflow-auto").scrollTop() +
            window.jQuery(".overflow-auto").innerHeight() ===
          window.jQuery(".overflow-auto")[0].scrollHeight
        ) {
          setTimeout(
            function() {
              this.carregarMaisEscolas();
            }.bind(this),
            1000
          );
        }
      }.bind(this)
    );
  }

  componentDidUpdate() {
    const urlParams = new URLSearchParams(window.location.search);
    const buscaAvancada = urlParams.get("buscaAvancada") === "true";
    if(!this.state.buscaAvancada && buscaAvancada) {
      this.setState({ buscaAvancada });
    }
  }


  atualizarMapa(escola, latitude, longitude) {
    PubSub.publish("escola", escola);
    PubSub.publish("latitude", latitude);
    PubSub.publish("longitude", longitude);
  }

  limparCheckboxes(event) {
    document.querySelectorAll("input[type=checkbox]").forEach(e => {
      if (e !== event.target) {
        e.checked = false;
        document.querySelectorAll(".collapse").forEach(c => {
          c.classList.remove("show");
        });
      }
    });
  }

  carregarMaisEscolas() {
    if (this.state.pagina <= this.state.totalItens) {
      listarEscolas({
        escola: this.state.escolaSelecionada,
        tipo: this.state.tipoEscolaSelecionado,
        dre: this.state.dreSelecionada,
        pagina: this.state.pagina,
        loading: true
      }).then(lista => {
        this.setState({ loading: false });
        let novaListaEscolas = this.state.escolas.concat(lista.results);
        this.setState({ escolas: novaListaEscolas });
        this.setState({ pagina: this.state.pagina + 1 });
        PubSub.publish("lista-escolas", novaListaEscolas);
      });
    }
  }

  render() {
    return (
      <div>
        <Menu {...this.props} />
        <Auxiliar texto="Encontre uma escola" filtro={true} />
        <div className="w-100 bg-light h-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-sm-12 pr-lg-0 escolas">
                <Filtros {...this.state} />
                <div
                  id="conteudo"
                  ref={this.conteudo}
                  className={`tabela-escolas-div overflow-auto pt-4 pb-4`}
                >
                  <TabelaEscolas
                    loading={this.state.loading}
                    lista={this.state.escolas}
                    limparCheckboxes={this.limparCheckboxes}
                    atualizarMapa={this.atualizarMapa}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12 mapa-completo">
                <Mapa />
              </div>
            </div>
          </div>
        </div>
        <Rodape />
      </div>
    );
  }
}
