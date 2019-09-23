import React, { Component } from "react";
import {
  listarAmbientesSME,
  listarAmbientesSMEPorDRE
} from "../../../services/estatisticas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUniversity } from "@fortawesome/free-solid-svg-icons";
import { ambientesFormatados } from "./helper";

export class Ambientes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ambientes: [],
      referencia: "",
      checks: [
        "BRINQUEDOTECA",
        "ELEVADOR",
        "LABORATORIO DE INFORMATICA",
        "LABORATORIO DIVERSOS",
        "PARQUE",
        "QUADRA",
        "RAMPA",
        "SALA DE AULA",
        "SALA DE LEITURA",
        "SANITARIO ACESSIVEL A PESSOAS COM DEFICIENCIA"
      ],
      primeiroCheck: false
    };
  }

  componentDidMount() {
    listarAmbientesSME({ codesc: this.props.codesc }).then(lista => {
      this.setState({ ambientes: ambientesFormatados(lista.results) });
    });
    this.setState({
      referencia: new Date(
        new Date().setDate(new Date().getDate() - 1)
      ).toLocaleDateString()
    });
  }

  onSelectChanged(value) {
    listarAmbientesSMEPorDRE({ dre: value }).then(lista => {
      this.setState({ ambientes: ambientesFormatados(lista.results) });
    });
    this.props.onDRESelected(value);
  }

  onCheckClicked(labels) {
    let checks = this.state.checks;
    if (!this.state.primeiroCheck) {
      checks = [];
      this.setState({ primeiroCheck: true });
    }
    if (!checks.includes(labels[0])) {
      labels.forEach(label => {
        checks.push(label);
      });
    } else {
      labels.forEach(label => {
        checks.forEach((check, index) => {
          if (check === label) {
            checks.splice(index, 1);
          }
        });
      });
      if (checks.length === 0) {
        checks = [
          "BRINQUEDOTECA",
          "ELEVADOR",
          "LABORATORIO DE INFORMATICA",
          "LABORATORIO DIVERSOS",
          "PARQUE",
          "QUADRA",
          "RAMPA",
          "SALA DE AULA",
          "SALA DE LEITURA",
          "SANITARIO ACESSIVEL A PESSOAS COM DEFICIENCIA"
        ];
        this.setState({ primeiroCheck: false });
      }
    }
    this.setState({ checks });
  }

  render() {
    const { diretoriasRegionais } = this.props;
    const { ambientes, checks, referencia } = this.state;
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
                <input
                  onClick={() =>
                    this.onCheckClicked(["SALA DE AULA", "SALA DE LEITURA"])
                  }
                  type="checkbox"
                />
                Salas
              </span>
              <span>
                <input
                  onClick={() =>
                    this.onCheckClicked([
                      "LABORATORIO DE INFORMATICA",
                      "LABORATORIO DIVERSOS"
                    ])
                  }
                  type="checkbox"
                />
                Laboratórios
              </span>
              <span>
                <input
                  onClick={() =>
                    this.onCheckClicked([
                      "SANITARIO ACESSIVEL A PESSOAS COM DEFICIENCIA"
                    ])
                  }
                  type="checkbox"
                />
                Banheiros
              </span>
              <span>
                <input
                  onClick={() =>
                    this.onCheckClicked(["BRINQUEDOTECA", "PARQUE", "QUADRA"])
                  }
                  type="checkbox"
                />
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
                  {ambientes.length > 0 &&
                    ambientes.map((ambiente, indice) => {
                      return (
                        checks.includes(ambiente.ambiente) && (
                        <tr key={indice}>
                          <td>{ambiente.ambiente}</td>
                          <td className="text-center table-secondary">
                            {ambiente.total}
                          </td>
                        </tr>
                      ));
                    })}
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
