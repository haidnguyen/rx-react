/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import { akitaDevtools } from '@datorama/akita';
import './index.css';

import { App } from './App';

akitaDevtools();
if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app'),
);
