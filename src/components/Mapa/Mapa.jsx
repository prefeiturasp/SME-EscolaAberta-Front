import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

export default class Mapa extends Component {

    constructor(props) {
        super(props);
        this.state = {
            escola : 'São Paulo',
            lat : -23.5735874,
            lng : -46.6783826,
            zoom : 17,
            height : '535px',
            area : []
        }

        this.retornaLocalizacao = this.retornaLocalizacao.bind(this);
        this.defineLatitudeLongitude = this.defineLatitudeLongitude.bind(this);
        this.trataErros = this.trataErros.bind(this);
        this.buscarEscolasArea = this.buscarEscolasArea.bind(this);
    }

    componentDidMount() {
        PubSub.subscribe('escola', function(topico, escola) {
            this.setState({ escola : escola })
        }.bind(this));

        PubSub.subscribe('latitude', function(topico, latitude) {
            this.setState({ lat : latitude })
        }.bind(this));

        PubSub.subscribe('longitude', function(topico, longitude) {
            this.setState({ lng : longitude })
        }.bind(this));

        this.retornaLocalizacao();
    }

    retornaLocalizacao() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(this.defineLatitudeLongitude, this.trataErros)
        } else {
            console.log('A geolocalização não está habiliata');
        }
    }

    defineLatitudeLongitude(position) {
        this.setState({
            lat : position.coords.latitude,
            lng : position.coords.longitude
        });
    }

    trataErros(message) {
        console.log('Não foi possível determinar a localização', message);
    }

    buscarEscolasArea() {
        this.setState({ area : this.refs.map.leafletElement.getBounds() });
    }

    render() {
        return(
            <div className="mapa h-100 w-100">
                <Map ref='map' center={ [ this.state.lat, this.state.lng ] } zoom={ this.state.zoom } onMoveend={this.buscarEscolasArea} style={ { height: this.state.height } } >
                    <TileLayer
                        attribution=''
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={ [ this.state.lat, this.state.lng ] }>
                        <Popup>
                            { this.state.escola }
                        </Popup>
                    </Marker>
                </Map>
            </div>
        );
    }

}