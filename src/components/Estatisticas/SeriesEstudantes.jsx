import React, { Component } from "react";
import { listarTurnos } from "../../services/estatisticas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faBars } from "@fortawesome/free-solid-svg-icons";

export default class SeriesEstudantes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turnos: [],
      referencia: ""
    }
  }

  componentDidMount() {
    listarTurnos({ codesc: this.props.codesc }).then(lista => {
      this.setState({ turnos: lista.results });
    });
    this.setState({ referencia: new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString() });
  }

  render() {
    return (
      <div className="mt-5 mb-5">
        <div className="estatisticas-cabecalho mb-5">
          <h1 className="border-bottom font-weight-light">Séries e Estudantes</h1>
          <div className="referencia mt-1 mb-5">Data de referência: {this.state.referencia}</div>
        </div>
        {this.state.turnos.length > 0 ? (
          this.state.turnos.map((turno, indice) => {
            indice = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            return (
              <div key={indice} className="card shadow-sm mb-3">
                <div className="card-header d-flex align-items-center">
                  <FontAwesomeIcon icon={faBook} className="cor-azul" />
                  <div className="ml-3">{turno.turno}</div>
                  <a className="text-decoration-none cor-cinza ml-auto stretched-link" data-toggle="collapse"
                    data-target={`#${indice}`} aria-expanded="false" aria-controls={`${indice}`} href={`#${indice}`}>
                    <FontAwesomeIcon icon={faBars} />
                  </a>
                </div>
                <div className="collapse fade" id={`${indice}`}>
                  <div className="card-body">
                    <p className="card-text">{turno.turno}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (null)}
      </div>
    );
  }
}
