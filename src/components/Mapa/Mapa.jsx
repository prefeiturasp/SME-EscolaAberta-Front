import React, { Component } from "react";
import PubSub from "pubsub-js";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

export default class Mapa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      escola: "",
      lat: -23.5505,
      lng: -46.6333,
      zoom: 12,
      marcadores: []
    };

    this.criarMarcadores = this.criarMarcadores.bind(this);
  }

  componentDidMount() {
    PubSub.subscribe(
      "escola",
      function(topico, escola) {
        this.setState({ escola: escola, zoom: 15 });
      }.bind(this)
    );

    PubSub.subscribe(
      "latitude",
      function(topico, latitude) {
        this.setState({ lat: latitude });
      }.bind(this)
    );

    PubSub.subscribe(
      "longitude",
      function(topico, longitude) {
        this.setState({ lng: longitude });
      }.bind(this)
    );

    PubSub.subscribe(
      "lista-escolas",
      function(topico, listaEscolas) {
        this.criarMarcadores(listaEscolas);
      }.bind(this)
    );
  }

  criarMarcadores(escolas) {
    if (escolas.length) {
      this.setState({ marcadores: [] }, () => {
        escolas.forEach(escola => {
          let marcador = [];
          marcador.escola = escola;
          marcador.latitude = escola.latitude;
          marcador.longitude = escola.longitude;
          this.state.marcadores.push(marcador);
        });
        this.setState({
          lat: this.state.marcadores[0].latitude,
          lng: this.state.marcadores[0].longitude
        });
      });
    } else {
      this.setState({ marcadores: [] });
    }
  }

  render() {
    return (
      <div className="mapa h-80 w-80">
        <Map
          ref="map"
          center={[this.state.lat, this.state.lng]}
          zoom={this.state.zoom}
        >
          <TileLayer
            attribution=""
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.state.marcadores.map((marcador, indice) => {
            return (
              <Marker
                key={indice}
                position={[marcador.latitude, marcador.longitude]}
              >
                <Popup>
                  <strong>{marcador.escola.nomesc}</strong>
                  <div>
                    {marcador.escola.endereco}, {marcador.escola.numero} -{" "}
                    {marcador.escola.bairro}
                  </div>
                  <div>
                    <a href={`tel:${marcador.escola.tel1}`}>
                      Tel: {marcador.escola.tel1}
                    </a>{" "}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </Map>
      </div>
    );
  }
}
