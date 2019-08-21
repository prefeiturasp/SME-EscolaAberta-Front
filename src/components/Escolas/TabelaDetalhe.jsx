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
        <td colSpan="2">
          <h3>Contatos</h3>
          Telefone {this.props.escola.tel1}
        </td>
        <td />
      </tr>
    );
  }
}
