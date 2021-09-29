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
import { reducer } from './reducer.js';
import './index.css';
export { initialState };
export { store };

//Initial state for the redux store
const initialState = {
  timeoutIndex: 0, //For the setTimeout function in 'helpers.js'
  barProperties: [], //Holds array of objects with a value and color
  numBars: 100, //Initial number of bars shown, can be changed by user
  sortingSpeed: 10, //Initial sorting speed, can also be changed by user
  inProgress: false //Tells NavButton.js if sorting algo is currently in operation
};

//Initialize the redux store
const store = createStore(reducer);

//Randomize the array before we render the application
store.dispatch({type: 'RANDOMIZE'});

//Render the application
ReactDOM.render(
  <App />,
  document.getElementById('root')
);