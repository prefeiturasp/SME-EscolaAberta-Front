import React, { Component } from "react";

export default class SelectCustomizado extends Component {
  render() {
    const { selected } = this.props;
    return (
      <select
        name={this.props.name}
        id={this.props.id}
        className={this.props.className}
        ref={this.props.selectRef}
        onChange={this.props.onChange}
      >
        <option value="">{this.props.emptyLabel}</option>
        {this.props.lista.map((item, indice) => {
          return (
            <option selected={selected === item[this.props.value]} key={indice} value={`${item[this.props.value]}`}>
              {`${item[this.props.label]}`}
            </option>
          );
        })}
      </select>
    );
  }
}
