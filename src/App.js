import React, { Component } from 'react';
import Home from './components/Home/Home';
import Escolas from './components/Escolas/Escolas';
import { Switch, Route } from 'react-router-dom';
import './styles/styles.scss';

export default class App extends Component {

	render() {
		return (
			<div>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/escolas" component={Escolas} />
				</Switch>
			</div>
		);
	}

}