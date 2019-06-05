import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";

export default class MenuHome extends Component {
  render() {
    return (
      <div className="w-100 menu-auxiliar h-100 p-3 text-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-sm-12 d-flex justify-content-start align-items-center">
              <h3 className="font-weight-bold m-0">Encontre uma escola</h3>
            </div>
            <div className="col-lg-6 col-sm-12 d-flex justify-content-lg-end justify-content-start align-items-center">
              <button className="btn btn-lg btn-outline-light" data-toggle="collapse" data-target="#filtro-collapse" aria-expanded="false" aria-controls="filtro-collapse">
                <FontAwesomeIcon icon={faSlidersH} /> Filtrar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
