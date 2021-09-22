/*Sorting Algorithm Visualizer for:
 *
 * Merge Sort
 * Quick Sort
 * Bubble Sort
 * Selection Sort
 * 
 * Made with React/Redux
 * 
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { App } from './components/App.js';
import { actionCreator } from './action-creators.js';
import { reducer } from './reducer.js';
import './index.css';
export { initialState };
export { store };

//Initial state for the redux store
const initialState = {
  nums: [], //Array to be dynamically rendered in 'components/Graph.js'
  timeoutIndex: 0, //For the setTimeout function in 'helpers.js'
  barColors: [],
  redBarIndex: null,
  barProperties: []
};

//Initialize the redux store
const store = createStore(reducer);

//Randomize the array before we render the application
store.dispatch(actionCreator('RANDOMIZE'));

store.dispatch(actionCreator('ASSIGN COLORS'));

//Render the application
ReactDOM.render(
  <App />,
  document.getElementById('root')
);