import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./styles/styles.scss";
import Home from "./components/Home/Home";
import Escolas from "./components/Escolas/Escolas";
import Estatisticas from "./components/Estatisticas/Estatisticas";
import ConhecaRede from "./components/ConhecaRede";
import ReactGA from 'react-ga';
ReactGA.initialize('UA-149756375-1');
ReactGA.pageview(window.location.pathname + window.location.search);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alterarFonte:
        (localStorage.getItem("alterarFonte") &&
          localStorage.getItem("alterarFonte") === "true") ||
        false,
      alterarContraste:
        (localStorage.getItem("alterarContraste") &&
          localStorage.getItem("alterarContraste") === "true") ||
        false,
      focusBuscaAtributo: false
    };
    this.alterarFonte = this.alterarFonte.bind(this);
    this.alterarContraste = this.alterarContraste.bind(this);
    this.focusBusca = this.focusBusca.bind(this);
  }

  focusBusca() {
    this.setState({ focusBuscaAtributo: true });
  }

  alterarFonte() {
    const alterarFonte =
      localStorage.getItem("alterarFonte") !== null
        ? localStorage.getItem("alterarFonte") !== "true"
        : true;
    localStorage.setItem("alterarFonte", alterarFonte);
    this.setState({ alterarFonte });
  }

  alterarContraste() {
    const alterarContraste =
      localStorage.getItem("alterarContraste") !== null
        ? localStorage.getItem("alterarContraste") !== "true"
        : true;
    localStorage.setItem("alterarContraste", alterarContraste);
    this.setState({ alterarContraste });
  }

  render() {
    const { alterarFonte, alterarContraste, focusBuscaAtributo } = this.state;
    return (
      <div
        className={`${alterarFonte && "fonte-maior"}
          ${alterarContraste && "alto-contraste"}`}
      >
        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              <Home
                {...props}
                alterarFonte={this.alterarFonte}
                alterarContraste={this.alterarContraste}
                focusBusca={this.focusBusca}
                focusBuscaAtributo={focusBuscaAtributo}
                esconderLinkBuscaEscola
              />
            )}
          />
          <Route
            path="/conheca-a-rede"
            render={props => (
              <ConhecaRede
                {...props}
                alterarFonte={this.alterarFonte}
                alterarContraste={this.alterarContraste}
              />
            )}
          />
          <Route
            path="/escolas"
            render={props => (
              <Escolas
                {...props}
                alterarFonte={this.alterarFonte}
                alterarContraste={this.alterarContraste}
              />
            )}
          />
          <Route
            path="/estatisticas"
            render={props => (
              <Estatisticas
                {...props}
                alterarFonte={this.alterarFonte}
                alterarContraste={this.alterarContraste}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
