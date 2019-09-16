import React, { Component } from "react";
import VagasMatriculas from ".";

export default class Container extends Component {

  render() {
    return <VagasMatriculas {...this.props} />;
  }
}
