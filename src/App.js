import React, { Component } from 'react';
import Filtros from './components/Escolas/Filtros';
import Escolas from './components/Escolas/Escolas';
import Rodape from './components/Rodape/Rodape';
import './styles/styles.scss';

export default class App extends Component {
	render() {
		return (
			<div>
				<Filtros />
				<Escolas />
				<Rodape />
			</div>
		);
	}
}