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
        return this.props.barProperties.map((item, index) => {
            return <Bar 
                    height={item.value} 
                    key={index} 
                    indexValue={index} 
                    barColor={item.color}
                    />
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