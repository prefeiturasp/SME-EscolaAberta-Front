import React, { Component } from 'react';
import Mapa from '../Mapa/Mapa';
import { listarEscolas } from '../../services/escolas';
import PubSub from 'pubsub-js';

export default class Escolas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            escolas : [],
            totalItens : 0,
            comeco : 1,
            escola : '',
            tipoEscola : '',
            dre : ''
        }
        this.atualizaMapa = this.atualizarMapa.bind(this);
        this.carregarMaisEscolas = this.carregarMaisEscolas.bind(this);
    }

    componentDidMount() {
        listarEscolas().then(
            lista => {
                this.setState({ escolas : lista.results });
                this.setState({ count : Math.round(lista.count/10) });
            }
        )

        PubSub.subscribe('lista-escolas', function(topico, listaEscolas) {
            this.setState({ escolas : listaEscolas })
        }.bind(this));

        PubSub.subscribe('tipo-escola-filtro', function(topico, filtro) {
            this.setState({ tipoEscola : filtro })
        }.bind(this));

        PubSub.subscribe('dre-filtro', function(topico, filtro) {
            this.setState({ dre : filtro })
        }.bind(this));

        PubSub.subscribe('total-itens', function(topico, total) {
            this.setState({ totalItens : total })
        }.bind(this));
    }

    atualizarMapa(escola, latitude, longitude) {
        PubSub.publish('escola', escola);
        PubSub.publish('latitude', latitude);
        PubSub.publish('longitude', longitude);
        console.log(this);
    }

    limparCheckboxes(event) {
        document.querySelectorAll('input[type=checkbox]').forEach(e => {
            if (e !== event.target) {
                e.checked = false;
            }
        });
    }

    carregarMaisEscolas() {
        if (this.state.comeco < this.state.totalItens) {
            listarEscolas(this.state.escola, this.state.tipoEscola, this.state.dre, this.state.comeco).then(
                lista => {
                    let novaListaEscolas = this.state.escolas.concat(lista.results);
                    this.setState({ escolas : novaListaEscolas });
                    this.setState({ start : this.state.comeco + 1 });
                }
            )
        }
    }

    render() {
        return(
            <div className="bg-light w-100 h-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-xs-12">
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
                                        this.state.escolas.map((escola, indice) => {
                                            return (
                                                <React.Fragment key={ indice }>
                                                    <tr>
                                                        <td>{ escola.codesc }</td>
                                                        <td>{ escola.nomesc }</td>
                                                        <td>{ escola.tipoesc }</td>
                                                        <td>{ escola.subpref }</td>
                                                        <td><input type="checkbox" data-toggle="collapse" href={ `#escola-${escola.codesc}` } aria-controls={ `escola-${escola.codesc}` } onChange={ this.limparCheckboxes } onClick={ () => this.atualizarMapa(escola.nomesc, escola.latitude, escola.longitude) } /></td>
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
                        <div className="col-6">
                            <Mapa />
                        </div>
                    </div>
                </div>
                <div className="bg-white w-100 p-5">
                    <div className="container">
                        <div className="col-12">
                            <button type="button" className="btn btn-lg btn-success" onClick={ this.carregarMaisEscolas }>Mais Escolas</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}