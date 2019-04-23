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
        this.testeClick = this.testeClick.bind(this);
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
        var filter = {};

        Object.entries(collection).map(([key, item]) => {
            if (item.label.includes(e))
                filter[key] = item;
            return filter;
        });

        collection = filter;

        this.setState({
            escola: e,
            escolas: collection
        });
        PubSub.publish('escola-filtro', e);
    }

    testeClick() {
        console.log(this.state.escola);
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
                                <Link className="btn btn-light d-inline-block ml-1" onClick={this.testeClick} to="/escolas"><img src={lupa} alt="Buscar" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}