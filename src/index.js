import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { App } from './components/App.js';
import { actionCreator } from './action-creators.js';
import './index.css';
import { reducer } from './reducers.js';
import { mergeSort } from './helpers.js';
export { store };

const store = createStore(reducer);


store.dispatch(actionCreator('RANDOMIZE'));

ReactDOM.render(
  <App />,
  document.getElementById('root')
);