import React, { Component } from 'react';

export default class InputCustomizado extends Component {
  render() {
    return (
      <input
        type="text"
        {...this.props} />
    );
  }
}
