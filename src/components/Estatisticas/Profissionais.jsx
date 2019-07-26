import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { listarServidoresEscolarizacao } from "../../services/estatisticas";
import shortid from "shortid";

export default class Profissionais extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servidores: [],
      formacoes: [],
      servidoresFormacoes: [],
      referencia: ""
    }
  }

  componentDidMount() {
    listarServidoresEscolarizacao({ codesc: this.props.codesc }).then(lista => {
      let formacoes = [];
      let servidores = [];
      lista.results.forEach((item) => {
        if (!formacoes.includes(item.formacao)) {
          formacoes.push(item.formacao);
        }
        if (!servidores.includes(item.titulo)) {
          servidores.push(item.titulo);
        }
      });
      this.setState({ formacoes: formacoes });
      this.setState({ servidores: servidores });
      this.setState({ servidoresFormacoes: lista.results });
    });
    this.setState({ referencia: new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString() });
  }

  render() {
    return (
      <div className="mt-5 mb-5">
        <div className="estatisticas-cabecalho mb-5">
          <h1 className="border-bottom font-weight-light">Profissionais</h1>
          <div className="referencia mt-1 mb-5">Data de referência: {this.state.referencia}</div>
        </div>
        <div className="card shadow-sm mb-3">
          <div className="card-header bg-white d-flex align-items-center font-weight-bold">
            <FontAwesomeIcon icon={faUsers} className="cor-azul" />
            <div className="ml-3 fonte-14">Formação do Profissionais</div>
          </div>
          <div className="card-body p-0">
            <table className="table table-hover table-bordered mb-0 fonte-14">
              <thead>
                <tr>
                  <th scope="col" rowSpan="2"></th>
                  <th scope="col" colSpan={this.state.formacoes.length} className="text-center font-weight-normal align-middle text-uppercase">Grau da Formação</th>
                  <th scope="col" rowSpan="2" className="text-center font-weight-normal align-middle text-uppercase">TOTAL DE PROFISSIONAIS POR CARGO</th>
                </tr>
                <tr>
                  {this.state.formacoes.length > 0 ? (
                    this.state.formacoes.map((formacao, indice) => {
                      return (
                        <th key={shortid.generate()} scope="col" className="text-center">{formacao}</th>
                      );
                    })
                  ) : (null)}
                </tr>
              </thead>
              <tbody>
                {this.state.servidores.length > 0 ? (
                  this.state.servidores.map((servidor, indice) => {
                    let totalProfissionaisCargo = 0;
                    return (
                      <tr key={indice}>
                        <td>{servidor}</td>
                        {this.state.formacoes.length > 0 ? (
                          this.state.formacoes.map((formacao, indice) => {
                            return (
                              <td key={shortid.generate()} className="text-center">
                                {this.state.servidoresFormacoes.length > 0 ? (
                                  this.state.servidoresFormacoes.filter((servidorFormacao) => {
                                    return servidorFormacao.titulo === servidor && servidorFormacao.formacao === formacao;
                                  }).map((servidorFormacao) => {
                                    totalProfissionaisCargo += servidorFormacao.total;
                                    return servidorFormacao.total;
                                  })
                                ) : (null)}
                              </td>
                            );
                          })
                        ) : (null)}
                        <td className="text-center table-secondary font-weight-bold">{totalProfissionaisCargo}</td>
                      </tr>
                    );
                  })
                ) : (null)}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="col" className="font-weight-normal">TOTAL DE PROFISSIONAIS POR ESCOLARIDADE</th>
                  {this.state.formacoes.length > 0 ? (
                    this.state.formacoes.map((formacao, indice) => {
                      return (
                        <th key={shortid.generate()} scope="col" className="text-center table-secondary">
                          {
                            this.state.servidoresFormacoes.filter((servidorFormacao) => {
                              return servidorFormacao.formacao === formacao;
                            }).reduce((total, servidorFormacao) => {
                              return total + servidorFormacao.total;
                            }, 0)
                          }
                        </th>
                      );
                    })
                  ) : (null)}
                  <th scope="col"></th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
