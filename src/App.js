import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./styles/styles.scss";
import Home from "./components/Home/Home";
import Escolas from "./components/Escolas/Escolas";
import ConsultaPosicao from "./components/ConsultaPosicao/ConsultaPosicao";
import Estatisticas from "./components/Estatisticas/Estatisticas";
import ConhecaRede from "./components/ConhecaRede";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alterarFonte: localStorage.getItem("alterarFonte") || false,
      alterarContraste: localStorage.getItem("alterarContraste") || false
    };
    this.alterarFonte = this.alterarFonte.bind(this);
    this.alterarContraste = this.alterarContraste.bind(this);
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
    const { alterarFonte, alterarContraste } = this.state;
    return (
      <div
        className={`${alterarFonte && "fonte-maior"}
          ${alterarContraste && "alto-contraste"}`}
      >
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <Home
                alterarFonte={this.alterarFonte}
                alterarContraste={this.alterarContraste}
              />
            )}
          />
          <Route
            path="/conheca-a-rede"
            render={() => (
              <ConhecaRede
                alterarFonte={this.alterarFonte}
                alterarContraste={this.alterarContraste}
              />
            )}
          />
          <Route
            path="/escolas"
            render={() => (
              <Escolas
                alterarFonte={this.alterarFonte}
                alterarContraste={this.alterarContraste}
              />
            )}
          />
          <Route
            path="/consulta"
            render={() => (
              <ConsultaPosicao
                alterarFonte={this.alterarFonte}
                alterarContraste={this.alterarContraste}
              />
            )}
          />
          <Route
            path="/estatisticas"
            render={() => (
              <Estatisticas
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
