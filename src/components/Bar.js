import React from 'react';
import { store } from '..';
export { Bar };

//Component for each blue bar, dynamically rendered in 'Graph.js'
class Bar extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div id="bar"
            style={
                {
                    // Bar gets height relative to the prop passed through in Graph.js
                    height: (this.props.height).toString() + '%',

                    //Width is relative to the array size
                    width: Math.floor(400 / store.getState().barProperties.length).toString() + 'px',

                    //Array contains objects with individual color values
                    backgroundColor: this.props.barColor
                }
            }>
            </div>
        );
    }
}