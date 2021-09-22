import React from 'react';
export { Bar };

//Component for each blue bar, dynamically rendered in 'Graph.js'
class Bar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            barColor: this.props.barColor
        };
    }

    render() {
        return (
            <div id="bar"
            /* Bar gets height relative to the prop passed through in Graph.js */
            style={
                {
                    height: (this.props.height).toString() + '%',
                    backgroundColor: this.state.barColor
                }
            }>
            </div>
        );
    }
}