import React, { Component } from "react";

export default class SelectAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    };

    this.toggle = this.toggle.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
  }

  toggle() {
    this.setState({ toggle: !this.state.toggle });
  }

  onBlur() {
    this.setState({ toggle: false });
  }

  onChange(event) {
    this.props.onChange(event.target.value);
    this.setState({ toggle: true });
  }

  onMouseDown(event) {
    this.props.onChange(event.target.innerText);
  }

  render() {
    return (
      <div className="w-100 position-relative" onBlur={this.onBlur}>
        <input
          type="text"
          className={this.props.className}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onKeyDown={this.props.onKeyDown}
          onClick={this.toggle}
          onChange={this.onChange}
        />
        {this.state.toggle && (
          <div className="card w-100 position-absolute shadow rounded-0 border border-info resultados-busca">
            {Object.entries(this.props.collection).length > 0 ? (
              <table className="table-sm table-hover table-borderless">
                <tbody>
                  {Object.entries(this.props.collection).map(
                    ([indice, item]) => (
                      <tr key={indice} className="pl-2 cursor-padrao">
                        <td onMouseDown={this.onMouseDown}>{item.label}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            ) : (
                <span className="px-2 py-2">Nenhum resultado encontrado!</span>
              )}
          </div>
        )}
      </div>
    );
  }
}
