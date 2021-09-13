import React from 'react';
import { Bar } from './Bar';
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../map-to-props';
export { Graph };

class GraphClass extends React.Component {
    constructor(props) {
        super(props);

        this.renderBars = this.renderBars.bind(this);
    }

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

const Graph = connect(mapState, mapDispatch)(GraphClass);