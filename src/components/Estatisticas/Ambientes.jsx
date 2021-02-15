import React, { Component } from "react";
import { listarAmbientes } from "../../services/estatisticas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUniversity } from "@fortawesome/free-solid-svg-icons";

export default class Ambientes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ambientes: [],
      referencia: ""
    }
  }

  componentDidMount() {
    listarAmbientes({ codesc: this.props.codesc }).then(lista => {
      if (lista && lista.results.length > 0) {
        this.setState({ambientes: lista.results});
      }
    });
    this.setState({ referencia: new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString() });
  }

  render() {
    return (
      <div className="mt-5 mb-5">
        <div className="estatisticas-cabecalho mb-5">
          <h1 className="border-bottom font-weight-light">Ambientes</h1>
          <div className="referencia mt-1 mb-5">Data de referência: {this.props.dataReferencia}</div>
        </div>
        <div className="card shadow-sm mb-3">
          <div className="card-header bg-white d-flex align-items-center font-weight-bold">
            <FontAwesomeIcon icon={faUniversity} className="cor-azul" />
            <div className="ml-3 fonte-14">Total de Ambientes</div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0 fonte-14">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col" className="text-center">Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.ambientes.length > 0 ? (
                    this.state.ambientes.map((ambiente, indice) => {
                      return (
                        <tr key={indice}>
                          <td>{ambiente.ambiente}</td>
                          <td className="text-center table-secondary">{ambiente.total}</td>
                        </tr>
                      );
                    })
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
