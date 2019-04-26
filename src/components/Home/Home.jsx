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

        this.setEscola = this.setEscola.bind(this);
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
                                    onKeyDown={this.buscarEscolas}
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