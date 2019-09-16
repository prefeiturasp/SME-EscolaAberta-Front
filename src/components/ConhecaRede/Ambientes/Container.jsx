import React, { Component } from "react";
import { Ambientes } from ".";

export default class Container extends Component {

  render() {
    return <Ambientes {...this.props} />;
  }
}
