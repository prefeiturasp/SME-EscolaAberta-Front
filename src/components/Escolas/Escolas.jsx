import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import Mapa from '../Mapa/Mapa';
import TabelaEscolas from './Tabela';
import { listarEscolas } from '../../services/escolas';

export default class Escolas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            escolas : [],
            totalItens : 0,
            pagina : 2,
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
                this.setState({ totalItens : Math.round(lista.count/10) });
                this.setState({ pagina : 2 });
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
        if (this.state.pagina <= this.state.totalItens) {
            listarEscolas(this.state.escola, this.state.tipoEscola, this.state.dre, this.state.pagina).then(
                lista => {
                    let novaListaEscolas = this.state.escolas.concat(lista.results);
                    this.setState({ escolas : novaListaEscolas });
                    this.setState({ pagina : this.state.pagina + 1 });
                }
            )
        }
    }

    render() {
        return(
            <div className="bg-light w-100 h-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-xs-12 escolas">
                            <div className="pt-4 pb-4">
                                <h2>Título</h2>
                                <p>Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>
                            </div>
                            <div className="overflow-auto">
                                <TabelaEscolas lista={this.state.escolas} limparCheckboxes={this.limparCheckboxes} atualizarMapa={this.atualizarMapa} />
                            </div>
                        </div>
                        <div className="col-lg-6 col-xs-12 mapa-completo">
                            <Mapa />
                        </div>
                    </div>
                </div>
                <div className="bg-white w-100 mt-1 p-5">
                    <div className="container">
                        <div className="col-12">
                            <button type="button" className="btn btn-lg btn-success btn-mais-escolas" onClick={this.carregarMaisEscolas}>Mais Escolas</button>
                            <button type="button" className="ml-5 btn btn-lg btn-outline-success btn-estatisticas">Estatísticas</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}