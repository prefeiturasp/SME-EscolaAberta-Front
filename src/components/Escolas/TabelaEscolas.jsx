import React, { Component } from 'react';

export default class TabelaEscolas extends Component {

    render() {
        return(
            <table className="table tabela-escolas">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome da escola</th>
                        <th>Tipo</th>
                        <th>DRE</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.lista.map((escola, indice) => {
                            return (
                                <React.Fragment key={indice}>
                                    <tr>
                                        <td>{escola.codesc}</td>
                                        <td>{escola.nomesc}</td>
                                        <td>{escola.tipoesc}</td>
                                        <td>{escola.subpref}</td>
                                        <td><input type="checkbox" data-toggle="collapse" href={`#escola-${escola.codesc}`} aria-controls={`escola-${escola.codesc}`} onChange={this.props.limparCheckboxes} onClick={() => this.props.atualizarMapa(escola.nomesc, escola.latitude, escola.longitude)} /></td>
                                    </tr>
                                    <tr id={`escola-${escola.codesc}`} className="collapse">
                                        <td></td>
                                        <td>
                                            <h3>Endereço</h3>
                                            <div>{escola.endereco}, {escola.numero}</div>
                                            <div>{escola.bairro} - CEP {escola.cep}</div>
                                            <div>Distrito {escola.distrito}</div>
                                        </td>
                                        <td colSpan="2">
                                            <h3>Contatos</h3>
                                            Telefone {escola.tel1}
                                        </td>
                                        <td></td>
                                    </tr>
                                </React.Fragment>
                            );
                        })
                    }
                </tbody>
            </table>
        );
    }

}