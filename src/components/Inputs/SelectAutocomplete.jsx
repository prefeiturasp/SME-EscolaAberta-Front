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

                {this.state.toggle &&
                    <div className="card w-100 position-absolute overflow-hidden" style={{top: '40px', maxHeight: '200px', zIndex: 5, overflowY: 'auto' }}>
                        {Object.entries(this.props.collection).length > 0 ?
                            <table className="table-sm table-hover border-0">
                                <tbody>
                                    {Object.entries(this.props.collection).map(([key, item]) =>
                                        item.active ?
                                            <tr key={key} className="table-active cursor-default"><td className="border-0" onMouseDown={this.onSelect}>{item.label}</td></tr>
                                            :
                                            <tr key={key} className="cursor-default"><td className="border-0" onMouseDown={this.onSelect}>{item.label}</td></tr>
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