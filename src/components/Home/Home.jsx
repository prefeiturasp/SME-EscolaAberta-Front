import React, { Component } from 'react';
import lupa from '../../img/lupa.png';
import { Link } from 'react-router-dom';
import MenuHome from '../MenuSuperior/MenuHome';
import { listarEscolas } from '../../services/escolas';
import SelectAutocomplete from '../Inputs/SelectAutocomplete';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            escolaSelecionada :  '',
            escolasAutocomplete : []
        }

        this.buscarPorTermo = this.buscarPorTermo.bind(this);
        this.setEscola = this.setEscola.bind(this);
    }

    buscarPorTermo = (e) => {
        console.log(e.target.value);
        if (e.target.value.length >= 3) {
            console.log(this.buscarEscolasPorNome(e.target.value));
        }
    }

    buscarEscolasPorNome(e) {
        let escolas = [];
        listarEscolas(e).then(
            lista => {
                lista.results.forEach(function(escola) {
                    escolas.push({value : escola.codesc, label : escola.nomesc });
                });
                return escolas;
            }
        )
    }

    buscarEscolasPorBairro(e) {
        let escolas = [];
        return escolas;
    }

    buscarEscolasPorDistrito(e) {
        let escolas = [];
        return escolas;
    }

    setEscola(event) {
        this.setState({ escolaSelecionada: event });
    }

    render() {
        return(
            <div>
                <MenuHome />
                <div className="w-100 mapa-home">
                    <div className="container d-flex justify-content-center">
                        <div className="col-lg-5 text-center position-absolute conteudo">
                            <h2>Aqui você encontra todas as informações sobre sua escola</h2>
                            <div className="form-group mt-4 text-left">
                                <SelectAutocomplete
                                    value={this.state.escolaSelecionada}
                                    collection={this.state.escolasAutocomplete}
                                    className="form-control form-control-lg rounded-pill shadow d-inline-block"
                                    placeholder="Encontre sua escola pelo nome ou bairro"
                                    onChange={this.setEscola}
                                    onKeyDown={this.buscarPorTermo}
                                />
                                <Link
                                className="btn btn-light d-inline-block ml-1"
                                to={{
                                    pathname: '/escolas',
                                    state: {
                                        escola: this.state.escolaSelecionada
                                    }
                                }}>
                                    <img src={lupa} alt="Buscar" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}