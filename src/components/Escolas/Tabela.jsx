import React, { Component } from "react";
import { Link } from "react-router-dom";
import TabelaDetalhe from "./TabelaDetalhe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChartBar } from "@fortawesome/free-solid-svg-icons";

export default class TabelaEscolas extends Component {
  render() {
    return this.props.lista.length ? (
      <table className="table tabela-escolas">
        <thead>
          <tr>
            <th />
            <th>Código</th>
            <th>Nome da escola</th>
            <th>Tipo</th>
            <th>DRE</th>
            <th>Estatísticas</th>
          </tr>
        </thead>
        <tbody>
          {this.props.lista.map((escola, indice) => {
            return (
              <React.Fragment key={indice}>
                <tr>
                  <td>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      role="button"
                      className="text-secondary"
                      data-toggle="collapse"
                      href={`#escola-${escola.codesc}`}
                      aria-controls={`escola-${escola.codesc}`}
                      onClick={() =>
                        this.props.atualizarMapa(
                          escola.nomesc,
                          escola.latitude,
                          escola.longitude
                        )
                      }
                    />
                  </td>
                  <td>{escola.codesc}</td>
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
                      {escola.nomesc}
                    </Link>
                  </td>
                  <td>{escola.tipoesc}</td>
                  <td>{escola.diretoria.split('EDUCACAO')[1]}</td>
                  <td className="text-center">
                    <Link
                      to={{
                        pathname: "/estatisticas",
                        state: {
                          codesc: escola.codesc,
                          nomesc: escola.nomesc
                        }
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faChartBar}
                        className="text-secondary"
                      />
                    </Link>
                  </td>
                </tr>
                <TabelaDetalhe escola={escola} />
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    ) : this.props.loading ? (
      <div>Carregando...</div>
    ) : (
      <div>Nenhum resultado encontrado</div>
    );
  }
}
