import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './styles/styles.scss';
import Home from './components/Home/Home';
import Escolas from './components/Escolas/Escolas';
import ConsultaPosicao from './components/ConsultaPosicao/ConsultaPosicao';
import Estatisticas from './components/Estatisticas/Estatisticas';

export default class App extends Component {

  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/escolas" component={Escolas} />
          <Route path="/consulta" component={ConsultaPosicao} />
          <Route path="/estatisticas" component={Estatisticas} />
        </Switch>
      </div>
    );
  }

}
