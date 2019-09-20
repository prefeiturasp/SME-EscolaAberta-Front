import React, { Component } from "react";
import { Escolas } from ".";

export default class Container extends Component {
  render() {
    return <Escolas {...this.props} />;
  }
}
