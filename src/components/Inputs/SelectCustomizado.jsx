import React, { Component } from "react";

export default class SelectCustomizado extends Component {
  render() {
    return (
      <select
        name={this.props.name}
        id={this.props.id}
        className={this.props.className}
        onChange={this.props.onChange}
      >
        <option value="">{this.props.emptyLabel}</option>
        {this.props.lista.map((item, indice) => {
          return (
            <option key={indice} value={`${item[this.props.value]}`}>
              {`${item[this.props.label]}`}
            </option>
          );
        })}
      </select>
    );
  }
}
