import React from 'react';
import { Bar } from './Bar';
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../map-to-props';
export { Graph };

//This component holds all the bars and dynamically renders them
class GraphClass extends React.Component {
    constructor(props) {
        super(props);

        this.renderBars = this.renderBars.bind(this);
    }

    //Renders bars based on the 'nums' array in the redux store
    renderBars() {
        return this.props.nums.map((num, index) => {
            return <Bar height={num} key={index} />
        });
    }

    render() {
        return (
            <div id="graph">
                {this.renderBars()}
            </div>
        );
    }
}

//Connecting our component to the redux store
const Graph = connect(mapState, mapDispatch)(GraphClass);