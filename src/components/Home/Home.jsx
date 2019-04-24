import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import lupa from '../../img/lupa.png';
import { Link } from 'react-router-dom';
import MenuHome from '../MenuSuperior/MenuHome';
import { listarEscolas } from '../../services/escolas';
import SelectAutocomplete from '../Inputs/SelectAutocomplete';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            escola :  '',
            escolas : []
        }

        this.setEscola = this.setEscola.bind(this);
    }

    componentDidMount() {
        listarEscolas().then(
            lista => {
                let escolas = [];
                lista.results.forEach(function(escola) {
                    escolas.push({value : escola.codesc, label : escola.nomesc })
                });
                this.setState({ escolas : escolas });
            }
        )
        PubSub.subscribe('escola-filtro', () => {});
    }

    componentWillMount() {
        // PubSub.clearAllSubscriptions();
    }

    buscarEscolas = (e) => {
        if (e.target.value.length >= 3) {
            let escolas = [];
            listarEscolas(e.target.value).then(
                lista => {
                    lista.results.forEach(function(escola) {
                        escolas.push({value : escola.codesc, label : escola.nomesc });
                    });
                    this.setState({ escolas :  escolas });
                }
            )
        }
    }

    setEscola(collection, e) {
        this.setState({ escola: e }, () => {
            PubSub.publishSync('escola-filtro', e);
        });
    }

    render() {
        return(
            <div>
                <MenuHome />
                <div className="w-100 mapa-home">
                    <div className="container d-flex justify-content-center">
                        <div className="col-lg-5 text-center position-absolute conteudo">
                            <h2>Aqui você encontra todas as informações sobre sua escola</h2>
                            <div className="form-group mt-4">
                                <SelectAutocomplete
                                    value={this.state.escola}
                                    collection={this.state.escolas}
                                    className="form-control form-control-lg rounded-pill shadow m-90 d-inline-block"
                                    placeholder="Encontre sua escola pelo nome ou bairro"
                                    onChange={this.setEscola}
                                    onKeyDown={this.buscarEscolas}
                                />
                                <Link className="btn btn-light d-inline-block ml-1" to="/escolas"><img src={lupa} alt="Buscar" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}