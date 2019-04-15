import React, { Component } from 'react';
import Mapa from '../Mapa/Mapa';
import { listarEscolas } from '../../services/escolas';
import PubSub from 'pubsub-js';
import TabelaEscolas from './TabelaEscolas';

export default class Escolas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            escolas : [],
            totalItens : 0,
            comeco : 2,
            escola : '',
            tipoEscola : '',
            dre : ''
        }
        this.atualizaMapa = this.atualizarMapa.bind(this);
        this.carregarMaisEscolas = this.carregarMaisEscolas.bind(this);
        this.limparCheckboxes = this.limparCheckboxes.bind(this);
    }

    componentDidMount() {
        listarEscolas().then(
            lista => {
                this.setState({ escolas : lista.results });
                this.setState({ count : Math.round(lista.count/10) });
                this.setState({ comeco : 2 });
            }
        )

        PubSub.subscribe('lista-escolas', function(topico, listaEscolas) {
            this.setState({ escolas : listaEscolas });
        }.bind(this));

        PubSub.subscribe('escola-filtro', function(topico, filtro) {
            this.setState({ escola : filtro });
        }.bind(this));

        PubSub.subscribe('tipo-escola-filtro', function(topico, filtro) {
            this.setState({ tipoEscola : filtro });
        }.bind(this));

        PubSub.subscribe('dre-filtro', function(topico, filtro) {
            this.setState({ dre : filtro });
        }.bind(this));

        PubSub.subscribe('total-itens', function(topico, total) {
            this.setState({ totalItens : total });
        }.bind(this));
    }

    atualizarMapa(escola, latitude, longitude) {
        PubSub.publish('escola', escola);
        PubSub.publish('latitude', latitude);
        PubSub.publish('longitude', longitude);
    }

    limparCheckboxes(event) {
        document.querySelectorAll('input[type=checkbox]').forEach(e => {
            if (e !== event.target) {
                e.checked = false;
                document.querySelectorAll('.collapse').forEach(c => {
                    c.classList.remove('show');
                });
            }
        });
    }

    carregarMaisEscolas() {
        if (this.state.comeco < this.state.totalItens) {
            listarEscolas(this.state.escola, this.state.tipoEscola, this.state.dre, this.state.comeco).then(
                lista => {
                    let novaListaEscolas = this.state.escolas.concat(lista.results);
                    this.setState({ escolas : novaListaEscolas });
                    this.setState({ comeco : this.state.comeco + 1 });
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
                            <TabelaEscolas lista={this.state.escolas} limparCheckboxes={this.limparCheckboxes} atualizarMapa={this.atualizarMapa} />
                        </div>
                        <div className="col-lg-6 col-xs-12">
                            <Mapa />
                        </div>
                    </div>
                </div>
                <div className="bg-white w-100 p-5">
                    <div className="container">
                        <div className="col-12">
                            <button type="button" className="btn btn-lg btn-success" onClick={this.carregarMaisEscolas}>Mais Escolas</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}