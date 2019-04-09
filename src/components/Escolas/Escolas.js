import React, { Component } from 'react';
import Mapa from '../Mapa/Mapa';
import { listarEscolas } from '../../services/escolas';
import PubSub from 'pubsub-js';

class Escolas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            escolas : []
        }
    }

    componentDidMount() {
        listarEscolas().then(
            lista => this.setState({ escolas : lista.results })
        )

        PubSub.subscribe('lista-escolas', function(topico, novaLista) {
            this.setState({ escolas : novaLista })
        }.bind(this));
    }

    render() {
        return(
            <div className="bg-light">
                <div className="container">
                    <div className="row mb-4">
                        <div className="col-8">
                            <div className="mt-5 mb-5">
                                <h2>Título</h2>
                                <p>Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>
                            </div>
                            <table className="table table-escolas">
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
                                        this.state.escolas.map(function(escola, indice) {
                                            return (
                                                <React.Fragment key={ indice }>
                                                    <tr data-toggle="collapse" href={ `#escola-${escola.codesc}` } aria-expanded="false" aria-controls={ `escola-${escola.codesc}` }>
                                                        <td>{ escola.codesc }</td>
                                                        <td>{ escola.nomesc }</td>
                                                        <td>{ escola.tipoesc }</td>
                                                        <td>{ escola.subpref }</td>
                                                        <td><input type="checkbox" /></td>
                                                    </tr>
                                                    <tr id={ `escola-${escola.codesc}` } className="collapse">
                                                        <td></td>
                                                        <td>
                                                            <h3>Endereço</h3>
                                                            <div>{ escola.endereco }, { escola.numero }</div>
                                                            <div>{ escola.bairro } - CEP { escola.cep }</div>
                                                            <div>Distrito { escola.distrito }</div>
                                                        </td>
                                                        <td colSpan="2">
                                                            <h3>Contatos</h3>
                                                            Telefone { escola.tel1 }
                                                        </td>
                                                        <td></td>
                                                    </tr>
                                                </React.Fragment>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <Mapa />
                    </div>
                </div>
            </div>
        );
    }

}

export default Escolas;