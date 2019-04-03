import React, { Component } from 'react';
import Mapa from '../Mapa/Mapa';

class Escolas extends Component {

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-6">
                    </div>
                    <Mapa />
                </div>
            </div>
        );
    }

}

export default Escolas;