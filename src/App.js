import React, { Component } from 'react';
import MenuSuperior from './components/MenuSuperior/MenuSuperior';
import Escolas from './components/Escolas/Escolas';
import './styles/styles.scss';

class App extends Component {
	render() {
		return (
			<div>
				<MenuSuperior />
				<Escolas />
			</div>
		);
	}
}

export default App;