import React, { Component } from 'react';
import { listarTiposEscola, listarDREs, listarEscolas } from '../../services/escolas';
import PubSub from 'pubsub-js';
import AsyncSelect from 'react-select/lib/Async';

class Filtros extends Component {

    constructor(props) {
        super(props);
        this.state = {
            escolas : [],
            tiposEscola : [],
            dres : [],
            escola : '',
            tipoEscola : '',
            dre : ''
        }

        this.filtraListagemEscolas = this.filtrarListagemEscolas.bind(this);
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
    }

    componentWillMount() {
        listarEscolas().then(
            lista => {
                let escolas = [];
                lista.results.forEach(function(escola) {
                    escolas.push({value : escola.codesc, label : escola.nomesc })
                })
                this.setState({ escolas : escolas })
            }
        )
    }

    componentDidUpdate() {
        this.filtrarListagemEscolas();
    }

    filtrarListagemEscolas() {
        listarEscolas(this.state.escola, this.state.tipoEscola, this.state.dre).then(
            lista => PubSub.publish('lista-escolas', lista.results)
        )
    }

    buscarEscolas = (e) => {
        let escolas = [];
        listarEscolas(e).then(
            lista => {
                if (lista.results !== this.state.escolas) {
                    lista.results.forEach(function(escola) {
                        escolas.push({value : escola.codesc, label : escola.nomesc })
                    })
                    this.setState({ escolas :  escolas });
                } else {
                    escolas = this.state.escolas;
                }
            }
        )
        return escolas;
    }

    loadEscolas = e =>
    new Promise(resolve => {
        // setTimeout(() => {
            resolve(this.buscarEscolas(e));
        // }, 1000);
    });

    setTipoEscola(event) {
        this.setState({ tipoEscola : event.target.value });
        PubSub.publish('tipo-escola-filtro', event.target.value);
    }

    setDRE(event) {
        this.setState({ dre : event.target.value });
        PubSub.publish('dre-filtro', event.target.value);
    }

    setEscola = (value) => {
        console.log('valor ' + value);
        this.setState({ escola : value });
    }

    clearEscola = (value) => {
        console.log('limpou');
        this.setState({ escola : null });
    }

    render() {
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <h1>Escola Aberta</h1>
                        </div>
                        <div className="col-6">
                            <h2>Consulte sua posição</h2>
                        </div>
                    </div>
                </div>
                <div className="menu-busca p-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-5">
                                <AsyncSelect key={ this.state.escolas } loadOptions={ this.buscarEscolas } />
                            </div>
                            <div className="col-2">
                                <select name="filtro-tipo" id="filtro-tipo" className="custom-select rounded-pill" onChange={ this.setTipoEscola }>
                                    <option value="">Selecione o tipo</option>
                                    {
                                        this.state.tiposEscola.map(function(tipo, indice) {
                                            return <option key={ indice } value={ tipo.tipoesc }>{ tipo.tipoesc }</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-5">
                                <select name="filtro-dre" id="filtro-dre" className="custom-select rounded-pill" onChange={ this.setDRE }>
                                    <option value="">Selecione a DRE</option>
                                    {
                                        this.state.dres.map(function(dre, indice) {
                                            return <option key={ indice } value={ dre.dre }>{ dre.diretoria }</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Filtros;