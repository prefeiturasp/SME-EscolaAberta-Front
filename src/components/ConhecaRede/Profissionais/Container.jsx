import React, { Component } from "react";
import { listarDREs } from "../../../services/escolas";
import { agregarDefaultDiretoriaRegional } from "../helper";
import { Profissionais } from ".";

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diretoriasRegionais: []
    };
  }

  componentDidMount() {
    listarDREs().then(diretoriasRegionais => {
      this.setState({
        diretoriasRegionais: agregarDefaultDiretoriaRegional(diretoriasRegionais.results)
      });
    });
  }

  render() {
    return <Profissionais {...this.state} />;
  }
}
