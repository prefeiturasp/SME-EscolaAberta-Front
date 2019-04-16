import React, { Component } from 'react';

export default class SelectAutocomplete extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        }
        this.toggle = this.toggle.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.focusOut = this.focusOut.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    toggle() {
        this.setState({ toggle: !this.state.toggle });
    }

    onTextChange(event) {
        this.props.onChange(this.props.collection, event.target.value);
        this.setState({ toggle: true });
    }

    onSelect(event) {
        this.props.onChange(this.props.collection, event.target.innerText);
    }

    focusOut() {
        this.setState({ toggle: false });
    }

    render() {
        return (
            <div className="w-100 position-relative" onBlur={this.focusOut}>
                <input type="text" className={this.props.className} placeholder={this.props.placeholder} onKeyDown={this.props.onKeyDown} value={this.props.value} onClick={this.toggle} onChange={this.onTextChange} />
                {
                    this.state.toggle &&
                    <div className="card w-100 position-absolute shadow rounded-0 border border-info resultados-busca">
                        {
                            Object.entries(this.props.collection).length > 0 ?
                            <table className="table-sm table-hover table-borderless">
                                <tbody>
                                    {Object.entries(this.props.collection).map(([indice, item]) =>
                                        <tr key={indice} className="pl-2 cursor-padrao"><td onMouseDown={this.onSelect}>{item.label}</td></tr>
                                    )}
                                </tbody>
                            </table>
                            :
                            <span className="px-2 py-2">Nenhum resultado encontrado!</span>
                        }
                    </div>
                }
            </div>
        );
    }

}