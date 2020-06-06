import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Store from './Store';
import './index.css';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <App store={Store}/>
  </BrowserRouter>,
  document.getElementById('root')
);

