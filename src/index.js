import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { App } from './components/App.js';
import { actionCreator } from './action-creators.js';
import { reducer } from './reducers.js';
import './index.css';
export { initialState };
export { store };

const initialState = {
  set numsArray(arr) {
    this.nums = [...arr];
  },
  nums: [],
  timeoutIndex: 0
};

const store = createStore(reducer);

store.dispatch(actionCreator('RANDOMIZE'));

ReactDOM.render(
  <App />,
  document.getElementById('root')
);