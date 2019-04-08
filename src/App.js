import React, { Component } from 'react';
import Filtros from './components/Escolas/Filtros';
import Escolas from './components/Escolas/Escolas';
import './styles/styles.scss';

class App extends Component {
	render() {
		return (
			<div>
				<Filtros />
				<Escolas />
			</div>
		);
	}
}

export default App;