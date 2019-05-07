import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { listarEscolas, listarBairros, listarDistritos } from '../../services/escolas';

export default class Buscador extends Component {

    constructor(props) {
        super(props);
        this.state = {
            escolasLista : [],
            bairrosLista : [],
            distritosLista : []
        }

        this.buscarPorTermo = this.buscarPorTermo.bind(this);
    }

    buscarPorTermo = (e) => {
        if (e.target.value.length >= 3) {
            let escolas = this.buscarEscolasPorNome(e.target.value);
            let bairros = this.buscarBairros(e.target.value);
            let distritos = this.buscarDistritos(e.target.value);
            setTimeout(function() {
                this.setState({ escolasLista : escolas });
                this.setState({ bairrosLista : bairros });
                this.setState({ distritosLista : distritos });
                document.querySelector('.resultados').classList.remove('d-none');
            }.bind(this), 1000);
        }
    }

    buscarEscolasPorNome(e) {
        let escolas = [];
        listarEscolas(e).then(
            lista => {
                lista.results.forEach(function(escola) {
                    escolas.push({value : escola.codesc, label : escola.nomesc });
                });
            }
        )
        return escolas;
    }

    buscarBairros(e) {
        let bairros = [];
        listarBairros(e).then(
            lista => {
                lista.results.forEach(function(bairro) {
                    bairros.push({ label : bairro.bairro });
                });
            }
        )
        return bairros;
    }

    buscarDistritos(e) {
        let distritos = [];
        listarDistritos(e).then(
            lista => {
                lista.results.forEach(function(distrito) {
                    distritos.push({ label : distrito.distrito });
                });
            }
        )
        return distritos;
    }

    toggleBusca() {

    }

    render() {
        return(
            <div>
                <div className="form-group mt-4 mb-0">
                    <input type="text" className="form-control form-control-lg rounded-pill shadow d-inline-block h-100 pt-3 pb-3" onKeyDown={this.buscarPorTermo} onBlur={this.toggleBusca} />
                </div>
                <div className="resultados container bg-white h-100 shadow rounded d-none mb-4">
                    <div className="row">
                        <div className="col-lg-4 col-xs-12 p-0">
                            <div className="list-group">
                                <li className="list-group-item list-group-item-secondary border-0">Escolas</li>
                                {
                                    this.state.escolasLista.map((escola, indice) => {
                                        return(
                                            <Link
                                                to={{
                                                    pathname: '/escolas',
                                                    state: {
                                                        escola: escola.label
                                                    }
                                                }}
                                                className="list-group-item list-group-item-action border-0"
                                            >{ escola.label }</Link>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        <div className="col-lg-4 col-xs-12 p-0">
                            <div className="list-group">
                                <li className="list-group-item list-group-item-secondary border-0">Bairros</li>
                                {
                                    this.state.bairrosLista.map((bairro, indice) => {
                                        return(
                                            <Link
                                            className="list-group-item list-group-item-action border-0"
                                            >
                                                { bairro.label }
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="col-lg-4 col-xs-12 p-0">
                            <div className="list-group">
                                <li className="list-group-item list-group-item-secondary border-0">Distritos</li>
                                {
                                    this.state.distritosLista.map((distrito, indice) => {
                                        return(
                                            <Link
                                            className="list-group-item list-group-item-action border-0"
                                            >
                                                { distrito.label }
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}