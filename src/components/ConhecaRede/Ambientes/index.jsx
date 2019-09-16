import React, { Component } from "react";
import {
  listarAmbientesSME,
  listarAmbientesSMEPorDRE
} from "../../../services/estatisticas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUniversity } from "@fortawesome/free-solid-svg-icons";

export class Ambientes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ambientes: [],
      referencia: ""
    };
  }

  componentDidMount() {
    listarAmbientesSME({ codesc: this.props.codesc }).then(lista => {
      this.setState({ ambientes: lista.results });
    });
    this.setState({
      referencia: new Date(
        new Date().setDate(new Date().getDate() - 1)
      ).toLocaleDateString()
    });
  }

  onSelectChanged(value) {
    listarAmbientesSMEPorDRE({ dre: value }).then(lista => {
      this.setState({ ambientes: lista.results });
    });
  }

  render() {
    const { diretoriasRegionais } = this.props;
    const { referencia } = this.state;
    return (
      <div className="mt-5 mb-5">
        <div className="estatisticas-cabecalho mb-5">
          <h1 className="border-bottom font-weight-light">Ambientes</h1>
          <div className="referencia mt-1 mb-5">
            Data de referência: {referencia}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6">
            <select
              className="form-control"
              onChange={event => this.onSelectChanged(event.target.value)}
            >
              {diretoriasRegionais.length &&
                diretoriasRegionais.map((e, key) => {
                  return (
                    <option key={key} value={e.dre} disabled={e.disabled}>
                      {e.diretoria}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <div className="card shadow-sm mb-3">
          <div className="card-header bg-white d-flex align-items-center font-weight-bold">
            <FontAwesomeIcon icon={faUniversity} className="cor-azul" />
            <div className="ml-3 fonte-14">Total de Ambientes</div>
            <div className="checkboxes ml-auto">
              <span>
                <input type="checkbox" />
                Salas
              </span>
              <span>
                <input type="checkbox" />
                Laboratórios
              </span>
              <span>
                <input type="checkbox" />
                Banheiros
              </span>
              <span>
                <input type="checkbox" />
                Esporte e Lazer
              </span>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0 fonte-14">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col" className="text-center">
                      Quantidade
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.ambientes.length > 0
                    ? this.state.ambientes.map((ambiente, indice) => {
                        return (
                          <tr key={indice}>
                            <td>{ambiente.ambiente}</td>
                            <td className="text-center table-secondary">
                              {ambiente.total}
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Ambientes;
