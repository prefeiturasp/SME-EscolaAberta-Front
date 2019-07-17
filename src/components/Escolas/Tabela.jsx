import React, { Component } from "react";
import { Link } from "react-router-dom";
import TabelaDetalhe from "./TabelaDetalhe";

export default class TabelaEscolas extends Component {
  render() {
    return (
      <table className="table tabela-escolas">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome da escola</th>
            <th>Tipo</th>
            <th>DRE</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {this.props.lista.map((escola, indice) => {
            return (
              <React.Fragment key={indice}>
                <tr>
                  <td className="text-primary font-weight-bold">
                    <Link
                      to={{
                        pathname: "/estatisticas",
                        state: {
                          codesc: escola.codesc,
                          nomesc: escola.nomesc
                        }
                      }}
                    >
                      {escola.codesc}
                    </Link>
                  </td>
                  <td>{escola.nomesc}</td>
                  <td>{escola.tipoesc}</td>
                  <td>{escola.subpref}</td>
                  <td>
                    <input
                      type="checkbox"
                      data-toggle="collapse"
                      href={`#escola-${escola.codesc}`}
                      aria-controls={`escola-${escola.codesc}`}
                      onChange={this.props.limparCheckboxes}
                      onClick={() =>
                        this.props.atualizarMapa(
                          escola.nomesc,
                          escola.latitude,
                          escola.longitude
                        )
                      }
                    />
                  </td>
                </tr>
                <TabelaDetalhe escola={escola} />
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    );
  }
}
