import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

jest.mock('react-ga');

jest.mock('./components/Home/Home', () => {
  const React = require('react');
  return () => <div className="conteudo"><div className="busca-escolas" style={{height: '40px'}} /></div>;
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});