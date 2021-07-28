import React, { Component } from "react";

export default class TabelaDetalhe extends Component {
  render() {
    return (
      <tr id={`escola-${this.props.escola.codesc}`} className="collapse">
        <td colSpan="2" />
        <td>
          <h3>Endereço</h3>
          <div>
            {this.props.escola.endereco}, {this.props.escola.numero}
          </div>
          <div>
            {this.props.escola.bairro} - CEP {this.props.escola.cep}
          </div>
          <div>Distrito {this.props.escola.distrito}</div>
        </td>
        <td colSpan="4">
          <h3>Contatos</h3>
          <div>Telefone {this.props.escola.tel1}</div>
          <br />
          <div>Email {this.props.escola.email}</div>
        </td>
        <td />
      </tr>
    );
  }
}
