import React, { Component } from 'react';

class MenuSuperior extends Component {

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
                                <select name="escola" id="escola" className="custom-select rounded-pill">
                                    <option value="">Selecione a escola</option>
                                </select>
                            </div>
                            <div className="col-3">
                                <input type="text" className="form-control rounded-pill" />
                            </div>
                            <div className="col-4">
                            <   input type="text" className="form-control rounded-pill" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default MenuSuperior;