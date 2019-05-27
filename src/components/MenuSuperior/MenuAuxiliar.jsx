import React, { Component } from "react";


export default class MenuHome extends Component {
  render() {
    return (
      <div className="menu-auxiliar w-100 h-100 p-3 text-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-sm-12 d-flex justify-content-start align-items-center">
              <h3 className="font-weight-bold m-0">Encontre uma escola</h3>
            </div>
            <div className="col-lg-6 col-sm-12  d-flex justify-content-end align-items-center">
              <button className="btn btn-outline-light btn-lg" data-toggle="collapse" data-target="#filtro-collapse" aria-expanded="false" aria-controls="filtro-collapse">Filtrar</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
