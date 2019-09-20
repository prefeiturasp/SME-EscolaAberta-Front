import React, { Component } from "react";
import { Profissionais } from ".";

export default class Container extends Component {
  render() {
    return <Profissionais {...this.props} />;
  }
}
