import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import { Link } from 'react-router-dom';
import SelectCustomizado from '../Inputs/SelectCustomizado';
import SelectAutocomplete from '../Inputs/SelectAutocomplete';
import { listarTiposEscola, listarDREs, listarEscolas } from '../../services/escolas';
import logoEscolaAberta from '../../img/escola_aberta.png';

export default class Filtros extends Component {

    constructor(props) {
        super(props);
        this.state = {
            escolasAutocomplete : [],
            tiposEscola : [],
            dres : [],
            escolaSelecionada : '',
            tipoEscolaSelecionado : '',
            dreSelecionada : ''
        }

        this.filtrarListagemEscolas = this.filtrarListagemEscolas.bind(this);
        this.buscarEscolas = this.buscarEscolas.bind(this);
        this.setEscola = this.setEscola.bind(this);
        this.setTipoEscola = this.setTipoEscola.bind(this);
        this.setDRE = this.setDRE.bind(this);
    }

    componentDidMount() {
        listarTiposEscola().then(
            lista => this.setState({ tiposEscola : lista.results })
        )

        listarDREs().then(
            lista => this.setState({ dres : lista.results })
        )

        PubSub.subscribe('escola-filtro', function(topico, filtro) {
            this.setState({ escolaSelecionada : filtro }, () =>
                this.filtrarListagemEscolas()
            );
        }.bind(this));

        PubSub.subscribe('lista-escolas', () => {});
    }

    componentWillUnmount() {
        PubSub.clearAllSubscriptions();
    }

    filtrarListagemEscolas() {
        listarEscolas(this.state.escolaSelecionada, this.state.tipoEscolaSelecionado, this.state.dreSelecionada).then(
            lista => {
                PubSub.publish('lista-escolas', lista.results);
                PubSub.publish('total-itens', Math.round(lista.count/10));
            }
        )
    }

    buscarEscolas = (e) => {
        if (e.target.value.length >= 3) {
            let escolas = [];
            listarEscolas(e.target.value).then(
                lista => {
                    lista.results.forEach(function(escola) {
                        escolas.push({value : escola.codesc, label : escola.nomesc });
                    });
                    this.setState({ escolasAutocomplete :  escolas });
                }
            )
        }
    }

    setEscola(event) {
        this.setState({ escolaSelecionada: event }, () => {
            this.filtrarListagemEscolas();
        });
        PubSub.publish('escola-filtro', event);
    }

    setTipoEscola(event) {
        this.setState({ tipoEscolaSelecionado : event.target.value }, () => {
            this.filtrarListagemEscolas();
        });
        PubSub.publish('tipo-escola-filtro', event.target.value);
    }

    setDRE(event) {
        this.setState({ dreSelecionada : event.target.value }, () => {
            this.filtrarListagemEscolas();
        });
        PubSub.publish('dre-filtro', event.target.value);
    }

    render() {
        return(
            <div>
                <div className="container">
                    <div className="row mt-3 mb-4">
                        <div className="col-lg-6 col-xs-12 d-flex justify-content-lg-start justify-content-center">
                            <h1 className="m-0">
                                <Link to="/">
                                    <img className="img-fluid" src={logoEscolaAberta} alt="Escola Aberta"/>
                                </Link>
                            </h1>
                        </div>
                        <div className="col-lg-6 col-xs-12 d-flex justify-content-lg-end justify-content-center">
                            <button className="btn btn-sm btn-success btn-consulte mt-3">Consulte sua posição</button>
                        </div>
                    </div>
                </div>
                <div className="menu-busca p-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5 col-xs-12">
                                <SelectAutocomplete
                                    value={this.state.escolaSelecionada}
                                    collection={this.state.escolasAutocomplete}
                                    className="custom-select rounded-pill"
                                    placeholder="Selecione a escola"
                                    onChange={this.setEscola}
                                    onKeyDown={this.buscarEscolas}
                                />
                            </div>
                            <div className="col-lg-2 col-xs-12">
                                <SelectCustomizado
                                    name="filtro-tipo"
                                    id="filtro-tipo"
                                    className="custom-select rounded-pill"
                                    emptyLabel="Selecione o tipo"
                                    lista={this.state.tiposEscola}
                                    value="tipoesc"
                                    label="tipoesc"
                                    onChange={this.setTipoEscola}
                                />
                            </div>
                            <div className="col-lg-5 col-xs-12">
                                <SelectCustomizado
                                    name="filtro-dre"
                                    id="filtro-dre"
                                    className="custom-select rounded-pill"
                                    emptyLabel="Selecione a DRE"
                                    lista={this.state.dres}
                                    value="dre"
                                    label="diretoria"
                                    onChange={this.setDRE}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}