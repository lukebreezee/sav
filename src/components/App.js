import React from 'react';
import { Graph } from './Graph.js';
import { store } from '../index.js';
import { Provider } from 'react-redux';
import { Navbar } from './Navbar.js';
export { App };

//Parent Component
class App extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return(
        <Provider store={store}>
          <div id="app">
          <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" />
            <Navbar />
            <Graph />
          </div>
        </Provider>
      );
    }
  }