import React, { Component } from 'react';
import Mapa from '../Mapa/Mapa';

class Escolas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            escolas : []
        }
    }

    componentDidMount() {
        fetch('http://hom-escolaaberta.sme.prefeitura.sp.gov.br/api/escolas/').then(resultados => {
            resultados.json().then(escolas => {
                this.setState({ escolas : escolas.results })
            })
        })
        // console.log(this.state.escolas)
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-6">
                    <table className="table-bordered table-striped">
                        <thead className="thead-light">
                            <th>Código</th>
                            <th>Nome da escola</th>
                            <th>Tipo</th>
                            <th>DRE</th>
                            <th></th>
                        </thead>
                        <tbody>
                            {
                                this.state.escolas.map(function(escola, indice) {
                                    return (
                                        <tr key={ indice }>
                                            <td>{ escola.codesc }</td>
                                            <td>{ escola.nomesc }</td>
                                            <td>{ escola.tipoesc }</td>
                                            <td>{ escola.subpref }</td>
                                            <td><input type="checkbox" /></td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                    </div>
                    <Mapa />
                </div>
            </div>
        );
    }

}

export default Escolas;