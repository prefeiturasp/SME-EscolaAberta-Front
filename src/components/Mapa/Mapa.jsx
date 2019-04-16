import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

export default class Mapa extends Component {

    constructor(props) {
        super(props);
        this.state = {
            escola: '',
            lat: -23.612237,
            lng: -46.749888,
            zoom: 17,
            height: '540px'
        }
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
    }

    render() {
        return(
            <div className="mapa h-100 w-100">
                <Map center={ [ this.state.lat, this.state.lng ] } zoom={ this.state.zoom } zoomControl={false} style={ { height: this.state.height } } >
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